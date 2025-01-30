/**
*
* Created by Buddhima
*/

function Compass (mouseStart) {
	// 'c' for center, 'r' for radius, 'e' for end
	this.cx = this.rx = this.ex = mouseStart.x;
	this.cy = this.ry = this.ey = mouseStart.y;
	
	this.radius = 0;

	var points = [this.cx, this.cy, this.rx, this.ry];

	this.radiusLine = new fabric.Line(points, {				
										    strokeWidth: 2,
										    fill: 'black',
										    stroke: 'black',
										    strokeDashArray: [6, 3],
										    selectable: false
										});

	fabricCanvas.add(this.radiusLine);

	this.textObj = new fabric.Text('0', {
									        fontFamily: 'Times_New_Roman',
									        left: this.x1,
									        top: this.y1,
									        fontSize: 20,
									        originX: 'center'
									    });

	fabricCanvas.add(this.textObj);


	this.status = 'radius';
}

Compass.prototype = {
	constructor : Compass,

	redraw : function (mouse) { 

		if (this.status == 'radius') {
			this.rx = mouse.x;
		 	this.ry = mouse.y;

		 	// handling locked scenarios
		 	var tmpRadius = Math.sqrt( Math.pow((this.rx-this.cx), 2) + Math.pow((this.ry-this.cy), 2) );

		 	if (compassLocker.locked && (tmpRadius != compassLocker.radius)) {
		 		if ((this.rx-this.cx) == 0 && (this.ry>this.cy)) {
		 			this.ry = this.cy + compassLocker.radius;
		 		} else if ((this.rx-this.cx) == 0 && (this.ry<this.cy)) {
		 			this.ry = this.cy - compassLocker.radius;
		 		} else {
		 			var radiusAngle = this._getAngle({x:this.rx, y:this.ry});

		 			this.rx = this.cx + compassLocker.radius * Math.cos(radiusAngle);
		 			this.ry = this.cy + compassLocker.radius * Math.sin(radiusAngle);
		 		}
		 	}

		 	this.radiusLine.set({ x2: this.rx, y2: this.ry });

		 	var tmp = addDistanceLabel (this.textObj, {x: this.cx, y:this.cy}, {x:this.rx, y:this.ry});

		 	fabricCanvas.renderAll();

		} else if (this.status = 'end') {
			this.ex = mouse.x;
			this.ey = mouse.y;

			this.endAngle = this._getAngle({ x:this.ex, y:this.ey })


			var angleDiff = this.endAngle - this.startAngle;

			if ((-Math.PI * 2 < angleDiff) && (angleDiff < -Math.PI)) {
				this.counterclockwise = false;
			} else if ((-Math.PI < angleDiff) && (angleDiff < 0)) {
				this.counterclockwise = true;
			} else if ((0 < angleDiff) && (angleDiff < Math.PI)) {
				this.counterclockwise = false;
			} else if ((Math.PI < angleDiff) && (angleDiff < Math.PI * 2)) {
				this.counterclockwise = true;
			}

			this.fabricObj.set( {endAngle: this.endAngle, counterclockwise: this.counterclockwise} );

			fabricCanvas.renderAll();
		}

	},

	complete : function () {

		if (this.status == 'radius') {

			fabricCanvas.remove(this.radiusLine);

			fabricCanvas.remove(this.textObj);

			fabricCanvas.renderAll();

			this.radius = Math.sqrt( Math.pow((this.rx-this.cx), 2) + Math.pow((this.ry-this.cy), 2) );

			this.startAngle = this._getAngle({ x:this.rx, y:this.ry });

			this.fabricObj = new fabric.Arc({
										left: this.cx,
										top: this.cy,
										radius: this.radius,
										startAngle: this.startAngle,
										endAngle: this.startAngle,
										counterclockwise: false,
										fill: '',
										stroke: 'black',
										originX: 'center',
								        originY: 'center',
								        selectable: false,
								        strokeDashArray: [6, 3]
									});

			fabricCanvas.add(this.fabricObj);

			this.status = 'end';

		} else if (this.status = 'end') {

			this.fabricObj.set({ strokeDashArray: [] });

			fabricCanvas.renderAll();

			drawings.push(this);
		}		
		
	},

	addToCanvas : function () {
		fabricCanvas.add(this.fabricObj);
		fabricCanvas.renderAll();
	},

	removeFromCanvas : function () {
		fabricCanvas.remove(this.fabricObj);
		fabricCanvas.renderAll();
	},

	toSVG : function () {
	    return this.fabricObj.toSVG();
	},

	_getAngle : function (point) {
		var angleRequired = 0;

		// gets the actual angle from center
		if ((point.x-this.cx) == 0) {
			// handling special cases
			if (this.cy > point.y) { 
				angleRequired = Math.PI/2;
			} else if (this.cy < point.y) {
				angleRequired = -Math.PI/2;
			}
		} else {
			// in general cases
			angleRequired = Math.atan ((point.y-this.cy) / (point.x-this.cx));

			// console.log('starting angle before');
			// console.log(angleRequired * 180 / Math.PI);

			if ((this.cy < point.y) && (angleRequired < 0)) { // handle 2nd quadrant
				angleRequired = Math.PI - Math.abs(angleRequired);
			} else if ((this.cy > point.y) && (angleRequired > 0)) { // handle 3rd quadrant
				angleRequired = Math.PI + Math.abs(angleRequired);
			} else if ((this.cy > point.y) && (angleRequired < 0)) { // handle 4th quadrant
				angleRequired = 2*Math.PI - Math.abs(angleRequired);
			}

			// console.log('starting angle after');
			// console.log(angleRequired * 180 / Math.PI);
		}

		return angleRequired;
	}
}

function lock () {
	if (selectedTool == 'compass') {
		compassLocker.locked = true;
		compassLocker.radius = currentTool.radius;

		// console.log(compassLocker.radius);
	}
}

function unlock () {
	compassLocker.locked = false;
	compassLocker.radius = 0;
}
