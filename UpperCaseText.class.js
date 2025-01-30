/**
*
* Created by Buddhima
*/


fabric.UpperCaseText = fabric.util.createClass(fabric.IText, {
	type: 'upperCaseText',

	initialize: function (element, options) {
		options.top += 10;
		this.callSuper('initialize', element, options);
	},

	_render: function (ctx) {
		this.setText(this.getText().toUpperCase());
		this.callSuper('_render', ctx);
    }
});

