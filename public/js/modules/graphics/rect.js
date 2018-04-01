define('graphics/rect', function (require) {
	const Figure = require('graphics/figure');

	return class Rect extends Figure {
		constructor(ctx) {
			super(ctx);
			this.rotation = 0;
			this.width = 0;
			this.height = 0;
			this.fillStyle = 'black';
		}

		rotate(degrees) {
			this.rotation = degrees * Math.PI / 180;
		}

		/**
		 * @private
		 */
		draw() {
			const ctx = this.ctx;
			ctx.beginPath();
			ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);

			ctx.closePath();
			ctx.fill();
		}

		setup() {
			const ctx = this.ctx;

			ctx.translate(this.x, this.y);
			ctx.rotate(this.rotation);
			ctx.fillStyle = this.fillStyle;
		}
	};

});
