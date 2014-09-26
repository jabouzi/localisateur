(function(b,a){var c={zIndex:2000000000,color:"auto",top:"auto",left:"auto",position:"relative",className:"leviathan"};function d(e){if(!this.start){return new d(e)}this.created=false;this.opts=this.opts||{};_.extend(this.opts,d.defaults,c,e)}d.defaults={};d.prototype={start:function(e){if(typeof e!=="object"){e=false}if(e&&e instanceof jQuery){e=e[0]}if(!this.created&&!e){return false}if(!e){e=this.$target[0]}this.destroy();this.uid=this._uid();this.$target=b(e);this.$target.data("loader-uid",this.uid);this.el=this._html();this.$target.append(this.el);this.$loader=b("#loader_"+this.uid);this._init();return this},stop:function(){if(typeof this.$loader!=="undefined"){this.$loader.hide();this.$loader.removeClass("animate")}return this},destroy:function(){this.stop();if(typeof this.$loader!=="undefined"){this.$loader.remove()}if(typeof this.$target!=="undefined"){this.$target.removeData("loader-uid")}return this},center:function(){if(!this.created){return false}var f=this.$target.width();var e=this.$target.height();var h=this.$loader.width();var g=this.$loader.height();var j=(f/2)-(h/2);var i=(e/2)-(g/2);this.$loader.css({left:((this.opts.left==="auto")?j:this.opts.left),top:((this.opts.top==="auto")?i:this.opts.top)});return this},_clear_timeouts:function(){clearTimeout(this.t1);clearTimeout(this.t2);clearTimeout(this.t3)},_init:function(){this.created=true;if(this.opts.color!=="auto"){b(".Knight-Rider-bar",this.$loader).css("background-color",this.opts.color)}this.$loader.css("position",this.opts.position);this.$loader.css("z-index",this.opts.zIndex);this.center();this.$loader.show()},_uid:function(){return Math.floor(Math.random()*10000000)},_html:function(){return'<div id="loader_'+this.uid+'" class="Knight-Rider-loader centered animate '+this.opts.className+'"><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div><div class="Knight-Rider-bar"></div></div>'}};a.Loader=d})(jQuery,Tumblr);
(function(c,a){var b=Backbone.View.extend({initialize:function(d){this.options=d||{};if(typeof this.$el=="undefined"||this.$el.length===0||this.$el.find("leviathan").length!==0){this.remove();return false}this.is_dark=this.options.dark||false;this.id_name=this.options.id_name||false;this.uid=Math.floor(Math.random()*10000);this.$el.append(this.html());this.$loader=c(".leviathan.loader_"+this.uid);if(this.is_dark){this.$loader.addClass("dark")}this.center();this.$u1=c("i.unum",this.$loader);this.$u2=c("i.duo",this.$loader);this.$u3=c("i.tres",this.$loader);this.ti=null;this.t1=null;this.t2=null;this.t3=null},start:function(){clearInterval(this.ti);var d=function(){this.t1=this.rise(this.$u1,300,0);this.t2=this.rise(this.$u2,300,100);this.t3=this.rise(this.$u3,300,200)}.bind(this);d();this.ti=setInterval(function(){clearTimeout(this.t1);clearTimeout(this.t2);clearTimeout(this.t3);d()}.bind(this,d),600);this.$loader.show()},stop:function(){this.$loader.hide();clearInterval(this.ti);clearTimeout(this.t1);clearTimeout(this.t2);clearTimeout(this.t3)},destroy:function(){this.stop();this.unbind();this.$loader.remove();this.remove()},center:function(){var e=this.$el.width();var d=this.$el.height();var g=this.$loader.width();var f=this.$loader.height();var i=(e/2)-(g/2);var h=(d/2)-(f/2);this.$loader.css({left:i,top:h})},rise:function(e,f,d){if(typeof e=="undefined"||e.length===0){return}return setTimeout(function(){e.stop(true,true).animate({height:"28px",opacity:1,marginTop:"0px"},f).animate({height:"20px",opacity:0.5,marginTop:"4px"},f)},d)},html:function(){var d=(this.id_name)?'id="'+this.id_name+'"':"";return"<div "+d+' class="loader_'+this.uid+' leviathan"><i class="unum"></i><i class="duo"></i><i class="tres"></i></div>'}});a.HelloLoader=b})(jQuery,Tumblr);
(function(c,a){var b=Backbone.View.extend({_scroll_offset:0,use_cache:true,initialize:function(d){this.options=d||{};this.lightbox_trigger=this.options.lightbox_trigger||".go, .lightbox_trigger";this.post_selector=this.options.post_selector||".ht_post";this.$post_el=this.options.post_el||this.$el.find(this.post_selector+", .lightbox_data");this.follow_source=this.options.follow_source||"FOLLOW_SOURCE_BLOG_LIGHTBOX";this.post_id=this.$post_el.data("post-id")||this.$post_el.data("id");this.post_id=parseInt(this.post_id,10);this.tumblelog=this.$post_el.data("tumblelog-name")||this.$post_el.data("tumblelog");this.$ht_post=this.$post_el||c(this.post_selector,this.el);this.$go=c(this.lightbox_trigger,this.el);this.is_visible=false;this.is_safari=(navigator.userAgent.indexOf("Safari")!=-1&&navigator.userAgent.indexOf("Chrome")==-1);this.is_oldie=(jQuery.browser.msie&&(parseInt(jQuery.browser.version,10)<=9));if(!this.post_id||!this.tumblelog){return}this.$go.on("click",this.el,this.launch.bind(this))},close_lightbox:function(){c("html").removeClass("lightbox_open");if(this._loader){this._loader.destroy()}this._loader=false;c("#hello_glass .leviathan").remove();c("#hello_glass").remove();this.is_visible=false;c("#logged_out_header, .logged_out_header").css("top",0);c("body").css("background-position","0px 0px");this.$ht_post.removeClass("active");window.blur();window.focus();if(typeof(this.$el.data("reset"))==="function"){this.$el.data("reset")()}c(document).off("keyup");c(window).unbind("onmessage");c(window).unbind("message");c("body").unbind("mousewheel");this.$el.trigger("lightbox_close")},iframe_from_url:function(h,d){var g="/hello_lightbox/"+encodeURIComponent(h)+"/"+d+"?follow_source="+this.follow_source;var e='<iframe id="hello_lightbox" style="visibility:hidden;display:none;" allowtransparency="true" src="'+g+'" > </iframe>';c("#hello_glass").append(e)},iframe_from_template:function(k,d){var h="";if(typeof hello_post_cache=="object"&&typeof hello_post_cache[d]=="string"&&typeof hello_tumblelog_cache[k]=="string"){header_html=hello_tumblelog_cache[k];h=hello_post_cache[d]}else{this.iframe_from_url(k,d);return}var e=window.Templates.Hello_Lightbox;e=e.replace("<!--{BLOCK:TUMBLELOG_HEADER}-->",header_html);e=e.replace("<!--{BLOCK:FEATURED_POST}-->",h);e=e.replace("<!--{BLOCK:TUMBLELOG_NAME}-->",encodeURIComponent(k));e=e.replace("<!--{BLOCK:POST_ID}-->",d);c("#hello_glass").append('<iframe id="hello_lightbox" style="visibility:hidden;display:none;" allowtransparency="true"> </iframe>');var g=c("#hello_lightbox").get(0);var j=g.contentWindow||g.documentWindow;var i=j.document;f;i.open();i.write(e);i.close()},launch:function(g){if(g.metaKey||g.shiftKey||g.ctrlKey){return true}var i=g.target||g.srcElement;var e=c(i);if(e.prop("tagName")==="A"&&e.hasClass("tag")){return g}c("body").removeClass("option");this.$ht_post.addClass("active");if(c(".load",this.$go).length===0){this.$go.append('<div class="load"></div>');this._loader=new Tumblr.HelloLoader({el:c(".load",this.$go).get(0)});this._loader.start()}if(c("#hello_glass").length>0||this.post_id<=0){return false}c("body").prepend('<div id="hello_glass" class="loading"></div>');c(document).on("keyup",function(j){if(j.which==27){if(c("#tumblr_lightbox").length===0&&this.is_visible===false){this.close_lightbox()}}}.bind(this));var h=window.addEventListener?"addEventListener":"attachEvent";var d=h=="attachEvent"?"onmessage":"message";this._scroll_offset=window.pageYOffset;c("body").bind("mousewheel",function(){return false});if(!this.options.use_cache||window.Templates.Hello_Lightbox==null||this.is_safari||this.is_oldie){this.iframe_from_url(this.tumblelog,this.post_id)}else{this.iframe_from_template(this.tumblelog,this.post_id)}c(window).bind(d,function(o){var q=o.originalEvent;if(q.data=="close_glass"){this.close_lightbox()}else{if(q.data=="page_ready"){c("html").addClass("lightbox_open");c("#hello_glass").removeClass("loading");c("#hello_lightbox").css("display","block").css("visibility","visible");this.is_visible=true;if(this._loader){this._loader.destroy()}this._loader=false;c("#hello_glass .leviathan").remove();c(".load",this.$go).remove();if(c("#hello_lightbox").length){c("#hello_lightbox")[0].contentWindow.blur();c("#hello_lightbox")[0].contentWindow.focus()}}else{if(q.data=="signup_account"){this.close_lightbox();if(SignupProcess){SignupProcess.update_view("signup_account")}}else{if(q.data.substring(0,14)=="open_lightbox/"){var m=q.data.substring(14);var k=m.split("/");var l=k[0];var p=k[1];this.is_visible=false;c("#hello_lightbox").remove();var n=c("#hello_glass");if(n.find(".leviathan").length===0){var j=new Tumblr.HelloLoader({el:n.get(0)});c("#hello_glass").data("loader",j);j.start()}this.iframe_from_url(p,l);return}}}}}.bind(this));c("#hello_glass").click(function(){this.close_lightbox()}.bind(this));g.preventDefault();this.$el.trigger("lightbox_open")}});if("ab".substr(-1)!="b"){String.prototype.substr=function(d){return function(g,e){if(g<0){g=this.length+g}return d.call(this,g,e)}}(String.prototype.substr)}a.HelloLightbox=b})(jQuery,Tumblr);
Tumblr.LoggedOutCompactWall||(Tumblr.LoggedOutCompactWall={});(function(g,e){var f=Tumblr.Utils.prefixer;function c(h){var i;this.$el=h;h.addClass("windowed-slide").addClass("windowed");this.width=h.outerWidth(true)+20;this.startAtPct=0.75;this.setProgress(0);if(this.showAtPct){h.addClass(".with-scroll");i=_.throttle(this._scrollPct,50)}else{this.open=_.debounce(function(){if(this.is_open){this.setProgress(1)}}.bind(this),250);i=_.throttle(this._scroll,50)}Tumblr.Events.on("DOMEventor:flatscroll",i,this);window.scrollBy(0,1)}c.prototype.log=false;c.prototype._scrollPct=function d(j){j||(j=Tumblr.DOMEventor.rect());var i=(j.windowScrollTop+j.windowHeight)/j.documentHeight,h;if(i>this.startAtPct){if(i>this.showAtPct){h=1}else{h=(i-this.startAtPct)/(this.showAtPct-this.startAtPct)}}else{h=0}this.setProgress(h)};c.prototype._scroll=function b(i){i||(i=Tumblr.DOMEventor.rect());var h=(i.windowScrollTop+i.windowHeight)/i.documentHeight;if(h>this.startAtPct){this.is_open=true;this.open()}else{this.is_open=false;this.setProgress(0)}};c.prototype.setProgress=function a(h){if(h===this.last_progress){return}this.last_progress=h;h=1-h;var j=this.width*h,i={};i[f("transform").js]="translate3d("+j+"px,0,0)";this.$el.css(i)};this.SlideInFootterView=c}).call(Tumblr.LoggedOutCompactWall,Tumblr.LoggedOutCompactWall,jQuery);
Tumblr.LoggedOutCompactWall||(Tumblr.LoggedOutCompactWall={});(function(c,b){function a(g,f){this.$el=g;this.type=f;this.$post_cont=g.children(".post_cont");this.$reg=g.children(".register_prompt");if(this.type=="picture"){var e=g.find("li.post_compact");var d=b(e[Math.floor(Math.random()*e.length)]);var i=d.find(".photo_stage_img").css("backgroundImage");this.$reg.css({backgroundImage:i})}this.startAtPct=0.75;var h=_.throttle(this._scroll,50);Tumblr.Events.on("DOMEventor:flatscroll",h,this);window.scrollBy(0,1)}a.prototype.log=false;a.prototype.attach=function(){if(this.attached){this.detach()}this.attached=true;this.$el.hide().addClass("sidebar").show();var d=this.$post_cont.width();this.$post_cont.css({width:$window.width()});this.$post_cont.children().css({width:d})};a.prototype.detach=function(){this.attached=false;this.$el.removeClass("sidebar");this.$post_cont.css({width:""})};a.prototype.open=function(){if(this.is_open){this.$el.addClass("open")}};a.prototype.close=function(){if(!this.is_open){this.$el.removeClass("open")}};a.prototype._scroll=function(e){e||(e=Tumblr.DOMEventor.rect());var d=(e.windowScrollTop+e.windowHeight)/e.documentHeight;if(d>this.startAtPct){this.is_open=true;this.open()}else{this.is_open=false;this.close()}};this.Sidebar=a}).call(Tumblr.LoggedOutCompactWall,Tumblr.LoggedOutCompactWall,jQuery);
(function(d,b,a,g){var c="SlidingRower",e={childSelector:".block",elementMargin:4,rowHTML:"<div class='row'></div>",hoverDebounce:240,blacklistClass:null,maxElWidth:Infinity};function f(i,h){this.el=i;this.$el=d(i);this.options=d.extend({},e,h);this._defaults=e;this._name=c;this._data={};this.init()}f.prototype={init:function(){this.$el.on("mouseenter",".endcap",d.proxy(this._slideIn,this));this.$el.on("mouseleave",".endcap",d.proxy(this._slideOut,this));this._data.container={offset:0,width:(this.options.outerContainer?d(this.options.outerContainer).width():d(b).width())};this._reset_row();this._data.elements=this.$el.find(this.options.childSelector).remove();this.reflow()},_reset_row:function(){this._data.row={container:d(this.options.rowHTML),width:0,length:0,stop:null}},_reset_elements:function(h){h.removeClass("has_lightbox")},append:function(h){this.add_layout(d(h).filter(this.options.childSelector))},reflow:function(h){this.$el.empty();this._reset_row();this._reset_elements(this._data.elements);this.add_layout(this._data.elements)},add_layout:function(k){this._data.container.width=(this.options.outerContainer?d(this.options.outerContainer).width():d(b).width());var l=0,h=-1;for(var j=0;j<k.length;j++){k.eq(j).appendTo(this._data.row.container);this._data.row.width+=Math.min(this.options.maxElWidth,k.eq(j).width())+this.options.elementMargin*2;this._data.row.length+=1;if(this._data.row.length==1){k.eq(j).wrap('<div class="endcap first"></div>');this._data.row.offset=Math.floor(this._data.row.width/2);this._data.row.container.data("postOffset",-1*this._data.row.offset);this._data.row.container.css({"margin-left":this._data.row.container.data("postOffset")+"px"})}if((this._data.row.width-this._data.row.offset)>this._data.container.width){l+=1;k.eq(j).wrap('<div class="endcap last"></div>');this.$el.append(this._data.row.container);if(h==l){this.$el.trigger("slidingrower_rendered");return}else{if(h==-1&&(l*this._data.row.container.height())>d(b).height()){h=l+2}}this._reset_row()}}this.$el.trigger("slidingrower_rendered")},_slideIn:function(h){var k=d(h.currentTarget),j=0,i=k.parent(".row");if(k.hasClass("slid")){return}if(this.options.blacklistClass&&k.find(this.options.childSelector).hasClass(this.options.blacklistClass)){return}if(k.is(".first")){j=-1*i.data("postOffset")}else{if(k.is(".last")){j=-1*((k.offset().left+k.width())-d(b).width())}}if(j!=0){i.css({transform:"translate3d("+j+"px,0,0)"});setTimeout(function(){i.addClass("slid")},this.options.hoverDebounce)}},_slideOut:function(i){var j=d(i.currentTarget),h=j.parent(".row");if(this.options.blacklistClass&&j.find(this.options.childSelector).hasClass(this.options.blacklistClass)){return}if(!j.is(".endcap")){return}h.css({transform:"translate3d(0,0,0)"}).removeClass("slid")}};d.fn[c]=function(i,h){return this.each(function(){var j=d.data(this,"plugin_"+c);if(!j){d.data(this,"plugin_"+c,new f(this,i))}else{if(typeof i=="string"){j[i](h)}}})}})(jQuery,window,document);(function(c,a){var b=Backbone.View.extend({defaults:{shadow_threshold:5,footer_height:100},initialize:function(d){this.options=_.extend(this.defaults,this.options);this._calc_heights();this.el.style.position="fixed";Tumblr.Events.on("DOMEventor:flatscroll",this._scroll,this)},_calc_heights:function(){this.absolute_threshold=c(document).height()-c(window).height()-this.options.footer_height;if(this.absolute_threshold<300){this.absolute_threshold=300}},_scroll:function(e){e||(e={});var d=e.windowScrollTop||window.pageYOffset||(document.documentElement&&document.documentElement.scrollTop)||document.body.scrollTop;if(d>this.options.shadow_threshold){this.el.classList.add("overlapping")}else{this.el.classList.remove("overlapping")}if(d>this.absolute_threshold){this.el.classList.add("collapsed")}else{this.el.classList.remove("collapsed")}}});a.FixedHeader=b})(jQuery,Tumblr);jQuery(document).ready(function(f){var d=f("ul.posts");var a=false;function c(){var h=f(".ui_compact_wall .register_prompt"),g;d.bind("slidingrower_rendered",function(){g=new Tumblr.LoggedOutCompactWall.SlideInFootterView(h)});a=true}function e(g){return function h(){var j=f(".ui_compact_wall"),i;d.bind("slidingrower_rendered",function(){if(!i){i=new Tumblr.LoggedOutCompactWall.Sidebar(j,g)}i.attach()});a=true}}function b(g){g.bind("slidingrower_rendered",function(){if(g.height()<$window.height()+11){g.css("margin",0)}g.find('li.post:not(".has_lightbox")').each(function(k,j){var h=f(j).addClass("has_lightbox");new Tumblr.HelloLightbox({el:j,post_el:h});h.bind("lightbox_close",function(i){f(this).parents(".row").removeClass("slid").css({transform:"translate3d(0,0,0)"})})})})}Tumblr.Features("slide")(c);Tumblr.Features("sidebar_picture")(e("picture"));Tumblr.Features("sidebar_shadow")(e("shadow"));if(!a){c()}b(d);f("#post_cont").css({display:"block"});d.SlidingRower({childSelector:"li.post",elementMargin:10,rowHTML:'<li class="row"></li>',blacklistClass:"active",maxElWidth:370});f(window).on("resize",_.debounce(function(){d.SlidingRower("reflow");b(d)},200))});