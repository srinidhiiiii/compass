/**
*
* Created by Buddhima
*/

function Line (mouseStart) {
	this.x1 = this.x2 = mouseStart.x;
	this.y1 = this.y2 = mouseStart.y;
	this.lineModel = {				
			    strokeWidth: 1,
			    fill: 'black',
			    stroke: 'black',
			    strokeDashArray: [6, 3],
			    selectable: false
			};
	var points = [this.x1, this.y1, this.x2, this.y2];
	this.fabricObj = new fabric.Line(points, this.lineModel);

	fabricCanvas.add(this.fabricObj);

	this.textObj = new fabric.Text('0', {
									        fontFamily: 'Times_New_Roman',
									        left: this.x1,
									        top: this.y1,
									        fontSize: 20,
									        originX: 'center'
									    });

	fabricCanvas.add(this.textObj);
}

Line.prototype = {
	constructor : Line,

	redraw : function (mouse) {
		this.x2 = mouse.x;
		this.y2 = mouse.y;
		this.fabricObj.set({ x2: this.x2, y2: this.y2 });

		var tmp = addDistanceLabel (this.textObj, {x: this.x1, y:this.y1}, {x:this.x2, y:this.y2});


		fabricCanvas.renderAll();

	},

	complete : function () {
		this.fabricObj.set({ strokeDashArray: [] });

		fabricCanvas.remove(this.textObj);

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
		return '<line x1=\"' + this.x1 + '\" y1=\"' + this.y1 + '\" x2=\"' + this.x2 + '\" y2=\"' + this.y2 + '\" style=\"stroke: #000000;\"/>';
	}
}
