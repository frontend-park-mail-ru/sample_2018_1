define('game/game-scene/fading-block', function (require) {
	const Rect = require('graphics/rect');

	return class FadingBlock extends Rect {
		constructor(ctx) {
			super(ctx);

			this.color = {r: 0, g: 0, b: 0};

			this.rotationSpeed = 0;
			this.fadeDeep = 0;
			this.fadeLevel = 0;
		}

		setColor(color) {
			this.color = {
				r: color.r || 0,
				g: color.g || 0,
				b: color.b || 0
			};
		}

		getColor(code) {
			return (this.color[code] * (1 - this.fadeLevel)) | 0;
		}

		/**
		 * @private
		 */
		draw() {
			const ctx = this.ctx;
			const w = this.width * (1 - this.fadeLevel);
			const h = this.height * (1 - this.fadeLevel);
			ctx.beginPath();
			ctx.rect(-w / 2, -h / 2, w, h);

			ctx.closePath();
			ctx.fill();
		}

		setup() {
			const ctx = this.ctx;

			ctx.translate(this.x, this.y + this.fadeDeep * this.fadeLevel);
			ctx.rotate(this.rotation + this.rotationSpeed * this.fadeLevel);
			ctx.fillStyle = `rgb(${this.getColor('r')}, ${this.getColor('g')}, ${this.getColor('b')})`;
		}
	};
});
