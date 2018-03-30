define('game/core', function (require) {
	const events = require('game/core/events');
	const bus = require('bus');

	return class GameCore {
		constructor(controller, scene) {
			this.controller = controller;
			this.scene = scene;

			this.onGameStarted = this.onGameStarted.bind(this);
			this.onGameFinished = this.onGameFinished.bind(this);
			this.onControllsPressed = this.onControllsPressed.bind(this);
			this.onGameStateChanged = this.onGameStateChanged.bind(this);

			this.controllersLoopIntervalId = null;
		}

		start() {
			bus.on(events.START_GAME, this.onGameStarted);
			bus.on(events.FINISH_GAME, this.onGameFinished);
			bus.on(events.CONTROLS_PRESSED, this.onControllsPressed);
			bus.on(events.GAME_STATE_CHANGED, this.onGameStateChanged);

			const controller = this.controller;
			this.controllersLoopIntervalId = setInterval(function () {
				const actions = controller.diff();

				if (Object.keys(actions).some(k => actions[k])) {
					bus.emit(events.CONTROLS_PRESSED, actions);
				}
			}, 100);
		}

		destroy() {
			clearInterval(this.controllersLoopIntervalId);
			bus.off(events.START_GAME, this.onGameStarted);
			bus.off(events.FINISH_GAME, this.onGameFinished);
			bus.off(events.GAME_STATE_CHANGED, this.onGameStateChanged);

			this.controller.destroy();
			this.scene.stop();
		}

		onControllsPressed(evt) {
			throw new Error('This method must be overridden');
		}

		onGameStarted(evt) {
			throw new Error('This method must be overridden');
		}

		onGameFinished(evt) {
			throw new Error('This method must be overridden');
		}

		onGameStateChanged(evt) {
			throw new Error('This method must be overridden');
		}
	};
});
