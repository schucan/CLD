/*****************************

A miscellaneous collection of reuseable helper methods
that I couldn't be arsed to put into separate classes

*****************************/

Math.TAU = Math.PI*2;

window.HIGHLIGHT_COLOR = "rgba(193, 220, 255, 0.6)";

var isMacLike = navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i)?true:false;

var _PADDING = 25;
var _PADDING_BOTTOM = 110;

window.onresize = function(){
	publish("resize");
};

window.onbeforeunload = function(e) {
	if(loopy.dirty){
		var dialogText = "Are you sure you want to leave without saving your changes?";
		e.returnValue = dialogText;
		return dialogText;
	}
};

// compression with https://github.com/pieroxy/lz-string/
	    var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

function getCanvasImage(_ctx, _bgColor){
	var tmpCtx = document.createElement("canvas").getContext("2d");
	tmpCtx.canvas.width  = _ctx.canvas.width;
	tmpCtx.canvas.height = _ctx.canvas.height;
	tmpCtx.fillStyle = _bgColor;
	tmpCtx.fillRect(0, 0, tmpCtx.canvas.width, tmpCtx.canvas.height);
	tmpCtx.drawImage(_ctx.canvas, 0, 0);

	return tmpCtx.canvas;
}

function throwToast(text, time) { //time in seconds
	if (!text) return;
	if (!time) {
		time = 5;
	}
	var toaster = document.getElementById("toaster");
	if (toaster) {
		toaster.innerHTML = '<p>' + text + '</p>';
		toaster.style.display = "block";
		setTimeout(function() {
			toaster.style.display = "none";
		}, 1000 * time);
	}
}

function copyImage() {
	// TODO Calculate Bounding Box to make the Bitmap fit the content! See https://stackoverflow.com/a/62156967
	var c=document.getElementsByTagName("canvas")[0];
	var ctx = c.getContext('2d');
	var d=getCanvasImage(ctx, "#fff");
	try {
		d.toBlob(function(blob) {
			try {
				var item = new ClipboardItem({ "image/png": blob });
				navigator.clipboard.write([item]);
				throwToast('CLD copied to clipboard.');
			} catch (x) {
				alert('Can\'t copy in this browser. Try another one (Chrome might work).');
			}
		});
	} catch (x) {
		alert('Can\'t copy in this browser. Try another one (Chrome might work).');
	}
}

function _createCanvas(){

	var canvasses = document.getElementById("canvasses");
	var canvas = document.createElement("canvas");

	// Dimensions
	var _onResize = function(){
		var width = canvasses.clientWidth;
		var height = canvasses.clientHeight;
		canvas.width = width*2; // retina
		canvas.style.width = width+"px";
		canvas.height = height*2; // retina
		canvas.style.height = height+"px";
	};
	_onResize();

	// Add to body!
	canvasses.appendChild(canvas);

	// subscribe to RESIZE
	subscribe("resize",function(){
		_onResize();
	});

	// Gimme
	return canvas;

}

function _createLabel(message){
	var label = document.createElement("div");
	label.innerHTML = message;
	label.setAttribute("class","component_label");
	return label;
}

function _createButton(label, onclick){
	var button = document.createElement("div");
	button.innerHTML = label;
	button.onclick = onclick;
	button.setAttribute("class","component_button");
	return button;
}

function _createInput(className, textarea){
	var input = textarea ? document.createElement("textarea") : document.createElement("input");
	input.setAttribute("class",className);
	input.addEventListener("keydown",function(event){
		event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
	},false); // STOP IT FROM TRIGGERING KEY.js
	return input;
}

function _createNumberInput(onUpdate){

	var self = {};

	// dom!
	self.dom = document.createElement("input");
	self.dom.style.border = "none";
	self.dom.style.width = "40px";
	self.dom.style.padding = "5px";

	self.dom.addEventListener("keydown",function(event){
		event.stopPropagation ? event.stopPropagation() : (event.cancelBubble=true);
	},false); // STOP IT FROM TRIGGERING KEY.js

	// on update
	self.dom.onchange = function(){
		var value = parseInt(self.getValue());
		if(isNaN(value)) value=0;
		self.setValue(value);
		onUpdate(value);
	};

	// select on click, yo
	self.dom.onclick = function(){
		self.dom.select();
	};

	// set & get value
	self.getValue = function(){
		return self.dom.value;
	};
	self.setValue = function(num){
		self.dom.value = num;
	};

	// return an OBJECT.
	return self;

}

function _blank(){
	// just a blank function to toss in.
}

function _getTotalOffset(target){
	var bounds = target.getBoundingClientRect();
	return {
		left: bounds.left,
		top: bounds.top
	};
}

function _addMouseEvents(target, onmousedown, onmousemove, onmouseup){

	// WRAP THEM CALLBACKS
	var _onmousedown = function(event){
		var _fakeEvent = _onmousemove(event);
		onmousedown(_fakeEvent);
	};
	var _onmousemove = function(event){

		// Mouse position
		var _fakeEvent = {};
		if(event.changedTouches){
			// Touch
			var offset = _getTotalOffset(target);
			_fakeEvent.x = event.changedTouches[0].clientX - offset.left;
			_fakeEvent.y = event.changedTouches[0].clientY - offset.top;
			event.preventDefault();
		}else{
			// Not Touch
			_fakeEvent.x = event.offsetX;
			_fakeEvent.y = event.offsetY;
		}

		// Mousemove callback
		onmousemove(_fakeEvent);
		return _fakeEvent;

	};
	var _onmouseup = function(event){
		var _fakeEvent = {};
		onmouseup(_fakeEvent);
	};

	// Add events!
	target.addEventListener("mousedown", _onmousedown);
	target.addEventListener("mousemove", _onmousemove);
	document.body.addEventListener("mouseup", _onmouseup);

	// TOUCH.
	target.addEventListener("touchstart",_onmousedown,false);
	target.addEventListener("touchmove",_onmousemove,false);
	document.body.addEventListener("touchend",_onmouseup,false);

}

function _getBounds(points){

	// Bounds
	var left=Infinity, top=Infinity, right=-Infinity, bottom=-Infinity;
	for(var i=0;i<points.length;i++){
		var point = points[i];
		if(point[0]<left) left=point[0];
		if(right<point[0]) right=point[0];
		if(point[1]<top) top=point[1];
		if(bottom<point[1]) bottom=point[1];
	}

	// Dimensions
	var width = (right-left);
	var height = (bottom-top);

	// Gimme
	return {
		left:left, right:right, top:top, bottom:bottom,
		width:width, height:height
	};

}

function _translatePoints(points, dx, dy){
	points = JSON.parse(JSON.stringify(points));
	for(var i=0;i<points.length;i++){
		var p = points[i];
		p[0] += dx;
		p[1] += dy;
	}
	return points;
}

function _rotatePoints(points, angle){
	points = JSON.parse(JSON.stringify(points));
	for(var i=0;i<points.length;i++){
		var p = points[i];
		var x = p[0];
		var y = p[1];
		p[0] = x*Math.cos(angle) - y*Math.sin(angle);
		p[1] = y*Math.cos(angle) + x*Math.sin(angle);
	}
	return points;
}

function _configureProperties(self, config, properties){

	for(var propName in properties){

		// Default values!
		if(config[propName]===undefined){
			var value = properties[propName];
			if(typeof value=="function") value=value();
			config[propName] = value;
		}

		// Transfer to "self".
		self[propName] = config[propName];

	}

}

function _isPointInCircle(x, y, cx, cy, radius){

	// Point distance
	var dx = cx-x;
	var dy = cy-y;
	var dist2 = dx*dx + dy*dy;

	// My radius
	var r2 = radius*radius;

	// Inside?
	return dist2<=r2;

}

function _isPointInBox(x, y, box){

	if(x<box.x) return false;
	if(x>box.x+box.width) return false;
	if(y<box.y) return false;
	if(y>box.y+box.height) return false;

	return true;

}

// TODO: Make more use of this???
function _makeErrorFunc(msg){
	return function(){
		throw Error(msg);
	};
}

function _getParameterByName(name){
	var url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
};


function _blendColors(hex1, hex2, blend){

	var color = "#";
	for(var i=0; i<3; i++) {

		// Into numbers...
		var sub1 = hex1.substring(1+2*i, 3+2*i);
		var sub2 = hex2.substring(1+2*i, 3+2*i);
		var num1 = parseInt(sub1, 16);
		var num2 = parseInt(sub2, 16);

		// Blended number & sub
		var num = Math.floor( num1*(1-blend) + num2*blend );
		var sub = num.toString(16).toUpperCase();
		var paddedSub = ('0'+sub).slice(-2); // in case it's only one digit long

		// Add that babe
		color += paddedSub;

	}

	return color;

}

function _shiftArray(array, shiftIndex){
	var moveThisAround = array.splice(-shiftIndex);
	var shifted = moveThisAround.concat(array);
	return shifted;
}
