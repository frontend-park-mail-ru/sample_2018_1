define('graphics/circle', function (require) {
	const Figure = require('graphics/figure');

	return class Circle extends Figure {
		constructor(ctx) {
			super(ctx);
			this.radius = 0;
		}

		/**
		 * @private
		 */
		draw() {
			const ctx = this.ctx;
			ctx.beginPath();
			ctx.arc(0, 0, 1, 0, 2 * Math.PI);

			ctx.closePath();
			ctx.fill();
		}

		setup() {
			const ctx = this.ctx;

			ctx.translate(this.x, this.y);
			ctx.scale(this.radius, this.radius);
		}
	};

});
