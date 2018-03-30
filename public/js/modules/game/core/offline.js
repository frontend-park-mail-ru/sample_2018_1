define('game/core/offline', function (require) {
	const GameCore = require('game/core');
	const events = require('game/core/events');
	const bus = require('bus');
	const rand = require('rand');

	return class OfflineGame extends GameCore {
		constructor(controller, scene) {
			super(controller, scene);

			this.state = {};
			this.gameloop = this.gameloop.bind(this);
			this.gameloopRequestId = null;
			this.lastFrame = 0;
		}

		start() {
			super.start();
			this.state = {
				bullets: [],
				me: {
					coll: 2
				}
			};

			this.state.items = Array.from(new Array(3 * 5), function (_, position) {
				return {
					coll: position % 5,
					row: position < 5 ? 0 : (position / 5) | 0,
					dead: false,
					fadeSpeed: 0,
					fadeLevel: 0
				};
			});

			setTimeout(function () {
				bus.emit(events.START_GAME, this.state);
			}.bind(this));
		}

		gameloop(now) {
			const delay = now - this.lastFrame;
			this.lastFrame = now;

			this.state.bullets = this.state.bullets
				.map(function (bullet) {
					bullet.percents += 0.02;
					return bullet;
				})
				.filter(function (bullet) {
					if (bullet.percents >= 1 && bullet.row >= 0) {
						this.state.items[bullet.row * 5 + bullet.coll].fadeSpeed = rand(10, 20) / 1000;
						return false;
					}

					return bullet.percents < 1;
				}.bind(this));

			this.state.items = this.state.items.map(function (item) {
				if (item.fadeSpeed) {
					item.fadeLevel += item.fadeSpeed;
				}

				if (item.fadeLevel >= 1) {
					item.dead = true;
				}

				return item;
			});

			bus.emit(events.GAME_STATE_CHANGED, this.state);

			if (!this.state.items.find(item => !item.dead)) {
				setTimeout(function () {
					bus.emit(events.FINISH_GAME);
				}.bind(this));
			}

			this.gameloopRequestId = requestAnimationFrame(this.gameloop);
		}

		onControllsPressed(evt) {
			if (this._pressed('LEFT', evt)) {
				this.state.me.coll = Math.max(0, this.state.me.coll - 1);
			} else if (this._pressed('RIGHT', evt)) {
				this.state.me.coll = Math.min(4, this.state.me.coll + 1);
			} else if (this._pressed('FIRE', evt)) {
				const coll = this.state.me.coll;
				const arr = [
					this.state.items[10 + coll],
					this.state.items[5 + coll],
					this.state.items[coll]
				];
				this.state.bullets.push({
					coll,
					row: (arr.find(item => !item.fadeSpeed) || {row: -1}).row, // FIXME
					percents: 0
				});
			}
		}

		onGameStarted(evt) {
			this.controller.start();
			this.scene.init(evt);
			this.scene.start();

			this.lastFrame = performance.now();
			this.gameloopRequestId = requestAnimationFrame(this.gameloop);
		}

		onGameFinished(evt) {
			cancelAnimationFrame(this.gameloopRequestId);

			bus.emit('CLOSE_GAME');
		}

		onGameStateChanged(evt) {
			this.scene.setState(evt);
		}
	};
});
