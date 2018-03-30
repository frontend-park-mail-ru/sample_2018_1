define('game/game-scene/player', function (require) {
	const Figure = require('graphics/figure');
	const Rect = require('graphics/rect');
	const Circle = require('graphics/circle');

	return class GamePlayerFigure extends Figure {
		constructor(ctx) {
			super(ctx);

			this.body = new Rect(ctx);
			this.gun = new Circle(ctx);

			this.body.width = 50;
			this.body.height = 40;
			this.gun.radius = 5;
		}

		/**
		 * @private
		 */
		draw() {
			const ctx = this.ctx;
			this.body.x = this.x;
			this.body.y = this.y;
			this.gun.x = this.x;
			this.gun.y = this.y - this.body.height / 2;

			this.body.render();
			this.gun.render();
		}

		setup() {

		}
	};
});
