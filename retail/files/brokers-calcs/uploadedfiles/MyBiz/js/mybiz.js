var app = {
	ua : navigator.userAgent.toLowerCase(),
    
	onScreenNotificationType: null,
    
    queuedNotifications: 0,
    
    timer: null,

    menuNav:  false,
    
    androidFix: false,
   
    pageToSlide: null,

    firstTimeWelcomeScr: true,
    
    freezeUserAction: false,
    
    retFailCount: 0,
    
    firstMenuSreen: true,
    
    startup: true,
    
    loadFromCache: true,
    
    loadFromPanel: false,
    
    isOnline: true,
    
    isLoggedIn: false,
    
    sessionToken: null,

    auth_key: null,
    
    currentPage: null,
    
    currentPageContainer: null,
    
    previousPage: null,
    
    pipeList: [],
    
    alertsList: [],
    
    customerList: [],
    
    customerPlans:[],
    
    currentCustomer: {},
    
    currentPlan: {},

    fromPipeline: false,

    fromSearch: false,

    fromAlerts: false,
	
	cookieName: 'auth_key',
	
	startScreen:'',

	storeKey: function(key) {
		
		var exdate=new Date();
		exdate.setDate(exdate.getDate() + 3500);
		var c_value=escape(key) + "; expires="+exdate.toUTCString();
		document.cookie= app.cookieName + "=" + c_value;
		
		console.log('key stored ' + key);	
		
	},
	
	getKey: function() {
		console.log('get key');		
		
		var c_value = document.cookie;
		var c_start = c_value.indexOf(" " + app.cookieName + "=");
		if (c_start == -1)
		{
			c_start = c_value.indexOf(app.cookieName + "=");
		}
		if (c_start == -1)
		{
			c_value = null;
		}
		else
		{
			c_start = c_value.indexOf("=", c_start) + 1;
			var c_end = c_value.indexOf(";", c_start);
			if (c_end == -1)
			{
				c_end = c_value.length;
			}
			c_value = unescape(c_value.substring(c_start,c_end));
		}
		
		console.log ('key is ' + c_value);
		
		return c_value;
		
	
	},
	
	removeKey: function() {
		console.log('key removed');
	},
	
    clearData: function(){
        for(i in this){
            if(app[i] instanceof Array)
                app[i] = [];
        }
    },

	
	ajax:function(obj,showLoader){
        var promise;
        if(app.isOnline) {
            promise =  $.ajax(obj);
            promise.always(function(res){
                    //console.log(res);   
            });
            promise = promise.pipe(
                function (res){ // status 200 ok
                    if(!res || res[0].exception || (Object.keys && Object.keys(res[0]).length == 0))
                         return $.Deferred().reject(res);
                    else return res;
                },
                function(res){ //other http status
                    console.log("[Error[ The server returned the following error:\n"+res.status+"\n"+res.statusText);
                    return $.Deferred().reject(res);
                }
            );
            return promise;
        }
        return null;
    },
	
	notify: function(title, msg, btn){	
		console.log('alert called ' + msg);
        var deferred ;
        deferred =  $.Deferred();
        btn = btn || 'Ok';
        //navigator.notification.alert(msg,function(){deferred.resolve()},title,btn);
		alert(title+ "\n"+ msg);
        return deferred.promise();
    },

	
	isEmpty: function(o){
        if(typeof o == 'undefined') return true; 
        if(typeof o.length != 'undefined' && o.length == 0 ) return true;   
        console.log(Object.keys);
        console.log(Object.keys(o).length);     
        if(Object.keys && !Object.keys(o).length) return true;
        var hasOwnProp = Object.prototype.hasOwnProperty;
        for( k in o)
            if(hasOwnProp.call(o, k)) return false;
        return true;
    },
	    
	changePage:function(page, trans){
		console.log('changing page to ' + page);
        if(app.currentPage == 'p_desc') {
            var crt_st = $(window).scrollTop()
            app.currentPageContainer.css('height','100%');
            app.currentPageContainer.get(0).scrollTop = crt_st;
        }
        trans = trans || null;
         if(!trans)
            $.mobile.changePage(page);
        else
            $.mobile.changePage(page, trans);
		
		console.log('page changed to ' + page);
    },
	
	loading: function(show){
        show = show || false;
        var doneAnimation;
        doneAnimation  =  $.Deferred();
        if(app.currentPage) {
            if(show) {
                app.spinner.fadeIn(250);
                app.loadOverLay.fadeIn(250, function(){doneAnimation.resolve()});
                app.freezeUserAction = true;
                }
            else {
                app.spinner.stop().dequeue().fadeOut(200);
                app.loadOverLay.stop().dequeue().fadeOut(200, function(){doneAnimation.resolve()});
                app.freezeUserAction = false;
            }
        }
        return doneAnimation.promise();
    },
	
	 backBtn:function(){
        if(!app.freezeUserAction){
              window.history.back();
        }
    },
	
	refreshList: function(list){
        var waitForMe;
        app.loading(true);
        switch( list){
            case 'pipeline':
                waitForMe = app.getPipeline(true);
                if(waitForMe){
                    waitForMe.done(function(){
                        app.buildPipeline();
                        app.attachListHandlers(app.currentPage);
                        app.loading(false);
                    })
                }
                break;
            case 'alerts': 
                waitForMe = app.getAlerts(true);
                if(waitForMe){
                    waitForMe.done(function(){
                        app.buildAlerts();
                        app.attachListHandlers(app.currentPage);
                        app.loading(false);
                    })
                }
                break;
            case 'plan_req': 
                waitForMe = app.getPlanDetails(app.currentPlan.id, true, true);
                if(waitForMe){
                    waitForMe.done(function(){
                        app.buildPlanRequirements();
                        app.loading(false);
                    })
                }
                break;
        }

    },
	
	 attachListHandlers: function(page){
        var list = (page == 'pipeline') ? app.pipeList : app.alertsList;
        $('.header .mark').unbind();  
        $('.list_item > div:first-child').unbind();        
        $('.list_head > span:last-child').unbind();  
        $('.list_head .vpd').unbind();
        $('.header .mark').bind('tap', function(){
           $.each(list,function(){
                  this.isNew = false;
                  localStorage.setItem(this.id, 'true');
           });
           $('.list_item').removeClass('unread').removeClass('closed').addClass('closed');
           app.currentPageContainer.find('#refresh').submit();
        });
        $('.list_item > div:first-child').bind('tap',function(){
            var scrollH = window.scrollY+screen.availHeight,
                currH  = $(this).parent('.list_item').get(0).offsetHeight;
        
            $li = $(this).parent()
            $li.toggleClass('closed');
            setTimeout(function(){$li.removeClass('unread')}, 400); //prevent doubletap
            var id = $li.attr('id');
            $.each(list, function(){
                   if(this.id == id) {
                      localStorage.setItem(this.id,'true');
                      this.isNew = false;
                   }
            });
            
            var openH = $(this).parent('.list_item').get(0).offsetHeight,
                offTop = $(this).parent('.list_item').get(0).offsetTop;
            var scrollDist = openH - currH + scrollH - offTop;
            if(offTop + openH > scrollH)
                window.scrollBy(0,scrollDist);
        });
        $('.list_head > span:last-child').bind('tap',function(){
            app.refreshList(page);
        });
        $('.list_item .vpd').bind('tap',function(){
            var ghp = app.getPlanDetails(this.id, false, true);//, list)
            //var ghp = app.getWholePlan(this.id, true);
            ghp.fail(function(){
                app.notify('Unable to Process Your Request','Please try again later');
            })
        });
    },
	

	firstTimeLogin:function(){
        var alphaNum = /^[a-zA-Z0-9_]*$/;   
        $('#login').submit(function(){
            
            var uValid = pValid = false;
            var $userName = $('#userId').val();
                         
            if(!(alphaNum.test($userName) && $userName.length < 11 && $userName.length > 0 ))
                app.notify('Oops!','Your User ID must have a maximum of 8 alphanumeric characters');
            else uValid = true;
            
            $pass = $pass=$('input:password').val();
                         
            if(!($pass.length < 20 && $pass.length > 0 ))
                app.notify('Oops!','Your password must have a maximum of 20 alphanumeric characters');
            else pValid = true;

            if(uValid && pValid){ 
                    var log = app.ajax({
                                    type: "POST",
                                    url: "/mobile/Account/Register",
									//url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/register.php",
                                    data:{
                                        userid: $userName.toUpperCase(),
                                        password: $pass,
                                        deviceType: "",
                                        deviceId: ""
                                    },
                                    dataType: "json"
                                });
                    if(log){
                        log.done(function(data){
                               app.auth_key = data[0].authenticated.key || null;
                               
                               if(!app.auth_key) app.notify('Oops!','Check your ID and password and try again');
                               else {
                                   app.sessionToken = data[0].authenticated.token || null;
                                   app.storeKey(app.auth_key);
                                   app.isLoggedIn = true;
                                   app.changePageAlt('main.html');
                                   if(app.timer) clearTimeout(app.timer);
                                   app.timer = setTimeout(function(){
                                       app.notify('Session has expired','Please log back in to continue using the App');
                                        var l_off = app.ajax({
                                                   type: "POST",
                                                   url: "/mobile/Account/Logoff",
												   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/logoff.php",
                                                   data: {token: app.sessionToken},
                                                   dataType: "json"
                                        });
                                            app.sessionToken = null;
                                            app.changePageAlt('returning_login.html', {transition: 'none'});
                                        
                                   }, 30*60*1000);
                               }
                        })
                        log.fail(function(err){
                                 app.loading(false);
                                 app.notify('Unable to Process Your Request','Please try again later');
                                 console.log('fail: '+err.responseText)
                        }); 
                    }
            }
                         
            return false;
        })
    },
    
    retLogin:function(){
		console.log('retLogin defined');
        $('#ret_login').submit(function(){
			$pass=$('input:password').val();
            var pValid = false;
            if(!($pass.length < 20 && $pass.length > 0 ))
                app.notify('Oops','Your password must be present and be less than 20 characters!','I understand');
            else pValid = true;          
			
            if(pValid){ 
                 var ret = app.ajax({
                                   type: "POST",
                                   url: "/mobile/Account/Login",
								   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/authenticate.php",
                                   data: {key: app.auth_key, password: $pass},
                                   dataType: "json"
                    });
                    if(ret){
                        ret.done(function(data){
								var loggedInStr = new String(data[0].authenticated.loggedIn);
								console.log('logged in ' + loggedInStr);
                               var logged = (loggedInStr.toLowerCase() === 'true');							   
                               if(logged==false) { //convert to bool
                                  if(app.retFailCount == 3){
                                    app.retFailCount = 0;
                                    app.removeKey();
                                    app.isLoggedIn = false;
                                    app.auth_key = null;
                                    app.sessionToken = null;
                                    app.notify('Login Error','You have entered invalid information over three times. You will now be redirected to the full ap login.','Continue');
                                    
                                    app.changePageAlt('login.html');
                                  }else{
                                        app.notify('Oops!','Check your password and try again');
                                        app.retFailCount++;
                                  }
                               }
                               else {
							   	   console.log("logged in");
                                   app.retFailCount = 0;
                                   app.isLoggedIn = true;
                                   app.sessionToken = data[0].authenticated.token || null;
                                   app.changePageAlt('main.html');
                                   if(app.timer) clearTimeout(app.timer);
                                   app.timer = setTimeout(function(){
                                        app.notify('Session has expired','Please log back in to continue using the App');
                                        var l_off = app.ajax({
                                                   type: "POST",
                                                   url: "/mobile/Account/Logoff",
												   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/logoff.php",
                                                   data: {token: app.sessionToken},
                                                   dataType: "json"
                                        });
                                        
                                        app.sessionToken = null;
                                        app.firstMenuSreen = true;
                                        app.firstTimeWelcomeScr = true;
                                        app.changePageAlt('returning_login.html');
                                        
                                   }, 30*60*1000);
                               }
                        })
                        ret.fail(function(err){
                                 app.loading(false);
                                 app.notify('Unable to Process Your Request','Please try again later');
                                 console.log('fail: '+err.responseText)
                        }); 
                    }               
            } 
            return false;
        });
        $('#another_user').submit(function(){
        var log_off = app.ajax({
                                   type: "POST",
                                   url: "/mobile/Account/Logoff",
								   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/logoff.php",
                                   data: {token: app.sessionToken},
                                   dataType: "json"
                    });
        log_off.always(function(){
            app.sessionToken = null;
            app.firstMenuSreen = true;
            app.firstTimeWelcomeScr = true;
            app.isLoggedIn = false;
            app.clearData();
            app.removeKey();
            
            //localStorage.setItem('authKey',app.auth_key);
            //localStorage.setItem('userId', $userName);
            //app.isLoggedIn = true;
            app.changePageAlt('login.html');

        })
             return false;
        });
    },
    
    getPipeline: function(refresh){
        refresh = refresh || null;
        var $form = $("#pipe");
        var $count = $form.find('span');
        if($count && !refresh) if(!$count.hasClass('loading')) $count.addClass('loading');
        var pipe = app.ajax({
                       type: "POST",
                       global: false,
                       url: "/mobile/Plan/RetrievePlanEvents",
					   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/getPipelineEvents.php",
                       data: {token: app.sessionToken },
                       dataType: "json"
        },false); //don't show app loader, we have individual loader
        if(pipe){
            pipe.done(function(data){
                   var unreadCount = 0;
                   app.pipeList = data[0].pipeline;
                   $.each(app.pipeList,function(){
                           this.isNew = true;
                           unreadCount++;
                   })
                   if($count){
                       $count.html(unreadCount);
                       $count.removeClass('loading');
                       if(!unreadCount) $count.delay(500).fadeOut();
                   }
            })
            pipe.fail(function(err){
                app.loading(false);
                app.notify('Unable to Process Your Request','Please try again later');
                console.log('fail: ');
                for(i in err)
                    if(typeof (err[i]) == 'function') console.log(i + '() '+ err[i]());
                    else console.log(i + ':' + err[i])
            }); 
        }
        return pipe;
    },
    
    buildPipeline: function(){
        function getPipeItem(id, name, plan_no, desc, date, isNew){
            return '<div class="list_item '+(isNew ? 'unread':'')+' closed" data-pageflow="yes" id="'+id+'">'+
                '<div>'+
                    '<span>'+name+'</span>'+
                    '<span>'+plan_no+'</span>'+
                '</div>'+
                '<div>'+
                    '<span>'+desc+'</span>'+
                    '<span>'+date+'</span>'+
                    '<a href="#" data-role="none" class="vpd" id="'+plan_no+'">View Plan Details </a>'+
                '</div>'+
            '</div>';
        }
        var $items = $('.items');
        $items.empty();
        $.each(app.pipeList,function(){
            $items.append(getPipeItem(this.id, this.name,this.planid,this.desc,this.date, this.isNew));
        })
        
    },
    
	getAlerts: function(refresh){
        refresh = refresh || null;
        var $form = $("#alert"); //declare with VAR or else it goes global!
        var $count = $form.children('span');
        if($count && !refresh) if(!$count.hasClass('loading')) $count.addClass('loading');
        var a = app.ajax({
                       type: "POST",
                       global: false,
                       url: "/mobile/Clients/Alerts",
					   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/getCustomerAlerts.php",
                       data: {token: app.sessionToken },
                       dataType: "json"
        },false); //don't show app loader, we have individual loader
        if(a){
            a.done(function(data){
                   var unreadCount = 0;
                   app.alertsList = [];
                   $.each(data[0], function(i){
                        var type = i;
						$.each(this, function(){
                            this.cat = type;
							app.alertsList.push(this);
						});
				   });
                   $.each(app.alertsList,function(){
                           this.isNew = true;
                           unreadCount++;
                   })
                   if($count){
                       $count.html(unreadCount);
                       $count.removeClass('loading');
                       
                       if(!unreadCount) $count.delay(500).fadeOut();
                   }
            })
            a.fail(function(err){
                app.loading(false);
                app.notify('Unable to Process Your Request','Please try again later');
                console.log('fail: '+err.responseText)}); 
        }
        return a;
    },
    
    buildAlerts: function(){
        var dataObj, retHTML;
        function getAlertItem(o){
            retHTML = '';
            var o_id = (o.id.toString().substring(0,3));
            switch(o.cat.toString()){
                case 'missedPayments':
                    retHTML = 
                      '<div class="list_item '+( (o.isNew == true) ? 'unread':'')+' closed" id="'+o.id+'">'+
                            '<div>'+
                                '<span>'+o_id+'</span>'+
                                '<span>'+o.name+'</span>'+
                                '<span>'+o.planid+'</span>'+
                            '</div>'+
                            '<div>'+
                                '<span>Product: '+o.product+'</span>'+
                                '<span>No. months missed: '+o.num+'</span>'+
                                '<span>Reason missed: '+o.desc+'</span>'+
                                '<a href="#" data-role="none" class="vpd" id="'+o.planid+'">View Plan Details </a>'+
                            '</div>'+
                        '</div>';
                    break;
                case 'maturities':
                    retHTML = 
                          '<div class="list_item '+( (o.isNew == true) ? 'unread':'')+' closed" id="'+o.id+'">'+
                                '<div>'+
                                    '<span>'+o_id+'</span>'+
                                    '<span>'+o.name+'</span>'+
                                    '<span>'+o.planid+'</span>'+
                                '</div>'+
                                '<div>'+
                                    '<span>Product: '+o.product+'</span>'+
                                    '<span>Maturity date: '+o.date+'</span>'+
                                    '<a href="#" data-role="none" class="vpd" id="'+o.planid+'">View Plan Details </a>'+
                                '</div>'+
                            '</div>';
                    break;
                case 'reviews':
                    retHTML = 
                      '<div class="list_item '+( (o.isNew == true) ? 'unread':'')+' closed" id="'+o.id+'">'+
                            '<div>'+
                                '<span>'+o_id+'</span>'+
                                '<span>'+o.name+'</span>'+
                                '<span>'+o.planid+'</span>'+
                            '</div>'+
                            '<div>'+
                                '<span>Product: '+o.product+'</span>'+
                                '<span>Review date: '+o.date+'</span>'+
                                '<span>Details: '+o.desc+'</span>'+
                                '<a href="#" data-role="none" class="vpd" id="'+o.planid+'">View Plan Details </a>'+
                            '</div>'+
                        '</div>';
                    break;
                case 'cashRenewals':
                    retHTML = 
                      '<div class="list_item '+( (o.isNew == true) ? 'unread':'')+' closed" id="'+o.id+'">'+
                            '<div>'+
                                '<span>'+o_id+'</span>'+
                                '<span>'+o.name+'</span>'+
                                '<span>'+o.planid+'</span>'+
                            '</div>'+
                            '<div>'+
                                '<span>Product: '+o.product+'</span>'+
                                '<span>Renewal date: '+o.date+'</span>'+
                                '<a href="#" data-role="none" class="vpd" id="'+o.planid+'">View Plan Details </a>'+
                            '</div>'+
                        '</div>';
                    break;
                case 'contacts':
                    retHTML = 
                      '<div class="list_item '+( (o.isNew == true) ? 'unread':'')+' closed" id="'+o.id+'">'+
                            '<div>'+
                                '<span>'+o_id+'</span>'+
                                '<span>'+o.name+'</span>'+
                                '<span>'+o.planid+'</span>'+
                            '</div>'+
                            '<div>'+
                                '<span>Product: '+o.product+'</span>'+
                                '<span>Contact type: '+o.type+'</span>'+
                                '<span>Details: '+o.desc+'</span>'+
                                '<a href="#" data-role="none" class="vpd" id="'+o.planid+'">View Plan Details </a>'+
                            '</div>'+
                        '</div>';
                    break;
            };
            return retHTML;
        }
        var $items = $('.items');
        $items.empty();
        $.each(app.alertsList,function(){
            dataObj = {};
            $.each(this, function(i){
                dataObj[i] = this;
            })       
            $items.append(getAlertItem(dataObj));
        })

        
    },
    
    searchCustomers: function(){
        var $customer_search = $('#customer_search'),
            $plan_search = $('#plan_search');
                
        $customer_search.submit(function(){
            $ln = $('#searchLastName').val();
            $fn = $('#searchFirstName').val();
            
            if($ln.length > 1 && $fn.length > 0 ){
                var sc = app.ajax({
                       type: "POST",
                       url: "/mobile/Clients",
					   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/searchCustomers.php",
                       data: {token: app.sessionToken, lastName:$ln, firstName: $fn},
                       dataType: "json"
                });
                sc.done(function(data){
                    app.customerList = [];
                    if(data[0].customers.length > 0){
                        $.each(data[0].customers, function(){
                            app.customerList.push(this);
                            app.customerPlans[this.id] = [];
                        });
                        app.changePageAlt('customer_results.html');
                        }
						else
						{
							app.notify("No results found for this name search",'');
						}
                });
                sc.fail(function(){ 
                    app.loading(false); 
                    app.notify('Unable to Process Your Request','Please try again later');
                    console.log('fail customer search')
                });
            }
            else app.notify('Oops!','The last name must be at least 2 characters and the first name at least 1 character!');
            return false;
        });
        
        $plan_search.submit(function(){
            var $pid = $('#searchPlan').val(),
            numGex = /\d/;
            if(numGex.test($pid) && $pid.toString().length == 8){
                var ghp = app.getPlanDetails($pid, false, true);
                ghp.fail(function(){
                    app.notify('Unable to Process Your Request','Please try again later');
                })    
            }
            else app.notify('Oops!','The plan id must be an 8-digit number!');
            return false;
        });
    },
    
    buildCustomerResults: function(){
        function getCustomerDetails(name, dob, addr){
            return '<a href="#" class="result_item" data-role="none">'+ // href was customer_details.html
                '<span>'+name+'</span>'+
                '<span>DOB: '+dob+'</span>'+
                '<span>'+addr+'</span>'+
                '</a>';
        }
        var $list = $('.customers');
        $.each(app.customerList,function(){
            $list.append(getCustomerDetails(this.lastName+', '+this.firstName, this.dob, this.address));
            var that = this;
            
            $list.children('a:last-child').tap(function(){
                app.getCustomerPlans(that.id);
                app.currentCustomer = that;
                return false;
            });
            
        });

    
    },
    
    getCustomerPlans: function(customer_id, dontchange){
        dontchange = dontchange || null;
        var cp = app.ajax({
               type: "POST",
               url: "/mobile/Client/Plans",
			   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/getCustomersPlans.php",
               data: {token: app.sessionToken, clientId: customer_id},
               dataType: "json"
        });
        cp.done(function(data){   
            $.each(data[0].plans, function(){
                //if(!app.customerPlans[customer_id]) app.customerPlans[customer_id] = [];
                app.customerPlans[customer_id].push(this);
            });
            console.log('got plans for customer id: '+ customer_id);
            if(!dontchange) app.changePageAlt('customer_details.html');
        });
        cp.fail(function(){ 
            app.loading(false);
            app.notify('Error','Unable to get plan list for this customer');
            console.log('fail get customer plans for customer_id: '+customer_id);
        });
        
        return cp;
    },
    
    buildCustomerPlans: function(){

		console.log('build customer plans ' + app.currentCustomer.firstName + ' ' + app.currentCustomer.lastName + 
		' ' + app.currentCustomer.dob);
        var $c_details = $('.details'), cc = app.currentCustomer;
        $c_details.children().eq(0).text(cc.lastName + ', ' + cc.firstName);
        $c_details.children().eq(1).text('DOB: '+cc.dob);
        $c_details.children().eq(2).text(cc.address);
        function getPlanSummary(id, desc, status){
            return '<a href="plan_description.html" class="result_item" data-role="none">'+
                '<span>'+
                    '<span>'+id+'</span>'+
                    '<span>'+desc+'</span>'+    
                '</span>'+
                '<span>Status: '+status+'</span>'+
            '</a>';
        }
        
        var $plans = $('#plans');
		$plans.empty();
        $.each(app.customerPlans[cc.id],function(){
        
            $plans.append(getPlanSummary(this.id, this.type, this.status));
            
            var that = this;
            $plans.children('a:last-child').tap(function(){
                app.getPlanDetails(that.id);
                app.currentPlan = that;
                return false;
            });
            
        });

    },
    
    getPlanDetails: function(pid, dontchange, list){
        dontchange = dontchange || null;
        list = list || null;
        var pd = app.ajax({
               type: "POST",
               url: "/mobile/Plan",
			   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/getPlanDetails.php",
               data: {token: app.sessionToken, planId: pid},
               dataType: "json"
        });
        pd.done(function(data){
            $.each(data[0], function(i){
                app.currentPlan[i] = this; // if no current plan selected, start customer search from the summary and from there on
            });
            app.currentPlan.id = pid;
            if(!dontchange) app.changePageAlt('plan_description.html');
		
           console.log('got plan details for plan id:'+ pid);
		   
        });
        pd.fail(function(){ 
            app.loading(false); 
            if(list) app.notify('Unable to Process Your Request','Please try again later');
            console.log('fail get plan details for '+pid)
        });
        
        return pd;
    },
    
    getWholePlan: function($pid, list, dontChangeP){
        list = list || null;
        dontChangeP = dontChangeP || null;
        var gd = app.getPlanDetails($pid, true, list),
        stop = false,
        isdone = $.Deferred();
        
        app.currentPlan.id = $pid;
        if(gd){
            gd.done(function(data){
                console.log('got plan');
                var cn = data[0].summary.life1.replace(/\s*(Mr|Dr|Mrs)\s*/i,''),
                    fn = cn.split(' ')[0],
                    ln = cn.split(' ')[1]; 

                var sc = app.ajax({
                       type: "POST",
                       url: "/mobile/Clients",
					   //url:"/secureWeb/uploadedFiles/Bline/MyBiz/methods/searchCustomers.php",
                       data: {token: app.sessionToken, lastName: ln, firstName: fn},
                       dataType: "json"
                });
                
                sc.done(function(data){
                    
                    app.customerList = [];
                   
                    $.each(data[0].customers, function(){
                        
                        if(stop) return false;
                        
                        app.customerList.push(this);
                        app.customerPlans[this.id] = [];
                        
                        var customer = this; 
                        
                        var gps = app.getCustomerPlans(this.id, true);
                        
                        if(gps){
                            gps.done(function(){
                                

                                for( plan in app.customerPlans[customer.id]){
                                
                                    if(stop) break;
                                    if(app.customerPlans[customer.id][plan].id == $pid){
                                        
                                        app.currentPlan.type = app.customerPlans[customer.id][plan].type;
                                        app.customerPlans[customer.id][plan] = app.currentPlan;
                                        
                                        app.currentCustomer = customer;
                                        
                                        if(!dontChangeP) app.changePageAlt('plan_description.html'); 
                                        
                                        stop = true;
                                        isdone.resolve();
                                    }
                                
                                }
                                if(!stop) isdone.reject();
                            
                            });
                        }
                    });
                });
                sc.fail(function(){ 
                    app.loading(false);
                    app.notify('Warning','Customer not found');
                    console.log('fail customer auto search')
                });
            });
            gd.fail(function(){
                console.log('fail get whole plan details for '+$pid);
                app.loading(false);
                app.notify('Error',"No results found for this plan number search",'');
                return false;
            });
            return isdone.promise();
        }
    },
    
    buildPlanDetails: function(){
        var $headTitle = $('.header a'), 
            cc = app.currentCustomer,
            cp = app.currentPlan,
            $leg = $('.legend:last'),
            $desc_r = $('.desc_row')
            planTypes = {
                I: "Investment",
                P:  "Pension",
                L: "Life",
                S: "Savings"
            }, //.replace(/(mr |ms  |mrs |dr )/i, '').split(' ')
            firstName = cp.summary.life1.replace(/(.*? )([a-zA-Z]+) /, "$1$2,").split(',')[1] || cc.firstName ,
            lastName = cp.summary.life1.replace(/(.*? )([a-zA-Z]+) /, "$1$2,").split(',')[0] || cc.lastName ;
        console.log(app.currentPlan);
        $headTitle.html(lastName + ' <br/> '+firstName);
        $leg.children().eq(0).children().eq(0).html(cp.id)
        $leg.children().eq(0).children().eq(1).html(cp.type);
        $leg.children().eq(1).html('Status: '+cp.summary.status);
        
        $desc_r.eq(0).find('ol').append('<li>'+cp.summary.life1+'</li>');
        
        if(typeof cp.summary.life2 != 'undefined' &&  cp.summary.life2 != "") 
            $desc_r.eq(0).find('ol').append('<li>'+cp.summary.life2+'</li>');
        
        // $desc_r[1].children[1].innerHTML = cc.address;
        if( typeof cp.requirements[0] != 'undefined' && typeof cp.requirements[0].address != 'undefined')
            $desc_r[1].children[1].innerHTML = cp.requirements[0].address;
        else $desc_r[1].style.display = 'none';
        if(typeof cp.summary.life1Phone[0] != 'undefined'){
            $('#life1name').html(cp.summary.life1);
            
            $('#life1PhoneM').html('<a data-role="none" href="tel:'+cp.summary.life1Phone[0]+'">Call '+cp.summary.life1Phone[0]+'</a>');
            
            if(typeof cp.summary.life1Phone[1] != 'undefined') $('#life1PhoneW').html('<a data-role="none" href="tel:'+cp.summary.life1Phone[1]+'">Call '+cp.summary.life1Phone[1]+'</a>');
            else $('#life1PhoneW').remove();
            
            if(typeof cp.summary.life1Phone[2] != 'undefined') $('#life1PhoneH').html('<a data-role="none" href="tel:'+cp.summary.life1Phone[2]+'">Call '+cp.summary.life1Phone[2]+'</a>');
            else $('#life1PhoneH').remove();
        }
        else {
            $('#life1name').remove();
            $('#life1PhoneM').remove();
            $('#life1PhoneW').remove();
            $('#life1PhoneH').remove();
            $desc_r[2].style.display = 'none';
        }
        if(typeof cp.summary.life2Phone[0] != 'undefined'){
            $('#life2name').html(cp.summary.life2);
            $('#life2PhoneM').html('<a data-role="none" href="tel:'+cp.summary.life2Phone[0]+'">Call '+cp.summary.life2Phone[0]+'</a>');
            
            if(typeof cp.summary.life2Phone[1] != 'undefined') $('#life2PhoneW').html('<a data-role="none" href="tel:'+cp.summary.life2Phone[1]+'">Call '+cp.summary.life2Phone[1]+'</a>');
            else $('#life2PhoneW').remove();
            
            if(typeof cp.summary.life2Phone[2] != 'undefined') $('#life2PhoneH').html('<a data-role="none" href="tel:'+cp.summary.life2Phone[2]+'">Call '+cp.summary.life2Phone[2]+'</a>');
            else $('#life2PhoneH').remove();
        }
        else {
            $('#life2name').remove();
            $('#life2PhoneM').remove();
            $('#life2PhoneW').remove();
            $('#life2PhoneH').remove();
        }

        $desc_r[3].children[1].innerHTML = cp.summary.startDt;
        
        if(typeof cp.summary.endDt == 'undefined') $desc_r.eq(4).remove();
        else $desc_r[4].children[1].innerHTML  = cp.summary.endDt;
        
        $desc_r[5].children[1].innerHTML = planTypes[cp.summary.type];
        app.currentPlan.type = planTypes[cp.summary.type];
    },
    
    setCustomerBackInfo: function(){
        var $hd = $('.header:last'), cc = app.currentCustomer, cp = app.currentPlan;
        var firstName = cp.summary.life1.replace(/(.*? )([a-zA-Z]+) /, "$1$2,").split(',')[1] ||  cc.firstName,
            lastName =  cp.summary.life1.replace(/(.*? )([a-zA-Z]+) /, "$1$2,").split(',')[0] ||  cc.lastName ;
            
        $hd.html($hd.html().replace('$fn',firstName).replace('$ln',lastName).replace('$pid',cp.id).replace('$ptype',cp.type));
        // if(typeof cc.firstName != 'undefined')
        //     $hd.html($hd.html().replace('$fn',cc.firstName).replace('$ln',cc.lastName).replace('$pid',cp.id).replace('$ptype',cp.type));
        // else $hd.html($hd.html().replace('$fn',cp.summary.life1.split(' ')[0]).replace('$ln',cp.summary.life1.split(' ')[1]).replace('$pid',cp.id).replace('$ptype',cp.type));
    },
    
    buildPlanRequirements: function(){
        var cpr = app.currentPlan.requirements, 
            //cc = app.currentCustomer,
            $newr = $('#new_req'),
            $underr = $('#underwriting_req');
        function renderReqHtml(r_class, desc, added, follow, received, completed, addressee, address){
            return '<div data-role="collapsible"  data-iconpos="right" class="'+r_class+'">'+
                        '<h3>'+desc+'</h3>'+
                        '<div>'+
                            '<div class="content_row">'+
                                '<span>Date Requested: </span>'+
                                '<span>'+added+'</span>'+
                            '</div>'+
                            '<div class="content_row">'+
                                '<span>Next Follow-Up Date: </span>'+
                                '<span>'+follow+'</span>'+
                            '</div>'+
                            '<div class="content_row">'+
                                '<span>Received Date: </span>'+
                                '<span>'+received+'</span>'+
                            '</div>'+
                            '<div class="content_row">'+
                                '<span>Completed Date: </span>'+
                                '<span>'+completed+'</span>'+
                            '</div>'+
                            '<br />'+
                            '<div class="content_row">'+
                                '<span>Addressee: </span>'+
                                '<span>'+addressee+'</span>'+
                            '</div>'+
                            '<div class="content_row">'+
                                '<span>Address: </span>'+
                                '<span>'+address+'</span>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
        }
        if(typeof cpr != 'undefined') { 
            $newr.next('.heading').empty();
            $newr.empty();
            $underr.empty();
            $newr.next('.heading').append('<span>'+app.currentPlan.summary.life1.split(' ')[0]+' '+app.currentPlan.summary.life1.split(' ')[1]+'</span>');
            $.each(cpr, function(i){
                this.completed  = (this.completed   == "") ? "-" : this.completed ;
                this.received   = (this.received    == "") ? "-" : this.received ;
                this.address    = (this.address     == "") ? "-" : this.address ;
                this.addressee  = (this.addressee   == "") ? "-" : this.addressee ;
                var r_class = (this.completed == "-") ? ((this.received == "-") ? "x" : "q") : "check";
                if(this.type == "N")
                    $newr.append(renderReqHtml(r_class, this.desc, this.added, this.followup, this.received, this.completed, this.addressee, this.address)).trigger("create");
                else 
                    $underr.append(renderReqHtml(r_class, this.desc, this.added, this.followup, this.received, this.completed, this.addressee, this.address)).trigger("create");
                
            });
            $('.heading').unbind();
            $('.heading').tap(function(){
                app.refreshList(app.currentPage);
            });
        }
        else app.notify('API error','This message is for debugging purposes only. It indicates that the API doesn\'t provide content for this section.');
    },
    
    buildPlanBenefits: function(){
        $bens = $('#bens'), cp = app.currentPlan,
        TOC = {
            S: "Single",
            D: "Dual",
            J: "Joint"
        };
        var rowHtml = 
                '<div class="b_row"> \
                    <div> \
                        <span>'+cp.summary.life1+'</span> \
                        <span>&euro; '+cp.benefits.life[0]+'</span>  \
                    </div> ';
        if(typeof cp.benefits.life[1]!= 'undefined') rowHtml+= '<div> \
                        <span>'+cp.summary.life2+'</span> \
                        <span>&euro; '+cp.benefits.life[1]+'</span>  \
                    </div> \
                </div>';
        else rowHtml+= '</div>';
        $bens.append(rowHtml);
        rowHtml =                
                '<div class="b_row">\
                    <div>\
                        <span>Type of Cover</span>\
                        <span>'+TOC[cp.benefits.type]+'</span> \
                    </div>';
        if(typeof cp.benefits.life[1]!= 'undefined'){ 
            if(cp.benefits.type == 'J') rowHtml+= '<span> \
                    Joint Life means that we will make the payment if you or your partner \
                    dies during the term of the plan. Under this option, we will only pay \
                    once. \
                    </span> \
                </div>'
            else rowHtml+= '<span> \
                    Dual Life Cover means that we could make the payment twice, once if you \
                    die within the term of the plan and once if your partner also dies within \
                    the term of the plan. \
                    </span> \
                </div>'
        }
        else rowHtml+= '</div>';           
        $bens.append(rowHtml);
        if(typeof cp.benefits.illness!= 'undefined'){
            rowHtml = 
                '<div class="labels"> \
                    <span>Benefit</span> \
                    <span>Illness</span></div>  \
                 <div class="b_row"> \
                    <div> \
                        <span>'+cp.summary.life1+'</span> \
                        <span>&euro; '+cp.benefits.illness[0]+'</span>  \
                    </div>';
                    
        if(typeof cp.benefits.illness[1]!= 'undefined') rowHtml+= '<div> \
                        <span>'+cp.summary.life2+'</span> \
                        <span>&euro; '+cp.benefits.illness[1]+'</span>  \
                    </div> \
                </div>';
        else rowHtml+= '</div>';
        $bens.append(rowHtml);
        }
        if(typeof cp.benefits.term!= 'undefined'){
            rowHtml =                    
                '<div class="b_row">\
                    <div>\
                        <span>Term</span>\
                        <span>'+cp.benefits.term+' years</span> \
                    </div> \
                </div>';
            $bens.append(rowHtml);
        }
    },
    
    buildPlanValues: function(){
        var cpv = app.currentPlan.value, 
            $vals = $('#vals'),
            cpf = app.currentPlan.funds, 
            $funds = $('#funds'),
            cash_value_text = app.currentPlan.summary.type == "P" ? "Transfer Value" : "Cash in Value";

        function renderValsHtml(crt_val, cash_charge, tax, cash_val, p_date){
            return '<div class="b_row"> \
                <div> \
                    <span>Current value</span> \
                    <span>&euro; '+crt_val+'</span>  \
                </div> \
                <div> \
                    <span>Cash in Charge</span> \
                    <span>&euro; '+cash_charge+'</span>  \
                </div> \
                <div> \
                    <span>Exit Tax</span> \
                    <span>&euro; '+tax+'</span>  \
                </div> \
                <div> \
                    <span>'+cash_value_text+'</span> \
                    <span>&euro; '+cash_val+'</span>  \
                </div> \
                <div> \
                    <span>Price date</span> \
                    <span>'+p_date+'</span>  \
                </div> \
            </div>';
        }
        $vals.append(renderValsHtml(cpv.currentValue, cpv.cashInCharge, cpv.tax, cpv.cashInValue, cpv.date));
        function renderFundHtml(name, units, val, url){
            return  '<div data-role="collapsible" data-theme="irish" data-content-theme="irish" data-iconpos="right">\
                <h3>'+name+'</h3>\
                <div>\
                    <div class="content_row">\
                        <span>Number of Units</span>\
                        <span>'+units+'</span>\
                    </div>\
                    <div class="content_row">\
                        <span>Fund Value</span>\
                        <span>&euro; '+val+'</span>\
                    </div>\
                    <div class="content_row">' +
                         (url ? '<a href="#" data-role="none" class="pf" >View Fund Factsheet </a>' : '') +
                    '</div>\
                </div> \
            </div>'
                                    /*'<a href="invest_performance.html" data-role="none">View Fund Performance </a>\ */
        }
        $.each(cpf, function(){
            var URL = (this.url != "null") ? this.url : null;
            $funds.append(renderFundHtml(this.name, this.units, this.value, URL));
            if(URL){
                $('.pf:last').bind('tap',function(){
                    app.openPage(URL);
                })
            }
        })
        $funds.trigger("create");
    },
    
    buildPaymentDetails: function() {
        var cpp = app.currentPlan.payment, 
            freqs = {
                M: "Monthly",
                Q: "Quarterly",
                H: "Half yearly",
                Y: "Yearly",
                N: "None"
            },
            methds = {
                D: "Direct Debit",
                S: "Scheme",
                C: "Cash",
                N: "None"
            },
            code = cpp.sortCode.toString().replace(/(\d\d)/g, "$1-").replace(/-$/,""),
            $dets = $('#pdetails'),
            $his = $('#history');
        function renderPaymentsDetails(prem, freq, method, code, acc){
            return '<div class="b_row"> \
                <div> \
                    <span>Payment Amount</span> \
                    <span>&euro; '+prem+'</span>  \
                </div>  \
                <div> \
                    <span>Frequency</span> \
                    <span>'+freq+'</span>  \
                </div> \
                <div> \
                    <span>Method</span> \
                    <span>'+method+'</span>  \
                </div>  \
                <div> \
                    <span>Bank Sort Code</span> \
                    <span>'+code+'</span>  \
                </div> \
                <div> \
                    <span>Account Number</span> \
                    <span>'+acc+'</span>  \
                </div> \
            </div>'
        }
        $dets.append(renderPaymentsDetails(cpp.prem || "N/A", freqs[cpp.freq], methds[cpp.method], code || "N/A", cpp.accountNumber || "N/A"));
        
        function renderPaymentHistoryRow(date, amt){
            return '<div> \
                    <span>'+date+'</span> \
                    <span>&euro; '+amt+'</span> \
                </div> '
        }
        if(typeof cpp.history != 'undefined')
            $.each(cpp.history, function(){
                $his.append(renderPaymentHistoryRow(this.date, this.amt));
            });
        else {
            $his.prev().remove();
            $his.remove();
        }
    },
    
    buildDocs: function(){
        var cpd = app.currentPlan.documents, $docs = $('#docs');
        function renderDoc(desc, date, url){
            return '<div class="doc_row" id="'+url+'"> \
                <div>'+desc+'</div> \
                <div>'+date+'</div> \
            </div>';
        }
        $.each(cpd, function(){
           $docs.append(renderDoc(this.type, this.date, this.url));
           var that = this;
           $('.doc_row:last').tap(function(){
                app.openPage(that.url);
                return false;
           }); 
        });
    },
	
	 //New GC Functions
	 
	pageLoadAlt: function(page){
    
    console.log("pageLoadAlt " + page);
    console.log("previousPage " + app.previousPage);
    app.loadFromCache = false;
		app.previousPage = app.currentPage;
    app.currentPage = page;
    var fromY = null, newTop, defaultPos =  '-37.8em';
        
    if(app.currentPage != 'main'  && app.currentPage != 'login' && app.currentPage != 'ret_login' && !app.firstTimeWelcomeScr) {
			
      console.log('step 2 - start of main block');
      app.firstMenuSreen = false;
			app.addMainToTopOfPage();
        var mainPage = $('#main');

      mainPage.css('background-color','transparent');
      mainPage.removeClass('panel').addClass('panel');
      
      $('.footer:last').css({
        background: 'url(/secureWeb/uploadedFiles/MyBiz/img/header_logo@2x.png) no-repeat, url(/secureWeb/uploadedFiles/MyBiz/img/header_logo_left@2x.png) repeat-x',
        height: '5.9em',
        backgroundSize: '32em auto, 0.1em 2.3em',
        backgroundPosition: '100% 0, 0 -.1em'
      });
    }
        
       
		console.log("checking current Page " + app.currentPage);

    switch(app.currentPage){
      case 'login':
          app.firstTimeLogin();
          $('#main').css('background-color','white');
          $('#main').removeClass('panel');
          $('#main').css({
              '-webkit-transition': 'none',
              '-webkit-transform': 'translate3d(0,0,0)',
              'transition': 'none',
              'transform': 'translate3d(0,0,0)'
          }); 
          break;
      case 'ret_login':
          app.retLogin();
          break;
      case 'main':
          if(app.firstMenuSreen)   
              $('.footer:last').css({
                      background: 'url(/secureWeb/uploadedFiles/MyBiz/img/icon-irishlife-mybiz@2x-1.png) no-repeat',
                      height: '5.5em',
                      backgroundSize: '12em',
                      backgroundPosition: 'center'
              })
          $('form').unbind();
          $('form').submit(function(){
              var toPage =  this.action.slice(this.action.lastIndexOf('/')+1);
              app.androidFix = true;
              if(toPage == 'returning_login.html'){
                  var log_off = app.ajax({
                                 type: "POST",
                                 url: "/mobile/Account/Logoff",
						   //url: "/secureWeb/uploadedFiles/Bline/MyBiz/methods/logoff.php",
                                 data: {token: app.sessionToken},
                                 dataType: "json"
                  });
                  log_off.always(function(){
                      app.sessionToken = null;
                      app.firstMenuSreen = true;
                      app.firstTimeWelcomeScr = true;
                      
                      app.storeKey(app.auth_key);
                      app.isLoggedIn = true;
                      app.changePageAlt(toPage);

                  })
               return false;

              
              }

              if(!app.firstMenuSreen){
                  app.loading(true);
                  $('#main').css({
                          '-webkit-transition': 'all 0.3s ease-out',
                          '-webkit-transform': 'translate3d(0,'+defaultPos+',0)',
                          'transition': 'all 0.3s ease-out',
                          'transform': 'translate3d(0,'+defaultPos+',0)',
                          'z-index':'99999999999',
                          'background':'transparent',
                      });
                  setTimeout(function(){
                      app.menuNav = true;
                      
                      app.changePageAlt(toPage, {transition: 'none'});
                      
                  },400);
                  setTimeout(function(){
                       $('#main').css('z-index','9');
                  },600);
                  return false;
              } 
          })
          break;
      case 'pipeline':
          app.buildPipeline();
          app.attachListHandlers(app.currentPage);                
          break;
     case 'alerts':
          app.buildAlerts();
          app.attachListHandlers(app.currentPage);
          break;
      case 'search':
          app.searchCustomers();
          break;
      case 'welcome':
          if(app.isLoggedIn) $('#go_to_login').remove();
      case 'contact':
      case 'about':
          $('.guide').tap(function(){
              console.log(this.href);
              a = this;
              app.openPage(this.href);
              return false;
          });
          if($('#tel').length > 0) {
              var getPhone = app.ajax({
                              type: "POST",
                              url: "/mobile/Account/ContactDetails",
						//url: "/secureWeb/uploadedFiles/Bline/MyBiz/methods/getContactDetails.php",
                              data:{
                                  token: app.sessionToken
                              },
                              dataType: "json"
                          });
              getPhone.done(function(cd){
                  var ph = cd[0].contactDetails.phone;
                  $('#tel').attr('href',$('#tel').attr('href').replace('$phone', ph));
                  $('#tel').text($('#tel').text().replace('$phone', ph.replace(/(\d\d)(\d\d\d)(\d\d\d\d)/, "$1 $2 $3")));
              })
              // $('#phone').attr('href', $('#phone').attr('href').replace())
          }
          break;
      case 'c_results':
          app.buildCustomerResults();
          break;
      case 'c_details':
          app.buildCustomerPlans();
          break;
      case 'p_desc':
          app.buildPlanDetails();
          $('#viewPDets').bind('tap',function(){
              app.changePageAlt('plan_details_menu.html');
          })
          break;
      case 'p_det_menu':
          app.setCustomerBackInfo();
          if(app.currentPlan.summary.type == "L") $('#vls').remove();
          else $('#befs').remove();
          if(app.isEmpty(app.currentPlan.requirements)) $('#reqs').remove();
          if(app.isEmpty(app.currentPlan.documents)) $('#dcs').remove();
          if(app.isEmpty(app.currentPlan.value)) $('#vls').remove();
          if(app.isEmpty(app.currentPlan.benefits)) $('#befs').remove();
          break;
      case 'plan_req':
          app.setCustomerBackInfo();
          app.buildPlanRequirements();
          break;
      case 'benefits':
          app.setCustomerBackInfo();
          app.buildPlanBenefits();
          break;
      case 'p_vals':
          app.setCustomerBackInfo();
          app.buildPlanValues();
          break;
      case 'payments':
          app.setCustomerBackInfo();
          app.buildPaymentDetails();
          break;
      case 'detail_docs':
          app.setCustomerBackInfo();
          app.buildDocs();
          break;
        }
    },

	changePageAlt:function(page, trans)
	{
		app.beforePageShowAlt(page);
		$('#the-page-content').load('/secureWeb/uploadedFiles/MyBiz/pages/'+page, function() {
			app.pageLoadAlt($('#the-page-content div').attr('id'));
			$('#the-page-content div').addClass('ui-page-active')
			app.pageShowAlt(page);
			if( app.ua.indexOf('windows phone') >= 0){$("#pinToStart").css('display','block');}
		});
	},
	
	mainNavDown : false,
	
	addMainToTopOfPage: function()
	{
		console.log('adding main menu to top of page ' + app.currentPage);
		app.mainNavDown = false;
		$('#mainNav').load('/secureWeb/uploadedFiles/MyBiz/pages/main.html', function() {
		 app.getPipeline(true);
         app.getAlerts(true);
		 $('#main .wrap').css('font-size','62.5%');
		 $('#main').css('position','absolute');
			$('#main').css('width','100%');
			$('#main').css('top','-388px');
			
		 $('.main_handle').click(function(){
			
			if (app.mainNavDown)
			{
				console.log('move nav up');
				$('#main').css('top','-388px');
				$('#main').css('z-index','9996');
				app.mainNavDown = false;
			}
			else
			{
				console.log('move nav down');
				app.mainNavDown = true;
				$('#main').css('top','0px');
				$('#main').css('z-index','9998');
			}
		 });
		console.log('added main menu - main nav down is ' + app.mainNavDown);
		});
	},
	
	beforePageShowAlt: function(page){
	console.log('beforePageShowAlt ' + page);

        if( page == "pipeline.html" ){
          app.fromPipeline = true;
          app.fromAlerts = false;
          app.fromSearch = false;
        } 
        
        else if (page == "customer_alerts.html" ){
          app.fromAlerts = true;
          app.fromPipeline = false;
          app.fromSearch = false;
        }

        else if (page == "find_customers.html" ){
          app.fromSearch = true;
          app.fromPipeline = false;
          app.fromAlerts = false;
        }

        

        if(app.currentPage == 'welcome' && app.firstTimeWelcomeScr){
                $('.header:last').css({
                        background: '#5356a6 url(/secureWeb/uploadedFiles/MyBiz/img/header_logo_touchless@2x.png)' ,
                        backgroundSize: '100% 3.1em',
                        backgroundPosition:'0 0',
                        backgroundRepeat: 'no-repeat'
                });
        }
        if(app.currentPage != 'main' && app.menuNav) {
                    app.currentPageContainer.hide();
                    app.currentPageContainer.fadeIn(200);
                    app.menuNav = false;
        }
        if(app.currentPage == 'ret_login' && app.firstMenuSreen){
                    $('.main_handle').unbind();
                    $('.footer:last').css({
                            background: 'url(/secureWeb/uploadedFiles/MyBiz/img/icon-irishlife-mybiz@2x-1.png) no-repeat',
                            height: '5.5em',
                            backgroundSize: '12em',
                            backgroundPosition: 'center'
                    })
        }
    },
      
    pageShowAlt: function(page){

		console.log('pageShowAlt ' + page + ' currentPage is ' + app.currentPage);
        if(app.loadFromCache || app.loadFromPanel ){
            app.currentPageContainer = $('.ui-page-active');
            app.currentPage = app.currentPageContainer.attr('id');
        }
       
        app.loadFromPanel = false; 
        if(!$.mobile.page.prototype.options.domCache) $('.ui-page').not('.ui-page-active').not('#main').remove();
        var defaultPos =  '-37.8em'; 
        if(app.currentPage != 'main'  && app.currentPage != 'login' && app.currentPage != 'ret_login')
                                $('#main').css({
                                        '-webkit-transition': 'none',
                                        '-webkit-transform': 'translate3d(0,'+defaultPos+',0)',
                                        'transition': 'none',
                                        'transform': 'translate3d(0,'+defaultPos+',0)'
                                    });
        switch(app.currentPage){
            case 'login':
            case 'ret_login':
                app.firstTimeWelcomeScr = false;
				$('#main').remove();
                break;
            case 'welcome':
                $('.splashscreen').remove();
                break;
            case 'ret_login':
                $('.splashscreen').remove();
                break;
            case 'main':
                $('#main').css('background-color','white');
                $('#main').removeClass('panel');
                $('#main').css({
                    '-webkit-transition': 'none',
                    '-webkit-transform': 'translate3d(0,0,0)',
                    'transition': 'none',
                    'transform': 'translate3d(0,0,0)'
                });
                if(!$.mobile.page.prototype.options.domCache){
					console.log('about to get pipeline and alerts');
                    app.getPipeline();
                    app.getAlerts();
                }
                break;
			case 'pipeline':case 'alerts':case 'search':
				console.log('setting a start screen ' + app.currentPage);
				app.startScreen = app.currentPage;
				break;
                   }
				   
		app.attachBackFunction();
        app.loadFromCache = true;
    },

	openPage: function (pdf){
                var ur = pdf;
                url = "https://docs.google.com/viewer?url=" + encodeURIComponent(ur);
                window.open(url,"_blank");
	},
	
	attachBackFunction: function(){
	
  		 $('.header a').click(function(){	
      
				 switch(app.currentPage){
					case 'p_desc':

            if(app.fromPipeline == true){
              app.changePageAlt('pipeline.html');
            }
            else if (app.fromAlerts == true) {
              app.changePageAlt('customer_alerts.html');
            }
            else if (app.fromSearch == true) {
              app.changePageAlt('find_customers.html');
            }

						break;
					case 'c_results':
						app.changePageAlt('find_customers.html');
						break;
					case 'c_details':
						app.changePageAlt('customer_results.html');
						break;						
					case 'p_det_menu':
						app.changePageAlt('plan_description.html');
						break;
					case 'plan_req':
					case 'p_vals':
					case 'payments':
					case 'detail_docs':
					case 'benefits':
						app.changePageAlt('plan_details_menu.html');
						break;
				}
		 });
	
	},
	
	toggleTileOverlay: function() { 
               var newVisibility = (document.getElementById('TileOverlay').style.visibility == 'visible') ? 'hidden' : 'visible'; 
              document.getElementById('TileOverlay').style.visibility = newVisibility; 
             }, 
	
	 initialize: function() {
    console.logLevel = 2;
        
		console.log(app.ua);
	
		//get the key from cookie
		app.auth_key = app.getKey();

	    if($.mobile.page.prototype.options.domCache) $.mobile.page.prototype.options.domCache = false; //disable dom cache
        $('.ui-page').not('.ui-page-active').not('#main').remove(); //cleanup dom cache; let the cached main menu alone
        app.isOnline = true;
		
        app.loadOverLay = $('#screen_overlay');
        app.spinner = $('.ui-loader');
		if(app.auth_key) {
			 $('.splashscreen').hide();
             app.changePageAlt('returning_login.html');
        }
        else{ 
	     	 $('.splashscreen').hide();			
			app.changePageAlt('welcome.html');
	    }

        $(document).bind('ajaxStart', function(){ app.loading(true) });
        $(document).bind('ajaxStop', function(){ 
            app.loading() 
         });
	
	}
};