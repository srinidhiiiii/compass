/**
*
* Created by Buddhima
*/

function getMousePointer (canvas, evt) {
    var mouse = canvas.getPointer(evt.e);
    var x = (mouse.x);
    var y = (mouse.y);
    return {
        x: x,
        y: y
    };
}


function addDistanceLabel (lineObj, start, end) {
	// change text label
 	var textX = start.x + ((end.x - start.x) / 2);
 	var textY = start.y + ((end.y - start.y) / 2);

 	var distance = Math.sqrt( Math.pow((end.x-start.x), 2) + Math.pow((end.y-start.y), 2) );
 	distance = (distance / 50.0).toFixed(1); // make it centimeters

 	lineObj.set( {left: textX, top: textY } );
 	lineObj.setText(distance + ' cm');
}


function initTool (toolName) {

	compassSettings.hide();

	switch (toolName) {
		case 'ruler' :
			selectedTool = 'ruler';
			toolState = 'start';
			instruction.text('Select Starting Point');

			break;
		case 'compass' :
			selectedTool = 'compass';
			toolState = 'center';
			instruction.text('Select Center Point');

			compassSettings.show();

			break;
		case 'point' :
			selectedTool = 'point';
			toolState = 'start';
			instruction.text('Select to place Point');

			break;
		case 'label' :
			selectedTool = 'label';
			toolState = 'start';
			instruction.text('Select to place Label');
	}
}



function circle () {
	if (selectedTool == 'compass') {
		isCircle = !isCircle;

		compassSettingsState.attr('disabled', isCircle ? true : false);
	}
}

function undo () {
	if (drawings.length == 0) return;

	var drawing = drawings.pop();
	drawing.removeFromCanvas();
	removed.push(drawing);
}

function redo () {
	if (removed.length == 0) return;

	var drawing = removed.pop();
	drawing.addToCanvas();
	drawings.push(drawing);
}

function newsheet () {
	fabricCanvas.clear();

	selectedTool = '';
	toolState = '';
	toolPreviousState = '';
	instruction.text('Click on Ruler, Compass or Point');

	currentTool = null;
	drawings = [];
	removed = [];

	compassLocker = {
		locked: false,
		radius: 0
	};

	isCircle = false;
}

function exportSVG() {
	// export objects in current canvas as SVG

	var svgString = '<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1000.0\" height=\"1280.0\" version=\"1.1\">';

	for (var i=0; i<drawings.length; i++) {
		svgString += drawings[i].toSVG();
	}

	svgString += '</svg>';

	console.log(svgString);

	var xmlString = '<?xml version="1.0" encoding="UTF-8"?>' + svgString;

	$.ajax({
		type: "POST",
		url: "http://localhost:1990/answer",
		contentType: "text/plain",
		data: xmlString,
		success:  function (res) {
			console.log(res); 
			$('#result_print').empty().append(res);
		}
	});

	// $('#svg_print').text(xmlString);
}
