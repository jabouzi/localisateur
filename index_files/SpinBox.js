/*

SpinBox.js

Implements a spin box interface for a text field

Created by Stephen Morley - http://code.stephenmorley.org/ - and released under
the terms of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

function SpinBox(_1,_2){
if(typeof _1=="string"){
_1=document.getElementById(_1);
}
this.options=(_2?_2:{});
if(!("className" in this.options)){
this.options.className="spinBox";
}
if(!("step" in this.options)){
this.options.step=1;
}
if(!("decimals" in this.options)){
this.options.decimals=0;
}
var _3=_1.getElementsByTagName("input");
if(_3.length==0){
this.input=document.createElement("input");
this.setValue("value" in this.options?this.options.value:0);
_1.appendChild(this.input);
}else{
this.input=_3[0];
if("value" in this.options){
this.setValue(this.options.value);
}
}
var _4=document.createElement("span");
_4.appendChild(document.createElement("span"));
_1.appendChild(_4);
var _5=document.createElement("span");
_5.appendChild(document.createElement("span"));
_1.appendChild(_5);
_1.className+=" "+this.options.className;
_4.className=this.options.className+"Up";
_5.className=this.options.className+"Down";
this.addEventListener(this.input,"mousewheel",this.handleMouseWheel,[],true);
this.addEventListener(this.input,"DOMMouseScroll",this.handleMouseWheel,[],true);
this.addEventListener(this.input,"keydown",this.handleKeyDown,[],true);
this.addEventListener(this.input,"keypress",this.handleKeyPress,[],true);
this.addEventListener(this.input,"keyup",this.stop);
this.addEventListener(_4,"mousedown",this.start,[true]);
this.addEventListener(_4,"mouseup",this.stop);
this.addEventListener(_4,"mouseout",this.stop);
this.addEventListener(_5,"mousedown",this.start,[false]);
this.addEventListener(_5,"mouseup",this.stop);
this.addEventListener(_5,"mouseout",this.stop);
};
SpinBox.prototype.getValue=function(){
return parseFloat(this.input.value);
};
SpinBox.prototype.setValue=function(_6){
if("minimum" in this.options){
_6=Math.max(this.options.minimum,_6);
}
if("maximum" in this.options){
_6=Math.min(this.options.maximum,_6);
}
var _7=(_6<0?"-":"");
_6=Math.abs(_6);
var _8=Math.pow(10,this.options.decimals);
_6=Math.round(_6*_8);
var _9=(_6-_6%_8)/_8;
var _a=""+_6%_8;
if(_a.length<this.options.decimals){
_a="0"+_a;
}
this.input.value=_7+_9+(this.options.decimals>0?"."+_a:"");
};
SpinBox.prototype.addEventListener=function(_b,_c,_d,_e,_f){
var _10=this;
var _11=function(e){
var _12=[e?e:window.event].concat(_e);
_d.apply(_10,_12);
if(!_f){
if(e&&e.preventDefault){
e.preventDefault();
}else{
window.event.returnValue=false;
}
}
};
if(_b.addEventListener){
_b.addEventListener(_c,_11,false);
}else{
_b.attachEvent("on"+_c,_11);
}
};
SpinBox.prototype.bind=function(f,_13){
var _14=this;
return function(){
f.apply(_14,_13?_13:[]);
};
};
SpinBox.prototype.handleMouseWheel=function(e){
if(document.activeElement==this.input){
if(e.wheelDelta){
this.start(e,e.wheelDelta>1);
}else{
if(e.detail){
this.start(e,e.detail<1);
}
}
this.stop();
if(e.preventDefault){
e.preventDefault();
}else{
window.event.returnValue=false;
}
}
};
SpinBox.prototype.handleKeyDown=function(e){
if(e.keyCode==38){
this.start(e,true);
}
if(e.keyCode==40){
this.start(e,false);
}
};
SpinBox.prototype.handleKeyPress=function(e){
var _15=("charCode" in e?e.charCode:e.keyCode);
if(_15==0||e.altKey||e.ctrlKey||e.metaKey){
return;
}
if(_15==45&&(!("minimum" in this.options)||this.options.minimum<0)){
return;
}
if(_15==46&&this.options.decimals>0){
return;
}
if(_15>=48&&_15<=57){
return;
}
if(e.preventDefault){
e.preventDefault();
}else{
window.event.returnValue=false;
}
};
SpinBox.prototype.start=function(e,up){
if(this.input.disabled||"timeout" in this){
return;
}
this.updateStep=(up?this.options.step:-this.options.step);
this.timeoutDelay=500;
this.update();
};
SpinBox.prototype.stop=function(){
if("timeout" in this){
window.clearTimeout(this.timeout);
delete this.timeout;
}
};
SpinBox.prototype.update=function(){
var _16=parseFloat(this.input.value);
if(isNaN(_16)){
_16=0;
}
this.setValue(_16+this.updateStep);
this.timeoutDelay=Math.max(20,Math.floor(this.timeoutDelay*0.9));
this.timeout=window.setTimeout(this.bind(this.update),this.timeoutDelay);
};

