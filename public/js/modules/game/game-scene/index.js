define('game/game-scene', function (require) {
	const Scene = require('graphics/scene');
	const bus = require('bus');

	return class GameScene {
		constructor(ctx) {
			this.bus = bus;
			this.ctx = ctx;
			this.scene = new Scene(ctx);
			this.state = null;

			this.init();
		}

		init() {

		}
	}
});
