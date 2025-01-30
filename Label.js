/**
*
* Created by Buddhima
*/

function Label (mouseStart) {
	this.x = mouseStart.x;
	this.y = mouseStart.y;
	this.labelModel = {
				left: this.x,
        		top: this.y,
        		originX: 'left',
				fontFamily: 'Times_New_Roman',
        		fontSize: 15
			};

	this.fabricObj = new fabric.IText("", this.labelModel);

	fabricCanvas.add(this.fabricObj);

	fabricCanvas.setActiveObject(this.fabricObj);
    this.fabricObj.selectAll();
    this.fabricObj.enterEditing();
}

Label.prototype = {
	constructor : Label,

	redraw : function (mouse) { },

	complete : function () {
		this.fabricObj.set({ editable: false, selectable: false });
		this.textValue = this.fabricObj.getText();
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
		return '<text text-anchor=\"left\" x=\"' + this.x + '\" y=\"' + (this.y+10) + '\" style=\"stroke: #000000; fontFamily: Times_New_Roman; fontSize: 25;\" > ' + this.fabricObj.getText() + ' </text>';
	}
}
