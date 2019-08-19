// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @externs_url https://raw.githubusercontent.com/google/closure-compiler/master/contrib/externs/maps/google_maps_api_v3.js
// ==/ClosureCompiler==

/**
 * @name MarkerClusterer for Google Maps v3
 * @version version 1.0
 * @author Luke Mahe
 * @fileoverview
 * The library creates and manages per-zoom-level clusters for large amounts of
 * markers.
 * <br/>
 * This is a v3 implementation of the
 * <a href="http://gmaps-utility-library-dev.googlecode.com/svn/tags/markerclusterer/"
 * >v2 MarkerClusterer</a>.
 */

/**
 * @license
 * Copyright 2010 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


/**
 * A Marker Clusterer that clusters markers.
 *
 * @param {google.maps.Map} map The Google map to attach to.
 * @param {Array.<google.maps.Marker>=} opt_markers Optional markers to add to
 *   the cluster.
 * @param {Object=} opt_options support the following options:
 *     'gridSize': (number) The grid size of a cluster in pixels.
 *     'maxZoom': (number) The maximum zoom level that a marker can be part of a
 *                cluster.
 *     'zoomOnClick': (boolean) Whether the default behaviour of clicking on a
 *                    cluster is to zoom into it.
 *     'averageCenter': (boolean) Whether the center of each cluster should be
 *                      the average of all markers in the cluster.
 *     'minimumClusterSize': (number) The minimum number of markers to be in a
 *                           cluster before the markers are hidden and a count
 *                           is shown.
 *     'styles': (object) An object that has style properties:
 *       'url': (string) The image url.
 *       'height': (number) The image height.
 *       'width': (number) The image width.
 *       'anchor': (Array) The anchor position of the label text.
 *       'textColor': (string) The text color.
 *       'textSize': (number) The text size.
 *       'backgroundPosition': (string) The position of the backgound x, y.
 *       'iconAnchor': (Array) The anchor position of the icon x, y.
 * @constructor
 * @extends google.maps.OverlayView
 */
function MarkerClusterer(map, opt_markers, opt_options) {
  // MarkerClusterer implements google.maps.OverlayView interface. We use the
  // extend function to extend MarkerClusterer with google.maps.OverlayView
  // because it might not always be available when the code is defined so we
  // look for it at the last possible moment. If it doesn't exist now then
  // there is no point going ahead :)
  this.extend(MarkerClusterer, google.maps.OverlayView);
  this.map_ = map;

  /**
   * @type {Array.<google.maps.Marker>}
   * @private
   */
  this.markers_ = [];

  /**
   *  @type {Array.<Cluster>}
   */
  this.clusters_ = [];

  this.sizes = [53, 56, 66, 78, 90];

  /**
   * @private
   */
  this.styles_ = [];

  /**
   * @type {boolean}
   * @private
   */
  this.ready_ = false;

  var options = opt_options || {};

  /**
   * @type {number}
   * @private
   */
  this.gridSize_ = options['gridSize'] || 60;

  /**
   * @private
   */
  this.minClusterSize_ = options['minimumClusterSize'] || 2;


  /**
   * @type {?number}
   * @private
   */
  this.maxZoom_ = options['maxZoom'] || null;

  this.styles_ = options['styles'] || [];

  /**
   * @type {string}
   * @private
   */
  this.imagePath_ = options['imagePath'] ||
      this.MARKER_CLUSTER_IMAGE_PATH_;

  /**
   * @type {string}
   * @private
   */
  this.imageExtension_ = options['imageExtension'] ||
      this.MARKER_CLUSTER_IMAGE_EXTENSION_;

  /**
   * @type {boolean}
   * @private
   */
  this.zoomOnClick_ = true;

  if (options['zoomOnClick'] != undefined) {
    this.zoomOnClick_ = options['zoomOnClick'];
  }

  /**
   * @type {boolean}
   * @private
   */
  this.averageCenter_ = false;

  if (options['averageCenter'] != undefined) {
    this.averageCenter_ = options['averageCenter'];
  }

  this.setupStyles_();

  this.setMap(map);

  /**
   * @type {number}
   * @private
   */
  this.prevZoom_ = this.map_.getZoom();

  // Add the map event listeners
  var that = this;
  google.maps.event.addListener(this.map_, 'zoom_changed', function() {
    var zoom = that.map_.getZoom();

    if (that.prevZoom_ != zoom) {
      that.prevZoom_ = zoom;
      that.resetViewport();
    }
  });

  google.maps.event.addListener(this.map_, 'idle', function() {
    that.redraw();
  });

  // Finally, add the markers
  if (opt_markers && opt_markers.length) {
    this.addMarkers(opt_markers, false);
  }
}


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = '../../sites/all/modules/find_a_financial_advisor/img/m';
/*MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_PATH_ = 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m';*/


/**
 * The marker cluster image path.
 *
 * @type {string}
 * @private
 */
MarkerClusterer.prototype.MARKER_CLUSTER_IMAGE_EXTENSION_ = 'png';


/**
 * Extends a objects prototype by anothers.
 *
 * @param {Object} obj1 The object to be extended.
 * @param {Object} obj2 The object to extend with.
 * @return {Object} The new extended object.
 * @ignore
 */
MarkerClusterer.prototype.extend = function(obj1, obj2) {
  return (function(object) {
    for (var property in object.prototype) {
      this.prototype[property] = object.prototype[property];
    }
    return this;
  }).apply(obj1, [obj2]);
};


/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.onAdd = function() {
  this.setReady_(true);
};

/**
 * Implementaion of the interface method.
 * @ignore
 */
MarkerClusterer.prototype.draw = function() {};

/**
 * Sets up the styles object.
 *
 * @private
 */
MarkerClusterer.prototype.setupStyles_ = function() {
  if (this.styles_.length) {
    return;
  }

  for (var i = 0, size; size = this.sizes[i]; i++) {
    this.styles_.push({
      url: this.imagePath_ + (i + 1) + '.' + this.imageExtension_,
      height: size,
      width: size
    });
  }
};

/**
 *  Fit the map to the bounds of the markers in the clusterer.
 */
MarkerClusterer.prototype.fitMapToMarkers = function() {
  var markers = this.getMarkers();
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0, marker; marker = markers[i]; i++) {
    bounds.extend(marker.getPosition());
  }

  this.map_.fitBounds(bounds);
};


/**
 *  Sets the styles.
 *
 *  @param {Object} styles The style to set.
 */
MarkerClusterer.prototype.setStyles = function(styles) {
  this.styles_ = styles;
};


/**
 *  Gets the styles.
 *
 *  @return {Object} The styles object.
 */
MarkerClusterer.prototype.getStyles = function() {
  return this.styles_;
};


/**
 * Whether zoom on click is set.
 *
 * @return {boolean} True if zoomOnClick_ is set.
 */
MarkerClusterer.prototype.isZoomOnClick = function() {
  return this.zoomOnClick_;
};

/**
 * Whether average center is set.
 *
 * @return {boolean} True if averageCenter_ is set.
 */
MarkerClusterer.prototype.isAverageCenter = function() {
  return this.averageCenter_;
};


/**
 *  Returns the array of markers in the clusterer.
 *
 *  @return {Array.<google.maps.Marker>} The markers.
 */
MarkerClusterer.prototype.getMarkers = function() {
  return this.markers_;
};


/**
 *  Returns the number of markers in the clusterer
 *
 *  @return {Number} The number of markers.
 */
MarkerClusterer.prototype.getTotalMarkers = function() {
  return this.markers_.length;
};


/**
 *  Sets the max zoom for the clusterer.
 *
 *  @param {number} maxZoom The max zoom level.
 */
MarkerClusterer.prototype.setMaxZoom = function(maxZoom) {
  this.maxZoom_ = maxZoom;
};


/**
 *  Gets the max zoom for the clusterer.
 *
 *  @return {number} The max zoom level.
 */
MarkerClusterer.prototype.getMaxZoom = function() {
  return this.maxZoom_;
};


/**
 *  The function for calculating the cluster icon image.
 *
 *  @param {Array.<google.maps.Marker>} markers The markers in the clusterer.
 *  @param {number} numStyles The number of styles available.
 *  @return {Object} A object properties: 'text' (string) and 'index' (number).
 *  @private
 */
MarkerClusterer.prototype.calculator_ = function(markers, numStyles) {
  var index = 0;
  var count = markers.length;
  var dv = count;
  while (dv !== 0) {
    dv = parseInt(dv / 10, 10);
    index++;
  }

  index = Math.min(index, numStyles);
  return {
    text: count,
    index: index
  };
};


/**
 * Set the calculator function.
 *
 * @param {function(Array, number)} calculator The function to set as the
 *     calculator. The function should return a object properties:
 *     'text' (string) and 'index' (number).
 *
 */
MarkerClusterer.prototype.setCalculator = function(calculator) {
  this.calculator_ = calculator;
};


/**
 * Get the calculator function.
 *
 * @return {function(Array, number)} the calculator function.
 */
MarkerClusterer.prototype.getCalculator = function() {
  return this.calculator_;
};


/**
 * Add an array of markers to the clusterer.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarkers = function(markers, opt_nodraw) {
  for (var i = 0, marker; marker = markers[i]; i++) {
    this.pushMarkerTo_(marker);
  }
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Pushes a marker to the clusterer.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.pushMarkerTo_ = function(marker) {
  marker.isAdded = false;
  if (marker['draggable']) {
    // If the marker is draggable add a listener so we update the clusters on
    // the drag end.
    var that = this;
    google.maps.event.addListener(marker, 'dragend', function() {
      marker.isAdded = false;
      that.repaint();
    });
  }
  this.markers_.push(marker);
};


/**
 * Adds a marker to the clusterer and redraws if needed.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @param {boolean=} opt_nodraw Whether to redraw the clusters.
 */
MarkerClusterer.prototype.addMarker = function(marker, opt_nodraw) {
  this.pushMarkerTo_(marker);
  if (!opt_nodraw) {
    this.redraw();
  }
};


/**
 * Removes a marker and returns true if removed, false if not
 *
 * @param {google.maps.Marker} marker The marker to remove
 * @return {boolean} Whether the marker was removed or not
 * @private
 */
MarkerClusterer.prototype.removeMarker_ = function(marker) {
  var index = -1;
  if (this.markers_.indexOf) {
    index = this.markers_.indexOf(marker);
  } else {
    for (var i = 0, m; m = this.markers_[i]; i++) {
      if (m == marker) {
        index = i;
        break;
      }
    }
  }

  if (index == -1) {
    // Marker is not in our list of markers.
    return false;
  }

  marker.setMap(null);

  this.markers_.splice(index, 1);

  return true;
};


/**
 * Remove a marker from the cluster.
 *
 * @param {google.maps.Marker} marker The marker to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 * @return {boolean} True if the marker was removed.
 */
MarkerClusterer.prototype.removeMarker = function(marker, opt_nodraw) {
  var removed = this.removeMarker_(marker);

  if (!opt_nodraw && removed) {
    this.resetViewport();
    this.redraw();
    return true;
  } else {
   return false;
  }
};


/**
 * Removes an array of markers from the cluster.
 *
 * @param {Array.<google.maps.Marker>} markers The markers to remove.
 * @param {boolean=} opt_nodraw Optional boolean to force no redraw.
 */
MarkerClusterer.prototype.removeMarkers = function(markers, opt_nodraw) {
  var removed = false;

  for (var i = 0, marker; marker = markers[i]; i++) {
    var r = this.removeMarker_(marker);
    removed = removed || r;
  }

  if (!opt_nodraw && removed) {
    this.resetViewport();
    this.redraw();
    return true;
  }
};


/**
 * Sets the clusterer's ready state.
 *
 * @param {boolean} ready The state.
 * @private
 */
MarkerClusterer.prototype.setReady_ = function(ready) {
  if (!this.ready_) {
    this.ready_ = ready;
    this.createClusters_();
  }
};


/**
 * Returns the number of clusters in the clusterer.
 *
 * @return {number} The number of clusters.
 */
MarkerClusterer.prototype.getTotalClusters = function() {
  return this.clusters_.length;
};


/**
 * Returns the google map that the clusterer is associated with.
 *
 * @return {google.maps.Map} The map.
 */
MarkerClusterer.prototype.getMap = function() {
  return this.map_;
};


/**
 * Sets the google map that the clusterer is associated with.
 *
 * @param {google.maps.Map} map The map.
 */
MarkerClusterer.prototype.setMap = function(map) {
  this.map_ = map;
};


/**
 * Returns the size of the grid.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getGridSize = function() {
  return this.gridSize_;
};


/**
 * Sets the size of the grid.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setGridSize = function(size) {
  this.gridSize_ = size;
};


/**
 * Returns the min cluster size.
 *
 * @return {number} The grid size.
 */
MarkerClusterer.prototype.getMinClusterSize = function() {
  return this.minClusterSize_;
};

/**
 * Sets the min cluster size.
 *
 * @param {number} size The grid size.
 */
MarkerClusterer.prototype.setMinClusterSize = function(size) {
  this.minClusterSize_ = size;
};


/**
 * Extends a bounds object by the grid size.
 *
 * @param {google.maps.LatLngBounds} bounds The bounds to extend.
 * @return {google.maps.LatLngBounds} The extended bounds.
 */
MarkerClusterer.prototype.getExtendedBounds = function(bounds) {
  var projection = this.getProjection();

  // Turn the bounds into latlng.
  var tr = new google.maps.LatLng(bounds.getNorthEast().lat(),
      bounds.getNorthEast().lng());
  var bl = new google.maps.LatLng(bounds.getSouthWest().lat(),
      bounds.getSouthWest().lng());

  // Convert the points to pixels and the extend out by the grid size.
  var trPix = projection.fromLatLngToDivPixel(tr);
  trPix.x += this.gridSize_;
  trPix.y -= this.gridSize_;

  var blPix = projection.fromLatLngToDivPixel(bl);
  blPix.x -= this.gridSize_;
  blPix.y += this.gridSize_;

  // Convert the pixel points back to LatLng
  var ne = projection.fromDivPixelToLatLng(trPix);
  var sw = projection.fromDivPixelToLatLng(blPix);

  // Extend the bounds to contain the new bounds.
  bounds.extend(ne);
  bounds.extend(sw);

  return bounds;
};


/**
 * Determins if a marker is contained in a bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @param {google.maps.LatLngBounds} bounds The bounds to check against.
 * @return {boolean} True if the marker is in the bounds.
 * @private
 */
MarkerClusterer.prototype.isMarkerInBounds_ = function(marker, bounds) {
  return bounds.contains(marker.getPosition());
};


/**
 * Clears all clusters and markers from the clusterer.
 */
MarkerClusterer.prototype.clearMarkers = function() {
  this.resetViewport(true);

  // Set the markers a empty array.
  this.markers_ = [];
};


/**
 * Clears all existing clusters and recreates them.
 * @param {boolean} opt_hide To also hide the marker.
 */
MarkerClusterer.prototype.resetViewport = function(opt_hide) {
  // Remove all the clusters
  for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    cluster.remove();
  }

  // Reset the markers to not be added and to be invisible.
  for (var i = 0, marker; marker = this.markers_[i]; i++) {
    marker.isAdded = false;
    if (opt_hide) {
      marker.setMap(null);
    }
  }

  this.clusters_ = [];
};

/**
 *
 */
MarkerClusterer.prototype.repaint = function() {
  var oldClusters = this.clusters_.slice();
  this.clusters_.length = 0;
  this.resetViewport();
  this.redraw();

  // Remove the old clusters.
  // Do it in a timeout so the other clusters have been drawn first.
  window.setTimeout(function() {
    for (var i = 0, cluster; cluster = oldClusters[i]; i++) {
      cluster.remove();
    }
  }, 0);
};


/**
 * Redraws the clusters.
 */
MarkerClusterer.prototype.redraw = function() {
  this.createClusters_();
};


/**
 * Calculates the distance between two latlng locations in km.
 * @see http://www.movable-type.co.uk/scripts/latlong.html
 *
 * @param {google.maps.LatLng} p1 The first lat lng point.
 * @param {google.maps.LatLng} p2 The second lat lng point.
 * @return {number} The distance between the two points in km.
 * @private
*/
MarkerClusterer.prototype.distanceBetweenPoints_ = function(p1, p2) {
  if (!p1 || !p2) {
    return 0;
  }

  var R = 6371; // Radius of the Earth in km
  var dLat = (p2.lat() - p1.lat()) * Math.PI / 180;
  var dLon = (p2.lng() - p1.lng()) * Math.PI / 180;
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(p1.lat() * Math.PI / 180) * Math.cos(p2.lat() * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
};


/**
 * Add a marker to a cluster, or creates a new cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @private
 */
MarkerClusterer.prototype.addToClosestCluster_ = function(marker) {
  var distance = 40000; // Some large number
  var clusterToAddTo = null;
  var pos = marker.getPosition();
  for (var i = 0, cluster; cluster = this.clusters_[i]; i++) {
    var center = cluster.getCenter();
    if (center) {
      var d = this.distanceBetweenPoints_(center, marker.getPosition());
      if (d < distance) {
        distance = d;
        clusterToAddTo = cluster;
      }
    }
  }

  if (clusterToAddTo && clusterToAddTo.isMarkerInClusterBounds(marker)) {
    clusterToAddTo.addMarker(marker);
  } else {
    var cluster = new Cluster(this);
    cluster.addMarker(marker);
    this.clusters_.push(cluster);
  }
};


/**
 * Creates the clusters.
 *
 * @private
 */
MarkerClusterer.prototype.createClusters_ = function() {
  if (!this.ready_) {
    return;
  }

  // Get our current map view bounds.
  // Create a new bounds object so we don't affect the map.
  var mapBounds = new google.maps.LatLngBounds(this.map_.getBounds().getSouthWest(),
      this.map_.getBounds().getNorthEast());
  var bounds = this.getExtendedBounds(mapBounds);

  for (var i = 0, marker; marker = this.markers_[i]; i++) {
    if (!marker.isAdded && this.isMarkerInBounds_(marker, bounds)) {
      this.addToClosestCluster_(marker);
    }
  }
};


/**
 * A cluster that contains markers.
 *
 * @param {MarkerClusterer} markerClusterer The markerclusterer that this
 *     cluster is associated with.
 * @constructor
 * @ignore
 */
function Cluster(markerClusterer) {
  this.markerClusterer_ = markerClusterer;
  this.map_ = markerClusterer.getMap();
  this.gridSize_ = markerClusterer.getGridSize();
  this.minClusterSize_ = markerClusterer.getMinClusterSize();
  this.averageCenter_ = markerClusterer.isAverageCenter();
  this.center_ = null;
  this.markers_ = [];
  this.bounds_ = null;
  this.clusterIcon_ = new ClusterIcon(this, markerClusterer.getStyles(),
      markerClusterer.getGridSize());
}

/**
 * Determins if a marker is already added to the cluster.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker is already added.
 */
Cluster.prototype.isMarkerAlreadyAdded = function(marker) {
  if (this.markers_.indexOf) {
    return this.markers_.indexOf(marker) != -1;
  } else {
    for (var i = 0, m; m = this.markers_[i]; i++) {
      if (m == marker) {
        return true;
      }
    }
  }
  return false;
};


/**
 * Add a marker the cluster.
 *
 * @param {google.maps.Marker} marker The marker to add.
 * @return {boolean} True if the marker was added.
 */
Cluster.prototype.addMarker = function(marker) {
  if (this.isMarkerAlreadyAdded(marker)) {
    return false;
  }

  if (!this.center_) {
    this.center_ = marker.getPosition();
    this.calculateBounds_();
  } else {
    if (this.averageCenter_) {
      var l = this.markers_.length + 1;
      var lat = (this.center_.lat() * (l-1) + marker.getPosition().lat()) / l;
      var lng = (this.center_.lng() * (l-1) + marker.getPosition().lng()) / l;
      this.center_ = new google.maps.LatLng(lat, lng);
      this.calculateBounds_();
    }
  }

  marker.isAdded = true;
  this.markers_.push(marker);

  var len = this.markers_.length;
  if (len < this.minClusterSize_ && marker.getMap() != this.map_) {
    // Min cluster size not reached so show the marker.
    marker.setMap(this.map_);
  }

  if (len == this.minClusterSize_) {
    // Hide the markers that were showing.
    for (var i = 0; i < len; i++) {
      this.markers_[i].setMap(null);
    }
  }

  if (len >= this.minClusterSize_) {
    marker.setMap(null);
  }

  this.updateIcon();
  return true;
};


/**
 * Returns the marker clusterer that the cluster is associated with.
 *
 * @return {MarkerClusterer} The associated marker clusterer.
 */
Cluster.prototype.getMarkerClusterer = function() {
  return this.markerClusterer_;
};


/**
 * Returns the bounds of the cluster.
 *
 * @return {google.maps.LatLngBounds} the cluster bounds.
 */
Cluster.prototype.getBounds = function() {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  var markers = this.getMarkers();
  for (var i = 0, marker; marker = markers[i]; i++) {
    bounds.extend(marker.getPosition());
  }
  return bounds;
};


/**
 * Removes the cluster
 */
Cluster.prototype.remove = function() {
  this.clusterIcon_.remove();
  this.markers_.length = 0;
  delete this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {number} The cluster center.
 */
Cluster.prototype.getSize = function() {
  return this.markers_.length;
};


/**
 * Returns the center of the cluster.
 *
 * @return {Array.<google.maps.Marker>} The cluster center.
 */
Cluster.prototype.getMarkers = function() {
  return this.markers_;
};


/**
 * Returns the center of the cluster.
 *
 * @return {google.maps.LatLng} The cluster center.
 */
Cluster.prototype.getCenter = function() {
  return this.center_;
};


/**
 * Calculated the extended bounds of the cluster with the grid.
 *
 * @private
 */
Cluster.prototype.calculateBounds_ = function() {
  var bounds = new google.maps.LatLngBounds(this.center_, this.center_);
  this.bounds_ = this.markerClusterer_.getExtendedBounds(bounds);
};


/**
 * Determines if a marker lies in the clusters bounds.
 *
 * @param {google.maps.Marker} marker The marker to check.
 * @return {boolean} True if the marker lies in the bounds.
 */
Cluster.prototype.isMarkerInClusterBounds = function(marker) {
  return this.bounds_.contains(marker.getPosition());
};


/**
 * Returns the map that the cluster is associated with.
 *
 * @return {google.maps.Map} The map.
 */
Cluster.prototype.getMap = function() {
  return this.map_;
};


/**
 * Updates the cluster icon
 */
Cluster.prototype.updateIcon = function() {
  var zoom = this.map_.getZoom();
  var mz = this.markerClusterer_.getMaxZoom();

  if (mz && zoom > mz) {
    // The zoom is greater than our max zoom so show all the markers in cluster.
    for (var i = 0, marker; marker = this.markers_[i]; i++) {
      marker.setMap(this.map_);
    }
    return;
  }

  if (this.markers_.length < this.minClusterSize_) {
    // Min cluster size not yet reached.
    this.clusterIcon_.hide();
    return;
  }

  var numStyles = this.markerClusterer_.getStyles().length;
  var sums = this.markerClusterer_.getCalculator()(this.markers_, numStyles);
  this.clusterIcon_.setCenter(this.center_);
  this.clusterIcon_.setSums(sums);
  this.clusterIcon_.show();
};


/**
 * A cluster icon
 *
 * @param {Cluster} cluster The cluster to be associated with.
 * @param {Object} styles An object that has style properties:
 *     'url': (string) The image url.
 *     'height': (number) The image height.
 *     'width': (number) The image width.
 *     'anchor': (Array) The anchor position of the label text.
 *     'textColor': (string) The text color.
 *     'textSize': (number) The text size.
 *     'backgroundPosition: (string) The background postition x, y.
 * @param {number=} opt_padding Optional padding to apply to the cluster icon.
 * @constructor
 * @extends google.maps.OverlayView
 * @ignore
 */
function ClusterIcon(cluster, styles, opt_padding) {
  cluster.getMarkerClusterer().extend(ClusterIcon, google.maps.OverlayView);

  this.styles_ = styles;
  this.padding_ = opt_padding || 0;
  this.cluster_ = cluster;
  this.center_ = null;
  this.map_ = cluster.getMap();
  this.div_ = null;
  this.sums_ = null;
  this.visible_ = false;

  this.setMap(this.map_);
}


/**
 * Triggers the clusterclick event and zoom's if the option is set.
 *
 * @param {google.maps.MouseEvent} event The event to propagate
 */
ClusterIcon.prototype.triggerClusterClick = function(event) {
  var markerClusterer = this.cluster_.getMarkerClusterer();

  // Trigger the clusterclick event.
  google.maps.event.trigger(markerClusterer, 'clusterclick', this.cluster_, event);

  if (markerClusterer.isZoomOnClick()) {
    // Zoom into the cluster.
    this.map_.fitBounds(this.cluster_.getBounds());
  }
};


/**
 * Adding the cluster icon to the dom.
 * @ignore
 */
ClusterIcon.prototype.onAdd = function() {
  this.div_ = document.createElement('DIV');
  if (this.visible_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(pos);
    this.div_.innerHTML = this.sums_.text;
  }

  var panes = this.getPanes();
  panes.overlayMouseTarget.appendChild(this.div_);

  var that = this;
  var isDragging = false;
  google.maps.event.addDomListener(this.div_, 'click', function(event) {
    // Only perform click when not preceded by a drag
    if (!isDragging) {
      that.triggerClusterClick(event);
    }
  });
  google.maps.event.addDomListener(this.div_, 'mousedown', function() {
    isDragging = false;
  });
  google.maps.event.addDomListener(this.div_, 'mousemove', function() {
    isDragging = true;
  });
};


/**
 * Returns the position to place the div dending on the latlng.
 *
 * @param {google.maps.LatLng} latlng The position in latlng.
 * @return {google.maps.Point} The position in pixels.
 * @private
 */
ClusterIcon.prototype.getPosFromLatLng_ = function(latlng) {
  var pos = this.getProjection().fromLatLngToDivPixel(latlng);

  if (typeof this.iconAnchor_ === 'object' && this.iconAnchor_.length === 2) {
    pos.x -= this.iconAnchor_[0];
    pos.y -= this.iconAnchor_[1];
  } else {
    pos.x -= parseInt(this.width_ / 2, 10);
    pos.y -= parseInt(this.height_ / 2, 10);
  }
  return pos;
};


/**
 * Draw the icon.
 * @ignore
 */
ClusterIcon.prototype.draw = function() {
  if (this.visible_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.top = pos.y + 'px';
    this.div_.style.left = pos.x + 'px';
  }
};


/**
 * Hide the icon.
 */
ClusterIcon.prototype.hide = function() {
  if (this.div_) {
    this.div_.style.display = 'none';
  }
  this.visible_ = false;
};


/**
 * Position and show the icon.
 */
ClusterIcon.prototype.show = function() {
  if (this.div_) {
    var pos = this.getPosFromLatLng_(this.center_);
    this.div_.style.cssText = this.createCss(pos);
    this.div_.style.display = '';
  }
  this.visible_ = true;
};


/**
 * Remove the icon from the map
 */
ClusterIcon.prototype.remove = function() {
  this.setMap(null);
};


/**
 * Implementation of the onRemove interface.
 * @ignore
 */
ClusterIcon.prototype.onRemove = function() {
  if (this.div_ && this.div_.parentNode) {
    this.hide();
    this.div_.parentNode.removeChild(this.div_);
    this.div_ = null;
  }
};


/**
 * Set the sums of the icon.
 *
 * @param {Object} sums The sums containing:
 *   'text': (string) The text to display in the icon.
 *   'index': (number) The style index of the icon.
 */
ClusterIcon.prototype.setSums = function(sums) {
  this.sums_ = sums;
  this.text_ = sums.text;
  this.index_ = sums.index;
  if (this.div_) {
    this.div_.innerHTML = sums.text;
  }

  this.useStyle();
};


/**
 * Sets the icon to the the styles.
 */
ClusterIcon.prototype.useStyle = function() {
  var index = Math.max(0, this.sums_.index - 1);
  index = Math.min(this.styles_.length - 1, index);
  var style = this.styles_[index];
  this.url_ = style['url'];
  this.height_ = style['height'];
  this.width_ = style['width'];
  this.textColor_ = style['textColor'];
  this.anchor_ = style['anchor'];
  this.textSize_ = style['textSize'];
  this.backgroundPosition_ = style['backgroundPosition'];
  this.iconAnchor_ = style['iconAnchor'];
};


/**
 * Sets the center of the icon.
 *
 * @param {google.maps.LatLng} center The latlng to set as the center.
 */
ClusterIcon.prototype.setCenter = function(center) {
  this.center_ = center;
};


/**
 * Create the css text based on the position of the icon.
 *
 * @param {google.maps.Point} pos The position.
 * @return {string} The css style text.
 */
ClusterIcon.prototype.createCss = function(pos) {
  var style = [];
  style.push('background-image:url(' + this.url_ + ');');
  var backgroundPosition = this.backgroundPosition_ ? this.backgroundPosition_ : '0 0';
  style.push('background-position:' + backgroundPosition + ';');

  if (typeof this.anchor_ === 'object') {
    if (typeof this.anchor_[0] === 'number' && this.anchor_[0] > 0 &&
        this.anchor_[0] < this.height_) {
      style.push('height:' + (this.height_ - this.anchor_[0]) +
          'px; padding-top:' + this.anchor_[0] + 'px;');
    } else if (typeof this.anchor_[0] === 'number' && this.anchor_[0] < 0 &&
        -this.anchor_[0] < this.height_) {
      style.push('height:' + this.height_ + 'px; line-height:' + (this.height_ + this.anchor_[0]) +
          'px;');
    } else {
      style.push('height:' + this.height_ + 'px; line-height:' + this.height_ +
          'px;');
    }
    if (typeof this.anchor_[1] === 'number' && this.anchor_[1] > 0 &&
        this.anchor_[1] < this.width_) {
      style.push('width:' + (this.width_ - this.anchor_[1]) +
          'px; padding-left:' + this.anchor_[1] + 'px;');
    } else {
      style.push('width:' + this.width_ + 'px; text-align:center;');
    }
  } else {
    style.push('height:' + this.height_ + 'px; line-height:' +
        this.height_ + 'px; width:' + this.width_ + 'px; text-align:center;');
  }

  var txtColor = this.textColor_ ? this.textColor_ : 'black';
  var txtSize = this.textSize_ ? this.textSize_ : 11;

  style.push('cursor:pointer; top:' + pos.y + 'px; left:' +
      pos.x + 'px; color:' + txtColor + '; position:absolute; font-size:' +
      txtSize + 'px; font-family:Arial,sans-serif; font-weight:bold');
  return style.join('');
};


// Export Symbols for Closure
// If you are not going to compile with closure then you can remove the
// code below.
window['MarkerClusterer'] = MarkerClusterer;
MarkerClusterer.prototype['addMarker'] = MarkerClusterer.prototype.addMarker;
MarkerClusterer.prototype['addMarkers'] = MarkerClusterer.prototype.addMarkers;
MarkerClusterer.prototype['clearMarkers'] =
    MarkerClusterer.prototype.clearMarkers;
MarkerClusterer.prototype['fitMapToMarkers'] =
    MarkerClusterer.prototype.fitMapToMarkers;
MarkerClusterer.prototype['getCalculator'] =
    MarkerClusterer.prototype.getCalculator;
MarkerClusterer.prototype['getGridSize'] =
    MarkerClusterer.prototype.getGridSize;
MarkerClusterer.prototype['getExtendedBounds'] =
    MarkerClusterer.prototype.getExtendedBounds;
MarkerClusterer.prototype['getMap'] = MarkerClusterer.prototype.getMap;
MarkerClusterer.prototype['getMarkers'] = MarkerClusterer.prototype.getMarkers;
MarkerClusterer.prototype['getMaxZoom'] = MarkerClusterer.prototype.getMaxZoom;
MarkerClusterer.prototype['getStyles'] = MarkerClusterer.prototype.getStyles;
MarkerClusterer.prototype['getTotalClusters'] =
    MarkerClusterer.prototype.getTotalClusters;
MarkerClusterer.prototype['getTotalMarkers'] =
    MarkerClusterer.prototype.getTotalMarkers;
MarkerClusterer.prototype['redraw'] = MarkerClusterer.prototype.redraw;
MarkerClusterer.prototype['removeMarker'] =
    MarkerClusterer.prototype.removeMarker;
MarkerClusterer.prototype['removeMarkers'] =
    MarkerClusterer.prototype.removeMarkers;
MarkerClusterer.prototype['resetViewport'] =
    MarkerClusterer.prototype.resetViewport;
MarkerClusterer.prototype['repaint'] =
    MarkerClusterer.prototype.repaint;
MarkerClusterer.prototype['setCalculator'] =
    MarkerClusterer.prototype.setCalculator;
MarkerClusterer.prototype['setGridSize'] =
    MarkerClusterer.prototype.setGridSize;
MarkerClusterer.prototype['setMaxZoom'] =
    MarkerClusterer.prototype.setMaxZoom;
MarkerClusterer.prototype['onAdd'] = MarkerClusterer.prototype.onAdd;
MarkerClusterer.prototype['draw'] = MarkerClusterer.prototype.draw;

Cluster.prototype['getCenter'] = Cluster.prototype.getCenter;
Cluster.prototype['getSize'] = Cluster.prototype.getSize;
Cluster.prototype['getMarkers'] = Cluster.prototype.getMarkers;

ClusterIcon.prototype['onAdd'] = ClusterIcon.prototype.onAdd;
ClusterIcon.prototype['draw'] = ClusterIcon.prototype.draw;
ClusterIcon.prototype['onRemove'] = ClusterIcon.prototype.onRemove;;
//Get markers for IE
var map, infoWindow, consultantMarkerImage, independentMarkerImage, geocoder, markerCluster, web;
var markers = [];
if (jQuery.browser.msie && jQuery.browser.version.substr(0, 1) < 7) {
    var styles = [{
        url: '/sites/all/modules/find_a_financial_advisor/img/m1.gif',
        height: 26,
        width: 26,
        opt_anchor: [13, 0],
        opt_textColor: '#ff00ff',
        opt_textSize: 10
    }, {
        url: '/sites/all/modules/find_a_financial_advisor/img/m2.gif',
        height: 27,
        width: 27,
        opt_anchor: [14, 0],
        opt_textColor: '#ff0000',
        opt_textSize: 11
    }, {
        url: '/sites/all/modules/find_a_financial_advisor/img/m3.gif',
        height: 31,
        width: 31,
        opt_anchor: [15, 0],
        opt_textSize: 12
    }];
}
// Check box listeners - Independent Broker
jQuery(document).ready(function() {
    initialize();
    jQuery('#iibCheckBox').change(function() {
        if (jQuery("#iibCheckBox").is(':checked')) {
            jQuery('#mobIibCheckBox').prop('checked', true);
        } else {
            jQuery('#mobIibCheckBox').prop('checked', false);
        }
        markerCluster.clearMarkers();
        infoWindow.close();
        addMarkers();
    });
    jQuery('#mobIibCheckBox').change(function() {
        if (jQuery("#mobIibCheckBox").is(':checked')) {
            jQuery('#iibCheckBox').prop('checked', true);
        } else {
            jQuery('#iibCheckBox').prop('checked', false);
        }
        markerCluster.clearMarkers();
        infoWindow.close();
        addMarkers();
    });
}); //Include Markers//
var demo;
addMarkers = function() {
        markers = [];
        //get json data and loop through
        jQuery.getJSON("/servlet/adviser", function(data) {
            for (var i = 0; i < data[0].advisers.length; i++) {
                var lat, lng;
                if (data[0].advisers[i].locations.length > 0) {
				
					for (var j = 0; j < data[0].advisers[i].locations.length; j++)
					{
						lat = data[0].advisers[i].locations[j].latitude;
						lng = data[0].advisers[i].locations[j].longitude;
						var id = data[0].advisers[i].id;
						var type = "" + data[0].advisers[i].type;
						//marker images
						consultantMarkerImage = new google.maps.MarkerImage('/sites/all/modules/find_a_financial_advisor/img/map.person.icon.png');
						independentMarkerImage = new google.maps.MarkerImage('/sites/all/modules/find_a_financial_advisor/img/map.person2.icon.png');
						//declare co-ordinates for google maps
						var latLng = new google.maps.LatLng(lat, lng);
						//Check if checkbox is checked and insert Broker marker
						if (type == "BR" && (jQuery("#iibCheckBox").is(':checked') || jQuery("#mobIibCheckBox").is(':checked'))) {
							var marker = new google.maps.Marker({
								position: latLng,
								myID: id,
								icon: independentMarkerImage
							});
							//when marker is clicked on
							var fn = markerClickFunction(id, latLng, '2', marker);
							google.maps.event.addListener(marker, 'click', fn);
							markers.push(marker);
							//Otherwise display only Agents marker
						} else if (type == "DB") {
							//position and place marker
							var marker = new google.maps.Marker({
								position: latLng,
								myID: id,
								icon: consultantMarkerImage
							});
							//when marker is clicked on
							var fn = markerClickFunction(id, latLng, '1', marker);
							google.maps.event.addListener(marker, 'click', fn);
							markers.push(marker);
						}
					}
                }
            };
            //Display info window when markers are clicked on
            infoWindow = new google.maps.InfoWindow();
            markerCluster = new MarkerClusterer(map, markers, {
                maxZoom: 13,
                gridSize: 40,
                styles: styles
            });
        });
    }
    //Initialise and centre Google Map  
function initialize() {
    var center = new google.maps.LatLng(53.35055131839989, -6.317138671875);

    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: center,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    addMarkers();
} //Display Broker data in info 
markerClickFunction = function(myID, latlng, infoID, marker) {
    return function(e) {
        var fName, lName, id, address1, email, telephone, fax;
        //retrieve data
        jQuery.getJSON("/servlet/adviser?id=" + myID, function(data) {
            fName = data[0].adviser[0].firstname;
            lName = data[0].adviser[0].lastname;
            business = data[0].adviser[0].businessname;
            address1 = data[0].adviser[0].address;
            email = data[0].adviser[0].email
            telephone = data[0].adviser[0].phone;
            web = data[0].adviser[0].web;
            fax = data[0].adviser[0].fax;
            e.cancelBubble = true;
            e.returnValue = false;
            if (e.stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
            }
            var trackName = '';
            //Display data if Broker
            if (infoID == '2') {
                var independentAdvisorInfo =
                    '<div class="mapInfoWindow" style="height:230px; width: 330px;">' +
                    '<div class="mapInfoWindowText"><h2><u>Financial Broker or Advisor</u></h2>' +
                    '<h1><b> ' + business + '</b></h1> ' +
                    '<h3> ' + address1 + '</h3>' +
                    '<h3><b>Phone:</b> ' + telephone + '</h3> ';
                //If broker has email
                if (email != "null") {
                    independentAdvisorInfo = independentAdvisorInfo + '<h3><b>Email:</b> <a href="mailto:' + email + '">' + email + '</a></h3>';
                }
                //If broker has website display url
                if (web != "null") {
                    independentAdvisorInfo = independentAdvisorInfo + '<h3><b>Web:</b> <a href="' + web + '" target="_blank">' + web + '</a></h3>';
                }
                independentAdvisorInfo = independentAdvisorInfo +
                    '</div>' +
                    '</div>';
                infoWindow.setContent(independentAdvisorInfo);
                trackName = myID['name'];
            }
            //Display data if Tied Agent
            else {
                var ILAdvisorInfo = '<div class="mapInfoWindow">' +
                    '<div class="mapInfoWindowText"><h2><u>Irish Life Tied Agent</u></h2>' +
                    '<h1><b> ' + fName + ' ' + lName + '</b></h1>' +
                    '<h3><b>Phone:</b> ' + telephone + '<br/> ' +
                    '<b>Fax:</b> ' + fax + '<br/> ' +
                    '<b>Email:</b> <a href="mailto:' + email + '">' + email + '</a></h3>' +
                    '</div>' +
                    '</div>';
                infoWindow.setContent(ILAdvisorInfo);
                trackName = fName + ' ' + lName;
            }
            infoWindow.setPosition(latlng);
            infoWindow.open(map, marker);
        })
    };
};

function clearOverlays(myArr) {
    if (myArr) {
        for (i in myArr) {
            myArr[i].setMap(null);
        }
    }
    clearOverlays(markers);
    markerCluster.clearMarkers();
} //Change County
function countyChange() {
    var mapStreetValues = jQuery('#advisorMapStreet').val();
    var mapTownValues = jQuery('#advisorMapTown').val();
    var mapCountyValues = jQuery('#mapOptionsCounty').val();
    if (mapTownValues == "" && mapCountyValues == "") {
        mapTownValues = "Dublin";
        mapCountyValues = "dublin";
    }
    //var address = mapTownValues + ",co." + mapCountyValues + ", ireland";
	var address = "co. " + mapCountyValues + ", ireland";
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var myLatlngAddress = new google.maps.LatLng(results[0].geometry.location);
            map.setCenter(results[0].geometry.location);
            map.setZoom(10);
        } else {
            alert("Sorry, we could not find the address for the following reason: " + status);
        }
    });
}; /**/;
(function(){var charSize=8,b64pad="",hexCase=0,Int_64=function(a,b){this.highOrder=a;this.lowOrder=b},str2binb=function(a){var b=[],mask=(1<<charSize)-1,length=a.length*charSize,i;for(i=0;i<length;i+=charSize){b[i>>5]|=(a.charCodeAt(i/charSize)&mask)<<(32-charSize-(i%32))}return b},hex2binb=function(a){var b=[],length=a.length,i,num;for(i=0;i<length;i+=2){num=parseInt(a.substr(i,2),16);if(!isNaN(num)){b[i>>3]|=num<<(24-(4*(i%8)))}else{return"INVALID HEX STRING"}}return b},binb2hex=function(a){var b=(hexCase)?"0123456789ABCDEF":"0123456789abcdef",str="",length=a.length*4,i,srcByte;for(i=0;i<length;i+=1){srcByte=a[i>>2]>>((3-(i%4))*8);str+=b.charAt((srcByte>>4)&0xF)+b.charAt(srcByte&0xF)}return str},binb2b64=function(a){var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"+"0123456789+/",str="",length=a.length*4,i,j,triplet;for(i=0;i<length;i+=3){triplet=(((a[i>>2]>>8*(3-i%4))&0xFF)<<16)|(((a[i+1>>2]>>8*(3-(i+1)%4))&0xFF)<<8)|((a[i+2>>2]>>8*(3-(i+2)%4))&0xFF);for(j=0;j<4;j+=1){if(i*8+j*6<=a.length*32){str+=b.charAt((triplet>>6*(3-j))&0x3F)}else{str+=b64pad}}}return str},rotl_32=function(x,n){return(x<<n)|(x>>>(32-n))},rotr_32=function(x,n){return(x>>>n)|(x<<(32-n))},rotr_64=function(x,n){if(n<=32){return new Int_64((x.highOrder>>>n)|(x.lowOrder<<(32-n)),(x.lowOrder>>>n)|(x.highOrder<<(32-n)))}else{return new Int_64((x.lowOrder>>>n)|(x.highOrder<<(32-n)),(x.highOrder>>>n)|(x.lowOrder<<(32-n)))}},shr_32=function(x,n){return x>>>n},shr_64=function(x,n){if(n<=32){return new Int_64(x.highOrder>>>n,x.lowOrder>>>n|(x.highOrder<<(32-n)))}else{return new Int_64(0,x.highOrder<<(32-n))}},parity_32=function(x,y,z){return x^y^z},ch_32=function(x,y,z){return(x&y)^(~x&z)},ch_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(~x.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(~x.lowOrder&z.lowOrder))},maj_32=function(x,y,z){return(x&y)^(x&z)^(y&z)},maj_64=function(x,y,z){return new Int_64((x.highOrder&y.highOrder)^(x.highOrder&z.highOrder)^(y.highOrder&z.highOrder),(x.lowOrder&y.lowOrder)^(x.lowOrder&z.lowOrder)^(y.lowOrder&z.lowOrder))},sigma0_32=function(x){return rotr_32(x,2)^rotr_32(x,13)^rotr_32(x,22)},sigma0_64=function(x){var a=rotr_64(x,28),rotr34=rotr_64(x,34),rotr39=rotr_64(x,39);return new Int_64(a.highOrder^rotr34.highOrder^rotr39.highOrder,a.lowOrder^rotr34.lowOrder^rotr39.lowOrder)},sigma1_32=function(x){return rotr_32(x,6)^rotr_32(x,11)^rotr_32(x,25)},sigma1_64=function(x){var a=rotr_64(x,14),rotr18=rotr_64(x,18),rotr41=rotr_64(x,41);return new Int_64(a.highOrder^rotr18.highOrder^rotr41.highOrder,a.lowOrder^rotr18.lowOrder^rotr41.lowOrder)},gamma0_32=function(x){return rotr_32(x,7)^rotr_32(x,18)^shr_32(x,3)},gamma0_64=function(x){var a=rotr_64(x,1),rotr8=rotr_64(x,8),shr7=shr_64(x,7);return new Int_64(a.highOrder^rotr8.highOrder^shr7.highOrder,a.lowOrder^rotr8.lowOrder^shr7.lowOrder)},gamma1_32=function(x){return rotr_32(x,17)^rotr_32(x,19)^shr_32(x,10)},gamma1_64=function(x){var a=rotr_64(x,19),rotr61=rotr_64(x,61),shr6=shr_64(x,6);return new Int_64(a.highOrder^rotr61.highOrder^shr6.highOrder,a.lowOrder^rotr61.lowOrder^shr6.lowOrder)},safeAdd_32_2=function(x,y){var a=(x&0xFFFF)+(y&0xFFFF),msw=(x>>>16)+(y>>>16)+(a>>>16);return((msw&0xFFFF)<<16)|(a&0xFFFF)},safeAdd_32_4=function(a,b,c,d){var e=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16);return((msw&0xFFFF)<<16)|(e&0xFFFF)},safeAdd_32_5=function(a,b,c,d,e){var f=(a&0xFFFF)+(b&0xFFFF)+(c&0xFFFF)+(d&0xFFFF)+(e&0xFFFF),msw=(a>>>16)+(b>>>16)+(c>>>16)+(d>>>16)+(e>>>16)+(f>>>16);return((msw&0xFFFF)<<16)|(f&0xFFFF)},safeAdd_64_2=function(x,y){var a,msw,lowOrder,highOrder;a=(x.lowOrder&0xFFFF)+(y.lowOrder&0xFFFF);msw=(x.lowOrder>>>16)+(y.lowOrder>>>16)+(a>>>16);lowOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);a=(x.highOrder&0xFFFF)+(y.highOrder&0xFFFF)+(msw>>>16);msw=(x.highOrder>>>16)+(y.highOrder>>>16)+(a>>>16);highOrder=((msw&0xFFFF)<<16)|(a&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_4=function(a,b,c,d){var e,msw,lowOrder,highOrder;e=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e>>>16);lowOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);e=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e>>>16);highOrder=((msw&0xFFFF)<<16)|(e&0xFFFF);return new Int_64(highOrder,lowOrder)},safeAdd_64_5=function(a,b,c,d,e){var f,msw,lowOrder,highOrder;f=(a.lowOrder&0xFFFF)+(b.lowOrder&0xFFFF)+(c.lowOrder&0xFFFF)+(d.lowOrder&0xFFFF)+(e.lowOrder&0xFFFF);msw=(a.lowOrder>>>16)+(b.lowOrder>>>16)+(c.lowOrder>>>16)+(d.lowOrder>>>16)+(e.lowOrder>>>16)+(f>>>16);lowOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);f=(a.highOrder&0xFFFF)+(b.highOrder&0xFFFF)+(c.highOrder&0xFFFF)+(d.highOrder&0xFFFF)+(e.highOrder&0xFFFF)+(msw>>>16);msw=(a.highOrder>>>16)+(b.highOrder>>>16)+(c.highOrder>>>16)+(d.highOrder>>>16)+(e.highOrder>>>16)+(f>>>16);highOrder=((msw&0xFFFF)<<16)|(f&0xFFFF);return new Int_64(highOrder,lowOrder)},coreSHA1=function(f,g){var W=[],a,b,c,d,e,T,ch=ch_32,parity=parity_32,maj=maj_32,rotl=rotl_32,safeAdd_2=safeAdd_32_2,i,t,safeAdd_5=safeAdd_32_5,appendedMessageLength,H=[0x67452301,0xefcdab89,0x98badcfe,0x10325476,0xc3d2e1f0],K=[0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x5a827999,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x6ed9eba1,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0x8f1bbcdc,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6,0xca62c1d6];f[g>>5]|=0x80<<(24-(g%32));f[(((g+65)>>9)<<4)+15]=g;appendedMessageLength=f.length;for(i=0;i<appendedMessageLength;i+=16){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];for(t=0;t<80;t+=1){if(t<16){W[t]=f[t+i]}else{W[t]=rotl(W[t-3]^W[t-8]^W[t-14]^W[t-16],1)}if(t<20){T=safeAdd_5(rotl(a,5),ch(b,c,d),e,K[t],W[t])}else if(t<40){T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}else if(t<60){T=safeAdd_5(rotl(a,5),maj(b,c,d),e,K[t],W[t])}else{T=safeAdd_5(rotl(a,5),parity(b,c,d),e,K[t],W[t])}e=d;d=c;c=rotl(b,30);b=a;a=T}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4])}return H},coreSHA2=function(j,k,l){var a,b,c,d,e,f,g,h,T1,T2,H,numRounds,lengthPosition,i,t,binaryStringInc,binaryStringMult,safeAdd_2,safeAdd_4,safeAdd_5,gamma0,gamma1,sigma0,sigma1,ch,maj,Int,K,W=[],appendedMessageLength;if(l==="SHA-224"||l==="SHA-256"){numRounds=64;lengthPosition=(((k+65)>>9)<<4)+15;binaryStringInc=16;binaryStringMult=1;Int=Number;safeAdd_2=safeAdd_32_2;safeAdd_4=safeAdd_32_4;safeAdd_5=safeAdd_32_5;gamma0=gamma0_32;gamma1=gamma1_32;sigma0=sigma0_32;sigma1=sigma1_32;maj=maj_32;ch=ch_32;K=[0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0x0FC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x06CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2];if(l==="SHA-224"){H=[0xc1059ed8,0x367cd507,0x3070dd17,0xf70e5939,0xffc00b31,0x68581511,0x64f98fa7,0xbefa4fa4]}else{H=[0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19]}}else if(l==="SHA-384"||l==="SHA-512"){numRounds=80;lengthPosition=(((k+128)>>10)<<5)+31;binaryStringInc=32;binaryStringMult=2;Int=Int_64;safeAdd_2=safeAdd_64_2;safeAdd_4=safeAdd_64_4;safeAdd_5=safeAdd_64_5;gamma0=gamma0_64;gamma1=gamma1_64;sigma0=sigma0_64;sigma1=sigma1_64;maj=maj_64;ch=ch_64;K=[new Int(0x428a2f98,0xd728ae22),new Int(0x71374491,0x23ef65cd),new Int(0xb5c0fbcf,0xec4d3b2f),new Int(0xe9b5dba5,0x8189dbbc),new Int(0x3956c25b,0xf348b538),new Int(0x59f111f1,0xb605d019),new Int(0x923f82a4,0xaf194f9b),new Int(0xab1c5ed5,0xda6d8118),new Int(0xd807aa98,0xa3030242),new Int(0x12835b01,0x45706fbe),new Int(0x243185be,0x4ee4b28c),new Int(0x550c7dc3,0xd5ffb4e2),new Int(0x72be5d74,0xf27b896f),new Int(0x80deb1fe,0x3b1696b1),new Int(0x9bdc06a7,0x25c71235),new Int(0xc19bf174,0xcf692694),new Int(0xe49b69c1,0x9ef14ad2),new Int(0xefbe4786,0x384f25e3),new Int(0x0fc19dc6,0x8b8cd5b5),new Int(0x240ca1cc,0x77ac9c65),new Int(0x2de92c6f,0x592b0275),new Int(0x4a7484aa,0x6ea6e483),new Int(0x5cb0a9dc,0xbd41fbd4),new Int(0x76f988da,0x831153b5),new Int(0x983e5152,0xee66dfab),new Int(0xa831c66d,0x2db43210),new Int(0xb00327c8,0x98fb213f),new Int(0xbf597fc7,0xbeef0ee4),new Int(0xc6e00bf3,0x3da88fc2),new Int(0xd5a79147,0x930aa725),new Int(0x06ca6351,0xe003826f),new Int(0x14292967,0x0a0e6e70),new Int(0x27b70a85,0x46d22ffc),new Int(0x2e1b2138,0x5c26c926),new Int(0x4d2c6dfc,0x5ac42aed),new Int(0x53380d13,0x9d95b3df),new Int(0x650a7354,0x8baf63de),new Int(0x766a0abb,0x3c77b2a8),new Int(0x81c2c92e,0x47edaee6),new Int(0x92722c85,0x1482353b),new Int(0xa2bfe8a1,0x4cf10364),new Int(0xa81a664b,0xbc423001),new Int(0xc24b8b70,0xd0f89791),new Int(0xc76c51a3,0x0654be30),new Int(0xd192e819,0xd6ef5218),new Int(0xd6990624,0x5565a910),new Int(0xf40e3585,0x5771202a),new Int(0x106aa070,0x32bbd1b8),new Int(0x19a4c116,0xb8d2d0c8),new Int(0x1e376c08,0x5141ab53),new Int(0x2748774c,0xdf8eeb99),new Int(0x34b0bcb5,0xe19b48a8),new Int(0x391c0cb3,0xc5c95a63),new Int(0x4ed8aa4a,0xe3418acb),new Int(0x5b9cca4f,0x7763e373),new Int(0x682e6ff3,0xd6b2b8a3),new Int(0x748f82ee,0x5defb2fc),new Int(0x78a5636f,0x43172f60),new Int(0x84c87814,0xa1f0ab72),new Int(0x8cc70208,0x1a6439ec),new Int(0x90befffa,0x23631e28),new Int(0xa4506ceb,0xde82bde9),new Int(0xbef9a3f7,0xb2c67915),new Int(0xc67178f2,0xe372532b),new Int(0xca273ece,0xea26619c),new Int(0xd186b8c7,0x21c0c207),new Int(0xeada7dd6,0xcde0eb1e),new Int(0xf57d4f7f,0xee6ed178),new Int(0x06f067aa,0x72176fba),new Int(0x0a637dc5,0xa2c898a6),new Int(0x113f9804,0xbef90dae),new Int(0x1b710b35,0x131c471b),new Int(0x28db77f5,0x23047d84),new Int(0x32caab7b,0x40c72493),new Int(0x3c9ebe0a,0x15c9bebc),new Int(0x431d67c4,0x9c100d4c),new Int(0x4cc5d4be,0xcb3e42b6),new Int(0x597f299c,0xfc657e2a),new Int(0x5fcb6fab,0x3ad6faec),new Int(0x6c44198c,0x4a475817)];if(l==="SHA-384"){H=[new Int(0xcbbb9d5d,0xc1059ed8),new Int(0x0629a292a,0x367cd507),new Int(0x9159015a,0x3070dd17),new Int(0x0152fecd8,0xf70e5939),new Int(0x67332667,0xffc00b31),new Int(0x98eb44a87,0x68581511),new Int(0xdb0c2e0d,0x64f98fa7),new Int(0x047b5481d,0xbefa4fa4)]}else{H=[new Int(0x6a09e667,0xf3bcc908),new Int(0xbb67ae85,0x84caa73b),new Int(0x3c6ef372,0xfe94f82b),new Int(0xa54ff53a,0x5f1d36f1),new Int(0x510e527f,0xade682d1),new Int(0x9b05688c,0x2b3e6c1f),new Int(0x1f83d9ab,0xfb41bd6b),new Int(0x5be0cd19,0x137e2179)]}}j[k>>5]|=0x80<<(24-k%32);j[lengthPosition]=k;appendedMessageLength=j.length;for(i=0;i<appendedMessageLength;i+=binaryStringInc){a=H[0];b=H[1];c=H[2];d=H[3];e=H[4];f=H[5];g=H[6];h=H[7];for(t=0;t<numRounds;t+=1){if(t<16){W[t]=new Int(j[t*binaryStringMult+i],j[t*binaryStringMult+i+1])}else{W[t]=safeAdd_4(gamma1(W[t-2]),W[t-7],gamma0(W[t-15]),W[t-16])}T1=safeAdd_5(h,sigma1(e),ch(e,f,g),K[t],W[t]);T2=safeAdd_2(sigma0(a),maj(a,b,c));h=g;g=f;f=e;e=safeAdd_2(d,T1);d=c;c=b;b=a;a=safeAdd_2(T1,T2)}H[0]=safeAdd_2(a,H[0]);H[1]=safeAdd_2(b,H[1]);H[2]=safeAdd_2(c,H[2]);H[3]=safeAdd_2(d,H[3]);H[4]=safeAdd_2(e,H[4]);H[5]=safeAdd_2(f,H[5]);H[6]=safeAdd_2(g,H[6]);H[7]=safeAdd_2(h,H[7])}switch(l){case"SHA-224":return[H[0],H[1],H[2],H[3],H[4],H[5],H[6]];case"SHA-256":return H;case"SHA-384":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder];case"SHA-512":return[H[0].highOrder,H[0].lowOrder,H[1].highOrder,H[1].lowOrder,H[2].highOrder,H[2].lowOrder,H[3].highOrder,H[3].lowOrder,H[4].highOrder,H[4].lowOrder,H[5].highOrder,H[5].lowOrder,H[6].highOrder,H[6].lowOrder,H[7].highOrder,H[7].lowOrder];default:return[]}},jsSHA=function(a,b){this.sha1=null;this.sha224=null;this.sha256=null;this.sha384=null;this.sha512=null;this.strBinLen=null;this.strToHash=null;if("HEX"===b){if(0!==(a.length%2)){return"TEXT MUST BE IN BYTE INCREMENTS"}this.strBinLen=a.length*4;this.strToHash=hex2binb(a)}else if(("ASCII"===b)||('undefined'===typeof(b))){this.strBinLen=a.length*charSize;this.strToHash=str2binb(a)}else{return"UNKNOWN TEXT INPUT TYPE"}};jsSHA.prototype={getHash:function(a,b){var c=null,message=this.strToHash.slice();switch(b){case"HEX":c=binb2hex;break;case"B64":c=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(a){case"SHA-1":if(null===this.sha1){this.sha1=coreSHA1(message,this.strBinLen)}return c(this.sha1);case"SHA-224":if(null===this.sha224){this.sha224=coreSHA2(message,this.strBinLen,a)}return c(this.sha224);case"SHA-256":if(null===this.sha256){this.sha256=coreSHA2(message,this.strBinLen,a)}return c(this.sha256);case"SHA-384":if(null===this.sha384){this.sha384=coreSHA2(message,this.strBinLen,a)}return c(this.sha384);case"SHA-512":if(null===this.sha512){this.sha512=coreSHA2(message,this.strBinLen,a)}return c(this.sha512);default:return"HASH NOT RECOGNIZED"}},getHMAC:function(a,b,c,d){var e,keyToUse,blockByteSize,blockBitSize,i,retVal,lastArrayIndex,keyBinLen,hashBitSize,keyWithIPad=[],keyWithOPad=[];switch(d){case"HEX":e=binb2hex;break;case"B64":e=binb2b64;break;default:return"FORMAT NOT RECOGNIZED"}switch(c){case"SHA-1":blockByteSize=64;hashBitSize=160;break;case"SHA-224":blockByteSize=64;hashBitSize=224;break;case"SHA-256":blockByteSize=64;hashBitSize=256;break;case"SHA-384":blockByteSize=128;hashBitSize=384;break;case"SHA-512":blockByteSize=128;hashBitSize=512;break;default:return"HASH NOT RECOGNIZED"}if("HEX"===b){if(0!==(a.length%2)){return"KEY MUST BE IN BYTE INCREMENTS"}keyToUse=hex2binb(a);keyBinLen=a.length*4}else if("ASCII"===b){keyToUse=str2binb(a);keyBinLen=a.length*charSize}else{return"UNKNOWN KEY INPUT TYPE"}blockBitSize=blockByteSize*8;lastArrayIndex=(blockByteSize/4)-1;if(blockByteSize<(keyBinLen/8)){if("SHA-1"===c){keyToUse=coreSHA1(keyToUse,keyBinLen)}else{keyToUse=coreSHA2(keyToUse,keyBinLen,c)}keyToUse[lastArrayIndex]&=0xFFFFFF00}else if(blockByteSize>(keyBinLen/8)){keyToUse[lastArrayIndex]&=0xFFFFFF00}for(i=0;i<=lastArrayIndex;i+=1){keyWithIPad[i]=keyToUse[i]^0x36363636;keyWithOPad[i]=keyToUse[i]^0x5C5C5C5C}if("SHA-1"===c){retVal=coreSHA1(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen);retVal=coreSHA1(keyWithOPad.concat(retVal),blockBitSize+hashBitSize)}else{retVal=coreSHA2(keyWithIPad.concat(this.strToHash),blockBitSize+this.strBinLen,c);retVal=coreSHA2(keyWithOPad.concat(retVal),blockBitSize+hashBitSize,c)}return(e(retVal))}};window.jsSHA=jsSHA}());
var gaCampaign='';
var gaMedium='';

function testingCall()
{
	return "function called";
}

function getCookie(c_name)
{
	if (document.cookie.length > 0)
	{
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start != -1)
		{
			c_start=c_start + c_name.length + 1;
			c_end=document.cookie.indexOf(";", c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
var key = 'trial1rishLif3';

function getHash(inputStr) {
var hashObj = new jsSHA(inputStr, 'ASCII');
return hashObj.getHash('SHA-1', 'HEX');
}

function mkVisitWebPage(pagename)
{
 	if (isFunction()){
	mktoMunchkinFunction('visitWebPage', {url: pagename});
	}
}

/**
Record a callback
*/
function mkAssociateLead(firstName, lastName, emailAddress, phoneNumber, contacttime, areaofinterest)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:'Website Callback',
	FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true, 
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,
	PerferredTimeToContact:contacttime, CallbackAreaOfInterest: areaofinterest},hash);
}

function mkAssociateLeadNoCallback(emailAddress,source)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:source,
		LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	Callbackrequested: false},hash);
}

function isFunction()
{
	return typeof(mktoMunchkinFunction) == "function";
}


/**
Callback requested with a quote.

*/
function mkAssociateLeadWithQuote(firstName, lastName, emailAddress, phoneNumber, type, term, prem,
sumAssured,sex1,sex2,age1,age2,smoker1,smoker2, contacttime)
{
	/*

	type=M/T/W
	term=number of years or zero
	sex1/sex2=M/F	
	parseFloat(Math.round(num3 * 100) / 100).toFixed(2);
	*/	
	var hash = getHash(key+emailAddress);
	
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2, 
			QuoteLifeMortSex1:sex1,QuoteLifeMortSex2:sex2,PerferredTimeToContact:contacttime,
			CallbackAreaOfInterest: 'New Plan',
				LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1: smoker1, QuoteLifeTermSmoker2:smoker2,PerferredTimeToContact:contacttime,
			CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,			
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeTermSex1:sex1,QuoteLifeTermSex2:sex2,QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSourceDetail:'Website Quote and Callback',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2:smoker2,PerferredTimeToContact:contacttime,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteLifeWholeSex1:sex1,QuoteLifeWholeSex2:sex2,QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);	
	}
}

function mkAssociateLeadPensionQuote(lastName, firstName, emailAddress, phoneNumber,
QuotePensionAge,QuotePensionCurrentSalary,QuotePensionEmployersContribution,
QuotePensionGapPerAnnum,QuotePensionRetirementAge,QuotePensionSPTransfer,
QuotePensionTargetPensionPerAnnum,QuotePensionYourMonthlyContribution,contacttime)
{

var hash = getHash(key+emailAddress);

	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,
		MobilePhone: phoneNumber,
		LastName: lastName, 
		Callbackrequested: true,
		LeadSourceDetail:'Website Quote and Callback',
		quotePensionAge:QuotePensionAge,
		quotePensionCurrentSalary:QuotePensionCurrentSalary,
		quotePensionEmployersContribution:QuotePensionEmployersContribution,
		quotePensionGapPerAnnum:QuotePensionGapPerAnnum,
		quotePensionRetirementAge:QuotePensionRetirementAge,
		quotePensionSPTransfer:QuotePensionSPTransfer,
		quotePensionTargetPensionPerAnnum:QuotePensionTargetPensionPerAnnum,
		quotePensionYourMonthlyContribution:QuotePensionYourMonthlyContribution,
		PerferredTimeToContact:contacttime,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteType:'I'},hash);

}


function mkAssociateLeadIncomeProtection(lastName, firstName, emailAddress, phoneNumber, prem,
age,retAge,occupation,salary,coverAmt,deferredWeeks,inflation,smoker,selfEmployed,contacttime)
{

	var hash = getHash(key+emailAddress);

	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,
		MobilePhone: phoneNumber,
		LastName: lastName, 
		Callbackrequested: true,
		LeadSourceDetail:'Website Quote and Callback',
		quoteIncProtAge:age,
		quoteIncProtRetAge:retAge,
		quoteIncProtOcc:occupation,
		quoteIncProtSalary:salary,
		quoteIncProtCover:coverAmt,
		quoteIncProtSmoker:smoker,
		quoteIncProtDefPeriod:deferredWeeks,
		quoteIncProtInflation:inflation,
		quoteIncProtPrem:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		PerferredTimeToContact:contacttime,
		quoteIncProtSelfEmployed:selfEmployed,
		CallbackAreaOfInterest: 'New Plan',
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteType:'I'},hash);
	
}

/**
Record signup for help on financial products
* 'General Sign up'
* 'Make a will'
* 'Pension guide'
* 'Life insurance guide'
*/
function mkAssociateLeadEarlyStage(emailAddress, guide)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,'Permissions-Email':true,
		LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	LeadSourceDetail: guide},hash);
	mkVisitWebPage('/download-a-guide-submitted');
	ga('send','pageview','/customer-service/download-a-guide-submitted');
}


/**
Record quote - send email to email address
*/
function mkAssociateLeadPerformQuote(firstName, lastName, emailAddress, phoneNumber, 
type, term, prem,sumAssured,sex1,sex2,age1,age2,smoker1,smoker2,emailPermission)
{	
	var hash = getHash(key+emailAddress);
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeMortSex1:sex1,QuoteLifeMortSex2:sex2,QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1:smoker1,QuoteLifeTermSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			QuoteLifeTermSex1:sex1,QuoteLifeTermSex2:sex2,QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'Quote',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2: smoker2, 'Permissions-Email':emailPermission,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,		
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		QuoteLifeWholeSex1:sex1,QuoteLifeWholeSex2:sex2,QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);
	}
		mkVisitWebPage('/life-assurance-quote-email-to-self');

		ga('send','pageview','/life-assurance/quote-emailed');
		
	
	
}

/**Record a callback*/
function mkAssociateLeadFreeCover(firstName, lastName, emailAddress, channelId, sellerId)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: false,LeadSourceDetail:'FreeCoverTaken',
		'Permissions-Email':true,'Permissions-DirectMail':true,'Permissions-Landline':true,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,		
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		'Permissions-SMS_MMS':true,
	freeParentCoverPlanTaken:true,
		LastSalesReferrer: sellerId},hash);	
}

/**
Associate a broker lead
*/
function mkAssociateBroker(emailAddress, source)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,LeadSourceDetail:source,
	Callbackrequested: false,IsBroker:true  },hash);
}

function mkAssociateLeadKBC(emailAddress,firstName,lastName,phoneNumber,permissionEmail,areaOfInterest,followUpRating,timeToContact,kbcLeadSource,kbcExistingCustomer,kbcStaffId,kbcStaffName)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: true,LeadSource:'KBCReferral',
		'permissionsFollowupEmailKBC':permissionEmail,MobilePhone: phoneNumber,KBCAreaOfInterest: areaOfInterest,PerferredTimeToContact:timeToContact,
		KBCLeadSource: kbcLeadSource,
		LastDirectSalesAgentRating: followUpRating,
		KBCExistingCustomer:kbcExistingCustomer, KBCStaffID: kbcStaffId, KBCStaffName: kbcStaffName},hash);	
}

function mkAssociateLeadAIB(emailAddress,firstName,lastName,phoneNumber,permissionEmail,areaOfInterest,followUpRating,timeToContact,leadSource,existingCustomer,staffId,staffName)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,LastName: lastName, Callbackrequested: true,
		LeadSource:'Employee Referral',
		PermissionsFollowupEmail:permissionEmail,
		MobilePhone: phoneNumber,
		CallbackAreaOfInterest: areaOfInterest,
		PerferredTimeToContact:timeToContact,
		LeadSourceDetail:'AIB Internal Referral',
		LastDirectSalesAgentRating: followUpRating
		//KBCExistingCustomer:kbcExistingCustomer, KBCStaffID: kbcStaffId, KBCStaffName: kbcStaffName
		},hash);	
}
//##################################
// 123.ie marketo calls

function mkAssociateLead123(firstName, lastName, emailAddress, phoneNumber, contacttime, areaofinterest)
{
	var hash = getHash(key+emailAddress);
	if (isFunction())mktoMunchkinFunction('associateLead',{
	Email: emailAddress,
	LeadSource:'123',
	FirstName: firstName,
	MobilePhone: phoneNumber,
	LastName: lastName,
	Callbackrequested: true, 
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,	
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
	PerferredTimeToContact:contacttime,
	CallbackAreaOfInterest: areaofinterest},hash);
}

// with quote
function mkAssociateLeadPerformQuote123(firstName, lastName, emailAddress, phoneNumber, type, term, prem,
sumAssured,age1,age2,smoker1,smoker2, contacttime,areaofinterest)
{

	var hash = getHash(key+emailAddress);
	
	if (type == 'M')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
			QuoteLifeMortAge1: age1,QuoteLifeMortAge2:age2,QuoteLifeMortPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeMortSmoker1:smoker1,QuoteLifeMortSmoker2: smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			CallbackAreaOfInterest: areaofinterest,
			QuoteLifeMortSumAssured:sumAssured,QuoteLifeMortTerm:term,QuoteType:type},hash);
	}
	else if (type=='T')
	{
			if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
			FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
			QuoteLifeTermAge1: age1,QuoteLifeTermAge2:age2,QuoteLifeTermPremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
			QuoteLifeTermSmoker1: smoker1, QuoteLifeTermSmoker2:smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
			CallbackAreaOfInterest: areaofinterest,
			QuoteLifeTermSumAssured:sumAssured,QuoteLifeTermTerm:term,QuoteType:type},hash);	
	}
	else if (type == 'W')
	{
		if (isFunction())mktoMunchkinFunction('associateLead',{Email: emailAddress,
		FirstName: firstName,MobilePhone: phoneNumber,LastName: lastName, Callbackrequested: true,LeadSource:'123',
		QuoteLifeWholeAge1: age1,QuoteLifeWholeAge2:age2,QuoteLifeWholePremium:parseFloat(Math.round(prem * 100) / 100).toFixed(2),
		QuoteLifeWholeSmoker1:smoker1,QuoteLifeWholeSmoker2:smoker2,PerferredTimeToContact:contacttime,
	LastGACampaignNameVisit:gaCampaign,
	OriginalGACampaignVisit:gaCampaign,
	LastGAMedium: gaMedium,
	OriginalGAMedium: gaMedium,	
		CallbackAreaOfInterest: areaofinterest,
		QuoteLifeWholeSumAssured:sumAssured,QuoteLifeWholeTerm:term,QuoteType:type},hash);	
	}

}


function getCampaign()
{
	var retValue = '';
	var cookieValue = String(getCookie('__utmz'));
    var n = cookieValue.indexOf('utmccn=');
	var m = cookieValue.indexOf('utmcmd=');

    if (n > -1)
    {
        val2=cookieValue.substr(n);
        val3=val2.split('|');
        for (var i=0; i < val3.length;i++)
        {
            val4=val3[i].split('=');
            if (val4[0] == 'utmccn')
            {
                retValue=val4[1];
				if (retValue != null && retValue.length >1)
				{
					retValue=retValue.replace('(','');
					retValue=retValue.replace(')','');
				}
            }
        }   
	}
	gaCampaign=retValue;
	
	if (m > -1)
    {
        val2=cookieValue.substr(m);
        val3=val2.split('|');
        for (var i=0; i < val3.length;i++)
        {
            val4=val3[i].split('=');
            if (val4[0] == 'utmcmd')
            {
                retValue=val4[1];
				if (retValue != null && retValue.length >1)
				{
					retValue=retValue.replace('(','');
					retValue=retValue.replace(')','');
				}
            }
        }
   
	}
	gaMedium=retValue;
}
function log(message){ 
	try {
		console.log(consoleCounter++ + "\t" + message);
		return this;
	} catch(e) {
		try {
		if(document.getElementById("consoleDiv") != null)
			document.getElementById("consoleDiv").innerHTML += (consoleCounter++ + "      " + message + "<br />");
		} catch(e){}
	}
}


(function($){

	$(document).ready(function () {
/*		Munchkin.init('450-GHO-121');	*/
		getCampaign();	
		timestampPdfs();
	});

	function timestampPdfs()
	{
 	var ts=new Date().getTime();
	$('a[href$=".pdf"]').each(function(i) 
	{
		var link = $(this).attr('href');
		if (link.indexOf('/') > -1)
		{
			link = link.substr(link.lastIndexOf('/')+1);
		}
		
		$(this).attr('href',
		$(this).attr('href') + '?ts='+ts);
		$(this).removeAttr('onclick');
		$(this).attr('onclick'," ga('send','event', 'PDF download', '"+link + "');return true");
		$(this).attr('target','_blank');
		});
	}

})(jQuery);

;
/*
 * SimpleModal 1.4.3 - jQuery Plugin
 * http://simplemodal.com/
 * Copyright (c) 2012 Eric Martin
 * Licensed under MIT and GPL
 * Date: Sat, Sep 8 2012 07:52:31 -0700
 */
(function($){


	$(document).ready(function($) {

		$(document).on('click', '.anyCallbackButton', function(event) {
			event.preventDefault();
			$('#callback-modal-content').modal();
		});

		 function setGAPageView (p,t) {
			try{
				//tag manager
				dataLayer.push({
				'event':'pageview',
				'pageTitle':t,
				'virtualURL':p
				});
			}
			catch(err){
			//Do nothing
			}
			//return "user set";
		}


		// validate email address format
		function isEmail(email) {
		  var regex = /^$|^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(?:[a-zA-Z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/;
		  return regex.test(email);
		}

		function beClickTalkPop(){
			$("#progressBoxPopupContents").hide();
			$("#loadingboxpopup").show();
		}

		function seClickTalkPop(){
			$("#loadingboxpopup").hide();
			$("#progressBoxPopupContents").hide();

			$("#loadingcompletepopup").show();
			setTimeout( function(){
				$.modal.close();
			}, 4000);
		}

		function eeClickTalkPop(){
			alert("error ");
		}

		// Submitting a RHS callback
		$('#sendAdvisorCallbackPopupForm').click(function(){
			var n,e,p,t,z,a,ae;
			z = 0;
			n = $("#callbackPopupName").val()
			e = $('#callbackPopupEmail').val();
			p = $("#callbackPopupPhone").val()
			ae = $('#callbackAreaInterest').val();
			t = $('#callbackPopupCalltime').val();
			
			if(p.length<6){
				z =z+1;
				alert("Please enter a valid PHONE NUMBER.");
			}

			if(isEmail(e) == false){
				e ="N/A";
			}
			if (z==0)
			{
				// no errors
				// send the callback anc change the screen
				mkAssociateLead('', n, e, p, t, ae);
				seClickTalkPop();
				setGAPageView('/financial-advice/callback-requested','Callback Requested callback RHS');
			}
		});
	});
	
	$(window ).load(function() {
		jQuery('#callbackTab').animate({left: 0},2000);
	});

})(jQuery);
