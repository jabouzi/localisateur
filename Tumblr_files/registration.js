(function(c,b){var a={dictionary:[],maxTransforms:1,costMultiplier:1,damerauLevenshteinDist:function(m,l,h){if(typeof(m)!=="string"||typeof(l)!=="string"){return false}if(typeof(h)!="number"){h=99}var g=0,e=0,d=0,o=m.length,n=l.length;if(o===0||n===0){return(Math.abs(o-n)<=h)?Math.max(o,n):false}if(o<n){var f;f=o;o=n;n=f;f=m;m=l;l=f}var k=[];for(g=0;g<=o;g++){k[g]=[];k[g][0]=g}for(e=0;e<=n;e++){k[0][e]=e}for(g=1;g<=o;g++){for(e=1;e<=n;e++){if(m[g-1]==l[e-1]){d=0}else{d=1}k[g][e]=Math.min(k[g-1][e]+1,k[g][e-1]+1,k[g-1][e-1]+d);if(g==1||e==1){continue}if(m[g-1]==l[e-2]&&m[g-2]==l[e-1]){k[g][e]=Math.min(k[g][e],k[g-2][e-2]+d)}}}return(k[o][n]<=h)?k[o][n]:false},returnFunc:function(d,e){return d.name},suggest:function(e){var d=[],i=0,h=this.damerauLevenshteinDist,g=this.maxTransforms,f=this.returnFunc;c.each(this.dictionary,function(j,k){if((i=h(e,k.name,g))!==false){d.push({name:k.name,dist:i,cost:k.cost})}});if(d.length){return c.map(d.sort(this.sortByFunc),this.returnFunc)}else{return[]}},sortByFunc:function(e,d){var g=e.dist+e.cost*this.costMultiplier;var f=d.dist+d.cost*this.costMultiplier;return g-f},initialized:false,init:function(g,d){if(!(g instanceof Array)){return false}var f=[];var e;c.each(g,function(h,j){var i=typeof(j);if(i==="object"){f.push(j)}else{if(i==="string"){f.push({name:j,cost:0})}}});this.dictionary=f;if(typeof(d)=="object"){for(e in d){if(d.hasOwnProperty(e)&&this.hasOwnProperty(e)){this[e]=d[e]}}}this.initialized=true;return this}};b.SpellChecker=a})(jQuery,Tumblr);
(function(i,k,a){var e=["webkit","Moz","ms","O"];var p={};var o;function g(q,t){var r=k.createElement(q||"div");var s;for(s in t){r[s]=t[s]}return r}function h(r){for(var q=1,s=arguments.length;q<s;q++){r.appendChild(arguments[q])}return r}var j=function(){var q=g("style");h(k.getElementsByTagName("head")[0],q);return q.sheet||q.styleSheet}();function c(u,q,v,y){var r=["opacity",q,~~(u*100),v,y].join("-");var s=0.01+v/y*100;var x=Math.max(1-(1-u)/q*(100-s),u);var w=o.substring(0,o.indexOf("Animation")).toLowerCase();var t=w&&"-"+w+"-"||"";if(!p[r]){j.insertRule("@"+t+"keyframes "+r+"{0%{opacity:"+x+"}"+s+"%{opacity:"+u+"}"+(s+0.01)+"%{opacity:1}"+(s+q)%100+"%{opacity:"+u+"}100%{opacity:"+x+"}}",0);p[r]=1}return r}function n(u,v){var t=u.style;var q;var r;if(t[v]!==a){return v}v=v.charAt(0).toUpperCase()+v.slice(1);for(r=0;r<e.length;r++){q=e[r]+v;if(t[q]!==a){return q}}}function f(q,s){for(var r in s){q.style[n(q,r)||r]=s[r]}return q}function m(s){for(var q=1;q<arguments.length;q++){var r=arguments[q];for(var t in r){if(s[t]===a){s[t]=r[t]}}}return s}function l(q){var r={x:q.offsetLeft,y:q.offsetTop};while((q=q.offsetParent)){r.x+=q.offsetLeft;r.y+=q.offsetTop}return r}var d={lines:12,length:7,width:5,radius:10,color:"#000",speed:1,trail:100,opacity:1/4,fps:20,zIndex:2000000000,className:"spinner",top:"auto",left:"auto"};var b=function b(q){if(!this.spin){return new b(q)}this.opts=m(q||{},b.defaults,d)};b.defaults={};b.prototype={spin:function(x){this.stop();var B=this;var q=B.opts;var r=B.el=f(g(0,{className:q.className}),{position:"relative",zIndex:q.zIndex});var A=q.radius+q.length+q.width;var C;var z;if(x){x.insertBefore(r,x.firstChild||null);z=l(x);C=l(r);f(r,{left:(q.left=="auto"?z.x-C.x+(x.offsetWidth>>1):q.left+A)+"px",top:(q.top=="auto"?z.y-C.y+(x.offsetHeight>>1):q.top+A)+"px"})}r.setAttribute("aria-role","progressbar");B.lines(r,B.opts);if(!o){var u=0;var s=q.fps;var w=s/q.speed;var v=(1-q.opacity)/(w*q.trail/100);var y=w/q.lines;!function t(){u++;for(var D=q.lines;D;D--){var E=Math.max(1-(u+D*y)%w*v,q.opacity);B.opacity(r,q.lines-D,E,q)}B.timeout=B.el&&setTimeout(t,~~(1000/s))}()}return B},stop:function(){var q=this.el;if(q){clearTimeout(this.timeout);if(q.parentNode){q.parentNode.removeChild(q)}this.el=a}return this},lines:function(s,u){var r=0;var q;function t(v,w){return f(g(),{position:"absolute",width:(u.length+u.width)+"px",height:u.width+"px",background:v,boxShadow:w,transformOrigin:"left",transform:"rotate("+~~(360/u.lines*r)+"deg) translate("+u.radius+"px,0)",borderRadius:(u.width>>1)+"px"})}for(;r<u.lines;r++){q=f(g(),{position:"absolute",top:1+~(u.width/2)+"px",transform:u.hwaccel?"translate3d(0,0,0)":"",opacity:u.opacity,animation:o&&c(u.opacity,u.trail,r,u.lines)+" "+1/u.speed+"s linear infinite"});if(u.shadow){h(q,f(t("#000","0 0 4px #000"),{top:2+"px"}))}h(s,h(q,t(u.color,"0 0 1px rgba(0,0,0,.1)")))}return s},opacity:function(r,q,s){if(q<r.childNodes.length){r.childNodes[q].style.opacity=s}}};!function(){var r=f(g("group"),{behavior:"url(#default#VML)"});var q;if(!n(r,"transform")&&r.adj){for(q=4;q--;){j.addRule(["group","roundrect","fill","stroke"][q],"behavior:url(#default#VML)")}b.prototype.lines=function(v,u){var t=u.length+u.width;var B=2*t;function A(){return f(g("group",{coordsize:B+" "+B,coordorigin:-t+" "+-t}),{width:B,height:B})}var w=-(u.width+u.length)*2+"px";var z=f(A(),{position:"absolute",top:w,left:w});var y;function x(C,s,D){h(z,h(f(A(),{rotation:360/u.lines*C+"deg",left:~~s}),h(f(g("roundrect",{arcsize:1}),{width:t,height:u.width,left:u.radius,top:-u.width>>1,filter:D}),g("fill",{color:u.color,opacity:u.opacity}),g("stroke",{opacity:0}))))}if(u.shadow){for(y=1;y<=u.lines;y++){x(y,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)")}}for(y=1;y<=u.lines;y++){x(y)}return h(v,z)};b.prototype.opacity=function(t,s,v,u){var w=t.firstChild;u=u.shadow&&u.lines||0;if(w&&s+u<w.childNodes.length){w=w.childNodes[s+u];w=w&&w.firstChild;w=w&&w.firstChild;if(w){w.opacity=v}}}}else{o=n(r,"animation")}}();i.Spinner=b})(window,document);
(function(c,b){var a=Backbone.View.extend({el:"body",initialize:function(){this.frame_width=100;this.frame_count=98;this.frame_rate=12;this.freeze_frames=[1,7,20,29,38,47,70,88];this.current_frame=this.freeze_frames[Math.floor(Math.random()*this.freeze_frames.length)]-1;this.is_animating=false;this.animation=false;this.animation_time=false;this.determine_animation_method();this.$loader=this.create_loader()},create_loader:function(){return c('<div id="illustrated_loader" class="illustrated_loader over_glass" />')},attach_loader:function(){if(!c("#illustrated_loader").length){this.$el.append(this.$loader)}},determine_animation_method:function(){(function(){var e=0;var f=["ms","moz","webkit","o"];for(var d=0;d<f.length&&!window.requestAnimationFrame;++d){window.requestAnimationFrame=window[f[d]+"RequestAnimationFrame"];window.cancelAnimationFrame=window[f[d]+"CancelAnimationFrame"]||window[f[d]+"CancelRequestAnimationFrame"]}if(!window.requestAnimationFrame){window.requestAnimationFrame=function(k,h){var g=new Date().getTime();var i=Math.max(0,16-(g-e));var j=window.setTimeout(function(){k(g+i)},i);e=g+i;return j}}if(!window.cancelAnimationFrame){window.cancelAnimationFrame=function(g){clearTimeout(g)}}}());this.animation_method=(requestAnimationFrame)?"requestAnimationFrame":"interval"},start_animation:function(){this.attach_loader();this.current_frame=(this.current_frame)?this.current_frame:0;this.set_frame();if(this.animation_method=="interval"){if(this.is_animating){return}this.animation=setInterval(function(){this.next_frame()}.bind(this),1000/this.frame_rate)}else{var d=new Date().getTime(),e=d-(this.animation_time||d);this.animation_time=d;setTimeout(function(){this.animation=requestAnimationFrame(this.start_animation.bind(this));this.next_frame()}.bind(this),1000/this.frame_rate)}this.is_animating=true},stop_animation:function(){if(this.animation_method=="interval"){clearInterval(this.animation)}else{cancelAnimationFrame(this.animation)}this.is_animating=false},next_frame:function(){this.current_frame++;if(_.contains(this.freeze_frames,this.current_frame)){this.stop_animation();setTimeout(this.start_animation.bind(this),500);return}if(this.frame_wait>=this.frame_rate){this.frame_wait=0}if(this.current_frame>=this.frame_count){this.current_frame=0}this.set_frame()},set_frame:function(){this.$loader.css({"background-position":"-"+(this.current_frame*this.frame_width)+"px 0px"})}});b.IllustratedLoader=a})(jQuery,Tumblr);
(typeof Tumblr!=="undefined")||(Tumblr={});(function(b,a){var c=Backbone.View.extend({initialize:function(f){this.options=f||{};if(window.Recaptcha){return}var e=document.createElement("script");e.src="//www.google.com/recaptcha/api/js/recaptcha_ajax.js";e.onload=this.setup_captcha.bind(this);var d=document.getElementsByTagName("script")[0];d.parentNode.insertBefore(e,d)},setup_captcha:function(){this.$captcha_input=b("#recaptcha_response_field");this.$captcha_controls=b(".captcha_control");this.$captcha_controls.on("click.recaptcha",function(e){var d=b(e.target);if(d.hasClass("audio")){this.audio()}if(d.hasClass("visual")){this.visual()}}.bind(this));this.captcha_callback=this.options.callback||function(){};this.captcha_callback()},audio:function(){this.$captcha_input.attr({placeholder:this.$captcha_input.data("placeholder-audio")})},visual:function(){this.$captcha_input.attr({placeholder:this.$captcha_input.data("placeholder-visual")})}});Tumblr.Recaptcha=c})(jQuery,Tumblr);
var SignupProcess=(function(F){var I,aa,B,u,q,p,m,b,v,g,V,Y,k,t=false,f=[],R,D,Q,a,T,s,z,A;var y=(document.location.protocol==="https:"),H="";b=[{name:"gmail.com",cost:0,share:30.2102985741},{name:"yahoo.com",cost:0,share:26.013029172},{name:"hotmail.com",cost:1,share:18.1002246857},{name:"aol.com",cost:6,share:3.03687405106},{name:"live.com",cost:9,share:2.06294942827},{name:"hotmail.co.uk",cost:10,share:1.95604539045},{name:"aim.com",cost:10,share:1.89339378918},{name:"mail.com",cost:17,share:1.2102985741},{name:"ymail.com",cost:18,share:1.0549753888},{name:"msn.com",cost:32,share:0.609550330148}];g=(window.devicePixelRatio)?true:false;function c(ab){m.current_view=ab;F("body").addClass("show_form").addClass(ab);Tumblr.KeyCommands.suspend();loading_next_page=true;j(ab);Tumblr.PlaceHolders.init();z.track_event("update_view",ab)}function U(ab){reset_form=(ab===undefined)?true:false;ab=ab||"show_form signup_account signup_birthday signup_register signup_login signup_waiting slow_motion now";F.each(ab.split(/\s+/),function(ac,ad){F("body").removeClass(ad)});if(F("#signup_button_signup").length){F("#signup_button_signup").removeClass("shallow").addClass("other_blue")}Tumblr.KeyCommands.resume();loading_next_page=false;m.current_view=null;F(document.activeElement).blur();if(Tumblr.Glass.visible){Tumblr.Glass.hide()}u=null;if(reset_form){n()}if(reset_form){z.track_event("reset_view")}}function j(ac){var ad=F("#"+ac),ag,af,ae;F("#signup_forms_submit").removeClass("changed");u=F("#"+ac+" input");p.attr("action",p.attr("data-secure-ajax-action"));l();Z();if(W(ac)){M();p.attr("action",p.attr("data-secure-action"));u=F('#signup_account input:not("#signup_username")');if(F("#signup_button_signup").length){F("#signup_button_signup").addClass("shallow").removeClass("other_blue")}if(g){F("#signup_username").focus();F("#signup_email").focus()}if(m.errors){e(m.errors);m.errors=null}if(F("body").hasClass("has_login_captcha")){r(function(){window.Recaptcha.create(F("#recaptcha_public_key").val(),"recaptcha_widget",{theme:"custom",custom_theme_widget:"recaptcha_widget",callback:function(){window.Recaptcha.focus_response_field;F("#signup_forms_panel").css("display","none");F("#signup_forms_panel").css("display","block")}})})}}if(ac=="signup_account"){if(g){F("#signup_username").focus();F("#signup_email").focus()}if(s){if(!T){T=new Tumblr.PasswordStrengthMeter()}else{T.update()}}ad.keydown(function(ai){ag=F(ai.target);if(ag.hasClass("signup_username")){F("#used_suggestion").val(0)}})}if(ac=="signup_birthday"){setTimeout(function(){F("#signup_age").focus()},500);S(F("#signup_age"));ad.keyup(function(ai){ag=F(ai.target);if(ag.hasClass("signup_age")){S(ag)}});ad.keydown(function(ai){ag=F(ai.target);if(ag.hasClass("signup_age")){S(ag)}});ad.keypress(function(ai){ag=F(ai.target);if(ag.hasClass("signup_age")){S(ag)}})}if(ac=="signup_register"){if(g){setTimeout(function(){F("#recaptcha_response_field").focus()},1000)}r(function(){window.Recaptcha.create(F("#recaptcha_public_key").val(),"recaptcha_widget",{theme:"custom",custom_theme_widget:"recaptcha_widget",callback:function(){window.Recaptcha.focus_response_field;F("#signup_forms_panel").css("display","none");F("#signup_forms_panel").css("display","block")}})});ad.keyup(function(){F("#signup_forms_submit").addClass("changed")})}if(ac=="signup_waiting"){if(A){var ab=new Tumblr.IllustratedLoader();ab.start_animation()}else{var ah=new Spinner(m.spinner_opts).spin();F("#signup_waiting").append(F(ah.el))}if(F("#failed_redirect_link").length){F("#failed_redirect_link").addClass("show")}F(window).off("keydown keyup keypress")}}function Z(){F("#"+m.current_view+" input").each(function(ab){F(this).removeAttr("disabled")})}function l(){F("#signup_form .form_row input").each(function(ab){F(this).attr("disabled","disabled")})}function M(){F("#signup_form .form_row input").each(function(ab){F(this).removeAttr("disabled")})}function J(){l();Z()}function S(ab){label=F("label[for='"+ab.attr("id")+"']");slug=label.children().first();slug.html(ab.val());if(ab.val()===""){ab.addClass("is_empty");label.addClass("is_empty")}else{ab.removeClass("is_empty");label.removeClass("is_empty")}if(parseInt(ab.val(),10)>29){label.addClass("years_young").removeClass("years_old")}else{label.addClass("years_old").removeClass("years_young")}}function o(ac){var ab=F("#suggested_usernames"),ad=F("#suggested_usernames_container"),ae=ac.length;ab.html("");for(i=ae-1;i>=0;i--){new_username=F("<li></li>");new_username.attr("class","popover_menu_item");new_username.html(ac[i]);ab.append(new_username)}ad.removeClass("hidden");I=new Tumblr.Popover({el:"#suggested_usernames_container",direction:"left",skip_glass:true});I.show();new Tumblr.UsernameSuggester();F("#seen_suggestion")[0].value++}function X(ag){var ac=F("#signup_form_errors"),af=ag.length,ab,ad;ac.html("");for(ad=af-1;ad>=0;ad--){ab=F("<li></li>");ab.attr("class","error");ab.html(ag[ad]);ac.append(ab);var ae=ag[ad].replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi,"");z.track_event("error",ae)}}function e(ac){if(ac&&ac.length){X(ac);F("#signup_forms").addClass("has_errors")}if(m.current_view=="signup_register"){window.Recaptcha.reload()}if(!D){F("#signup_forms_container").addClass("shake").addClass("animated")}var ab=setTimeout(function(){F("#signup_forms_container").removeClass("shake")},500)}function n(){F("#signup_form")[0].reset();Tumblr.PlaceHolders.init();P()}function P(){F("#signup_forms_container").removeClass("shake");F("#signup_forms").removeClass("has_errors")}function x(){var ac=u.length,af=[],ae,ad,ab;for(ab=ac-1;ab>=0;ab--){ae=u[ab];if((ae.value===""||(ae.type=="checkbox"&&ae.checked===false))&&F(ae).attr("data-required")){switch(ae.id){case"signup_email":ad=N(["Don't forget your email address!","You forgot to enter your email address!"]);break;case"signup_password":ad=N(["Don't forget your password!","You forgot to enter your password!"]);break;case"signup_username":ad=N(["Don't forget your username!","You forgot to enter your username!"]);break;case"signup_age":ad=N(["Don't forget to tell us your age!","You forgot to tell us your age."]);break;case"signup_tos":ad=N(["One more thing &ndash; please accept our Terms!","You must accept Tumblr's terms before proceeding."]);break;case"recaptcha_response_field":ad=N(["Don't forget to fill out the Captcha!","Please fill out the Captcha."]);break;default:ad=N(["There was an error. Please try again.","Oops. There was an error. Try again."])}af.push(__(ad))}}if(af.length){e(af);return false}return true}function L(ak){if(W(m.current_view)){return true}ak=F(ak);var am=[],ad=ak.val(),ab;if(ad!==""){if(ak.attr("id")=="signup_email"){var af,aj,ah,al,an,ac;Tumblr.SpellChecker.init(b,{costMultiplier:0.05});ah=(aj=ad.match(/[^@]+$/))?aj[0]:"";if(!/\@/.test(ad)){ab="That's not a valid email address. Please try again."}else{if(ad.toLowerCase().indexOf("@tumblr.com")!=-1){ab=N(["That email address is already in use. Please try again.","That email address is already associated with another account."])}else{if(!t&&(af=Tumblr.SpellChecker.suggest(ah)).length){an=ad.split("@")[0]+"@"+af[0];if(an!=ad){ac=__("Oops. Did you mean %1$s ?");email_placeholder="%1$s";al='<a href="#" id="signup_email_suggestion">'+an+"</a>";ab=ac.replace(email_placeholder,al,"g");t=true}}}}}if(ak.attr("id")=="signup_password"){if(F.trim(ad)==""){ab="Don't forget your password!"}if(T&&T.block_registration_step){ab=T.block_registration_step}}if(ak.attr("id")=="signup_username"){if(ad.length>0&&ad.indexOf("-",ad.length-1)===ad.length-1){ab="Sorry, your username cannot end with a hyphen. Try again."}if(ad.lastIndexOf("-",0)===0){ab="Sorry, your username cannot start with a hyphen. Try again."}if(ad.toLowerCase().indexOf("tumblr")!=-1){ab="Sorry, your username cannot contain Tumblr. Try another one."}}if(ak.attr("id")=="signup_age"){var ag=parseInt(ad);var ai=new String(ag);var ae=ad.replace(/^\s+|\s+$/g,"");if(!(ai==ae)){ab="Please enter your age as a number only!"}else{if(ag<1){ab="Please enter a number!"}}}if(ab){am.push(__(ab))}}if(am.length){e(am);return false}P();return true}function C(){for(var ab=u.length-1;ab>=0;ab--){if(!L(u[ab])){return false}}return x()}function O(){if(F(I).length){F("#suggested_usernames_container").addClass("hidden");F(I).hide()}}function E(){P();if(W(m.current_view)){p.submit();return true}else{if(m.current_view==="signup_account"&&!p.find("#signup_username").val()){p.prop("action",p.attr("data-secure-action"));p.submit()}else{if(C()){O();M();signup_form_data=p.serialize()+"&action="+encodeURIComponent(m.current_view)+"&tracking_url="+encodeURIComponent(Y)+"&tracking_version="+encodeURIComponent(V);F.ajax(p.attr("action"),{type:"POST",data:signup_form_data,error:function(ab,ae,ad){try{ab=JSON.parse(ab.responseText)}catch(ac){ab={}}if(ab.redirect){z.track_event("error","redirect");window.location.replace(ab.redirect)}else{e(ab.errors);if(ab.usernames){setTimeout(function(){o(ab.usernames)},750)}}if(m.current_view=="signup_register"){z.track_event("fail",k)}},success:function(ab){if(ab.signup_success){z.track_event("success",k)}if(ab.redirect){c("signup_waiting");window.location.replace(ab.redirect)}else{c(F("#"+m.current_view).next().attr("id"))}}})}}}}function G(ab){if(F(ab.target).attr("id")=="signup_email_suggestion"){F("#signup_email").val(F(ab.target).html());F("#signup_password").focus();P();ab.preventDefault();ab.stopPropagation()}}function w(){var ab=document.activeElement,ac=(u)?u.length-1:false;if(ab&&ac&&u[ac]){return(ab.id==u[ac].id)?true:false}return}function d(){if(F("body").hasClass("signup_login")){SignupProcess.update_view("signup_login")}else{if(F("body").hasClass("signup_account")){SignupProcess.update_view("signup_account")}else{if(F("body").hasClass("signup_waiting")){SignupProcess.update_view("signup_waiting")}}}}function K(){var ab=F("#signup_subhead"),ac=F("#signup_subhead_content"),ad;if(ab.length==0){return}ad=ab.width();if(ac.width()>ad){ab.addClass("medium");setTimeout(function(){if(ac.width()>ad){ab.addClass("small").removeClass("medium");setTimeout(function(){if(ac.width()>ad){ab.addClass("infinitesimal").removeClass("small")}},0)}},0)}}function h(){v=F(".like_button, .reblog_button, .everyone_i_follow, .my_posts, .send_to_signup")}function W(ab){return(ab==="signup_login")}function N(ab){if(!ab.length){return}var ad=ab.length,ac=Math.floor(Math.random()*ad);return ab[ac]}function r(ab){new Tumblr.Recaptcha({callback:ab})}return{initialize:function(ab){ab=ab||{};A=ab.use_illustrated_loader||false;H=F("#tumblr_form_key").attr("content");R=document.body.className.match("is_login_register");R=(R&&R.length)?true:false;Q=(F(document.body).hasClass("is_tablet"));a=(F(document.body).hasClass("is_mobile_handset"));D=(Q||a);s=(F(document.body).hasClass("show_password_strength"));p=F("#signup_form");q=F("#signup_forms_submit");aa=F(".signup_buttons .login_signup_button, #logo");B=F(".signup_view");signup_form_fields=F("#signup_form input");m=this;V="modal";Y=document.location.pathname;k="?url="+Y+"&version="+V;h();z=new Tumblr.OnboardingBehaviors();F(document).click(function(ac){if(F.inArray(ac.target,v)!==-1){var ad=document.getElementById("signup_button_signup");if(ad){ad.click()}ac.preventDefault();ac.stopPropagation()}});if(!R&&p){F(window).keydown(function(ac){f[ac.keyCode]=1;if(f[16]){F("body").addClass("slow_motion")}if(f[17]&&f[18]&&f[76]){F("body").removeClass("slow_motion");c("signup_login");f=[];return false}});F(window).keyup(function(ac){f[ac.keyCode]=0;if(ac.keyCode==16){F("body").removeClass("slow_motion")}if(ac.keyCode==27){if(F("body").hasClass("lite")){return}if(F("body").hasClass("already_logged_in")){window.location="/dashboard"}}})}if(p.length){signup_form_fields.each(function(ac){F(this).on("change",_.partial(L,this))});p.on("keydown",function(ac){if(ac.keyCode==9&&!ac.shiftKey){if(w()){ac.preventDefault();ac.stopPropagation()}}if(ac.keyCode==13){ac.preventDefault();ac.stopPropagation();E()}});F("#signup_form_errors").click(G);q.click(function(){E()});F("#signup_forms_container").scroll(function(ac){F("#signup_forms_container").scrollLeft(0)});d();if(m.errors){e(m.errors);m.errors=null}}K()},update_send_to_signup_links:h,reset_view:function(){U()},update_view:function(ab){U();c(ab)},current_view:null,spinner_opts:{lines:16,length:11,width:4,radius:17,color:"#fff",speed:0.9,trail:34,shadow:false,hwaccel:false,className:"signup_waiting_spinner spinner",zIndex:2000000000,top:"50",left:"auto"}}})(jQuery);
(function(b,a){var c=Backbone.View.extend({el:"body",events:{},initialize:function(){b("#signup_form input").on("focus",function(d){if(!this.tracking_events){this.start_tracking_events();this.tracking_events=true}}.bind(this))},tracking_events:false,track_event:function(e,d){if(_gaq){_gaq.push(["_trackPageview","/signup/"+e])}},start_tracking_events:function(){b("body").on("click",function(d){var e=d.currentTarget,f=e.nodeName;f+=(e.id.length)?"-"+e.id:"";f+=(e.className.length)?"-"+e.className:"";this.track_event("clicked",f)}.bind(this));b(window).on("keyup",function(d){if(d.keyCode==27){this.track_event("keypress","esc")}}.bind(this))}});a.OnboardingBehaviors=c})(jQuery,Tumblr);