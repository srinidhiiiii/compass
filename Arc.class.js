/**
*
* Created by Buddhima
*/


fabric.Arc = fabric.util.createClass(fabric.Circle, {
	type: 'arc',

	counterclockwise: false,

	initialize: function (options) {
		this.counterclockwise = options.counterclockwise;
		this.callSuper('initialize', options);
	},

	_render: function (ctx, noTransform) {
		ctx.beginPath();
		ctx.arc(noTransform ? this.left + this.radius : 0,
		      noTransform ? this.top + this.radius : 0,
		      this.radius,
		      this.startAngle,
		      this.endAngle, this.counterclockwise);
		this._renderFill(ctx);
		this._renderStroke(ctx);
    },

    toSVG: function(reviver) {
    	var markup = [];

		var rx = this.left + this.radius * Math.cos(this.startAngle);
		var ry = this.top + this.radius * Math.sin(this.startAngle);

		var ex = this.left + this.radius * Math.cos(this.endAngle);
		var ey = this.top + this.radius * Math.sin(this.endAngle);

		var svgPath = '';
	    if (!this.counterclockwise) {
	    	svgPath += '<path d=\"M'+rx+','+ry+' A'+this.radius+','+this.radius+' 0 0,1 '+ex+','+ey+'\" style=\"'+this.getSvgStyles()+'\"/>';
	    } else {
	    	// Exchange starting and ending points when it's counterclockwise
	    	svgPath += '<path d=\"M'+ex+','+ey+' A'+this.radius+','+this.radius+' 0 0,1 '+rx+','+ry+'\" style=\"'+this.getSvgStyles()+'\"/>';
	    }

	    markup.push(svgPath);

    	return reviver ? reviver(markup.join('')) : markup.join('');
    }
});

