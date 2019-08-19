(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],n=b(document),k=navigator.userAgent.toLowerCase(),l=b(window),g=[],o=null,p=/msie/.test(k)&&!/opera/.test(k),q=/opera/.test(k),m,r;m=p&&/msie 6./.test(k)&&"object"!==typeof window.XMLHttpRequest;r=p&&/msie 7.0/.test(k);b.modal=function(a,h){return b.modal.impl.init(a,h)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=
function(){b.modal.impl.setContainerDimensions()};b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,h){b.modal.impl.update(a,h)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,
close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,h){if(this.d.data)return!1;o=p&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,h);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id",
"simplemodal-placeholder").css({display:"none"})),this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:g[0],width:g[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||o)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});n.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});l.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||o?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:g[0],width:g[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");n.unbind("keydown.simplemodal");l.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,e){if(e){var f=e[0].style;f.position="absolute";if(2>b)f.removeExpression("height"),f.removeExpression("width"),f.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),f.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,d;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):e.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(d="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),d=-1===d.indexOf("%")?d+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(d.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
d='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');f.removeExpression("top");f.removeExpression("left");f.setExpression("top",c);f.setExpression("left",d)}}})},focus:function(a){var h=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",e=b(":input:enabled:visible:"+a,h.d.wrap);setTimeout(function(){0<e.length?e.focus():h.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?l.height():window.innerHeight;j=[n.height(),n.width()];g=[a,l.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?g[0]:g[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||r,b=this.d.origHeight?this.d.origHeight:q?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:q?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),e=this.d.data.outerHeight(!0),f=
this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||b;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,d=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<g[0]?c:g[0],d=d&&d<g[1]?d:g[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",b=b?this.o.autoResize&&b>c?c:b<i?i:b:e?e>c?c:this.o.minHeight&&"auto"!==i&&e<i?i:e:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>d?d:a<c?c:a:f?
f>d?d:this.o.minWidth&&"auto"!==c&&f<c?c:f:c;this.d.container.css({height:b,width:a});this.d.wrap.css({overflow:e>b||f>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=g[0]/2-this.d.container.outerHeight(!0)/2;b=g[1]/2-this.d.container.outerWidth(!0)/2;var e="fixed"!==this.d.container.css("position")?l.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=e+(this.o.position[0]||a),b=this.o.position[1]||b):
a=e+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});

var onePlanChannels=["2","3","25","12","24","26","21","22","11"];

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //###################################################################
    // Control the Login button pressed
    //
function hideModal(){
  $.modal.close();
}
function hideSpinnerModal(){

  $('.loginModalLoading').fadeOut();
  $('.loginModalText').show();
}
function showSpinnerModal (){
  $('.loginModalLoading').show();
  $('.loginModalText').hide();
}

function setSuccess(data){  
  var ans = data.trim();
  var charStart = ans.charAt(0);
  hideModal();
  if (charStart == 'Y')
  {
		localStorage.setItem("isOnePlan", "N");
		var thisChannel = ans.substring(2);
		for (i = 0; i < onePlanChannels.length; i++) {
			if (thisChannel == onePlanChannels[i])
			{
				localStorage.setItem("isOnePlan", "Y");			
			}
		}		          
      hideModal();
      location.reload();	  
  }
  else if (charStart == 'N')
  {
      alert(
          "Sorry, your user id was not recognised. Please try again."
      );
      hideSpinnerModal();
	  $("#loginModal").modal({
      close: false,
      minHeight:400,
      maxWidth : 600
    });
  }
  else{
      alert(
          "Sorry, there was an error communicating with the server. Please check your internet connection and try again."
         
      );
      hideSpinnerModal();
  }
}
function loginClicked(){
  // show the loading message
  var userID=$('#userID').val();
  if (userID == null || userID == '')
  {
	alert('Enter your Irish Life user id');   
  }
  else if (userID == 'BillOn' || userID == 'BillOff')
  {
	localStorage.setItem("isOnePlan",userID == 'BillOn'?"Y":"N");
	hideModal();
	location.reload();
  }
  else
  {
    message = "Please Wait. Checking User Details..." ;
    showSpinnerModal(message);

        $.ajax({
      
        type:"POST",
       // url: "http://www.irishlife-ebiz.net/mobile/blineUserCheckProxy.php?userId=" + userID,
        url: "/secure/blineUserCheck.do?userId=" + userID,
              dataType: "text",
              timeout: 15000,
              success: function (data) {
                setSuccess(data);
              },
              error: function (e, xhr, et) {
                alert("Sorry, there was an error communicating with the server. Please check your internet connection and try again.");
                hideSpinnerModal();
              },
              always: function (){      
                  setTimeout(hideModal(), 10000);           
              }
    });
  }
}

function loginAgain() {
	localStorage.removeItem("isOnePlan");	
	window.location.href = '/ask-underwriting';
}

$(document).ready(function() {
	$('#menuList').prepend('<li><a href="#" onclick="javascript:loginAgain()">Login as another user</a></li');
  // log the lovely soul into ASKUW
  $( "body" ).append( '<div id="loginModal" style="display:none;">'+
            '<span class="loginModalLoading" style="display:none;">'+
            'Loading, please wait'+
                    '</span>'+
            '<span class="loginModalText">'+
            '<label for="userID"><h1 style="font-weight:bold;font-size:1.2em;"">Enter your Irish Life login</h1></label>'+
            '<input type="text" name="userID" id="userID" style="width:100%;border:1px solid #333;font-size: 1.3em;background: #F3F3F3;padding: 7px 0;margin: 5px 0;" />'+
           ' <a id="loginButton" href="javascript:loginClicked();" style="background-color:#50C9B5;padding: 2px 23px;font-size: 1.3em;font-weight: bold;text-decoration: none;color: white;border: 1px solid #333;display: inline-block; margin-bottom: 6px;">Login</a><br/><br/>'+
            '<div class="aboutMe">'+
                '<p>Ask Underwriting is the property of Irish Life and can only be used for the purpose of assisting financial advisers through the Irish Life underwriting process.</p><br/>'+
                '<p>Copying, using, displaying or quoting from Ask Underwriting for any other purposes is expressly prohibited without written permission from Irish Life\'s Head of Underwriting.</p><br/>'+
                '<p>Ask Underwriting &copy; Copyright Irish Life</p><br/><br/>'+
            '</div>'+
            '<div class="pageBottom">'+
                '<p><small>'+
                        'Irish Life Financial Services ltd. is regulated by the Central Bank of Ireland. <br />'+
                       ' Irish Life Assurance plc. is regulated by the Central Bank of Ireland.<br />'+
                        'Irish Life Financial Services ltd and Irish Life Assurance plc Registered Office - Irish Life Centre, Lower Abbey Street, Dublin 1.<br />'+
                        'Irish Life Financial Services Registered Number 489221. Irish Life Assurance plc Registered Number 152576.'+
                    '</small></p>'+
                    '</span>'+
            '</div>' );

 
       

  var isLoggedin = localStorage.getItem("isOnePlan");
  
  if (isLoggedin != null){
  }else{
    $("#loginModal").modal({
      close: false,
      minHeight:400,
      maxWidth : 600
    });
  }
  
  	$('#left').meanmenu({
            meanMenuClose: "X",
            meanMenuCloseSize:  "18px",
            meanMenuOpen: "Menu",
            meanRevealPosition: "left",
            meanScreenWidth: "2000",
            meanExpand: "+",
            meanContract: "-",
            meanShowChildren: true,
            meanExpandableChildren: true,
            meanRemoveAttrs: false
          })

	//attach data layer push to any pdfs
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
			$(this).attr('onclick',"dataLayer.push({'event':'trackEvent','category':'Ask UW','action':'Download PDF','label': '"+link+"','value':'1'});return true");
		});	  
		  
		  
});