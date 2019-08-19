/*
eventPause.js v 1.0.1
Author: sudhanshu yadav
s-yadav.github.com
Copyright (c) 2013 - 2015 Sudhanshu Yadav.
Dual licensed under the MIT and GPL licenses
*/
!function(e){function t(t){if(e._iwEventPause)for(var i=e._iwEventPause.assigned,n=0;n<i.length;n++)return c[t].call(e(i[n]))}function i(){e._iwEventPause||(e._iwEventPause={},e._iwEventPause.assigned=[])}function n(e){var t=[];if(e||(e=""),"string"==typeof e&&""!=e){e=e.split(" ");for(var i=0;i<e.length;i++)"hover"==e[i]?(t.push("hover"),t.push("mouseover"),t.push("mouseout")):t.push("mouseenter"==e[i]?"mouseover":"mouseleave"==e[i]?"mouseout":e[i]);e=t}return e}function a(e,t){for(var i=0;i<e.length;i++)if(e[i]==t)return i;return-1}function s(t,i){var n=e._data(t,"events");n&&e.each(n,function(t,n){(-1!=a(i,t)||""==i)&&e.each(n,function(t,i){i.handler.toString()!=r.toString()&&(e._iwEventPause["iw-event"+i.guid]=i.handler,i.handler=r)})})}function u(t,i){var n=e._data(t,"events");n&&e.each(n,function(t,n){(-1!=a(i,t)||""==i)&&e.each(n,function(t,i){i.handler.toString()==r.toString()&&(i.handler=e._iwEventPause["iw-event"+i.guid])})})}e.fn.eventPause=function(e,t){return i(),c[e]||null!=t||(t=e),t=n(t),c[e]?c[e].call(this,t):c.pause.call(this,t)};var c={pause:function(t){return this.each(function(){e(this).data("iw-disable")||(e(this).data("iw-eventactive",!1),e._iwEventPause.assigned.push(this),s(this,t))})},active:function(t){return this.each(function(){e(this).data("iw-disable")||(e(this).data("iw-eventactive",!0),e._iwEventPause.assigned.splice(this),u(this,t))})},pauseChild:function(e){return c.pause.call(this.add(this.find("*")),e)},activeChild:function(e){return c.active.call(this.add(this.find("*")),e)},enable:function(){this.data("iw-disable",!1)},disable:function(){this.data("iw-disable",!0)},toggle:function(e){var t=this.data("iw-eventactive");return t?c.active.call(this,e):c.pause.call(this,e)},state:function(){var e=this.data("iw-disable")?"disabled":"enabled",t=0==this.data("iw-eventactive")?"paused":"active";return t+"-"+e}};e.eventPause={activeAll:function(){t("active")},enableAll:function(){t("enable")},disableAll:function(){t("disable")}};var r=function(){}}(jQuery,window,document);


/* global window, document, define, jQuery, setInterval, clearInterval */
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    var DEFAULT_SETTINGS = {
        // Search settings
        method: "GET",
        queryParam: "q",
        searchDelay: 300,
        minChars: 1,
        caching: true,
        propertyToSearch: "name",
        jsonContainer: null,
        contentType: "json",
        excludeCurrent: false,
        excludeCurrentParameter: "x",

        // Prepopulation settings
        prePopulate: null,
        processPrePopulate: false,

        // Display settings
        hintText: "Type in a search term",
        noResultsText: "No results",
        searchingText: "Searching...",
        deleteText: "&#215;",
        animateDropdown: true,
        placeholder: null,
        theme: null,
        zindex: 999,
        resultsLimit: null,
        appendToParent: false,

        enableHTML: false,

        resultsFormatter: function(item) {
            var string = item[this.propertyToSearch];
            return "<li>" + (this.enableHTML ? string : _escapeHTML(string)) + "</li>";
        },

        tokenFormatter: function(item) {
            var string = item[this.propertyToSearch];
            return "<li><p>" + (this.enableHTML ? string : _escapeHTML(string)) + "</p></li>";
        },

        // Tokenization settings
        tokenLimit: null,
        tokenDelimiter: ",",
        preventDuplicates: false,
        tokenValue: "id",

        // Behavioral settings
        allowFreeTagging: false,
        allowTabOut: false,
        autoSelectFirstResult: false,

        // Callbacks
        onResult: null,
        onCachedResult: null,
        onAdd: null,
        onFreeTaggingAdd: null,
        onDelete: null,
        onReady: null,
        onDropdownChange: null,
        onTokenSelected: null,

        // Other settings
        idPrefix: "token-input-",

        // Keep track if the input is currently in disabled mode
        disabled: false
    };

    // Default classes to use when theming
    var DEFAULT_CLASSES = {
        tokenList            : "token-input-list",
        token                : "token-input-token",
        tokenReadOnly        : "token-input-token-readonly",
        tokenDelete          : "token-input-delete-token",
        selectedToken        : "token-input-selected-token",
        highlightedToken     : "token-input-highlighted-token",
        dropdown             : "token-input-dropdown",
        dropdownItem         : "token-input-dropdown-item",
        dropdownItem2        : "token-input-dropdown-item2",
        selectedDropdownItem : "token-input-selected-dropdown-item",
        inputToken           : "token-input-input-token",
        focused              : "token-input-focused",
        disabled             : "token-input-disabled"
    };

    // Input box position "enum"
    var POSITION = {
        BEFORE : 0,
        AFTER  : 1,
        END    : 2
    };

    // Keys "enum"
    var KEY = {
        BACKSPACE    : 8,
        TAB          : 9,
        ENTER        : 13,
        ESCAPE       : 27,
        SPACE        : 32,
        PAGE_UP      : 33,
        PAGE_DOWN    : 34,
        END          : 35,
        HOME         : 36,
        LEFT         : 37,
        UP           : 38,
        RIGHT        : 39,
        DOWN         : 40,
        NUMPAD_ENTER : 108,
        COMMA        : 188
    };

    var HTML_ESCAPES = {
        '&' : '&amp;',
        '<' : '&lt;',
        '>' : '&gt;',
        '"' : '&quot;',
        "'" : '&#x27;',
        '/' : '&#x2F;'
    };

    var HTML_ESCAPE_CHARS = /[&<>"'\/]/g;

    function coerceToString(val) {
        return String((val === null || val === undefined) ? '' : val);
    }

    function _escapeHTML(text) {
        return coerceToString(text).replace(HTML_ESCAPE_CHARS, function(match) {
            return HTML_ESCAPES[match];
        });
    }

    // Additional public (exposed) methods
    var methods = {
        init: function(url_or_data_or_function, options) {
            var settings = $.extend({}, DEFAULT_SETTINGS, options || {});

            return this.each(function () {
                $(this).data("settings", settings);
                $(this).data("tokenInputObject", new $.TokenList(this, url_or_data_or_function, settings));
            });
        },
        clear: function() {
            this.data("tokenInputObject").clear();
            return this;
        },
        add: function(item) {
            this.data("tokenInputObject").add(item);
            return this;
        },
        remove: function(item) {
            this.data("tokenInputObject").remove(item);
            return this;
        },
        get: function() {
            return this.data("tokenInputObject").getTokens();
        },
        toggleDisabled: function(disable) {
            this.data("tokenInputObject").toggleDisabled(disable);
            return this;
        },
        setOptions: function(options){
            $(this).data("settings", $.extend({}, $(this).data("settings"), options || {}));
            return this;
        },
        destroy: function () {
            if (this.data("tokenInputObject")) {
                this.data("tokenInputObject").clear();
                this.data("tokenInputObject").destroy();
                var tmpInput = this;
                // var closest = this.parent();
                // closest.empty();
                // tmpInput.show();
                // closest.append(tmpInput);
                return tmpInput;
            }
        }
    };

    // Expose the .tokenInput function to jQuery as a plugin
    $.fn.tokenInput = function (method) {
        // Method calling and initialization logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else {
            return methods.init.apply(this, arguments);
        }
    };

    // TokenList class for each input
    $.TokenList = function (input, url_or_data, settings) {
        //
        // Initialization
        //

        // Configure the data source
        if (typeof(url_or_data) === "string" || typeof(url_or_data) === "function") {
            // Set the url to query against
            $(input).data("settings").url = url_or_data;

            // If the URL is a function, evaluate it here to do our initalization work
            var url = computeURL();

            // Make a smart guess about cross-domain if it wasn't explicitly specified
            if ($(input).data("settings").crossDomain === undefined && typeof url === "string") {
                if(url.indexOf("://") === -1) {
                    $(input).data("settings").crossDomain = false;
                } else {
                    $(input).data("settings").crossDomain = (location.href.split(/\/+/g)[1] !== url.split(/\/+/g)[1]);
                }
            }
        } else if (typeof(url_or_data) === "object") {
            // Set the local data to search through
            $(input).data("settings").local_data = url_or_data;
        }

        // Build class names
        if($(input).data("settings").classes) {
            // Use custom class names
            $(input).data("settings").classes = $.extend({}, DEFAULT_CLASSES, $(input).data("settings").classes);
        } else if($(input).data("settings").theme) {
            // Use theme-suffixed default class names
            $(input).data("settings").classes = {};
            $.each(DEFAULT_CLASSES, function(key, value) {
                $(input).data("settings").classes[key] = value + "-" + $(input).data("settings").theme;
            });
        } else {
            $(input).data("settings").classes = DEFAULT_CLASSES;
        }

        // Save the tokens
        var saved_tokens = [];

        // Keep track of the number of tokens in the list
        var token_count = 0;

        // Basic cache to save on db hits
        var cache = new $.TokenList.Cache();

        // Keep track of the timeout, old vals
        var timeout;
        var input_val;

        // Create a new text input an attach keyup events
        var input_box = $("<input type=\"text\" autocomplete=\"off\" autocapitalize=\"off\"/>")
            .css({
                outline: "none"
            })
            .attr("id", $(input).data("settings").idPrefix + input.id)
            .focus(function () {
                if ($(input).data("settings").disabled) {
                    return false;
                } else
                if ($(input).data("settings").tokenLimit === null || $(input).data("settings").tokenLimit !== token_count) {
                    if ($(input).data("settings").minChars == 0) {
                        do_search();
                    } else {
                        show_dropdown_hint();
                    }
                }
                token_list.addClass($(input).data("settings").classes.focused);
            })
            .blur(function () {
                hide_dropdown();

                if ($(input).data("settings").allowFreeTagging) {
                    add_freetagging_tokens();
                }

                $(this).val("");
                token_list.removeClass($(input).data("settings").classes.focused);
            })
            .bind("keyup keydown blur update", resize_input)
            .keydown(function (event) {
                var previous_token;
                var next_token;

                switch(event.keyCode) {
                    case KEY.LEFT:
                    case KEY.RIGHT:
                    case KEY.UP:
                    case KEY.DOWN:
                        if(this.value.length === 0 && event.keyCode !== KEY.DOWN && event.keyCode !== KEY.UP) {
                            previous_token = input_token.prev();
                            next_token = input_token.next();

                            if((previous_token.length && previous_token.get(0) === selected_token) ||
                                (next_token.length && next_token.get(0) === selected_token)) {
                                // Check if there is a previous/next token and it is selected
                                if(event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) {
                                    deselect_token($(selected_token), POSITION.BEFORE);
                                } else {
                                    deselect_token($(selected_token), POSITION.AFTER);
                                }
                            } else if((event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) && previous_token.length) {
                                // We are moving left, select the previous token if it exists
                                select_token($(previous_token.get(0)));
                            } else if((event.keyCode === KEY.RIGHT || event.keyCode === KEY.DOWN) && next_token.length) {
                                // We are moving right, select the next token if it exists
                                select_token($(next_token.get(0)));
                            }
                        } else {
                            var dropdown_item = null;

                            if (event.keyCode === KEY.DOWN || event.keyCode === KEY.RIGHT) {
                                dropdown_item = $(dropdown).find('li').first();

                                if (selected_dropdown_item) {
                                    dropdown_item = $(selected_dropdown_item).next();
                                }
                            } else {
                                dropdown_item = $(dropdown).find('li').last();

                                if (selected_dropdown_item) {
                                    dropdown_item = $(selected_dropdown_item).prev();
                                }
                            }

                            select_dropdown_item(dropdown_item);
                        }

                        break;

                    case KEY.BACKSPACE:
                        previous_token = input_token.prev();

                        if (this.value.length === 0) {
                            if (selected_token) {
                                delete_token($(selected_token));
                                hiddenInput.change();
                            } else if(previous_token.length) {
                                select_token($(previous_token.get(0)));
                            }

                            return false;
                        } else if($(this).val().length === 1) {
                            hide_dropdown();
                        } else {
                            // set a timeout just long enough to let this function finish.
                            setTimeout(function(){ do_search(); }, 5);
                        }
                        break;

                    case KEY.TAB:
                    case KEY.ENTER:
                    case KEY.NUMPAD_ENTER:
                    case KEY.COMMA:
                        if(selected_dropdown_item) {
                            add_token($(selected_dropdown_item).data("tokeninput"));
                            hiddenInput.change();
                        } else {
                            if ($(input).data("settings").allowFreeTagging) {
                                if($(input).data("settings").allowTabOut && $(this).val() === "") {
                                    return true;
                                } else {
                                    add_freetagging_tokens();
                                }
                            } else {
                                $(this).val("");
                                if($(input).data("settings").allowTabOut) {
                                    return true;
                                }
                            }
                            focusWithTimeout(input_box);
                            event.stopPropagation();
                            event.preventDefault();

                        }
                        return false;

                    case KEY.ESCAPE:
                        hide_dropdown();
                        return true;

                    default:
                        if (String.fromCharCode(event.which)) {
                            // set a timeout just long enough to let this function finish.
                            setTimeout(function(){ do_search(); }, 5);
                        }
                        break;
                }
            });

        // Keep reference for placeholder
        if (settings.placeholder) {
            input_box.attr("placeholder", settings.placeholder);
        }

        // Keep a reference to the original input box
        var hiddenInput = $(input)
            .hide()
            .val("")
            .focus(function () {
                focusWithTimeout(input_box);
            })
            .blur(function () {
                input_box.blur();

                //return the object to this can be referenced in the callback functions.
                return hiddenInput;
            })
            ;

        // Keep a reference to the selected token and dropdown item
        var selected_token = null;
        var selected_token_index = 0;
        var selected_dropdown_item = null;

        // The list to store the token items in
        var token_list = $("<ul />")
            .addClass($(input).data("settings").classes.tokenList)
            .click(function (event) {
                var li = $(event.target).closest("li");
                if(li && li.get(0) && $.data(li.get(0), "tokeninput")) {
                    toggle_select_token(li);
                } else {
                    // Deselect selected token
                    if(selected_token) {
                        deselect_token($(selected_token), POSITION.END);
                    }

                    // Focus input box
                    focusWithTimeout(input_box);
                }
            })
            .mouseover(function (event) {
                var li = $(event.target).closest("li");
                if(li && selected_token !== this) {
                    li.addClass($(input).data("settings").classes.highlightedToken);
                }
            })
            .mouseout(function (event) {
                var li = $(event.target).closest("li");
                if(li && selected_token !== this) {
                    li.removeClass($(input).data("settings").classes.highlightedToken);
                }
            })
            .insertBefore(hiddenInput);

        // The token holding the input box
        var input_token = $("<li />")
            .addClass($(input).data("settings").classes.inputToken)
            .appendTo(token_list)
            .append(input_box);

        // The list to store the dropdown items in
        var dropdown = $("<div/>")
            .addClass($(input).data("settings").classes.dropdown)
            .appendTo($(input).data("settings").appendToParent ? $(input).parent() : "body")
            .hide();

        // Magic element to help us resize the text input
        var input_resizer = $("<tester/>")
            .insertAfter(input_box)
            .css({
                position: "absolute",
                top: -9999,
                left: -9999,
                width: "auto",
                fontSize: input_box.css("fontSize"),
                fontFamily: input_box.css("fontFamily"),
                fontWeight: input_box.css("fontWeight"),
                letterSpacing: input_box.css("letterSpacing"),
                whiteSpace: "nowrap"
            });

        // Pre-populate list if items exist
        hiddenInput.val("");
        var li_data = $(input).data("settings").prePopulate || hiddenInput.data("pre");

        if ($(input).data("settings").processPrePopulate && $.isFunction($(input).data("settings").onResult)) {
            li_data = $(input).data("settings").onResult.call(hiddenInput, li_data);
        }

        if (li_data && li_data.length) {
            $.each(li_data, function (index, value) {
                insert_token(value);
                checkTokenLimit();
                input_box.attr("placeholder", null)
            });
        }

        // Check if widget should initialize as disabled
        if ($(input).data("settings").disabled) {
            toggleDisabled(true);
        }

        // Initialization is done
        if (typeof($(input).data("settings").onReady) === "function") {
            $(input).data("settings").onReady.call();
        }

        //
        // Public functions
        //

        this.clear = function() {
            token_list.children("li").each(function() {
                if ($(this).children("input").length === 0) {
                    delete_token($(this));
                }
            });
        };

        this.add = function(item) {
            add_token(item);
        };

        this.remove = function(item) {
            token_list.children("li").each(function() {
                if ($(this).children("input").length === 0) {
                    var currToken = $(this).data("tokeninput");
                    var match = true;
                    for (var prop in item) {
                        if (item[prop] !== currToken[prop]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) {
                        delete_token($(this));
                    }
                }
            });
        };

        this.getTokens = function() {
            return saved_tokens;
        };

        this.toggleDisabled = function(disable) {
            toggleDisabled(disable);
        };

        this.destroy = function () {
            input_box.remove();
            token_list.remove();
            dropdown.remove();
            input_resizer.remove();
            hiddenInput.unbind('focus').unbind('blur').show();

        };

        // Resize input to maximum width so the placeholder can be seen
        resize_input();

        //
        // Private functions
        //

        function escapeHTML(text) {
            return $(input).data("settings").enableHTML ? text : _escapeHTML(text);
        }

        // Toggles the widget between enabled and disabled state, or according
        // to the [disable] parameter.
        function toggleDisabled(disable) {
            if (typeof disable === 'boolean') {
                $(input).data("settings").disabled = disable
            } else {
                $(input).data("settings").disabled = !$(input).data("settings").disabled;
            }
            input_box.attr('disabled', $(input).data("settings").disabled);
            token_list.toggleClass($(input).data("settings").classes.disabled, $(input).data("settings").disabled);
            // if there is any token selected we deselect it
            if(selected_token) {
                deselect_token($(selected_token), POSITION.END);
            }
            hiddenInput.attr('disabled', $(input).data("settings").disabled);
        }

        function checkTokenLimit() {
            if($(input).data("settings").tokenLimit !== null && token_count >= $(input).data("settings").tokenLimit) {
                input_box.hide();
                hide_dropdown();
                return;
            }
        }

        function resize_input() {
            if(input_val === (input_val = input_box.val())) {return;}

            // Get width left on the current line
            var width_left = token_list.width() - input_box.offset().left - token_list.offset().left;
            // Enter new content into resizer and resize input accordingly
            input_resizer.html(_escapeHTML(input_val) || _escapeHTML(settings.placeholder));
            // Get maximum width, minimum the size of input and maximum the widget's width
            input_box.width(Math.min(token_list.width(),
                Math.max(width_left, input_resizer.width() + 30)));
        }

        function add_freetagging_tokens() {
            var value = $.trim(input_box.val());
            var tokens = value.split($(input).data("settings").tokenDelimiter);
            $.each(tokens, function(i, token) {
                if (!token) {
                    return;
                }

                if ($.isFunction($(input).data("settings").onFreeTaggingAdd)) {
                    token = $(input).data("settings").onFreeTaggingAdd.call(hiddenInput, token);
                }
                var object = {};
                object[$(input).data("settings").tokenValue] = object[$(input).data("settings").propertyToSearch] = token;
                add_token(object);
            });
        }

        // Inner function to a token to the list
        function insert_token(item) {
            var $this_token = $($(input).data("settings").tokenFormatter(item));

            if (typeof($(input).data("settings").onTokenSelected) === "function") {
                $(input).data("settings").onTokenSelected.call(this, $this_token);
            }

            var readonly = item.readonly === true;

            if(readonly) $this_token.addClass($(input).data("settings").classes.tokenReadOnly);

            $this_token.addClass($(input).data("settings").classes.token).insertBefore(input_token);

            // The 'delete token' button
            if(!readonly) {
                $("<span>" + $(input).data("settings").deleteText + "</span>")
                    .addClass($(input).data("settings").classes.tokenDelete)
                    .appendTo($this_token)
                    .click(function () {
                        if (!$(input).data("settings").disabled) {
                            delete_token($(this).parent());
                            hiddenInput.change();
                            return false;
                        }
                    });
            }

            // Store data on the token
            var token_data = item;
            $.data($this_token.get(0), "tokeninput", item);

            // Save this token for duplicate checking
            saved_tokens = saved_tokens.slice(0,selected_token_index).concat([token_data]).concat(saved_tokens.slice(selected_token_index));
            selected_token_index++;

            // Update the hidden input
            update_hiddenInput(saved_tokens, hiddenInput);

            token_count += 1;

            // Check the token limit
            if($(input).data("settings").tokenLimit !== null && token_count >= $(input).data("settings").tokenLimit) {
                input_box.hide();
                hide_dropdown();
            }

            return $this_token;
        }

        // Add a token to the token list based on user input
        function add_token (item) {
            var callback = $(input).data("settings").onAdd,
                focusOnAdd = $(input).data("settings").focusOnAdd !== false;

            // See if the token already exists and select it if we don't want duplicates
            if(token_count > 0 && $(input).data("settings").preventDuplicates) {
                var found_existing_token = null;
                token_list.children().each(function () {
                    var existing_token = $(this);
                    var existing_data = $.data(existing_token.get(0), "tokeninput");
                    if(existing_data && existing_data[settings.tokenValue] === item[settings.tokenValue]) {
                        found_existing_token = existing_token;
                        return false;
                    }
                });

                if(found_existing_token) {
                    select_token(found_existing_token);
                    input_token.insertAfter(found_existing_token);
                    focusOnAdd && focusWithTimeout(input_box);
                    return;
                }
            }

            // Squeeze input_box so we force no unnecessary line break
            input_box.width(1);
            focusOnAdd && focusWithTimeout(input_box);

            // Insert the new tokens
            if($(input).data("settings").tokenLimit == null || token_count < $(input).data("settings").tokenLimit) {
                insert_token(item);
                // Remove the placeholder so it's not seen after you've added a token
                input_box.attr("placeholder", null);
                checkTokenLimit();
            }

            // Clear input box
            input_box.val("");

            // Don't show the help dropdown, they've got the idea
            hide_dropdown();

            // Execute the onAdd callback if defined
            if($.isFunction(callback)) {
                callback.call(hiddenInput,item);
            }
        }

        // Select a token in the token list
        function select_token (token) {
            if (!$(input).data("settings").disabled) {
                token.addClass($(input).data("settings").classes.selectedToken);
                selected_token = token.get(0);

                // Hide input box
                input_box.val("");

                // Hide dropdown if it is visible (eg if we clicked to select token)
                hide_dropdown();
            }
        }

        // Deselect a token in the token list
        function deselect_token (token, position) {
            token.removeClass($(input).data("settings").classes.selectedToken);
            selected_token = null;

            if(position === POSITION.BEFORE) {
                input_token.insertBefore(token);
                selected_token_index--;
            } else if(position === POSITION.AFTER) {
                input_token.insertAfter(token);
                selected_token_index++;
            } else {
                input_token.appendTo(token_list);
                selected_token_index = token_count;
            }

            // Show the input box and give it focus again
            focusWithTimeout(input_box);
        }

        // Toggle selection of a token in the token list
        function toggle_select_token(token) {
            var previous_selected_token = selected_token;

            if(selected_token) {
                deselect_token($(selected_token), POSITION.END);
            }

            if(previous_selected_token === token.get(0)) {
                deselect_token(token, POSITION.END);
            } else {
                select_token(token);
            }
        }

        // Delete a token from the token list
        function delete_token (token) {
            // Remove the id from the saved list
            var token_data = $.data(token.get(0), "tokeninput");
            var callback = $(input).data("settings").onDelete;
            var focusOnDelete = $(input).data("settings").focusOnDelete !== false;

            if (token_data.readonly) {
                return; // don't allow delete for readonly token
            }

            var index = token.prevAll().length;
            if(index > selected_token_index) index--;

            // Delete the token
            token.remove();
            selected_token = null;

            // Show the input box and give it focus again
            focusOnDelete && focusWithTimeout(input_box);

            // Remove this token from the saved list
            saved_tokens = saved_tokens.slice(0,index).concat(saved_tokens.slice(index+1));
            if (saved_tokens.length == 0) {
                input_box.attr("placeholder", settings.placeholder)
            }
            if(index < selected_token_index) selected_token_index--;

            // Update the hidden input
            update_hiddenInput(saved_tokens, hiddenInput);

            token_count -= 1;

            if($(input).data("settings").tokenLimit !== null) {
                input_box
                    .show()
                    .val("");
                focusWithTimeout(input_box);
            }

            // Execute the onDelete callback if defined
            if($.isFunction(callback)) {
                callback.call(hiddenInput,token_data);
            }
        }

        // Update the hidden input box value
        function update_hiddenInput(saved_tokens, hiddenInput) {
            var token_values = $.map(saved_tokens, function (el) {
                if(typeof $(input).data("settings").tokenValue == 'function')
                    return $(input).data("settings").tokenValue.call(this, el);

                return el[$(input).data("settings").tokenValue];
            });
            hiddenInput.val(token_values.join($(input).data("settings").tokenDelimiter));

        }

        // Hide and clear the results dropdown
        function hide_dropdown () {
            dropdown.hide().empty();
            selected_dropdown_item = null;
        }

        function show_dropdown() {
            dropdown
                .css({
                    position: "absolute",
                    top: $(input).data("settings").appendToParent ? '100%' : 
                        token_list.offset().top + token_list.outerHeight(true),
                    left: $(input).data("settings").appendToParent ? 0 : token_list.offset().left,
                    width: token_list.width(),
                    'z-index': $(input).data("settings").zindex
                })
                .show();
        }

        function show_dropdown_searching () {
            if($(input).data("settings").searchingText) {
                dropdown.html("<p>" + escapeHTML($(input).data("settings").searchingText) + "</p>");
                show_dropdown();
            }
        }

        function show_dropdown_hint () {
            if($(input).data("settings").hintText) {
                dropdown.html("<p>" + escapeHTML($(input).data("settings").hintText) + "</p>");
                show_dropdown();
            }
        }

        var regexp_special_chars = new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g');
        function regexp_escape(term) {
            return term.replace(regexp_special_chars, '\\$&');
        }

        // Highlight the query part of the search term
        function highlight_term(value, term) {
            return value.replace(
                new RegExp(
                    "(?![^&;]+;)(?!<[^<>]*)(" + regexp_escape(term) + ")(?![^<>]*>)(?![^&;]+;)",
                    "gi"
                ), function(match, p1) {
                    return "<b>" + escapeHTML(p1) + "</b>";
                }
            );
        }

        function find_value_and_highlight_term(template, value, term) {
            return template.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + regexp_escape(value) + ")(?![^<>]*>)(?![^&;]+;)", "g"), highlight_term(value, term));
        }

        // exclude existing tokens from dropdown, so the list is clearer
        function excludeCurrent(results) {
            if ($(input).data("settings").excludeCurrent) {
                var currentTokens = $(input).data("tokenInputObject").getTokens(),
                    trimmedList = [];
                if (currentTokens.length) {
                    $.each(results, function(index, value) {
                        var notFound = true;
                        $.each(currentTokens, function(cIndex, cValue) {
                            if (value[$(input).data("settings").propertyToSearch] == cValue[$(input).data("settings").propertyToSearch]) {
                                notFound = false;
                                return false;
                            }
                        });

                        if (notFound) {
                            trimmedList.push(value);
                        }
                    });
                    results = trimmedList;
                }
            }

            return results;
        }

        // Populate the results dropdown with some results
        function populateDropdown (query, results) {
            // exclude current tokens if configured
            results = excludeCurrent(results);

            if(results && results.length) {
                dropdown.empty();
                var dropdown_ul = $("<ul/>")
                    .appendTo(dropdown)
                    .mouseover(function (event) {
                        select_dropdown_item($(event.target).closest("li"));
                    })
                    .mousedown(function (event) {
                        add_token($(event.target).closest("li").data("tokeninput"));
                        hiddenInput.change();
                        return false;
                    })
                    .hide();

                if ($(input).data("settings").resultsLimit && results.length > $(input).data("settings").resultsLimit) {
                    results = results.slice(0, $(input).data("settings").resultsLimit);
                }

                $.each(results, function(index, value) {
                    var this_li = $(input).data("settings").resultsFormatter(value);

                    this_li = find_value_and_highlight_term(this_li ,value[$(input).data("settings").propertyToSearch], query);
                    this_li = $(this_li).appendTo(dropdown_ul);

                    if(index % 2) {
                        this_li.addClass($(input).data("settings").classes.dropdownItem);
                    } else {
                        this_li.addClass($(input).data("settings").classes.dropdownItem2);
                    }

                    if(index === 0 && $(input).data("settings").autoSelectFirstResult) {
                        select_dropdown_item(this_li);
                    }

                    $.data(this_li.get(0), "tokeninput", value);
                });

                if (typeof($(input).data("settings").onDropdownChange) === "function") {
                    $(input).data("settings").onDropdownChange.call(this, dropdown_ul);
                }

                show_dropdown();

                if($(input).data("settings").animateDropdown) {
                    dropdown_ul.slideDown("fast");
                } else {
                    dropdown_ul.show();
                }
            } else {
                if($(input).data("settings").noResultsText) {
                    dropdown.html("<p>" + escapeHTML($(input).data("settings").noResultsText) + "</p>");
                    show_dropdown();
                }
            }
        }

        // Highlight an item in the results dropdown
        function select_dropdown_item (item) {
            if(item) {
                if(selected_dropdown_item) {
                    deselect_dropdown_item($(selected_dropdown_item));
                }

                item.addClass($(input).data("settings").classes.selectedDropdownItem);
                selected_dropdown_item = item.get(0);
            }
            // fix to force dropdown to scroll on down/up arrow if item isn't 
            // visible due to overflow:hidden or scroll
             if (selected_dropdown_item) {
                var selectedTop = $(selected_dropdown_item).offset().top;
                var selectedBottom = selectedTop + $(selected_dropdown_item).outerHeight();
                var ddTop = $(dropdown).offset().top
                var ddBottom = ddTop + $(dropdown).outerHeight();
                var ddScrollTop = $(dropdown).scrollTop();

                if (selectedBottom > ddBottom) {
                    $(dropdown).scrollTop(ddScrollTop + (selectedBottom - ddBottom));
                } else if (ddTop > selectedTop) {
                    $(dropdown).scrollTop(ddScrollTop + (selectedTop - ddTop));
                }
            }
        }

        // Remove highlighting from an item in the results dropdown
        function deselect_dropdown_item (item) {
            item.removeClass($(input).data("settings").classes.selectedDropdownItem);
            selected_dropdown_item = null;
        }

        // Do a search and show the "searching" dropdown if the input is longer
        // than $(input).data("settings").minChars
        function do_search() {
            var query = input_box.val();

            if((query && query.length) || !$(input).data("settings").minChars) {
                if(selected_token) {
                    deselect_token($(selected_token), POSITION.AFTER);
                }

                if(query.length >= $(input).data("settings").minChars) {
                    show_dropdown_searching();
                    clearTimeout(timeout);

                    timeout = setTimeout(function(){
                        run_search(query);
                    }, $(input).data("settings").searchDelay);
                } else {
                    hide_dropdown();
                }
            }
        }

        // Do the actual search
        function run_search(query) {
            var cache_key = query + computeURL();
            var cached_results = cache.get(cache_key);
            if (settings.caching && cached_results) {
                if ($.isFunction($(input).data("settings").onCachedResult)) {
                    cached_results = $(input).data("settings").onCachedResult.call(hiddenInput, cached_results);
                }
                populateDropdown(query, cached_results);
            } else {
                // Are we doing an ajax search or local data search?
                if($(input).data("settings").url) {
                    var url = computeURL();
                    // Extract existing get params
                    var ajax_params = {};
                    ajax_params.data = {};
                    if(url.indexOf("?") > -1) {
                        var parts = url.split("?");
                        ajax_params.url = parts[0];

                        var param_array = parts[1].split("&");
                        $.each(param_array, function (index, value) {
                            var kv = value.split("=");
                            ajax_params.data[kv[0]] =  decodeURIComponent(kv[1]);
                        });
                    } else {
                        ajax_params.url = url;
                    }

                    // Prepare the request
                    ajax_params.data[$(input).data("settings").queryParam] = query;
                    ajax_params.type = $(input).data("settings").method;
                    ajax_params.dataType = $(input).data("settings").contentType;
                    if ($(input).data("settings").crossDomain) {
                        ajax_params.dataType = "jsonp";
                    }

                    // exclude current tokens?
                    // send exclude list to the server, so it can also exclude existing tokens
                    if ($(input).data("settings").excludeCurrent && $(input).data("settings").excludeCurrentParameter!=null) {
                        var currentTokens = $(input).data("tokenInputObject").getTokens();
                        var tokenList = $.map(currentTokens, function (el) {
                            if(typeof $(input).data("settings").tokenValue == 'function')
                                return $(input).data("settings").tokenValue.call(this, el);

                            return el[$(input).data("settings").tokenValue];
                        });

                        ajax_params.data[$(input).data("settings").excludeCurrentParameter] = tokenList.join($(input).data("settings").tokenDelimiter);
                    }

                    // Attach the success callback
                    ajax_params.success = function(results) {
                        cache.add(cache_key, $(input).data("settings").jsonContainer ? results[$(input).data("settings").jsonContainer] : results);
                        if($.isFunction($(input).data("settings").onResult)) {
                            results = $(input).data("settings").onResult.call(hiddenInput, results);
                        }

                        // only populate the dropdown if the results are associated with the active search query
                        if(input_box.val() === query) {
                            populateDropdown(query, $(input).data("settings").jsonContainer ? results[$(input).data("settings").jsonContainer] : results);
                        }
                    };

                    // Provide a beforeSend callback
                    if (settings.onSend) {
                        settings.onSend(ajax_params);
                    }

                    // Make the request
                    $.ajax(ajax_params);
                } else if($(input).data("settings").local_data) {
                    // Do the search through local data
                    var results = $.grep($(input).data("settings").local_data, function (row) {
                        return row[$(input).data("settings").propertyToSearch].toLowerCase().indexOf(query.toLowerCase()) > -1;
                    });

                    cache.add(cache_key, results);
                    if($.isFunction($(input).data("settings").onResult)) {
                        results = $(input).data("settings").onResult.call(hiddenInput, results);
                    }
                    populateDropdown(query, results);
                }
            }
        }

        // compute the dynamic URL
        function computeURL() {
            var settings = $(input).data("settings");
            return typeof settings.url == 'function' ? settings.url.call(settings) : settings.url;
        }

        // Bring browser focus to the specified object.
        // Use of setTimeout is to get around an IE bug.
        // (See, e.g., http://stackoverflow.com/questions/2600186/focus-doesnt-work-in-ie)
        //
        // obj: a jQuery object to focus()
        function focusWithTimeout(object) {
            setTimeout(
                function() {
                    object.focus();
                },
                50
            );
        }
    };

    // Really basic cache for the results
    $.TokenList.Cache = function (options) {
        var settings, data = {}, size = 0, flush;

        settings = $.extend({ max_size: 500 }, options);

        flush = function () {
            data = {};
            size = 0;
        };

        this.add = function (query, results) {
            if (size > settings.max_size) {
                flush();
            }

            if (!data[query]) {
                size += 1;
            }

            data[query] = results;
        };

        this.get = function (query) {
            return data[query];
        };
    };
}));

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    var PrettyDate = function (element, options) {
            options = $.isPlainObject(options) ? options : {};
            this.$element = $(element);
            this.defaults = $.extend({}, PrettyDate.defaults, this.$element.data(), options);
            this.init();
        },

        // Helper variables
        floor = Math.floor,
        second = 1000,
        minute = 60 * second,
        hour = 60 * minute,
        day = 24 * hour,
        week = 7 * day,
        month = 31 * day,
        year = 365 * day;

    PrettyDate.prototype = {
        constructor: PrettyDate,

        init: function () {
            var $this = this.$element,
                defaults = this.defaults,
                isInput = $this.is("input"),
                originalDate = isInput ? $this.val() : $this.text();

            this.isInput = isInput;
            this.originalDate = originalDate;
            this.format = PrettyDate.fn.parseFormat(defaults.dateFormat);
            this.setDate(defaults.date || originalDate);
            this.active = true;

            if (this.date) {
                this.prettify();

                if (defaults.autoUpdate) {
                    this.update();
                }
            }
        },

        setDate: function (date) {
            if (date) {
                this.date = PrettyDate.fn.parseDate(date, this.format);
            }
        },

        prettify: function () {
            var diff = (new Date()).getTime() - this.date.getTime(),
                past = diff > 0 ? true : false,
                messages = this.defaults.messages,
                $this = this.$element,
                prettyDate;

            if (!this.active) {
                return;
            }

            diff = diff < 0 ? (second - diff) : diff;
            prettyDate = (
                diff < 2 * second ? messages.second :
                diff < minute ? messages.seconds.replace("%s", floor(diff / second)) :
                diff < 2 * minute ? messages.minute :
                diff < hour ? messages.minutes.replace("%s", floor(diff / minute)) :
                diff < 2 * hour ? messages.hour :
                diff < day ? messages.hours.replace("%s", floor(diff / hour)) :
                diff < 2 * day ? (past ? messages.yesterday : messages.tomorrow) :
                diff < 3 * day ? (past ? messages.beforeYesterday : messages.afterTomorrow) :
                /* diff < 2 * day ? messages.day : */
                diff < week ? messages.days.replace("%s", floor(diff / day)) :
                diff < 2 * week ? messages.week :
                diff < 4 * week ? messages.weeks.replace("%s", floor(diff / week)) :
                diff < 2 * month ? messages.month :
                diff < year ? messages.months.replace("%s", floor(diff / month)) :
                diff < 2 * year ? messages.year : messages.years.replace("%s", floor(diff / year))
            );

            prettyDate = prettyDate.replace("%s", past ? this.defaults.beforeSuffix : this.defaults.afterSuffix);

            if (this.isInput) {
                $this.val(prettyDate);
            } else {
                $this.text(prettyDate);
            }

            this.prettyDate = prettyDate;
        },

        destroy: function () {
            var $this = this.$element,
                originalDate = this.originalDate;

            if (!this.active) {
                return;
            }

            if (this.defaults.autoUpdate && this.autoUpdate) {
                clearInterval(this.autoUpdate);
            }

            if (this.isInput) {
                $this.val(originalDate);
            } else {
                $this.text(originalDate);
            }

            $this.removeData("prettydate");

            this.active = false;
        },

        update: function () {
            var duration = this.defaults.duration,
                that = this;

            if (typeof duration === "number" && duration > 0) {
                this.autoUpdate = setInterval(function () {
                    that.prettify();
                }, duration);
            }
        }
    };

    PrettyDate.fn = {
        parseFormat: function (format) {
            var parts = typeof format === "string" ? format.match(/(\w+)/g) : [],
                monthMatched = false;

            if (!parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }

            format = $.map(parts, function (n) {
                var part = n.substr(0, 1);

                switch (part) {
                    case "S":
                    case "s":
                        part = "s";
                        break;

                    case "m":
                        part = monthMatched ? "m" : "M";
                        monthMatched = true;
                        break;

                    case "H":
                    case "h":
                        part = "h";
                        break;

                    case "D":
                    case "d":
                        part = "D";
                        break;

                    case "M":
                        part = "M";
                        monthMatched = true;
                        break;

                    case "Y":
                    case "y":
                        part = "Y";
                        break;

                    // No default
                }

                return part;
            });

            return format;
        },

        parseDate: function (date, format) {
            var parts = typeof date === "string" ? date.match(/(\d+)/g) : [],
                data = {
                    Y: 0,
                    M: 0,
                    D: 0,
                    h: 0,
                    m: 0,
                    s: 0
                };

            if ($.isArray(parts) && $.isArray(format) && parts.length === format.length) {
                $.each(format, function (i, n) {
                    data[n] = parseInt(parts[i], 10) || 0;
                });

                data.Y += data.Y > 0 && data.Y < 100 ? 2000 : 0; // Year: 14 -> 2014

                date = new Date(data.Y, data.M - 1, data.D, data.h, data.m, data.s);
            } else {
                date = new Date(date);
            }

            return date.getTime() ? date : null;
        }
    };

    PrettyDate.defaults = {
        afterSuffix: "",
        beforeSuffix: "ago",
        autoUpdate: false,
        date: null,
        dateFormat: "YYYY-MM-DD hh:mm:ss",
        duration: 60000, // milliseconds
        messages: {
            second: "Just now",
            seconds: "%s seconds %s",
            minute: "One minute %s",
            minutes: "%s minutes %s",
            hour: "One hour %s",
            hours: "%s hours %s",
            day: "One day %s",
            days: "%s days %s",
            week: "One week %s",
            weeks: "%s weeks %s",
            month: "One month %s",
            months: "%s months %s",
            year: "One year %s",
            years: "%s years %s",

            // Extra
            yesterday: "Yesterday",
            beforeYesterday: "The day before yesterday",
            tomorrow: "Tomorrow",
            afterTomorrow: "The day after tomorrow"
        }
    };

    PrettyDate.setDefaults = function (options) {
        $.extend(PrettyDate.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.prettydate = function (options, settings) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("prettydate");

            if (!data) {
                $this.data("prettydate", (data = new PrettyDate(this, options)));
            }

            if (typeof options === "string" && $.isFunction(data[options])) {
                data[options](settings);
            }
        });
    };

    $.fn.prettydate.constructor = PrettyDate;
    $.fn.prettydate.setDefaults = PrettyDate.setDefaults;

    $(function () {
        $("[prettydate]").prettydate();
    });
});




//tipr
!function(t){t.fn.tipr=function(i){var e=t.extend({speed:200,mode:"below",space:70},i);return this.each(function(){var i=-1;t(document).on("mousemove",function(t){i=t.clientY});var n=t(window).height();t(this).hover(function(){var o=e.mode;t(window).on("resize",function(){n=t(window).height()}),n-i<e.space?o="above":(o=e.mode,t(this).attr("data-mode")&&(o=t(this).attr("data-mode"))),tipr_cont=".tipr_container_"+o;var r='<div class="tipr_container_'+o+'"><div class="tipr_point_'+o+'"><div class="tipr_content">'+t(this).attr("data-tip")+"</div></div></div>";t(this).after(r);var a=t(tipr_cont).outerWidth(),c=t(this).width()/2-a/2;t(tipr_cont).css("margin-left",c+"px"),t(this).removeAttr("title alt"),t(tipr_cont).fadeIn(e.speed)},function(){t(tipr_cont).remove()})})}}(jQuery);

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var userInfo = []; // users who can be notified

function openCRMEntity(type,id){
	Xrm.Utility.openEntityForm(type,id);

}

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

var entityMap = {
'&': '&amp;',
'<': '&lt;',
'>': '&gt;',
'"': '&quot;',
"'": '&#39;',
'/': '&#x2F;',
'`': '&#x60;',
'=': '&#x3D;'
};

function escapeHtml (string) {
return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
  return entityMap[s];
});
}


  
  
(function ($) {
    $.extend({
        tablesorter: new
        function () {

            var parsers = [],
                widgets = [];

            this.defaults = {
                cssHeader: "header",
                cssAsc: "headerSortUp",
                cssDesc: "headerSortDown",
                cssChildRow: "expand-child",
                sortInitialOrder: "asc",
                sortMultiSortKey: "shiftKey",
                sortForce: null,
                sortAppend: null,
                sortLocaleCompare: true,
                textExtraction: "simple",
                parsers: {}, widgets: [],
                widgetZebra: {
                    css: ["even", "odd"]
                }, headers: {}, widthFixed: false,
                cancelSelection: true,
                sortList: [],
                headerList: [],
                dateFormat: "uk",
                decimal: '/\.|\,/g',
                onRenderHeader: null,
                selectorHeaders: 'thead th',
                debug: false
            };

            /* debuging utils */

            function benchmark(s, d) {
                log(s + "," + (new Date().getTime() - d.getTime()) + "ms");
            }

            this.benchmark = benchmark;

            function log(s) {
                if (typeof console != "undefined" && typeof console.debug != "undefined") {
                    console.log(s);
                } else {
                    alert(s);
                }
            }

            /* parsers utils */

            function buildParserCache(table, $headers) {

                if (table.config.debug) {
                    var parsersDebug = "";
                }

                if (table.tBodies.length == 0) return; // In the case of empty tables
                var rows = table.tBodies[0].rows;

                if (rows[0]) {

                    var list = [],
                        cells = rows[0].cells,
                        l = cells.length;

                    for (var i = 0; i < l; i++) {

                        var p = false;

                        if ($.metadata && ($($headers[i]).metadata() && $($headers[i]).metadata().sorter)) {

                            p = getParserById($($headers[i]).metadata().sorter);

                        } else if ((table.config.headers[i] && table.config.headers[i].sorter)) {

                            p = getParserById(table.config.headers[i].sorter);
                        }
                        if (!p) {

                            p = detectParserForColumn(table, rows, -1, i);
                        }

                        if (table.config.debug) {
                            parsersDebug += "column:" + i + " parser:" + p.id + "\n";
                        }

                        list.push(p);
                    }
                }

                if (table.config.debug) {
                    log(parsersDebug);
                }

                return list;
            };

            function detectParserForColumn(table, rows, rowIndex, cellIndex) {
                var l = parsers.length,
                    node = false,
                    nodeValue = false,
                    keepLooking = true;
                while (nodeValue == '' && keepLooking) {
                    rowIndex++;
                    if (rows[rowIndex]) {
                        node = getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex);
                        nodeValue = trimAndGetNodeText(table.config, node);
                        if (table.config.debug) {
                            log('Checking if value was empty on row:' + rowIndex);
                        }
                    } else {
                        keepLooking = false;
                    }
                }
                for (var i = 1; i < l; i++) {
                    if (parsers[i].is(nodeValue, table, node)) {
                        return parsers[i];
                    }
                }
                // 0 is always the generic parser (text)
                return parsers[0];
            }

            function getNodeFromRowAndCellIndex(rows, rowIndex, cellIndex) {
                return rows[rowIndex].cells[cellIndex];
            }

            function trimAndGetNodeText(config, node) {
                return $.trim(getElementText(config, node));
            }

            function getParserById(name) {
                var l = parsers.length;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == name.toLowerCase()) {
                        return parsers[i];
                    }
                }
                return false;
            }

            /* utils */

            function buildCache(table) {

                if (table.config.debug) {
                    var cacheTime = new Date();
                }

                var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0,
                    totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0,
                    parsers = table.config.parsers,
                    cache = {
                        row: [],
                        normalized: []
                    };

                for (var i = 0; i < totalRows; ++i) {

                    /** Add the table data to main data array */
                    var c = $(table.tBodies[0].rows[i]),
                        cols = [];

                    // if this is a child row, add it to the last row's children and
                    // continue to the next row
                    if (c.hasClass(table.config.cssChildRow)) {
                        cache.row[cache.row.length - 1] = cache.row[cache.row.length - 1].add(c);
                        // go to the next for loop
                        continue;
                    }

                    cache.row.push(c);

                    for (var j = 0; j < totalCells; ++j) {
                        cols.push(parsers[j].format(getElementText(table.config, c[0].cells[j]), table, c[0].cells[j]));
                    }

                    cols.push(cache.normalized.length); // add position for rowCache
                    cache.normalized.push(cols);
                    cols = null;
                };

                if (table.config.debug) {
                    benchmark("Building cache for " + totalRows + " rows:", cacheTime);
                }

                return cache;
            };

            function getElementText(config, node) {

                var text = "";

                if (!node) return "";

                if (!config.supportsTextContent) config.supportsTextContent = node.textContent || false;

                if (config.textExtraction == "simple") {
                    if (config.supportsTextContent) {
                        text = node.textContent;
                    } else {
                        if (node.childNodes[0] && node.childNodes[0].hasChildNodes()) {
                            text = node.childNodes[0].innerHTML;
                        } else {
                            text = node.innerHTML;
                        }
                    }
                } else {
                    if (typeof(config.textExtraction) == "function") {
                        text = config.textExtraction(node);
                    } else {
                        text = $(node).text();
                    }
                }
                return text;
            }

            function appendToTable(table, cache) {

                if (table.config.debug) {
                    var appendTime = new Date()
                }

                var c = cache,
                    r = c.row,
                    n = c.normalized,
                    totalRows = n.length,
                    checkCell = (n[0].length - 1),
                    tableBody = $(table.tBodies[0]),
                    rows = [];


                for (var i = 0; i < totalRows; i++) {
                    var pos = n[i][checkCell];

                    rows.push(r[pos]);

                    if (!table.config.appender) {

                        //var o = ;
                        var l = r[pos].length;
                        for (var j = 0; j < l; j++) {
                            tableBody[0].appendChild(r[pos][j]);
                        }

                        // 
                    }
                }



                if (table.config.appender) {

                    table.config.appender(table, rows);
                }

                rows = null;

                if (table.config.debug) {
                    benchmark("Rebuilt table:", appendTime);
                }

                // apply table widgets
                applyWidget(table);

                // trigger sortend
                setTimeout(function () {
                    $(table).trigger("sortEnd");
                }, 0);

            };

            function buildHeaders(table) {

                if (table.config.debug) {
                    var time = new Date();
                }

                var meta = ($.metadata) ? true : false;
                
                var header_index = computeTableHeaderCellIndexes(table);

                $tableHeaders = $(table.config.selectorHeaders, table).each(function (index) {

                    this.column = header_index[this.parentNode.rowIndex + "-" + this.cellIndex];
                    // this.column = index;
                    this.order = formatSortingOrder(table.config.sortInitialOrder);
                    
					
					this.count = this.order;

                    if (checkHeaderMetadata(this) || checkHeaderOptions(table, index)) this.sortDisabled = true;
					if (checkHeaderOptionsSortingLocked(table, index)) this.order = this.lockedOrder = checkHeaderOptionsSortingLocked(table, index);

                    if (!this.sortDisabled) {
                        var $th = $(this).addClass(table.config.cssHeader);
                        if (table.config.onRenderHeader) table.config.onRenderHeader.apply($th);
                    }

                    // add cell to headerList
                    table.config.headerList[index] = this;
                });

                if (table.config.debug) {
                    benchmark("Built headers:", time);
                    log($tableHeaders);
                }

                return $tableHeaders;

            };

            // from:
            // http://www.javascripttoolbox.com/lib/table/examples.php
            // http://www.javascripttoolbox.com/temp/table_cellindex.html


            function computeTableHeaderCellIndexes(t) {
                var matrix = [];
                var lookup = {};
                var thead = t.getElementsByTagName('THEAD')[0];
                var trs = thead.getElementsByTagName('TR');

                for (var i = 0; i < trs.length; i++) {
                    var cells = trs[i].cells;
                    for (var j = 0; j < cells.length; j++) {
                        var c = cells[j];

                        var rowIndex = c.parentNode.rowIndex;
                        var cellId = rowIndex + "-" + c.cellIndex;
                        var rowSpan = c.rowSpan || 1;
                        var colSpan = c.colSpan || 1
                        var firstAvailCol;
                        if (typeof(matrix[rowIndex]) == "undefined") {
                            matrix[rowIndex] = [];
                        }
                        // Find first available column in the first row
                        for (var k = 0; k < matrix[rowIndex].length + 1; k++) {
                            if (typeof(matrix[rowIndex][k]) == "undefined") {
                                firstAvailCol = k;
                                break;
                            }
                        }
                        lookup[cellId] = firstAvailCol;
                        for (var k = rowIndex; k < rowIndex + rowSpan; k++) {
                            if (typeof(matrix[k]) == "undefined") {
                                matrix[k] = [];
                            }
                            var matrixrow = matrix[k];
                            for (var l = firstAvailCol; l < firstAvailCol + colSpan; l++) {
                                matrixrow[l] = "x";
                            }
                        }
                    }
                }
                return lookup;
            }

            function checkCellColSpan(table, rows, row) {
                var arr = [],
                    r = table.tHead.rows,
                    c = r[row].cells;

                for (var i = 0; i < c.length; i++) {
                    var cell = c[i];

                    if (cell.colSpan > 1) {
                        arr = arr.concat(checkCellColSpan(table, headerArr, row++));
                    } else {
                        if (table.tHead.length == 1 || (cell.rowSpan > 1 || !r[row + 1])) {
                            arr.push(cell);
                        }
                        // headerArr[row] = (i+row);
                    }
                }
                return arr;
            };

            function checkHeaderMetadata(cell) {
                if (($.metadata) && ($(cell).metadata().sorter === false)) {
                    return true;
                };
                return false;
            }

            function checkHeaderOptions(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].sorter === false)) {
                    return true;
                };
                return false;
            }
			
			 function checkHeaderOptionsSortingLocked(table, i) {
                if ((table.config.headers[i]) && (table.config.headers[i].lockedOrder)) return table.config.headers[i].lockedOrder;
                return false;
            }
			
            function applyWidget(table) {
                var c = table.config.widgets;
                var l = c.length;
                for (var i = 0; i < l; i++) {

                    getWidgetById(c[i]).format(table);
                }

            }

            function getWidgetById(name) {
                var l = widgets.length;
                for (var i = 0; i < l; i++) {
                    if (widgets[i].id.toLowerCase() == name.toLowerCase()) {
                        return widgets[i];
                    }
                }
            };

            function formatSortingOrder(v) {
                if (typeof(v) != "Number") {
                    return (v.toLowerCase() == "desc") ? 1 : 0;
                } else {
                    return (v == 1) ? 1 : 0;
                }
            }

            function isValueInArray(v, a) {
                var l = a.length;
                for (var i = 0; i < l; i++) {
                    if (a[i][0] == v) {
                        return true;
                    }
                }
                return false;
            }

            function setHeadersCss(table, $headers, list, css) {
                // remove all header information
                $headers.removeClass(css[0]).removeClass(css[1]);

                var h = [];
                $headers.each(function (offset) {
                    if (!this.sortDisabled) {
                        h[this.column] = $(this);
                    }
                });

                var l = list.length;
                for (var i = 0; i < l; i++) {
                    h[list[i][0]].addClass(css[list[i][1]]);
                }
            }

            function fixColumnWidth(table, $headers) {
                var c = table.config;
                if (c.widthFixed) {
                    var colgroup = $('<colgroup>');
                    $("tr:first td", table.tBodies[0]).each(function () {
                        colgroup.append($('<col>').css('width', $(this).width()));
                    });
                    $(table).prepend(colgroup);
                };
            }

            function updateHeaderSortCount(table, sortList) {
                var c = table.config,
                    l = sortList.length;
                for (var i = 0; i < l; i++) {
                    var s = sortList[i],
                        o = c.headerList[s[0]];
                    o.count = s[1];
                    o.count++;
                }
            }

            /* sorting methods */

            function multisort(table, sortList, cache) {

                if (table.config.debug) {
                    var sortTime = new Date();
                }

                var dynamicExp = "var sortWrapper = function(a,b) {",
                    l = sortList.length;

                // TODO: inline functions.
                for (var i = 0; i < l; i++) {

                    var c = sortList[i][0];
                    var order = sortList[i][1];
                    // var s = (getCachedSortType(table.config.parsers,c) == "text") ?
                    // ((order == 0) ? "sortText" : "sortTextDesc") : ((order == 0) ?
                    // "sortNumeric" : "sortNumericDesc");
                    // var s = (table.config.parsers[c].type == "text") ? ((order == 0)
                    // ? makeSortText(c) : makeSortTextDesc(c)) : ((order == 0) ?
                    // makeSortNumeric(c) : makeSortNumericDesc(c));
                    var s = (table.config.parsers[c].type == "text") ? ((order == 0) ? makeSortFunction("text", "asc", c) : makeSortFunction("text", "desc", c)) : ((order == 0) ? makeSortFunction("numeric", "asc", c) : makeSortFunction("numeric", "desc", c));
                    var e = "e" + i;

                    dynamicExp += "var " + e + " = " + s; // + "(a[" + c + "],b[" + c
                    // + "]); ";
                    dynamicExp += "if(" + e + ") { return " + e + "; } ";
                    dynamicExp += "else { ";

                }

                // if value is the same keep orignal order
                var orgOrderCol = cache.normalized[0].length - 1;
                dynamicExp += "return a[" + orgOrderCol + "]-b[" + orgOrderCol + "];";

                for (var i = 0; i < l; i++) {
                    dynamicExp += "}; ";
                }

                dynamicExp += "return 0; ";
                dynamicExp += "}; ";

                if (table.config.debug) {
                    benchmark("Evaling expression:" + dynamicExp, new Date());
                }

                eval(dynamicExp);

                cache.normalized.sort(sortWrapper);

                if (table.config.debug) {
                    benchmark("Sorting on " + sortList.toString() + " and dir " + order + " time:", sortTime);
                }

                return cache;
            };

            function makeSortFunction(type, direction, index) {
                var a = "a[" + index + "]",
                    b = "b[" + index + "]";
                if (type == 'text' && direction == 'asc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + a + " < " + b + ") ? -1 : 1 )));";
                } else if (type == 'text' && direction == 'desc') {
                    return "(" + a + " == " + b + " ? 0 : (" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : (" + b + " < " + a + ") ? -1 : 1 )));";
                } else if (type == 'numeric' && direction == 'asc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + a + " - " + b + "));";
                } else if (type == 'numeric' && direction == 'desc') {
                    return "(" + a + " === null && " + b + " === null) ? 0 :(" + a + " === null ? Number.POSITIVE_INFINITY : (" + b + " === null ? Number.NEGATIVE_INFINITY : " + b + " - " + a + "));";
                }
            };

            function makeSortText(i) {
                return "((a[" + i + "] < b[" + i + "]) ? -1 : ((a[" + i + "] > b[" + i + "]) ? 1 : 0));";
            };

            function makeSortTextDesc(i) {
                return "((b[" + i + "] < a[" + i + "]) ? -1 : ((b[" + i + "] > a[" + i + "]) ? 1 : 0));";
            };

            function makeSortNumeric(i) {
                return "a[" + i + "]-b[" + i + "];";
            };

            function makeSortNumericDesc(i) {
                return "b[" + i + "]-a[" + i + "];";
            };

            function sortText(a, b) {
                if (table.config.sortLocaleCompare) return a.localeCompare(b);
                return ((a < b) ? -1 : ((a > b) ? 1 : 0));
            };

            function sortTextDesc(a, b) {
                if (table.config.sortLocaleCompare) return b.localeCompare(a);
                return ((b < a) ? -1 : ((b > a) ? 1 : 0));
            };

            function sortNumeric(a, b) {
                return a - b;
            };

            function sortNumericDesc(a, b) {
                return b - a;
            };

            function getCachedSortType(parsers, i) {
                return parsers[i].type;
            }; /* public methods */
            this.construct = function (settings) {
                return this.each(function () {
                    // if no thead or tbody quit.
                    if (!this.tHead || !this.tBodies) return;
                    // declare
                    var $this, $document, $headers, cache, config, shiftDown = 0,
                        sortOrder;
                    // new blank config object
                    this.config = {};
                    // merge and extend.
                    config = $.extend(this.config, $.tablesorter.defaults, settings);
                    // store common expression for speed
                    $this = $(this);
                    // save the settings where they read
                    $.data(this, "tablesorter", config);
                    // build headers
                    $headers = buildHeaders(this);
                    // try to auto detect column type, and store in tables config
                    this.config.parsers = buildParserCache(this, $headers);
                    // build the cache for the tbody cells
                    cache = buildCache(this);
                    // get the css class names, could be done else where.
                    var sortCSS = [config.cssDesc, config.cssAsc];
                    // fixate columns if the users supplies the fixedWidth option
                    fixColumnWidth(this);
                    // apply event handling to headers
                    // this is to big, perhaps break it out?
                    $headers.click(

                    function (e) {
                        var totalRows = ($this[0].tBodies[0] && $this[0].tBodies[0].rows.length) || 0;
                        if (!this.sortDisabled && totalRows > 0) {
                            // Only call sortStart if sorting is
                            // enabled.
                            $this.trigger("sortStart");
                            // store exp, for speed
                            var $cell = $(this);
                            // get current column index
                            var i = this.column;
                            // get current column sort order
                            this.order = this.count++ % 2;
							// always sort on the locked order.
							if(this.lockedOrder) this.order = this.lockedOrder;
							
							// user only whants to sort on one
                            // column
                            if (!e[config.sortMultiSortKey]) {
                                // flush the sort list
                                config.sortList = [];
                                if (config.sortForce != null) {
                                    var a = config.sortForce;
                                    for (var j = 0; j < a.length; j++) {
                                        if (a[j][0] != i) {
                                            config.sortList.push(a[j]);
                                        }
                                    }
                                }
                                // add column to sort list
                                config.sortList.push([i, this.order]);
                                // multi column sorting
                            } else {
                                // the user has clicked on an all
                                // ready sortet column.
                                if (isValueInArray(i, config.sortList)) {
                                    // revers the sorting direction
                                    // for all tables.
                                    for (var j = 0; j < config.sortList.length; j++) {
                                        var s = config.sortList[j],
                                            o = config.headerList[s[0]];
                                        if (s[0] == i) {
                                            o.count = s[1];
                                            o.count++;
                                            s[1] = o.count % 2;
                                        }
                                    }
                                } else {
                                    // add column to sort list array
                                    config.sortList.push([i, this.order]);
                                }
                            };
                            setTimeout(function () {
                                // set css for headers
                                setHeadersCss($this[0], $headers, config.sortList, sortCSS);
                                appendToTable(
	                                $this[0], multisort(
	                                $this[0], config.sortList, cache)
								);
                            }, 1);
                            // stop normal event by returning false
                            return false;
                        }
                        // cancel selection
                    }).mousedown(function () {
                        if (config.cancelSelection) {
                            this.onselectstart = function () {
                                return false
                            };
                            return false;
                        }
                    });
                    // apply easy methods that trigger binded events
                    $this.bind("update", function () {
                        var me = this;
                        setTimeout(function () {
                            // rebuild parsers.
                            me.config.parsers = buildParserCache(
                            me, $headers);
                            // rebuild the cache map
                            cache = buildCache(me);
                        }, 1);
                    }).bind("updateCell", function (e, cell) {
                        var config = this.config;
                        // get position from the dom.
                        var pos = [(cell.parentNode.rowIndex - 1), cell.cellIndex];
                        // update cache
                        cache.normalized[pos[0]][pos[1]] = config.parsers[pos[1]].format(
                        getElementText(config, cell), cell);
                    }).bind("sorton", function (e, list) {
                        $(this).trigger("sortStart");
                        config.sortList = list;
                        // update and store the sortlist
                        var sortList = config.sortList;
                        // update header count index
                        updateHeaderSortCount(this, sortList);
                        // set css for headers
                        setHeadersCss(this, $headers, sortList, sortCSS);
                        // sort the table and append it to the dom
                        appendToTable(this, multisort(this, sortList, cache));
                    }).bind("appendCache", function () {
                        appendToTable(this, cache);
                    }).bind("applyWidgetId", function (e, id) {
                        getWidgetById(id).format(this);
                    }).bind("applyWidgets", function () {
                        // apply widgets
                        applyWidget(this);
                    });
                    if ($.metadata && ($(this).metadata() && $(this).metadata().sortlist)) {
                        config.sortList = $(this).metadata().sortlist;
                    }
                    // if user has supplied a sort list to constructor.
                    if (config.sortList.length > 0) {
                        $this.trigger("sorton", [config.sortList]);
                    }
                    // apply widgets
                    applyWidget(this);
                });
            };
            this.addParser = function (parser) {
                var l = parsers.length,
                    a = true;
                for (var i = 0; i < l; i++) {
                    if (parsers[i].id.toLowerCase() == parser.id.toLowerCase()) {
                        a = false;
                    }
                }
                if (a) {
                    parsers.push(parser);
                };
            };
            this.addWidget = function (widget) {
                widgets.push(widget);
            };
            this.formatFloat = function (s) {
                var i = parseFloat(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.formatInt = function (s) {
                var i = parseInt(s);
                return (isNaN(i)) ? 0 : i;
            };
            this.isDigit = function (s, config) {
                // replace all an wanted chars and match.
                return /^[-+]?\d*$/.test($.trim(s.replace(/[,.']/g, '')));
            };
            this.clearTableBody = function (table) {
                if ($.browser.msie) {
                    function empty() {
                        while (this.firstChild)
                        this.removeChild(this.firstChild);
                    }
                    empty.apply(table.tBodies[0]);
                } else {
                    table.tBodies[0].innerHTML = "";
                }
            };
        }
    });

    // extend plugin scope
    $.fn.extend({
        tablesorter: $.tablesorter.construct
    });

    // make shortcut
    var ts = $.tablesorter;

    // add default parsers
    ts.addParser({
        id: "text",
        is: function (s) {
            return true;
        }, format: function (s) {
            return $.trim(s.toLocaleLowerCase());
        }, type: "text"
    });

    ts.addParser({
        id: "digit",
        is: function (s, table) {
            var c = table.config;
            return $.tablesorter.isDigit(s, c);
        }, format: function (s) {
            return $.tablesorter.formatFloat(s);
        }, type: "numeric"
    });

    ts.addParser({
        id: "currency",
        is: function (s) {
            return /^[Â£$â‚¬?.]/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/[Â£$â‚¬]/g), ""));
        }, type: "numeric"
    });

    ts.addParser({
        id: "ipAddress",
        is: function (s) {
            return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/.test(s);
        }, format: function (s) {
            var a = s.split("."),
                r = "",
                l = a.length;
            for (var i = 0; i < l; i++) {
                var item = a[i];
                if (item.length == 2) {
                    r += "0" + item;
                } else {
                    r += item;
                }
            }
            return $.tablesorter.formatFloat(r);
        }, type: "numeric"
    });

    ts.addParser({
        id: "url",
        is: function (s) {
            return /^(https?|ftp|file):\/\/$/.test(s);
        }, format: function (s) {
            return jQuery.trim(s.replace(new RegExp(/(https?|ftp|file):\/\//), ''));
        }, type: "text"
    });

    ts.addParser({
        id: "isoDate",
        is: function (s) {
            return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat((s != "") ? new Date(s.replace(
            new RegExp(/-/g), "/")).getTime() : "0");
        }, type: "numeric"
    });

    ts.addParser({
        id: "percent",
        is: function (s) {
            return /\%$/.test($.trim(s));
        }, format: function (s) {
            return $.tablesorter.formatFloat(s.replace(new RegExp(/%/g), ""));
        }, type: "numeric"
    });

    ts.addParser({
        id: "usLongDate",
        is: function (s) {
            return s.match(new RegExp(/^[A-Za-z]{3,10}\.? [0-9]{1,2}, ([0-9]{4}|'?[0-9]{2}) (([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(AM|PM)))$/));
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type: "numeric"
    });

    ts.addParser({
        id: "shortDate",
        is: function (s) {
            return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/.test(s);
        }, format: function (s, table) {
            var c = table.config;
            s = s.replace(/\-/g, "/");
            if (c.dateFormat == "us") {
                // reformat the string in ISO format
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$1/$2");
            } else if (c.dateFormat == "uk") {
                // reformat the string in ISO format
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/, "$3/$2/$1");
            } else if (c.dateFormat == "dd/mm/yy" || c.dateFormat == "dd-mm-yy") {
                s = s.replace(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2})/, "$1/$2/$3");
            }
            return $.tablesorter.formatFloat(new Date(s).getTime());
        }, type: "numeric"
    });
    ts.addParser({
        id: "time",
        is: function (s) {
            return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/.test(s);
        }, format: function (s) {
            return $.tablesorter.formatFloat(new Date("2000/01/01 " + s).getTime());
        }, type: "numeric"
    });
    ts.addParser({
        id: "metadata",
        is: function (s) {
            return false;
        }, format: function (s, table, cell) {
            var c = table.config,
                p = (!c.parserMetadataName) ? 'sortValue' : c.parserMetadataName;
            return $(cell).metadata()[p];
        }, type: "numeric"
    });
    // add default widgets
    ts.addWidget({
        id: "zebra",
        format: function (table) {
            if (table.config.debug) {
                var time = new Date();
            }
            var $tr, row = -1,
                odd;
            // loop through the visible rows
            $("tr:visible", table.tBodies[0]).each(function (i) {
                $tr = $(this);
                // style children rows the same way the parent
                // row was styled
                if (!$tr.hasClass(table.config.cssChildRow)) row++;
                odd = (row % 2 == 0);
                $tr.removeClass(
                table.config.widgetZebra.css[odd ? 0 : 1]).addClass(
                table.config.widgetZebra.css[odd ? 1 : 0])
            });
            if (table.config.debug) {
                $.tablesorter.benchmark("Applying Zebra widget", time);
            }
        }
    });
})(jQuery);
  
  
  (function($) {
	$.extend({
		tablesorterPager: new function() {
			
			function updatePageDisplay(c) {
				var s = $(c.cssPageDisplay,c.container).val((c.page+1) + c.seperator + c.totalPages);	
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				
				renderTable(table,c.rowsCopy);
			}
			
			function renderTable(table,rows) {
				
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body
				
				$.tablesorter.clearTableBody(table);
				
				for(var i = s; i < e; i++) {
					
					//tableBody.append(rows[i]);
					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						
						tableBody[0].appendChild(o[j]);

					}
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				
				updatePageDisplay(c);
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows);
			};
			
			this.defaults = {
				size: 10,
				offset: 0,
				page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.prev',
				cssFirst: '.first',
				cssLast: '.last',
				cssPageDisplay: '.pagedisplay',
				cssPageSize: '.pagesize',
				seperator: "/",
				positionFixed: true,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {	
					
					config = $.extend(this.config, $.tablesorterPager.defaults, settings);
					
					var table = this, pager = config.container;
				
					$(this).trigger("appendCache");
					
					config.size = parseInt($(".pagesize",pager).val());
					
					$(config.cssFirst,pager).click(function() {
						moveToFirstPage(table);
						return false;
					});
					$(config.cssNext,pager).click(function() {
						moveToNextPage(table);
						return false;
					});
					$(config.cssPrev,pager).click(function() {
						moveToPrevPage(table);
						return false;
					});
					$(config.cssLast,pager).click(function() {
						moveToLastPage(table);
						return false;
					});
					$(config.cssPageSize,pager).change(function() {
						setPageSize(table,parseInt($(this).val()));
						return false;
					});
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
        tablesorterPager: $.tablesorterPager.construct
	});
	
})(jQuery);			


(function(C,n){"object"===typeof exports?n(exports):"function"===typeof define&&define.amd?define(["exports"],n):n(C)})(this,function(C){function n(a){this._targetElement=a;this._introItems=[];this._options={nextLabel:"Next \x26rarr;",prevLabel:"\x26larr; Back",skipLabel:"Skip",doneLabel:"Done",hidePrev:!1,hideNext:!1,tooltipPosition:"bottom",tooltipClass:"",highlightClass:"",exitOnEsc:!0,exitOnOverlayClick:!0,showStepNumbers:!0,keyboardNavigation:!0,showButtons:!0,showBullets:!0,showProgress:!1,
scrollToElement:!0,scrollTo:"element",scrollPadding:30,overlayOpacity:.8,positionPrecedence:["bottom","top","right","left"],disableInteraction:!1,hintPosition:"top-middle",hintButtonLabel:"Got it",hintAnimation:!0}}function Z(a){var b,c=[],d=this;if(this._options.steps){var f=0;for(b=this._options.steps.length;f<b;f++){var e=y(this._options.steps[f]);e.step=c.length+1;"string"===typeof e.element&&(e.element=document.querySelector(e.element));if("undefined"===typeof e.element||null==e.element){var g=
document.querySelector(".introjsFloatingElement");null==g&&(g=document.createElement("div"),g.className="introjsFloatingElement",document.body.appendChild(g));e.element=g;e.position="floating"}e.scrollTo=e.scrollTo||this._options.scrollTo;"undefined"===typeof e.disableInteraction&&(e.disableInteraction=this._options.disableInteraction);null!=e.element&&c.push(e)}}else{g=a.querySelectorAll("*[data-intro]");if(1>g.length)return!1;for(var f=0,r=g.length;f<r;f++)if(e=g[f],"none"!=e.style.display){var q=
parseInt(e.getAttribute("data-step"),10);b=this._options.disableInteraction;"undefined"!=typeof e.getAttribute("data-disable-interaction")&&(b=!!e.getAttribute("data-disable-interaction"));0<q&&(c[q-1]={element:e,intro:e.getAttribute("data-intro"),step:parseInt(e.getAttribute("data-step"),10),tooltipClass:e.getAttribute("data-tooltipClass"),highlightClass:e.getAttribute("data-highlightClass"),position:e.getAttribute("data-position")||this._options.tooltipPosition,scrollTo:e.getAttribute("data-scrollTo")||
this._options.scrollTo,disableInteraction:b})}f=q=0;for(r=g.length;f<r;f++)if(e=g[f],null==e.getAttribute("data-step")){for(;"undefined"!=typeof c[q];)q++;b=this._options.disableInteraction;"undefined"!=typeof e.getAttribute("data-disable-interaction")&&(b=!!e.getAttribute("data-disable-interaction"));c[q]={element:e,intro:e.getAttribute("data-intro"),step:q+1,tooltipClass:e.getAttribute("data-tooltipClass"),highlightClass:e.getAttribute("data-highlightClass"),position:e.getAttribute("data-position")||
this._options.tooltipPosition,scrollTo:e.getAttribute("data-scrollTo")||this._options.scrollTo,disableInteraction:b}}}f=[];for(b=0;b<c.length;b++)c[b]&&f.push(c[b]);c=f;c.sort(function(a,b){return a.step-b.step});d._introItems=c;aa.call(d,a)&&(x.call(d),a.querySelector(".introjs-skipbutton"),a.querySelector(".introjs-nextbutton"),d._onKeyDown=function(b){if(27===b.keyCode&&1==d._options.exitOnEsc)z.call(d,a);else if(37===b.keyCode)E.call(d);else if(39===b.keyCode)x.call(d);else if(13===b.keyCode){var c=
b.target||b.srcElement;c&&0<c.className.indexOf("introjs-prevbutton")?E.call(d):c&&0<c.className.indexOf("introjs-skipbutton")?(d._introItems.length-1==d._currentStep&&"function"===typeof d._introCompleteCallback&&d._introCompleteCallback.call(d),z.call(d,a)):x.call(d);b.preventDefault?b.preventDefault():b.returnValue=!1}},d._onResize=function(a){d.refresh.call(d)},window.addEventListener?(this._options.keyboardNavigation&&window.addEventListener("keydown",d._onKeyDown,!0),window.addEventListener("resize",
d._onResize,!0)):document.attachEvent&&(this._options.keyboardNavigation&&document.attachEvent("onkeydown",d._onKeyDown),document.attachEvent("onresize",d._onResize)));return!1}function y(a){if(null==a||"object"!=typeof a||"undefined"!=typeof a.nodeType)return a;var b={},c;for(c in a)b[c]="undefined"!=typeof jQuery&&a[c]instanceof jQuery?a[c]:y(a[c]);return b}function x(){this._direction="forward";if("undefined"!==typeof this._currentStepNumber)for(var a=0,b=this._introItems.length;a<b;a++)this._introItems[a].step===
this._currentStepNumber&&(this._currentStep=a-1,this._currentStepNumber=void 0);"undefined"===typeof this._currentStep?this._currentStep=0:++this._currentStep;this._introItems.length<=this._currentStep?("function"===typeof this._introCompleteCallback&&this._introCompleteCallback.call(this),z.call(this,this._targetElement)):(a=this._introItems[this._currentStep],"undefined"!==typeof this._introBeforeChangeCallback&&this._introBeforeChangeCallback.call(this,a.element),O.call(this,a))}function E(){this._direction=
"backward";if(0===this._currentStep)return!1;var a=this._introItems[--this._currentStep];"undefined"!==typeof this._introBeforeChangeCallback&&this._introBeforeChangeCallback.call(this,a.element);O.call(this,a)}function z(a,b){var c=!0;void 0!=this._introBeforeExitCallback&&(c=this._introBeforeExitCallback.call(self));if(b||!1!==c){if((c=a.querySelectorAll(".introjs-overlay"))&&0<c.length)for(b=c.length-1;0<=b;b--){var d=c[b];d.style.opacity=0;setTimeout(function(){this.parentNode&&this.parentNode.removeChild(this)}.bind(d),
500)}(b=a.querySelector(".introjs-helperLayer"))&&b.parentNode.removeChild(b);(b=a.querySelector(".introjs-tooltipReferenceLayer"))&&b.parentNode.removeChild(b);(a=a.querySelector(".introjs-disableInteraction"))&&a.parentNode.removeChild(a);(a=document.querySelector(".introjsFloatingElement"))&&a.parentNode.removeChild(a);P();if((a=document.querySelectorAll(".introjs-fixParent"))&&0<a.length)for(b=a.length-1;0<=b;b--)a[b].className=a[b].className.replace(/introjs-fixParent/g,"").replace(/^\s+|\s+$/g,
"");window.removeEventListener?window.removeEventListener("keydown",this._onKeyDown,!0):document.detachEvent&&document.detachEvent("onkeydown",this._onKeyDown);void 0!=this._introExitCallback&&this._introExitCallback.call(self);this._currentStep=void 0}}function F(a,b,c,d,f){f=f||!1;b.style.top=null;b.style.right=null;b.style.bottom=null;b.style.left=null;b.style.marginLeft=null;b.style.marginTop=null;c.style.display="inherit";"undefined"!=typeof d&&null!=d&&(d.style.top=null,d.style.left=null);if(this._introItems[this._currentStep]){var e=
this._introItems[this._currentStep];e="string"===typeof e.tooltipClass?e.tooltipClass:this._options.tooltipClass;b.className=("introjs-tooltip "+e).replace(/^\s+|\s+$/g,"");var g=this._introItems[this._currentStep].position;"floating"!=g&&(g="auto"===g?Q.call(this,a,b):Q.call(this,a,b,g));e=u(a);a=u(b);var r=H();switch(g){case "top":c.className="introjs-arrow bottom";I(e,f?0:15,a,r,b);b.style.bottom=e.height+20+"px";break;case "right":b.style.left=e.width+20+"px";e.top+a.height>r.height?(c.className=
"introjs-arrow left-bottom",b.style.top="-"+(a.height-e.height-20)+"px"):c.className="introjs-arrow left";break;case "left":f||1!=this._options.showStepNumbers||(b.style.top="15px");e.top+a.height>r.height?(b.style.top="-"+(a.height-e.height-20)+"px",c.className="introjs-arrow right-bottom"):c.className="introjs-arrow right";b.style.right=e.width+20+"px";break;case "floating":c.style.display="none";b.style.left="50%";b.style.top="50%";b.style.marginLeft="-"+a.width/2+"px";b.style.marginTop="-"+a.height/
2+"px";"undefined"!=typeof d&&null!=d&&(d.style.left="-"+(a.width/2+18)+"px",d.style.top="-"+(a.height/2+18)+"px");break;case "bottom-right-aligned":c.className="introjs-arrow top-right";R(e,0,a,b);b.style.top=e.height+20+"px";break;case "bottom-middle-aligned":c.className="introjs-arrow top-middle";c=e.width/2-a.width/2;f&&(c+=5);R(e,c,a,b)&&(b.style.right=null,I(e,c,a,r,b));b.style.top=e.height+20+"px";break;default:c.className="introjs-arrow top",I(e,0,a,r,b),b.style.top=e.height+20+"px"}}}function I(a,
b,c,d,f){if(a.left+b+c.width>d.width)return f.style.left=d.width-c.width-a.left+"px",!1;f.style.left=b+"px";return!0}function R(a,b,c,d){if(0>a.left+a.width-b-c.width)return d.style.left=-a.left+"px",!1;d.style.right=b+"px";return!0}function Q(a,b,c){var d=this._options.positionPrecedence.slice(),f=H(),e=u(b).height+10;b=u(b).width+20;a=u(a);var g="floating";a.left+b>f.width||0>a.left+a.width/2-b?(t(d,"bottom"),t(d,"top")):(a.height+a.top+e>f.height&&t(d,"bottom"),0>a.top-e&&t(d,"top"));a.width+a.left+
b>f.width&&t(d,"right");0>a.left-b&&t(d,"left");0<d.length&&(g=d[0]);c&&"auto"!=c&&-1<d.indexOf(c)&&(g=c);return g}function t(a,b){-1<a.indexOf(b)&&a.splice(a.indexOf(b),1)}function w(a){if(a&&this._introItems[this._currentStep]){var b=this._introItems[this._currentStep],c=u(b.element),d=10;J(b.element)?a.className+=" introjs-fixedTooltip":a.className=a.className.replace(" introjs-fixedTooltip","");"floating"==b.position&&(d=0);a.setAttribute("style","width: "+(c.width+d)+"px; height:"+(c.height+
d)+"px; top:"+(c.top-5)+"px;left: "+(c.left-5)+"px;")}}function ba(){var a=document.querySelector(".introjs-disableInteraction");null===a&&(a=document.createElement("div"),a.className="introjs-disableInteraction",this._targetElement.appendChild(a));w.call(this,a)}function D(a){a.setAttribute("role","button");a.tabIndex=0}function O(a){"undefined"!==typeof this._introChangeCallback&&this._introChangeCallback.call(this,a.element);var b=this,c=document.querySelector(".introjs-helperLayer"),d=document.querySelector(".introjs-tooltipReferenceLayer"),
f="introjs-helperLayer";u(a.element);"string"===typeof a.highlightClass&&(f+=" "+a.highlightClass);"string"===typeof this._options.highlightClass&&(f+=" "+this._options.highlightClass);if(null!=c){var e=d.querySelector(".introjs-helperNumberLayer"),g=d.querySelector(".introjs-tooltiptext"),r=d.querySelector(".introjs-arrow"),q=d.querySelector(".introjs-tooltip");var l=d.querySelector(".introjs-skipbutton");var h=d.querySelector(".introjs-prevbutton");var k=d.querySelector(".introjs-nextbutton");c.className=
f;q.style.opacity=0;q.style.display="none";if(null!=e){var p=this._introItems[0<=a.step-2?a.step-2:0];if(null!=p&&"forward"==this._direction&&"floating"==p.position||"backward"==this._direction&&"floating"==a.position)e.style.opacity=0}w.call(b,c);w.call(b,d);if((p=document.querySelectorAll(".introjs-fixParent"))&&0<p.length)for(f=p.length-1;0<=f;f--)p[f].className=p[f].className.replace(/introjs-fixParent/g,"").replace(/^\s+|\s+$/g,"");P();b._lastShowElementTimer&&clearTimeout(b._lastShowElementTimer);
b._lastShowElementTimer=setTimeout(function(){null!=e&&(e.innerHTML=a.step);g.innerHTML=a.intro;q.style.display="block";F.call(b,a.element,q,r,e);b._options.showBullets&&(d.querySelector(".introjs-bullets li \x3e a.active").className="",d.querySelector('.introjs-bullets li \x3e a[data-stepnumber\x3d"'+a.step+'"]').className="active");d.querySelector(".introjs-progress .introjs-progressbar").setAttribute("style","width:"+S.call(b)+"%;");q.style.opacity=1;e&&(e.style.opacity=1);"undefined"!==typeof l&&
null!=l&&/introjs-donebutton/gi.test(l.className)?l.focus():"undefined"!==typeof k&&null!=k&&k.focus();T.call(b,a.scrollTo,a,g)},350)}else{var n=document.createElement("div");h=document.createElement("div");var c=document.createElement("div"),m=document.createElement("div"),t=document.createElement("div"),v=document.createElement("div"),G=document.createElement("div"),A=document.createElement("div");n.className=f;h.className="introjs-tooltipReferenceLayer";w.call(b,n);w.call(b,h);this._targetElement.appendChild(n);
this._targetElement.appendChild(h);c.className="introjs-arrow";t.className="introjs-tooltiptext";t.innerHTML=a.intro;v.className="introjs-bullets";!1===this._options.showBullets&&(v.style.display="none");for(var n=document.createElement("ul"),f=0,C=this._introItems.length;f<C;f++){var y=document.createElement("li"),B=document.createElement("a");B.onclick=function(){b.goToStep(this.getAttribute("data-stepnumber"))};f===a.step-1&&(B.className="active");D(B);B.innerHTML="\x26nbsp;";B.setAttribute("data-stepnumber",
this._introItems[f].step);y.appendChild(B);n.appendChild(y)}v.appendChild(n);G.className="introjs-progress";!1===this._options.showProgress&&(G.style.display="none");f=document.createElement("div");f.className="introjs-progressbar";f.setAttribute("style","width:"+S.call(this)+"%;");G.appendChild(f);A.className="introjs-tooltipbuttons";!1===this._options.showButtons&&(A.style.display="none");m.className="introjs-tooltip";m.appendChild(t);m.appendChild(v);m.appendChild(G);1==this._options.showStepNumbers&&
(p=document.createElement("span"),p.className="introjs-helperNumberLayer",p.innerHTML=a.step,h.appendChild(p));m.appendChild(c);h.appendChild(m);k=document.createElement("a");k.onclick=function(){b._introItems.length-1!=b._currentStep&&x.call(b)};D(k);k.innerHTML=this._options.nextLabel;h=document.createElement("a");h.onclick=function(){0!=b._currentStep&&E.call(b)};D(h);h.innerHTML=this._options.prevLabel;l=document.createElement("a");l.className="introjs-button introjs-skipbutton";D(l);l.innerHTML=
this._options.skipLabel;l.onclick=function(){b._introItems.length-1==b._currentStep&&"function"===typeof b._introCompleteCallback&&b._introCompleteCallback.call(b);z.call(b,b._targetElement)};A.appendChild(l);1<this._introItems.length&&(A.appendChild(h),A.appendChild(k));m.appendChild(A);F.call(b,a.element,m,c,p);T.call(this,a.scrollTo,a,m)}(p=b._targetElement.querySelector(".introjs-disableInteraction"))&&p.parentNode.removeChild(p);a.disableInteraction&&ba.call(b);"undefined"!==typeof k&&null!=
k&&k.removeAttribute("tabIndex");"undefined"!==typeof h&&null!=h&&h.removeAttribute("tabIndex");0==this._currentStep&&1<this._introItems.length?("undefined"!==typeof l&&null!=l&&(l.className="introjs-button introjs-skipbutton"),"undefined"!==typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton"),1==this._options.hidePrev?("undefined"!==typeof h&&null!=h&&(h.className="introjs-button introjs-prevbutton introjs-hidden"),"undefined"!==typeof k&&null!=k&&(k.className+=" introjs-fullbutton")):
"undefined"!==typeof h&&null!=h&&(h.className="introjs-button introjs-prevbutton introjs-disabled"),"undefined"!==typeof h&&null!=h&&(h.tabIndex="-1"),"undefined"!==typeof l&&null!=l&&(l.innerHTML=this._options.skipLabel)):this._introItems.length-1==this._currentStep||1==this._introItems.length?("undefined"!==typeof l&&null!=l&&(l.innerHTML=this._options.doneLabel,l.className+=" introjs-donebutton"),"undefined"!==typeof h&&null!=h&&(h.className="introjs-button introjs-prevbutton"),1==this._options.hideNext?
("undefined"!==typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton introjs-hidden"),"undefined"!==typeof h&&null!=h&&(h.className+=" introjs-fullbutton")):"undefined"!==typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton introjs-disabled"),"undefined"!==typeof k&&null!=k&&(k.tabIndex="-1")):("undefined"!==typeof l&&null!=l&&(l.className="introjs-button introjs-skipbutton"),"undefined"!==typeof h&&null!=h&&(h.className="introjs-button introjs-prevbutton"),"undefined"!==
typeof k&&null!=k&&(k.className="introjs-button introjs-nextbutton"),"undefined"!==typeof l&&null!=l&&(l.innerHTML=this._options.skipLabel));"undefined"!==typeof k&&null!=k&&k.focus();ca(a);"undefined"!==typeof this._introAfterChangeCallback&&this._introAfterChangeCallback.call(this,a.element)}function T(a,b,c){this._options.scrollToElement&&(a="tooltip"===a?c.getBoundingClientRect():b.element.getBoundingClientRect(),c=b.element.getBoundingClientRect(),0<=c.top&&0<=c.left&&c.bottom+80<=window.innerHeight&&
c.right<=window.innerWidth||(c=H().height,0>a.bottom-(a.bottom-a.top)||b.element.clientHeight>c?window.scrollBy(0,a.top-(c/2-a.height/2)-this._options.scrollPadding):window.scrollBy(0,a.top-(c/2-a.height/2)+this._options.scrollPadding)))}function P(){for(var a=document.querySelectorAll(".introjs-showElement"),b=0,c=a.length;b<c;b++){var d=a[b],f=/introjs-[a-zA-Z]+/g;if(d instanceof SVGElement){var e=d.getAttribute("class")||"";d.setAttribute("class",e.replace(f,"").replace(/^\s+|\s+$/g,""))}else d.className=
d.className.replace(f,"").replace(/^\s+|\s+$/g,"")}}function ca(a){var b;if(a.element instanceof SVGElement)for(b=a.element.parentNode;null!=a.element.parentNode&&b.tagName&&"body"!==b.tagName.toLowerCase();)"svg"===b.tagName.toLowerCase()&&K(b,"introjs-showElement introjs-relativePosition"),b=b.parentNode;K(a.element,"introjs-showElement");b=m(a.element,"position");"absolute"!==b&&"relative"!==b&&"fixed"!==b&&K(a.element,"introjs-relativePosition");for(b=a.element.parentNode;null!=b&&b.tagName&&
"body"!==b.tagName.toLowerCase();){a=m(b,"z-index");var c=parseFloat(m(b,"opacity")),d=m(b,"transform")||m(b,"-webkit-transform")||m(b,"-moz-transform")||m(b,"-ms-transform")||m(b,"-o-transform");if(/[0-9]+/.test(a)||1>c||"none"!==d&&void 0!==d)b.className+=" introjs-fixParent";b=b.parentNode}}function K(a,b){if(a instanceof SVGElement){var c=a.getAttribute("class")||"";a.setAttribute("class",c+" "+b)}else a.className+=" "+b}function m(a,b){var c="";a.currentStyle?c=a.currentStyle[b]:document.defaultView&&
document.defaultView.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,null).getPropertyValue(b));return c&&c.toLowerCase?c.toLowerCase():c}function J(a){var b=a.parentNode;return b&&"HTML"!==b.nodeName?"fixed"==m(a,"position")?!0:J(b):!1}function H(){if(void 0!=window.innerWidth)return{width:window.innerWidth,height:window.innerHeight};var a=document.documentElement;return{width:a.clientWidth,height:a.clientHeight}}function aa(a){var b=document.createElement("div"),c="",d=this;b.className=
"introjs-overlay";if(a.tagName&&"body"!==a.tagName.toLowerCase()){var f=u(a);f&&(c+="width: "+f.width+"px; height:"+f.height+"px; top:"+f.top+"px;left: "+f.left+"px;",b.setAttribute("style",c))}else c+="top: 0;bottom: 0; left: 0;right: 0;position: fixed;",b.setAttribute("style",c);a.appendChild(b);b.onclick=function(){1==d._options.exitOnOverlayClick&&z.call(d,a)};setTimeout(function(){c+="opacity: "+d._options.overlayOpacity.toString()+";";b.setAttribute("style",c)},10);return!0}function v(){var a=
this._targetElement.querySelector(".introjs-hintReference");if(a){var b=a.getAttribute("data-step");a.parentNode.removeChild(a);return b}}function U(a){this._introItems=[];if(this._options.hints){a=0;for(var b=this._options.hints.length;a<b;a++){var c=y(this._options.hints[a]);"string"===typeof c.element&&(c.element=document.querySelector(c.element));c.hintPosition=c.hintPosition||this._options.hintPosition;c.hintAnimation=c.hintAnimation||this._options.hintAnimation;null!=c.element&&this._introItems.push(c)}}else{c=
a.querySelectorAll("*[data-hint]");if(1>c.length)return!1;a=0;for(b=c.length;a<b;a++){var d=c[a],f=d.getAttribute("data-hintAnimation"),f=f?"true"==f:this._options.hintAnimation;this._introItems.push({element:d,hint:d.getAttribute("data-hint"),hintPosition:d.getAttribute("data-hintPosition")||this._options.hintPosition,hintAnimation:f,tooltipClass:d.getAttribute("data-tooltipClass"),position:d.getAttribute("data-position")||this._options.tooltipPosition})}}da.call(this);document.addEventListener?
(document.addEventListener("click",v.bind(this),!1),window.addEventListener("resize",L.bind(this),!0)):document.attachEvent&&(document.attachEvent("onclick",v.bind(this)),document.attachEvent("onresize",L.bind(this)))}function L(){for(var a=0,b=this._introItems.length;a<b;a++){var c=this._introItems[a];"undefined"!=typeof c.targetElement&&V.call(this,c.hintPosition,c.element,c.targetElement)}}function M(a){v.call(this);var b=this._targetElement.querySelector('.introjs-hint[data-step\x3d"'+a+'"]');
b&&(b.className+=" introjs-hidehint");"undefined"!==typeof this._hintCloseCallback&&this._hintCloseCallback.call(this,a)}function W(a){if(a=this._targetElement.querySelector('.introjs-hint[data-step\x3d"'+a+'"]'))a.className=a.className.replace(/introjs\-hidehint/g,"")}function X(a){(a=this._targetElement.querySelector('.introjs-hint[data-step\x3d"'+a+'"]'))&&a.parentNode.removeChild(a)}function da(){var a=this;var b=document.querySelector(".introjs-hints");null==b&&(b=document.createElement("div"),
b.className="introjs-hints");for(var c=0,d=this._introItems.length;c<d;c++){var f=this._introItems[c];if(!document.querySelector('.introjs-hint[data-step\x3d"'+c+'"]')){var e=document.createElement("a");D(e);(function(b,c,d){b.onclick=function(b){b=b?b:window.event;b.stopPropagation&&b.stopPropagation();null!=b.cancelBubble&&(b.cancelBubble=!0);Y.call(a,d)}})(e,f,c);e.className="introjs-hint";f.hintAnimation||(e.className+=" introjs-hint-no-anim");J(f.element)&&(e.className+=" introjs-fixedhint");
var g=document.createElement("div");g.className="introjs-hint-dot";var m=document.createElement("div");m.className="introjs-hint-pulse";e.appendChild(g);e.appendChild(m);e.setAttribute("data-step",c);f.targetElement=f.element;f.element=e;V.call(this,f.hintPosition,e,f.targetElement);b.appendChild(e)}}document.body.appendChild(b);"undefined"!==typeof this._hintsAddedCallback&&this._hintsAddedCallback.call(this)}function V(a,b,c){c=u.call(this,c);switch(a){default:case "top-left":b.style.left=c.left+
"px";b.style.top=c.top+"px";break;case "top-right":b.style.left=c.left+c.width-20+"px";b.style.top=c.top+"px";break;case "bottom-left":b.style.left=c.left+"px";b.style.top=c.top+c.height-20+"px";break;case "bottom-right":b.style.left=c.left+c.width-20+"px";b.style.top=c.top+c.height-20+"px";break;case "middle-left":b.style.left=c.left+"px";b.style.top=c.top+(c.height-20)/2+"px";break;case "middle-right":b.style.left=c.left+c.width-20+"px";b.style.top=c.top+(c.height-20)/2+"px";break;case "middle-middle":b.style.left=
c.left+(c.width-20)/2+"px";b.style.top=c.top+(c.height-20)/2+"px";break;case "bottom-middle":b.style.left=c.left+(c.width-20)/2+"px";b.style.top=c.top+c.height-20+"px";break;case "top-middle":b.style.left=c.left+(c.width-20)/2+"px",b.style.top=c.top+"px"}}function Y(a){var b=document.querySelector('.introjs-hint[data-step\x3d"'+a+'"]'),c=this._introItems[a];"undefined"!==typeof this._hintClickCallback&&this._hintClickCallback.call(this,b,c,a);var d=v.call(this);if(parseInt(d,10)!=a){var d=document.createElement("div"),
f=document.createElement("div"),e=document.createElement("div"),g=document.createElement("div");d.className="introjs-tooltip";d.onclick=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0};f.className="introjs-tooltiptext";var m=document.createElement("p");m.innerHTML=c.hint;c=document.createElement("a");c.className="introjs-button";c.innerHTML=this._options.hintButtonLabel;c.onclick=M.bind(this,a);f.appendChild(m);f.appendChild(c);e.className="introjs-arrow";d.appendChild(e);d.appendChild(f);
this._currentStep=b.getAttribute("data-step");g.className="introjs-tooltipReferenceLayer introjs-hintReference";g.setAttribute("data-step",b.getAttribute("data-step"));w.call(this,g);g.appendChild(d);document.body.appendChild(g);F.call(this,b,d,e,null,!0)}}function u(a){var b={},c=document.body,d=document.documentElement,f=window.pageYOffset||d.scrollTop||c.scrollTop,c=window.pageXOffset||d.scrollLeft||c.scrollLeft;if(a instanceof SVGElement)a=a.getBoundingClientRect(),b.top=a.top+f,b.width=a.width,
b.height=a.height,b.left=a.left+c;else{b.width=a.offsetWidth;b.height=a.offsetHeight;for(c=f=0;a&&!isNaN(a.offsetLeft)&&!isNaN(a.offsetTop);)f+=a.offsetLeft,c+=a.offsetTop,a=a.offsetParent;b.top=c;b.left=f}return b}function S(){return parseInt(this._currentStep+1,10)/this._introItems.length*100}var N=function(a){if("object"===typeof a)return new n(a);if("string"===typeof a){if(a=document.querySelector(a))return new n(a);throw Error("There is no element with given selector.");}return new n(document.body)};
N.version="2.7.0";N.fn=n.prototype={clone:function(){return new n(this)},setOption:function(a,b){this._options[a]=b;return this},setOptions:function(a){var b=this._options,c={},d;for(d in b)c[d]=b[d];for(d in a)c[d]=a[d];this._options=c;return this},start:function(){Z.call(this,this._targetElement);return this},goToStep:function(a){this._currentStep=a-2;"undefined"!==typeof this._introItems&&x.call(this);return this},addStep:function(a){this._options.steps||(this._options.steps=[]);this._options.steps.push(a);
return this},addSteps:function(a){if(a.length){for(var b=0;b<a.length;b++)this.addStep(a[b]);return this}},goToStepNumber:function(a){this._currentStepNumber=a;"undefined"!==typeof this._introItems&&x.call(this);return this},nextStep:function(){x.call(this);return this},previousStep:function(){E.call(this);return this},exit:function(a){z.call(this,this._targetElement,a);return this},refresh:function(){w.call(this,document.querySelector(".introjs-helperLayer"));w.call(this,document.querySelector(".introjs-tooltipReferenceLayer"));
if(void 0!==this._currentStep&&null!==this._currentStep){var a=document.querySelector(".introjs-helperNumberLayer"),b=document.querySelector(".introjs-arrow"),c=document.querySelector(".introjs-tooltip");F.call(this,this._introItems[this._currentStep].element,c,b,a)}L.call(this);return this},onbeforechange:function(a){if("function"===typeof a)this._introBeforeChangeCallback=a;else throw Error("Provided callback for onbeforechange was not a function");return this},onchange:function(a){if("function"===
typeof a)this._introChangeCallback=a;else throw Error("Provided callback for onchange was not a function.");return this},onafterchange:function(a){if("function"===typeof a)this._introAfterChangeCallback=a;else throw Error("Provided callback for onafterchange was not a function");return this},oncomplete:function(a){if("function"===typeof a)this._introCompleteCallback=a;else throw Error("Provided callback for oncomplete was not a function.");return this},onhintsadded:function(a){if("function"===typeof a)this._hintsAddedCallback=
a;else throw Error("Provided callback for onhintsadded was not a function.");return this},onhintclick:function(a){if("function"===typeof a)this._hintClickCallback=a;else throw Error("Provided callback for onhintclick was not a function.");return this},onhintclose:function(a){if("function"===typeof a)this._hintCloseCallback=a;else throw Error("Provided callback for onhintclose was not a function.");return this},onexit:function(a){if("function"===typeof a)this._introExitCallback=a;else throw Error("Provided callback for onexit was not a function.");
return this},onbeforeexit:function(a){if("function"===typeof a)this._introBeforeExitCallback=a;else throw Error("Provided callback for onbeforeexit was not a function.");return this},addHints:function(){U.call(this,this._targetElement);return this},hideHint:function(a){M.call(this,a);return this},hideHints:function(){var a=this._targetElement.querySelectorAll(".introjs-hint");if(a&&0<a.length)for(var b=0;b<a.length;b++)M.call(this,a[b].getAttribute("data-step"));return this},showHint:function(a){W.call(this,
a);return this},showHints:function(){var a=this._targetElement.querySelectorAll(".introjs-hint");if(a&&0<a.length)for(var b=0;b<a.length;b++)W.call(this,a[b].getAttribute("data-step"));else U.call(this,this._targetElement);return this},removeHints:function(){var a=this._targetElement.querySelectorAll(".introjs-hint");if(a&&0<a.length)for(var b=0;b<a.length;b++)X.call(this,a[b].getAttribute("data-step"));return this},removeHint:function(a){X.call(this,a);return this},showHintDialog:function(a){Y.call(this,
a);return this}};return C.introJs=N});	

/*! List.js v1.5.0 (http://listjs.com) by Jonny StrÃ¶mberg (http://javve.com) */
var List=function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};return e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=11)}([function(t,e,r){function n(t){if(!t||!t.nodeType)throw new Error("A DOM element reference is required");this.el=t,this.list=t.classList}var i=r(4),s=/\s+/;Object.prototype.toString;t.exports=function(t){return new n(t)},n.prototype.add=function(t){if(this.list)return this.list.add(t),this;var e=this.array(),r=i(e,t);return~r||e.push(t),this.el.className=e.join(" "),this},n.prototype.remove=function(t){if(this.list)return this.list.remove(t),this;var e=this.array(),r=i(e,t);return~r&&e.splice(r,1),this.el.className=e.join(" "),this},n.prototype.toggle=function(t,e){return this.list?("undefined"!=typeof e?e!==this.list.toggle(t,e)&&this.list.toggle(t):this.list.toggle(t),this):("undefined"!=typeof e?e?this.add(t):this.remove(t):this.has(t)?this.remove(t):this.add(t),this)},n.prototype.array=function(){var t=this.el.getAttribute("class")||"",e=t.replace(/^\s+|\s+$/g,""),r=e.split(s);return""===r[0]&&r.shift(),r},n.prototype.has=n.prototype.contains=function(t){return this.list?this.list.contains(t):!!~i(this.array(),t)}},function(t,e,r){var n=window.addEventListener?"addEventListener":"attachEvent",i=window.removeEventListener?"removeEventListener":"detachEvent",s="addEventListener"!==n?"on":"",a=r(5);e.bind=function(t,e,r,i){t=a(t);for(var o=0;o<t.length;o++)t[o][n](s+e,r,i||!1)},e.unbind=function(t,e,r,n){t=a(t);for(var o=0;o<t.length;o++)t[o][i](s+e,r,n||!1)}},function(t,e){t.exports=function(t){return function(e,r,n){var i=this;this._values={},this.found=!1,this.filtered=!1;var s=function(e,r,n){if(void 0===r)n?i.values(e,n):i.values(e);else{i.elm=r;var s=t.templater.get(i,e);i.values(s)}};this.values=function(e,r){if(void 0===e)return i._values;for(var n in e)i._values[n]=e[n];r!==!0&&t.templater.set(i,i.values())},this.show=function(){t.templater.show(i)},this.hide=function(){t.templater.hide(i)},this.matching=function(){return t.filtered&&t.searched&&i.found&&i.filtered||t.filtered&&!t.searched&&i.filtered||!t.filtered&&t.searched&&i.found||!t.filtered&&!t.searched},this.visible=function(){return!(!i.elm||i.elm.parentNode!=t.list)},s(e,r,n)}}},function(t,e){var r=function(t,e,r){return r?t.getElementsByClassName(e)[0]:t.getElementsByClassName(e)},n=function(t,e,r){return e="."+e,r?t.querySelector(e):t.querySelectorAll(e)},i=function(t,e,r){for(var n=[],i="*",s=t.getElementsByTagName(i),a=s.length,o=new RegExp("(^|\\s)"+e+"(\\s|$)"),l=0,u=0;l<a;l++)if(o.test(s[l].className)){if(r)return s[l];n[u]=s[l],u++}return n};t.exports=function(){return function(t,e,s,a){return a=a||{},a.test&&a.getElementsByClassName||!a.test&&document.getElementsByClassName?r(t,e,s):a.test&&a.querySelector||!a.test&&document.querySelector?n(t,e,s):i(t,e,s)}}()},function(t,e){var r=[].indexOf;t.exports=function(t,e){if(r)return t.indexOf(e);for(var n=0;n<t.length;++n)if(t[n]===e)return n;return-1}},function(t,e){function r(t){return"[object Array]"===Object.prototype.toString.call(t)}t.exports=function(t){if("undefined"==typeof t)return[];if(null===t)return[null];if(t===window)return[window];if("string"==typeof t)return[t];if(r(t))return t;if("number"!=typeof t.length)return[t];if("function"==typeof t&&t instanceof Function)return[t];for(var e=[],n=0;n<t.length;n++)(Object.prototype.hasOwnProperty.call(t,n)||n in t)&&e.push(t[n]);return e.length?e:[]}},function(t,e){t.exports=function(t){return t=void 0===t?"":t,t=null===t?"":t,t=t.toString()}},function(t,e){t.exports=function(t){for(var e,r=Array.prototype.slice.call(arguments,1),n=0;e=r[n];n++)if(e)for(var i in e)t[i]=e[i];return t}},function(t,e){t.exports=function(t){var e=function(r,n,i){var s=r.splice(0,50);i=i||[],i=i.concat(t.add(s)),r.length>0?setTimeout(function(){e(r,n,i)},1):(t.update(),n(i))};return e}},function(t,e){t.exports=function(t){return t.handlers.filterStart=t.handlers.filterStart||[],t.handlers.filterComplete=t.handlers.filterComplete||[],function(e){if(t.trigger("filterStart"),t.i=1,t.reset.filter(),void 0===e)t.filtered=!1;else{t.filtered=!0;for(var r=t.items,n=0,i=r.length;n<i;n++){var s=r[n];e(s)?s.filtered=!0:s.filtered=!1}}return t.update(),t.trigger("filterComplete"),t.visibleItems}}},function(t,e,r){var n=(r(0),r(1)),i=r(7),s=r(6),a=r(3),o=r(19);t.exports=function(t,e){e=e||{},e=i({location:0,distance:100,threshold:.4,multiSearch:!0,searchClass:"fuzzy-search"},e);var r={search:function(n,i){for(var s=e.multiSearch?n.replace(/ +$/,"").split(/ +/):[n],a=0,o=t.items.length;a<o;a++)r.item(t.items[a],i,s)},item:function(t,e,n){for(var i=!0,s=0;s<n.length;s++){for(var a=!1,o=0,l=e.length;o<l;o++)r.values(t.values(),e[o],n[s])&&(a=!0);a||(i=!1)}t.found=i},values:function(t,r,n){if(t.hasOwnProperty(r)){var i=s(t[r]).toLowerCase();if(o(i,n,e))return!0}return!1}};return n.bind(a(t.listContainer,e.searchClass),"keyup",function(e){var n=e.target||e.srcElement;t.search(n.value,r.search)}),function(e,n){t.search(e,n,r.search)}}},function(t,e,r){var n=r(18),i=r(3),s=r(7),a=r(4),o=r(1),l=r(6),u=r(0),c=r(17),f=r(5);t.exports=function(t,e,h){var d,v=this,m=r(2)(v),g=r(8)(v),p=r(12)(v);d={start:function(){v.listClass="list",v.searchClass="search",v.sortClass="sort",v.page=1e4,v.i=1,v.items=[],v.visibleItems=[],v.matchingItems=[],v.searched=!1,v.filtered=!1,v.searchColumns=void 0,v.handlers={updated:[]},v.valueNames=[],v.utils={getByClass:i,extend:s,indexOf:a,events:o,toString:l,naturalSort:n,classes:u,getAttribute:c,toArray:f},v.utils.extend(v,e),v.listContainer="string"==typeof t?document.getElementById(t):t,v.listContainer&&(v.list=i(v.listContainer,v.listClass,!0),v.parse=r(13)(v),v.templater=r(16)(v),v.search=r(14)(v),v.filter=r(9)(v),v.sort=r(15)(v),v.fuzzySearch=r(10)(v,e.fuzzySearch),this.handlers(),this.items(),this.pagination(),v.update())},handlers:function(){for(var t in v.handlers)v[t]&&v.on(t,v[t])},items:function(){v.parse(v.list),void 0!==h&&v.add(h)},pagination:function(){if(void 0!==e.pagination){e.pagination===!0&&(e.pagination=[{}]),void 0===e.pagination[0]&&(e.pagination=[e.pagination]);for(var t=0,r=e.pagination.length;t<r;t++)p(e.pagination[t])}}},this.reIndex=function(){v.items=[],v.visibleItems=[],v.matchingItems=[],v.searched=!1,v.filtered=!1,v.parse(v.list)},this.toJSON=function(){for(var t=[],e=0,r=v.items.length;e<r;e++)t.push(v.items[e].values());return t},this.add=function(t,e){if(0!==t.length){if(e)return void g(t,e);var r=[],n=!1;void 0===t[0]&&(t=[t]);for(var i=0,s=t.length;i<s;i++){var a=null;n=v.items.length>v.page,a=new m(t[i],void 0,n),v.items.push(a),r.push(a)}return v.update(),r}},this.show=function(t,e){return this.i=t,this.page=e,v.update(),v},this.remove=function(t,e,r){for(var n=0,i=0,s=v.items.length;i<s;i++)v.items[i].values()[t]==e&&(v.templater.remove(v.items[i],r),v.items.splice(i,1),s--,i--,n++);return v.update(),n},this.get=function(t,e){for(var r=[],n=0,i=v.items.length;n<i;n++){var s=v.items[n];s.values()[t]==e&&r.push(s)}return r},this.size=function(){return v.items.length},this.clear=function(){return v.templater.clear(),v.items=[],v},this.on=function(t,e){return v.handlers[t].push(e),v},this.off=function(t,e){var r=v.handlers[t],n=a(r,e);return n>-1&&r.splice(n,1),v},this.trigger=function(t){for(var e=v.handlers[t].length;e--;)v.handlers[t][e](v);return v},this.reset={filter:function(){for(var t=v.items,e=t.length;e--;)t[e].filtered=!1;return v},search:function(){for(var t=v.items,e=t.length;e--;)t[e].found=!1;return v}},this.update=function(){var t=v.items,e=t.length;v.visibleItems=[],v.matchingItems=[],v.templater.clear();for(var r=0;r<e;r++)t[r].matching()&&v.matchingItems.length+1>=v.i&&v.visibleItems.length<v.page?(t[r].show(),v.visibleItems.push(t[r]),v.matchingItems.push(t[r])):t[r].matching()?(v.matchingItems.push(t[r]),t[r].hide()):t[r].hide();return v.trigger("updated"),v},d.start()}},function(t,e,r){var n=r(0),i=r(1),s=r(11);t.exports=function(t){var e=function(e,i){var s,o=t.matchingItems.length,l=t.i,u=t.page,c=Math.ceil(o/u),f=Math.ceil(l/u),h=i.innerWindow||2,d=i.left||i.outerWindow||0,v=i.right||i.outerWindow||0;v=c-v,e.clear();for(var m=1;m<=c;m++){var g=f===m?"active":"";r.number(m,d,v,f,h)?(s=e.add({page:m,dotted:!1})[0],g&&n(s.elm).add(g),a(s.elm,m,u)):r.dotted(e,m,d,v,f,h,e.size())&&(s=e.add({page:"...",dotted:!0})[0],n(s.elm).add("disabled"))}},r={number:function(t,e,r,n,i){return this.left(t,e)||this.right(t,r)||this.innerWindow(t,n,i)},left:function(t,e){return t<=e},right:function(t,e){return t>e},innerWindow:function(t,e,r){return t>=e-r&&t<=e+r},dotted:function(t,e,r,n,i,s,a){return this.dottedLeft(t,e,r,n,i,s)||this.dottedRight(t,e,r,n,i,s,a)},dottedLeft:function(t,e,r,n,i,s){return e==r+1&&!this.innerWindow(e,i,s)&&!this.right(e,n)},dottedRight:function(t,e,r,n,i,s,a){return!t.items[a-1].values().dotted&&(e==n&&!this.innerWindow(e,i,s)&&!this.right(e,n))}},a=function(e,r,n){i.bind(e,"click",function(){t.show((r-1)*n+1,n)})};return function(r){var n=new s(t.listContainer.id,{listClass:r.paginationClass||"pagination",item:"<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",valueNames:["page","dotted"],searchClass:"pagination-search-that-is-not-supposed-to-exist",sortClass:"pagination-sort-that-is-not-supposed-to-exist"});t.on("updated",function(){e(n,r)}),e(n,r)}}},function(t,e,r){t.exports=function(t){var e=r(2)(t),n=function(t){for(var e=t.childNodes,r=[],n=0,i=e.length;n<i;n++)void 0===e[n].data&&r.push(e[n]);return r},i=function(r,n){for(var i=0,s=r.length;i<s;i++)t.items.push(new e(n,r[i]))},s=function(e,r){var n=e.splice(0,50);i(n,r),e.length>0?setTimeout(function(){s(e,r)},1):(t.update(),t.trigger("parseComplete"))};return t.handlers.parseComplete=t.handlers.parseComplete||[],function(){var e=n(t.list),r=t.valueNames;t.indexAsync?s(e,r):i(e,r)}}},function(t,e){t.exports=function(t){var e,r,n,i,s={resetList:function(){t.i=1,t.templater.clear(),i=void 0},setOptions:function(t){2==t.length&&t[1]instanceof Array?r=t[1]:2==t.length&&"function"==typeof t[1]?(r=void 0,i=t[1]):3==t.length?(r=t[1],i=t[2]):r=void 0},setColumns:function(){0!==t.items.length&&void 0===r&&(r=void 0===t.searchColumns?s.toArray(t.items[0].values()):t.searchColumns)},setSearchString:function(e){e=t.utils.toString(e).toLowerCase(),e=e.replace(/[-[\]{}()*+?.,\\^$|#]/g,"\\$&"),n=e},toArray:function(t){var e=[];for(var r in t)e.push(r);return e}},a={list:function(){for(var e=0,r=t.items.length;e<r;e++)a.item(t.items[e])},item:function(t){t.found=!1;for(var e=0,n=r.length;e<n;e++)if(a.values(t.values(),r[e]))return void(t.found=!0)},values:function(r,i){return!!(r.hasOwnProperty(i)&&(e=t.utils.toString(r[i]).toLowerCase(),""!==n&&e.search(n)>-1))},reset:function(){t.reset.search(),t.searched=!1}},o=function(e){return t.trigger("searchStart"),s.resetList(),s.setSearchString(e),s.setOptions(arguments),s.setColumns(),""===n?a.reset():(t.searched=!0,i?i(n,r):a.list()),t.update(),t.trigger("searchComplete"),t.visibleItems};return t.handlers.searchStart=t.handlers.searchStart||[],t.handlers.searchComplete=t.handlers.searchComplete||[],t.utils.events.bind(t.utils.getByClass(t.listContainer,t.searchClass),"keyup",function(e){var r=e.target||e.srcElement,n=""===r.value&&!t.searched;n||o(r.value)}),t.utils.events.bind(t.utils.getByClass(t.listContainer,t.searchClass),"input",function(t){var e=t.target||t.srcElement;""===e.value&&o("")}),o}},function(t,e){t.exports=function(t){var e={els:void 0,clear:function(){for(var r=0,n=e.els.length;r<n;r++)t.utils.classes(e.els[r]).remove("asc"),t.utils.classes(e.els[r]).remove("desc")},getOrder:function(e){var r=t.utils.getAttribute(e,"data-order");return"asc"==r||"desc"==r?r:t.utils.classes(e).has("desc")?"asc":t.utils.classes(e).has("asc")?"desc":"asc"},getInSensitive:function(e,r){var n=t.utils.getAttribute(e,"data-insensitive");"false"===n?r.insensitive=!1:r.insensitive=!0},setOrder:function(r){for(var n=0,i=e.els.length;n<i;n++){var s=e.els[n];if(t.utils.getAttribute(s,"data-sort")===r.valueName){var a=t.utils.getAttribute(s,"data-order");"asc"==a||"desc"==a?a==r.order&&t.utils.classes(s).add(r.order):t.utils.classes(s).add(r.order)}}}},r=function(){t.trigger("sortStart");var r={},n=arguments[0].currentTarget||arguments[0].srcElement||void 0;n?(r.valueName=t.utils.getAttribute(n,"data-sort"),e.getInSensitive(n,r),r.order=e.getOrder(n)):(r=arguments[1]||r,r.valueName=arguments[0],r.order=r.order||"asc",r.insensitive="undefined"==typeof r.insensitive||r.insensitive),e.clear(),e.setOrder(r);var i,s=r.sortFunction||t.sortFunction||null,a="desc"===r.order?-1:1;i=s?function(t,e){return s(t,e,r)*a}:function(e,n){var i=t.utils.naturalSort;return i.alphabet=t.alphabet||r.alphabet||void 0,!i.alphabet&&r.insensitive&&(i=t.utils.naturalSort.caseInsensitive),i(e.values()[r.valueName],n.values()[r.valueName])*a},t.items.sort(i),t.update(),t.trigger("sortComplete")};return t.handlers.sortStart=t.handlers.sortStart||[],t.handlers.sortComplete=t.handlers.sortComplete||[],e.els=t.utils.getByClass(t.listContainer,t.sortClass),t.utils.events.bind(e.els,"click",r),t.on("searchStart",e.clear),t.on("filterStart",e.clear),r}},function(t,e){var r=function(t){var e,r=this,n=function(){e=r.getItemSource(t.item),e&&(e=r.clearSourceItem(e,t.valueNames))};this.clearSourceItem=function(e,r){for(var n=0,i=r.length;n<i;n++){var s;if(r[n].data)for(var a=0,o=r[n].data.length;a<o;a++)e.setAttribute("data-"+r[n].data[a],"");else r[n].attr&&r[n].name?(s=t.utils.getByClass(e,r[n].name,!0),s&&s.setAttribute(r[n].attr,"")):(s=t.utils.getByClass(e,r[n],!0),s&&(s.innerHTML=""));s=void 0}return e},this.getItemSource=function(e){if(void 0===e){for(var r=t.list.childNodes,n=0,i=r.length;n<i;n++)if(void 0===r[n].data)return r[n].cloneNode(!0)}else{if(/<tr[\s>]/g.exec(e)){var s=document.createElement("tbody");return s.innerHTML=e,s.firstChild}if(e.indexOf("<")!==-1){var a=document.createElement("div");return a.innerHTML=e,a.firstChild}var o=document.getElementById(t.item);if(o)return o}},this.get=function(e,n){r.create(e);for(var i={},s=0,a=n.length;s<a;s++){var o;if(n[s].data)for(var l=0,u=n[s].data.length;l<u;l++)i[n[s].data[l]]=t.utils.getAttribute(e.elm,"data-"+n[s].data[l]);else n[s].attr&&n[s].name?(o=t.utils.getByClass(e.elm,n[s].name,!0),i[n[s].name]=o?t.utils.getAttribute(o,n[s].attr):""):(o=t.utils.getByClass(e.elm,n[s],!0),i[n[s]]=o?o.innerHTML:"");o=void 0}return i},this.set=function(e,n){var i=function(e){for(var r=0,n=t.valueNames.length;r<n;r++)if(t.valueNames[r].data){for(var i=t.valueNames[r].data,s=0,a=i.length;s<a;s++)if(i[s]===e)return{data:e}}else{if(t.valueNames[r].attr&&t.valueNames[r].name&&t.valueNames[r].name==e)return t.valueNames[r];if(t.valueNames[r]===e)return e}},s=function(r,n){var s,a=i(r);a&&(a.data?e.elm.setAttribute("data-"+a.data,n):a.attr&&a.name?(s=t.utils.getByClass(e.elm,a.name,!0),s&&s.setAttribute(a.attr,n)):(s=t.utils.getByClass(e.elm,a,!0),s&&(s.innerHTML=n)),s=void 0)};if(!r.create(e))for(var a in n)n.hasOwnProperty(a)&&s(a,n[a])},this.create=function(t){if(void 0!==t.elm)return!1;if(void 0===e)throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");var n=e.cloneNode(!0);return n.removeAttribute("id"),t.elm=n,r.set(t,t.values()),!0},this.remove=function(e){e.elm.parentNode===t.list&&t.list.removeChild(e.elm)},this.show=function(e){r.create(e),t.list.appendChild(e.elm)},this.hide=function(e){void 0!==e.elm&&e.elm.parentNode===t.list&&t.list.removeChild(e.elm)},this.clear=function(){if(t.list.hasChildNodes())for(;t.list.childNodes.length>=1;)t.list.removeChild(t.list.firstChild)},n()};t.exports=function(t){return new r(t)}},function(t,e){t.exports=function(t,e){var r=t.getAttribute&&t.getAttribute(e)||null;if(!r)for(var n=t.attributes,i=n.length,s=0;s<i;s++)void 0!==e[s]&&e[s].nodeName===e&&(r=e[s].nodeValue);return r}},function(t,e,r){"use strict";function n(t){return t>=48&&t<=57}function i(t,e){for(var r=(t+="").length,i=(e+="").length,s=0,l=0;s<r&&l<i;){var u=t.charCodeAt(s),c=e.charCodeAt(l);if(n(u)){if(!n(c))return u-c;for(var f=s,h=l;48===u&&++f<r;)u=t.charCodeAt(f);for(;48===c&&++h<i;)c=e.charCodeAt(h);for(var d=f,v=h;d<r&&n(t.charCodeAt(d));)++d;for(;v<i&&n(e.charCodeAt(v));)++v;var m=d-f-v+h;if(m)return m;for(;f<d;)if(m=t.charCodeAt(f++)-e.charCodeAt(h++))return m;s=d,l=v}else{if(u!==c)return u<o&&c<o&&a[u]!==-1&&a[c]!==-1?a[u]-a[c]:u-c;++s,++l}}return r-i}var s,a,o=0;i.caseInsensitive=i.i=function(t,e){return i((""+t).toLowerCase(),(""+e).toLowerCase())},Object.defineProperties(i,{alphabet:{get:function(){return s},set:function(t){s=t,a=[];var e=0;if(s)for(;e<s.length;e++)a[s.charCodeAt(e)]=e;for(o=a.length,e=0;e<o;e++)void 0===a[e]&&(a[e]=-1)}}}),t.exports=i},function(t,e){t.exports=function(t,e,r){function n(t,r){var n=t/e.length,i=Math.abs(o-r);return s?n+i/s:i?1:n}var i=r.location||0,s=r.distance||100,a=r.threshold||.4;if(e===t)return!0;if(e.length>32)return!1;var o=i,l=function(){var t,r={};for(t=0;t<e.length;t++)r[e.charAt(t)]=0;for(t=0;t<e.length;t++)r[e.charAt(t)]|=1<<e.length-t-1;return r}(),u=a,c=t.indexOf(e,o);c!=-1&&(u=Math.min(n(0,c),u),c=t.lastIndexOf(e,o+e.length),c!=-1&&(u=Math.min(n(0,c),u)));var f=1<<e.length-1;c=-1;for(var h,d,v,m=e.length+t.length,g=0;g<e.length;g++){for(h=0,d=m;h<d;)n(g,o+d)<=u?h=d:m=d,d=Math.floor((m-h)/2+h);m=d;var p=Math.max(1,o-d+1),C=Math.min(o+d,t.length)+e.length,y=Array(C+2);y[C+1]=(1<<g)-1;for(var b=C;b>=p;b--){var w=l[t.charAt(b-1)];if(0===g?y[b]=(y[b+1]<<1|1)&w:y[b]=(y[b+1]<<1|1)&w|((v[b+1]|v[b])<<1|1)|v[b+1],y[b]&f){var x=n(g,b-1);if(x<=u){if(u=x,c=b-1,!(c>o))break;p=Math.max(1,2*o-c)}}}if(n(g+1,o)>u)break;v=y}return!(c<0)}}]);

/*
    A simple jQuery modal (http://github.com/kylefox/jquery-modal)
    Version 0.8.2
*/
!function(o){"object"==typeof module&&"object"==typeof module.exports?o(require("jquery"),window,document):o(jQuery,window,document)}(function(o,t,e,i){var s=[],l=function(){return s.length?s[s.length-1]:null},n=function(){var o,t=!1;for(o=s.length-1;o>=0;o--)s[o].$blocker&&(s[o].$blocker.toggleClass("current",!t).toggleClass("behind",t),t=!0)};o.modal=function(t,e){var i,n;if(this.$body=o("body"),this.options=o.extend({},o.modal.defaults,e),this.options.doFade=!isNaN(parseInt(this.options.fadeDuration,10)),this.$blocker=null,this.options.closeExisting)for(;o.modal.isActive();)o.modal.close();if(s.push(this),t.is("a"))if(n=t.attr("href"),/^#/.test(n)){if(this.$elm=o(n),1!==this.$elm.length)return null;this.$body.append(this.$elm),this.open()}else this.$elm=o("<div>"),this.$body.append(this.$elm),i=function(o,t){t.elm.remove()},this.showSpinner(),t.trigger(o.modal.AJAX_SEND),o.get(n).done(function(e){if(o.modal.isActive()){t.trigger(o.modal.AJAX_SUCCESS);var s=l();s.$elm.empty().append(e).on(o.modal.CLOSE,i),s.hideSpinner(),s.open(),t.trigger(o.modal.AJAX_COMPLETE)}}).fail(function(){t.trigger(o.modal.AJAX_FAIL);var e=l();e.hideSpinner(),s.pop(),t.trigger(o.modal.AJAX_COMPLETE)});else this.$elm=t,this.$body.append(this.$elm),this.open()},o.modal.prototype={constructor:o.modal,open:function(){var t=this;this.block(),this.options.doFade?setTimeout(function(){t.show()},this.options.fadeDuration*this.options.fadeDelay):this.show(),o(e).off("keydown.modal").on("keydown.modal",function(o){var t=l();27==o.which&&t.options.escapeClose&&t.close()}),this.options.clickClose&&this.$blocker.click(function(t){t.target==this&&o.modal.close()})},close:function(){s.pop(),this.unblock(),this.hide(),o.modal.isActive()||o(e).off("keydown.modal")},block:function(){this.$elm.trigger(o.modal.BEFORE_BLOCK,[this._ctx()]),this.$body.css("overflow","hidden"),this.$blocker=o('<div class="'+this.options.blockerClass+' blocker current"></div>').appendTo(this.$body),n(),this.options.doFade&&this.$blocker.css("opacity",0).animate({opacity:1},this.options.fadeDuration),this.$elm.trigger(o.modal.BLOCK,[this._ctx()])},unblock:function(t){!t&&this.options.doFade?this.$blocker.fadeOut(this.options.fadeDuration,this.unblock.bind(this,!0)):(this.$blocker.children().appendTo(this.$body),this.$blocker.remove(),this.$blocker=null,n(),o.modal.isActive()||this.$body.css("overflow",""))},show:function(){this.$elm.trigger(o.modal.BEFORE_OPEN,[this._ctx()]),this.options.showClose&&(this.closeButton=o('<a href="#close-modal" rel="modal:close" class="close-modal '+this.options.closeClass+'">'+this.options.closeText+"</a>"),this.$elm.append(this.closeButton)),this.$elm.addClass(this.options.modalClass).appendTo(this.$blocker),this.options.doFade?this.$elm.css("opacity",0).show().animate({opacity:1},this.options.fadeDuration):this.$elm.show(),this.$elm.trigger(o.modal.OPEN,[this._ctx()])},hide:function(){this.$elm.trigger(o.modal.BEFORE_CLOSE,[this._ctx()]),this.closeButton&&this.closeButton.remove();var t=this;this.options.doFade?this.$elm.fadeOut(this.options.fadeDuration,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}):this.$elm.hide(0,function(){t.$elm.trigger(o.modal.AFTER_CLOSE,[t._ctx()])}),this.$elm.trigger(o.modal.CLOSE,[this._ctx()])},showSpinner:function(){this.options.showSpinner&&(this.spinner=this.spinner||o('<div class="'+this.options.modalClass+'-spinner"></div>').append(this.options.spinnerHtml),this.$body.append(this.spinner),this.spinner.show())},hideSpinner:function(){this.spinner&&this.spinner.remove()},_ctx:function(){return{elm:this.$elm,$elm:this.$elm,$blocker:this.$blocker,options:this.options}}},o.modal.close=function(t){if(o.modal.isActive()){t&&t.preventDefault();var e=l();return e.close(),e.$elm}},o.modal.isActive=function(){return s.length>0},o.modal.getCurrent=l,o.modal.defaults={closeExisting:!0,escapeClose:!0,clickClose:!0,closeText:"Close",closeClass:"",modalClass:"modal",blockerClass:"jquery-modal",spinnerHtml:null,showSpinner:!0,showClose:!0,fadeDuration:null,fadeDelay:1},o.modal.BEFORE_BLOCK="modal:before-block",o.modal.BLOCK="modal:block",o.modal.BEFORE_OPEN="modal:before-open",o.modal.OPEN="modal:open",o.modal.BEFORE_CLOSE="modal:before-close",o.modal.CLOSE="modal:close",o.modal.AFTER_CLOSE="modal:after-close",o.modal.AJAX_SEND="modal:ajax:send",o.modal.AJAX_SUCCESS="modal:ajax:success",o.modal.AJAX_FAIL="modal:ajax:fail",o.modal.AJAX_COMPLETE="modal:ajax:complete",o.fn.modal=function(t){return 1===this.length&&new o.modal(this,t),this},o(e).on("click.modal",'a[rel~="modal:close"]',o.modal.close),o(e).on("click.modal",'a[rel~="modal:open"]',function(t){t.preventDefault(),o(this).modal()})});