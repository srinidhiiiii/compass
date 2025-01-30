/**
*
* Created by Buddhima
*/

function Point (mouseStart) {
	this.x = mouseStart.x;
	this.y = mouseStart.y;
	this.pointModel = {
				left: this.x,
        		top: this.y,
        		originX: 'center',
				fontFamily: 'Times_New_Roman',
        		fontSize: 25
			};

	this.pointCircle = new fabric.Circle({
										left: this.x,
										top: this.y,
										radius: 3,
										fill: 'black',
										originX: 'center',
								        originY: 'center',
								        selectable: false
									});

	// explicitly adding a circle to canvas, hence need to remove when removing
	fabricCanvas.add(this.pointCircle);

	this.fabricObj = new fabric.UpperCaseText("", this.pointModel);

	fabricCanvas.add(this.fabricObj);

	fabricCanvas.setActiveObject(this.fabricObj);
    this.fabricObj.selectAll();
    this.fabricObj.enterEditing();
}

Point.prototype = {
	constructor : Point,

	redraw : function (mouse) { },

	complete : function () {
		this.fabricObj.set({ editable: false, selectable: false });
		this.textValue = this.fabricObj.getText();
		drawings.push(this);
	},

	addToCanvas : function () {
		fabricCanvas.add(this.pointCircle);

		fabricCanvas.add(this.fabricObj);
		fabricCanvas.renderAll();
	},

	removeFromCanvas : function () {
		fabricCanvas.remove(this.pointCircle);

		fabricCanvas.remove(this.fabricObj);
		fabricCanvas.renderAll();
	},

	toSVG : function () {
		return '<circle cx=\"' + this.x + '\" cy=\"' + this.y + '\" r=\"3\" style=\"stroke: #000000;\" />' +
				'<text text-anchor=\"middle\" x=\"' + this.x + '\" y=\"' + (this.y+10) + '\" style=\"stroke: #000000; fontFamily: Times_New_Roman; fontSize: 25;\" > ' + this.fabricObj.getText() + ' </text>';
	}
}