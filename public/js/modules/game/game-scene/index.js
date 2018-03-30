define('game/game-scene', function (require) {
	const rand = require('rand');

	const Scene = require('graphics/scene');
	const FadingBlock = require('game/game-scene/fading-block');
	const GamePlayerFigure = require('game/game-scene/player');
	const Circle = require('graphics/circle');
	const bus = require('bus');

	return class GameScene {
		constructor(canvas) {
			this.bus = bus;
			this.canvas = canvas;
			const ctx = canvas.getContext('2d');
			this.ctx = ctx;
			this.scene = new Scene(ctx);
			this.state = null;
			this.requestFrameId = null;

			this.lastFrameTime = 0;

			this.field = [];
			this.me = null;

			this.renderScene = this.renderScene.bind(this);
		}

		init(state) {
			const ctx = this.ctx;
			const scene = this.scene;

			this.state = state;

			this.field = this.state.items.map(function (item) {
				const b = new FadingBlock(ctx);
				b.id = scene.push(b);
				b.setColor({
					r: item.r || rand(10, 245),
					g: item.g || rand(10, 245),
					b: item.b || rand(10, 245)
				});

				b.height = 40;
				b.width = 70;
				b.x = 50 + item.coll * 75;
				b.y = 50 + item.row * 50;
				b.fadeDeep = 500;
				b.rotationSpeed = rand(-25, 25) / 1000;

				return b;
			});

			this.me = new GamePlayerFigure(ctx);

			this.me.y = 660;
			this.me.x = 50 + state.me.coll * 75;

			this.me.id = scene.push(this.me);
		}

		setState(state) {
			const scene = this.scene;

			this.state = state;

			this.me.x = 50 + state.me.coll * 75;

			this.field.forEach(function (b, pos) {
				const item = state.items[pos];
				if (item.dead && b.id) {
					scene.remove(b.id);
					return;
				}

				if (item.fadeLevel) {
					if (!b.fadeLevel) {
						scene.toBack(b.id);
					}

					b.fadeLevel = item.fadeLevel;
				}
			});
		}

		renderScene(now) {
			const ctx = this.ctx;
			const scene = this.scene;
			const delay = now - this.lastFrameTime;
			this.lastFrameTime = now;

			const bullets = this.state.bullets.map(function (bullet) {
				const b = new Circle(ctx);
				b.id = scene.push(b);
				b.radius = 4;

				b.x = 50 + bullet.coll * 100;
				b.y = 660 - (660 - (50 + bullet.row * 50)) * bullet.percents;

				return b;
			});
			scene.render();

			bullets.forEach(bullet => scene.remove(bullet.id));
			this.requestFrameId = requestAnimationFrame(this.renderScene);
		}

		start() {
			this.lastFrameTime = performance.now();
			this.requestFrameId = requestAnimationFrame(this.renderScene);
		}

		stop() {
			if (this.requestFrameId) {
				window.cancelAnimationFrame(this.requestFrameId);
				this.requestFrameId = null;
			}

			this.scene.clear();
		}
	};
});
