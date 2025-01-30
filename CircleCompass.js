/**
*
* Created by Buddhima
*/

function CircleCompass (mouseStart) {
	// 'c' for center, 'r' for radius
	this.cx = this.rx = mouseStart.x;
	this.cy = this.ry = mouseStart.y;
	
	this.radius = 0;

	this.fabricObj = new fabric.Circle({
										left: this.cx,
										top: this.cy,
										radius: this.radius,
										startAngle: 0,
										endAngle: Math.PI*2,
										fill: '',
										stroke: 'black',
										originX: 'center',
								        originY: 'center',
								        selectable: false,
								        strokeDashArray: [6, 3]
									});

	fabricCanvas.add(this.fabricObj);

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

CircleCompass.prototype = {

	constructor: CircleCompass,

	redraw: function (mouse) {
		
		this.rx = mouse.x;
	 	this.ry = mouse.y;

	 	this.radius = Math.sqrt( Math.pow((this.rx-this.cx), 2) + Math.pow((this.ry-this.cy), 2) );

	 	this.fabricObj.set({radius: this.radius});

	 	this.radiusLine.set({ x2: this.rx, y2: this.ry });

	 	var tmp = addDistanceLabel (this.textObj, {x: this.cx, y:this.cy}, {x:this.rx, y:this.ry});

	 	fabricCanvas.renderAll();
	},

	complete: function () {

		fabricCanvas.remove(this.radiusLine);

		fabricCanvas.remove(this.textObj);

		this.fabricObj.set({ strokeDashArray: [] });

		fabricCanvas.renderAll();

		drawings.push(this);
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
		return '<circle cx=\"' + this.cx + '\" cy=\"' + this.cy + '\" r=\"' + this.radius + '\" style=\"stroke: #000000; fill:none\"/>';
	}
}