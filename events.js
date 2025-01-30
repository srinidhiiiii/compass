/**
*
* Created by Buddhima
*/

var fabricCanvas = new fabric.Canvas('sheet', { selection: false });
var selectedTool = '';
var toolState = '';
var toolPreviousState = '';
var instruction = $('#instructionText');

var currentTool = null;
var drawings = [];
var removed = [];

var compassLocker = {
	locked: false,
	radius: 0
};

var isCircle = false;

var compassSettings = $('#compass_settings');
var compassSettingsState = $('input[name=compass-state]');

$('input[name=tool]').click(function() {
   $('input[name=tool]').removeClass('active_tool');
   $(this).addClass('active_tool');
});

fabricCanvas.on('mouse:down', function(e) {

// console.log(selectedTool);
// console.log(toolState);


	// disable redo
	if (selectedTool != '')
		removed = [];

	// Get mouse coordinates
	var mousePointer = getMousePointer(fabricCanvas, e);

	// console.log(mousePointer);


	switch(selectedTool) {

		case 'ruler' : // ruler

			switch(toolState) {
				case 'start' : // ruler starting point

					currentTool = new Line(mousePointer);


					// do start logic here


					// change to next

					instruction.text('Select Ending Point');
					toolPreviousState = toolState;
					toolState = 'end';

				break;
				case 'end' : // ruler endpoint

					// do end logic here


					// currentTool.redraw(mousePointer);
					currentTool.complete();


					// change to next

					instruction.text('Select Starting Point');
					toolPreviousState = '';
					toolState = 'start';

				break;
			}

		break;
		case 'compass' :

			switch(toolState) {
				case 'center' :

					if (!isCircle) {
						currentTool = new Compass(mousePointer); 
					} else {
						currentTool = new CircleCompass(mousePointer);
					}

					// do center logic here


					// change to next
					// currentTool.addPoint(mousePointer);
					instruction.text('Select Radius Point');
					toolPreviousState = toolState;
					toolState = 'radius';

				break;
				case 'radius' :

					// do radius logic here
					currentTool.complete();

					// change to next
					// currentTool.addPoint(mousePointer);

					toolPreviousState = toolState;

					if(isCircle) {
						instruction.text('Select Center Point');
						toolState = 'center';
					}
					else {
						instruction.text('Select Ending Point');						
						toolState = 'end';
					}

				break;
				case 'end' :

					// do end logic here
					currentTool.complete();

					

					// change to next
					// currentTool.addPoint(mousePointer);
					// drawings.push(currentTool);

					instruction.text('Select Center Point');
					toolPreviousState = '';
					toolState = 'center';

				break;
			}

		break;
		case 'point' :

			switch(toolState) {
				case 'start' : // start placeing point

					// console.log('point start');

					currentTool = new Point(mousePointer);


					// do start logic here


					// change to next

					instruction.text('Type the label');
					toolPreviousState = toolState;
					toolState = 'end';

				break;
				case 'end' : // finish placing endpoint

					// do end logic here


					// currentTool.redraw(mousePointer);
					currentTool.complete();


					// change to next

					instruction.text('Select to place Point');
					toolPreviousState = '';
					toolState = 'start';

				break;
			}

		break;
		case 'label' :

			switch(toolState) {
				case 'start' :

					// console.log('point start');

					currentTool = new Label(mousePointer);


					// do start logic here


					// change to next

					instruction.text('Type the label');
					toolPreviousState = toolState;
					toolState = 'end';

				break;
				case 'end' :

					// do end logic here


					// currentTool.redraw(mousePointer);
					currentTool.complete();


					// change to next

					instruction.text('Select to place Label');
					toolPreviousState = '';
					toolState = 'start';

				break;
			}

		break;
	}
}, false);

fabricCanvas.on('mouse:move', function(e) {
	var mousePointer = getMousePointer(fabricCanvas, e);

	switch(selectedTool) {
		case 'ruler' :

			switch(toolState) {

				case 'end' :
					
					currentTool.redraw(mousePointer);
										
				break;
			}
		break;
		case 'compass' :
			switch(toolState) {
				case 'radius':
				case 'end' :
					currentTool.redraw(mousePointer);
				break;
			}

		break;
	}

}, false);
