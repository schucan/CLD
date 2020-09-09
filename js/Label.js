/**********************************

LABEL!

**********************************/

function Label(model, config){

	var self = this;
	self._CLASS_ = "Label";

	// Mah Parents!
	self.loopy = model.loopy;
	self.model = model;
	self.config = config;

	// Default values...
	_configureProperties(self, config, {
		x: 0,
		y: 0,
		text: "..."
	});

	// Draw
	var _circleRadius = 0;
	self.draw = function(ctx){

		// Retina
		var x = self.x*2;
		var y = self.y*2;

		// DRAW HIGHLIGHT???
		if(self.loopy.sidebar.currentPage.target == self){
			var bounds = self.getBounds();
			ctx.save();
			ctx.scale(2,2); // RETINA
			ctx.beginPath();
			ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
			ctx.fillStyle = HIGHLIGHT_COLOR;
			ctx.fill();
			ctx.restore();
		}

		// Translate!
		ctx.save();
		ctx.translate(x,y);

		// Text!
		ctx.font = "100 "+Loopy.FONTSIZE+"px sans-serif";
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillStyle = "#000";

		// ugh new lines are a PAIN.
		var lines = self.breakText();
		ctx.translate(0, -(Loopy.FONTSIZE*lines.length)/2);
		for(var i=0; i<lines.length; i++){
			var line = lines[i];
			if ((i== 0) &&
					((line == '+') || (line == '-') || (line.toLowerCase() == 'r') || (line.toLowerCase() == 'b'))) {
				ctx.font = "900 "+(Loopy.FONTSIZE * 2)+"px sans-serif";

				ctx.fillStyle = "#44f";
				var radgrad = ctx.createRadialGradient(0,0,0,0,0,Loopy.FONTSIZE * 2);
				radgrad.addColorStop(0, '#e0e0ff');
				radgrad.addColorStop(0.3, '#e0e0ff');
				radgrad.addColorStop(1, 'rgba(224, 224, 255,0)');

				// draw shape
				ctx.fillStyle = radgrad;
				ctx.fillRect(-75,-75,150,150);
				ctx.fillStyle = "#44f";
				if (line == '-') {
					line = '–'; // <- this is endash; emdash would be this: '—'
				}
				ctx.fillText(line.toUpperCase(), 0, 0);
				ctx.translate(0, Loopy.FONTSIZE);
				ctx.font = "100 "+Loopy.FONTSIZE+"px sans-serif";
				//ctx.fillStyle = "#000";
			} else {
				ctx.fillText(line, 0, 0);
				ctx.translate(0, Loopy.FONTSIZE);
			}
		}

		// Restore
		ctx.restore();

	};

	//////////////////////////////////////
	// KILL LABEL /////////////////////////
	//////////////////////////////////////

	self.kill = function(){

		// Remove from parent!
		model.removeLabel(self);

		// Killed!
		publish("kill",[self]);

	};

	//////////////////////////////////////
	// HELPER METHODS ////////////////////
	//////////////////////////////////////

	self.breakText = function(){
		return self.text.split(/\n/);
	};

	self.getBounds = function(){

		var ctx = self.model.context;

		// Get MAX width...
		var lines = self.breakText();
		var maxWidth = 0;
		for(var i=0; i<lines.length; i++){
			var line = lines[i];
			var w = (ctx.measureText(line).width + 10)*2;
			if(maxWidth<w) maxWidth=w;
		}

		// Dimensions, then:
		var w = maxWidth;
		var h = (Loopy.FONTSIZE*lines.length)/2;

		// Bounds, then:
		return {
			x: self.x-w/2,
			y: self.y-h/2-Loopy.FONTSIZE/2,
			width: w,
			height: h+Loopy.FONTSIZE/2
		};

	};

	self.isPointInLabel = function(x, y){
		return _isPointInBox(x,y, self.getBounds());
	};

	self.getBoundingBox = function(){
		var bounds = self.getBounds();
		return {
			left: bounds.x,
			top: bounds.y,
			right: bounds.x + bounds.width,
			bottom: bounds.y + bounds.height
		};
	};

}
