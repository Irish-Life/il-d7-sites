function isChatOnline(){$.get("/servlet/livechatonline",function(a){if(a=="Y"&&$("#liveChatNow").length!=0){setTimeout("showTheChatBox()",timeToShowChat())}})}function showTheChatBox(){log("show the chat box");$("#liveChatNow").show("slide",{direction:"right"},2500);if(_gaq)_gaq.push(["_trackPageview","/advice/live-chat-shown.html"])}function timeToShowChat(){var a=6e4;var b=getCookie("liveChat");log("timestamp from cookie "+b);var c=new Date;if(b!=null&&b!=""){log("timestamp "+b);log("now       "+c.getTime());a=Number(b)-Number(c.getTime());if(a<0){a=0}log("ms left before showing chat "+a)}return a}function getCookie(a){var b,c,d,e=document.cookie.split(";");for(b=0;b<e.length;b++){c=e[b].substr(0,e[b].indexOf("="));d=e[b].substr(e[b].indexOf("=")+1);c=c.replace(/^\s+|\s+$/g,"");if(c==a){return unescape(d)}}}function setCookie(a,b,c){var d=new Date;d.setDate(d.getDate()+c);var e=escape(b)+(c==null?"":"; expires="+d.toUTCString());document.cookie=a+"="+e+";path=/"}function storeTimeCookie(){var a=new Date;var b=new Date;b.setTime(a.getTime()+36e5*1);var c=Number(a.getTime());c=c+6e4;setCookie("liveChat",c,null);log("live chat cookie stored "+c)}var canChatNow=false;$(document).ready(function(){log("checking for live chat cookie");var a=getCookie("liveChat");log("existing cookie "+a);if(a==null){storeTimeCookie()}else{log("cookie already stored")}isChatOnline()});$("#livechatimage").click(function(){if(_gaq)_gaq.push(["_trackPageview","/advice/live-chat-started.html"]);if(navigator.userAgent.toLowerCase().indexOf("opera")!=-1&&window.event.preventDefault){window.event.preventDefault()}this.newWindow=window.open("https://chat.mailsecure.net/chatim/client.php?locale=en&url="+escape(document.location.href)+"&referrer="+escape(document.referrer),"webim","toolbar=0,scrollbars=0,location=0,status=1,menubar=0,width=640,height=480,resizable=1");this.newWindow.focus();this.newWindow.opener=window;return false})