/**********************************

NODE!

**********************************/

Node.COLORS = {
	0: "#000000", // black
	1: "#FF0000", // red
	2: "#EA9D51", // orange
	3: "#BFEE3F", // green
	4: "#7FD4FF", // blue
	5: "#A97FFF" // purple
};

Node.defaultValue = 0.5;
Node.defaultHue = 0;

Node.DEFAULT_RADIUS = Math.round(Loopy.FONTSIZE / 2 *3);

// from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';
		var lines = [];

        for(var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
			lines.push(line);
            line = words[n] + ' ';
          }
          else {
            line = testLine;
          }
        }
        lines.push(line);
		var numLines = lines.length;
		y = y - Math.round(((numLines-1) * lineHeight / 2));
		for (var i = 0; i < numLines; i++) {
			context.fillText(lines[i], x, y);
			y += lineHeight;
		}

      }


function Node(model, config){

	var self = this;
	self._CLASS_ = "Node";

	// Mah Parents!
	self.loopy = model.loopy;
	self.model = model;
	self.config = config;

	// Default values...
	_configureProperties(self, config, {
		id: Node._getUID,
		x: 0,
		y: 0,
		init: Node.defaultValue, // initial value!
		label: "?",
		hue: Node.defaultHue,
		radius: Node.DEFAULT_RADIUS
	});

	// Value: from 0 to 1
	self.value = self.init;
	// TODO: ACTUALLY VISUALIZE AN INFINITE RANGE
	self.bound = function(){ // bound ONLY when changing value.
		/*var buffer = 1.2;
		if(self.value<-buffer) self.value=-buffer;
		if(self.value>1+buffer) self.value=1+buffer;*/
	};

	// MOUSE.
	var _controlsVisible = false;
	var _controlsAlpha = 0;
	var _controlsDirection = 0;
	var _controlsSelected = false;
	var _controlsPressed = false;
	var _listenerMouseMove = subscribe("mousemove", function(){

		return;

	});
	var _listenerMouseDown = subscribe("mousedown",function(){

		return;

	});
	var _listenerMouseUp = subscribe("mouseup",function(){
		return;
	});
	var _listenerReset = subscribe("model/reset", function(){
		self.value = self.init;
	});

	//////////////////////////////////////
	// SIGNALS ///////////////////////////
	//////////////////////////////////////

	var shiftIndex = 0;
	self.sendSignal = function(signal){
		var myEdges = self.model.getEdgesByStartNode(self);
		myEdges = _shiftArray(myEdges, shiftIndex);
		shiftIndex = (shiftIndex+1)%myEdges.length;
		for(var i=0; i<myEdges.length; i++){
			myEdges[i].addSignal(signal);
		}
	};

	self.takeSignal = function(signal){

		// Change value
		self.value += signal.delta;

		// Propagate signal
		self.sendSignal(signal);
		// self.sendSignal(signal.delta*0.9); // PROPAGATE SLIGHTLY WEAKER

		// Animation
		// _offsetVel += 0.08 * (signal.delta/Math.abs(signal.delta));
		_offsetVel -= 6 * (signal.delta/Math.abs(signal.delta));

	};


	//////////////////////////////////////
	// UPDATE & DRAW /////////////////////
	//////////////////////////////////////

	// Update!
	var _offset = 0;
	var _offsetGoto = 0;
	var _offsetVel = 0;
	var _offsetAcc = 0;
	var _offsetDamp = 0.3;
	var _offsetHookes = 0.8;
	self.update = function(speed){

		// Otherwise, value = initValue exactly
		if(self.loopy.mode==Loopy.MODE_EDIT){
			self.value = self.init;
		}

		// Cursor!
		if(_controlsSelected) Mouse.showCursor("pointer");

		// Keep value within bounds!
		self.bound();

		// Visually & vertically bump the node
		var gotoAlpha = (_controlsVisible || self.loopy.showPlayTutorial) ? 1 : 0;
		_controlsAlpha = _controlsAlpha*0.5 + gotoAlpha*0.5;
		_offsetGoto = 0;
		_offset += _offsetVel;
		if(_offset>40) _offset=40
		if(_offset<-40) _offset=-40;
		_offsetVel += _offsetAcc;
		_offsetVel *= _offsetDamp;
		_offsetAcc = (_offsetGoto-_offset)*_offsetHookes;

	};

	// Draw
	var _circleRadius = 0;
	self.draw = function(ctx){

		// Retina
		var x = self.x*2;
		var y = self.y*2;
		var r = self.radius*2;
		var color = "#ffffff";

		// Translate!
		ctx.save();
		ctx.translate(x,y+_offset);

		// DRAW HIGHLIGHT???
		if(self.loopy.sidebar.currentPage.target == self){
			ctx.beginPath();
			ctx.arc(0, 0, r+40, 0, Math.TAU, false);
			ctx.fillStyle = HIGHLIGHT_COLOR;
			ctx.fill();
		}

		// White-gray bubble with colored border
		ctx.beginPath();
		ctx.arc(0, 0, r-2, 0, Math.TAU, false);
		ctx.fillStyle = "#fff";
		ctx.fill();
		ctx.lineWidth = 6;
		ctx.strokeStyle = color;
		ctx.stroke();

		// Circle radius
		// var _circleRadiusGoto = r*(self.value+1);
		// _circleRadius = _circleRadius*0.75 + _circleRadiusGoto*0.25;

		// RADIUS IS (ATAN) of VALUE?!?!?!
		var _r = Math.atan(self.value*5);
		_r = _r/(Math.PI/2);
		_r = (_r+1)/2;

		// INFINITE RANGE FOR RADIUS
		// linear from 0 to 1, asymptotic otherwise.
		var _value;
		if(self.value>=0 && self.value<=1){
			// (0,1) -> (0.1, 0.9)
			_value = 0.1 + 0.8*self.value;
		}else{
			if(self.value<0){
				// asymptotically approach 0, starting at 0.1
				_value = (1/(Math.abs(self.value)+1))*0.1;
			}
			if(self.value>1){
				// asymptotically approach 1, starting at 0.9
				_value = 1 - (1/self.value)*0.1;
			}
		}

		// Colored bubble
		/*ctx.beginPath();
		var _circleRadiusGoto = r*_value; // radius
		_circleRadius = _circleRadius*0.8 + _circleRadiusGoto*0.2;
		ctx.arc(0, 0, _circleRadius, 0, Math.TAU, false);
		ctx.fillStyle = color;
		ctx.fill();*/

		// Text!
		var fontsize = Loopy.FONTSIZE;
		ctx.font = "normal "+fontsize+"px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = Node.COLORS[self.hue];
		/*var width = ctx.measureText(self.label).width;
		while(width > r*2 + 60){ // -30 for buffer. HACK: HARD-CODED.
			fontsize -= 1;
			ctx.font = "normal "+fontsize+"px sans-serif";
			width = ctx.measureText(self.label).width;
		}*/
		wrapText(ctx, self.label, 0,0,r * 2,fontsize);
		//ctx.fillText(self.label, 0, 0);

		// WOBBLE CONTROLS
		var cl = 40;
		var cy = 0;
		if(self.loopy.showPlayTutorial && self.loopy.wobbleControls>0){
			var wobble = self.loopy.wobbleControls*(Math.TAU/30);
			cy = Math.abs(Math.sin(wobble))*10;
		}

		// Controls!
		ctx.globalAlpha = _controlsAlpha;
		ctx.strokeStyle = "rgba(0,0,0,0.8)";
		// top arrow
		ctx.beginPath();
		ctx.moveTo(-cl,-cy-cl);
		ctx.lineTo(0,-cy-cl*2);
		ctx.lineTo(cl,-cy-cl);
		ctx.lineWidth = (_controlsDirection>0) ? 10: 3;
		if(self.loopy.showPlayTutorial) ctx.lineWidth=6;
		ctx.stroke();
		// bottom arrow
		ctx.beginPath();
		ctx.moveTo(-cl,cy+cl);
		ctx.lineTo(0,cy+cl*2);
		ctx.lineTo(cl,cy+cl);
		ctx.lineWidth = (_controlsDirection<0) ? 10: 3;
		if(self.loopy.showPlayTutorial) ctx.lineWidth=6;
		ctx.stroke();

		// Restore
		ctx.restore();

	};

	//////////////////////////////////////
	// KILL NODE /////////////////////////
	//////////////////////////////////////

	self.kill = function(){

		// Kill Listeners!
		unsubscribe("mousemove",_listenerMouseMove);
		unsubscribe("mousedown",_listenerMouseDown);
		unsubscribe("mouseup",_listenerMouseUp);
		unsubscribe("model/reset",_listenerReset);

		// Remove from parent!
		model.removeNode(self);

		// Killed!
		publish("kill",[self]);

	};

	//////////////////////////////////////
	// HELPER METHODS ////////////////////
	//////////////////////////////////////

	self.isPointInNode = function(x, y, buffer){
		buffer = buffer || 0;
		return _isPointInCircle(x, y, self.x, self.y, self.radius+buffer);
	};

	self.getBoundingBox = function(){
		return {
			left: self.x - self.radius,
			top: self.y - self.radius,
			right: self.x + self.radius,
			bottom: self.y + self.radius
		};
	};

}

////////////////////////////
// Unique ID identifiers! //
////////////////////////////

Node._UID = 0;
Node._getUID = function(){
	Node._UID++;
	return Node._UID;
};
