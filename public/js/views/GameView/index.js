define('GameView', function (require) {
	const View = require('View');
	const Game = require('game/game');
	const GAME_MODES = require('game/modes');

	const Figure = require('graphics/figure');
	const Circle = require('graphics/circle');
	const Scene = require('graphics/scene');
	const Rect = require('graphics/rect');
	const FadingBlock = require('game/game-scene/fading-block');

	const rand = require('rand');

	return class GameView extends View {
		constructor() {
			super(`js/views/GameView/GameView.tmpl`);
			this.canvas = null;
			this.game = null;

			this.bus.on('CLOSE_GAME', function () {
				if (this.active) {
					this.router.open('/');
				}
			}.bind(this));
		}

		destroy() {
			this.game.destroy();
			return this;
		}

		create(attrs) {
			super.create(attrs);
			this.canvas = this.el.querySelector('.js-canvas');
			this.ctx = this.canvas.getContext('2d');

			this.doGame(attrs);
			return this;
		}

		doGame(pathname) {
			let mode = '';
			if (pathname === '/game/online-mode') {
				mode = GAME_MODES.ONLINE;
			} else {
				mode = GAME_MODES.OFFLINE;
			}
			this.game = new Game(mode, this.canvas);
			this.game.start();
		}

		do1() {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const figure = new Figure(ctx);

			figure.x = 50;
			figure.y = 50;

			function render() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.beginPath();

				figure.render();

				ctx.fill();
				ctx.closePath();
				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		}

		do2() {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const figures = Array.from(new Array(5), function (item, position) {
				const figure = new Figure(ctx);
				figure.x = 50 + 60 * position;
				figure.y = 50 + 140 * position;
				return figure;
			});

			function render() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.beginPath();

				figures.forEach(figure => figure.render());

				ctx.fill();
				ctx.closePath();
				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		}

		do3() {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const circles = Array.from(new Array(5), function (item, position) {
				const circle = new Circle(ctx);
				circle.x = 50 + 60 * position;
				circle.y = 50 + 140 * position;
				circle.radius = 10 + 10 * position;
				return circle;
			});

			function render() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				circles.forEach(figure => figure.render());

				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		}

		do4() {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const rectangles = Array.from(new Array(5), function (item, position) {
				const rect = new Rect(ctx);
				rect.x = 50 + 60 * position;
				rect.y = 50 + 140 * position;
				rect.fillStyle = `#${position * 2 + 1}${position * 2 + 1}${position * 2 + 1}`;
				rect.width = 10 + 20 * position;
				rect.height = 10 + 10 * position;
				rect.rotate(15 * position);
				return rect;
			});

			function render() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				rectangles.forEach(figure => figure.render());

				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		}

		do5() {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const circle = new Circle(ctx);
			circle.radius = 25;
			circle.x = 50;
			circle.y = 50;
			const dx = rand(10, 40);
			const dy = rand(10, 70);

			let start = performance.now();

			function render(now) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				const delay = now - start;
				start = now;

				circle.x += dx * delay / 50;
				circle.y += dy * delay / 50;
				while (circle.x > canvas.width) {
					circle.x -= canvas.width;
				}
				while (circle.y > canvas.height) {
					circle.y -= canvas.height;
				}

				circle.render();

				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		}

		do6() {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const scene = new Scene(ctx);

			const rectangle1 = new Rect(ctx);
			const rectangle2 = new Rect(ctx);

			rectangle1.id = scene.push(rectangle1);
			rectangle2.id = scene.push(rectangle2);

			rectangle1.fillStyle = 'whitesmoke';
			rectangle2.fillStyle = 'gold';

			rectangle1.width = rectangle2.width = rectangle1.height = rectangle2.height = 200;
			rectangle1.y = 200;
			rectangle2.y = 500;
			rectangle1.x = 150;
			rectangle2.x = 250;

			scene.toBack(rectangle1.id);
			scene.toBack(rectangle2.id);

			const circles = Array.from(new Array(100), function (item, position) {
				const circle = new Circle(ctx);
				circle.radius = 4;
				circle.x = 200;
				circle.dx = rand(-100, 100);
				circle.dy = rand(500, 1000);

				circle.id = scene.push(circle);
				return circle;
			});

			scene.toFront(rectangle2.id);

			let start = performance.now();

			function render(now) {
				const delay = now - start;
				start = now;

				circles.forEach(function (circle) {
					circle.x += circle.dx * delay / 1000;
					circle.y += circle.dy * delay / 1000;
					while (circle.y > canvas.height) {
						circle.y -= canvas.height;
						circle.x += rand(-5, 5);
					}
					while (circle.x > canvas.width) {
						circle.x -= canvas.width;
					}
					while (circle.x < 0) {
						circle.x += canvas.width;
					}
				});

				scene.render();
				requestAnimationFrame(render);
			}

			requestAnimationFrame(render);
		}

		do7() {
			const ctx = this.ctx;
			const canvas = this.canvas;
			const scene = new Scene(ctx);

			const field = Array.from(new Array(20), function (item, position) {
				const b = new FadingBlock(ctx);
				b.id = scene.push(b);
				b.setColor({
					r: rand(10, 245),
					g: rand(10, 245),
					b: rand(10, 245)
				});

				b.height = 40;
				b.width = 80;
				b.x = 50 + (position % 4) * 100;
				b.y = 50 + ((position / 4) | 0) * 50;
				b.fadeDeep = 500;
				b.fadeSpeed = 0;
				b.rotationSpeed = rand(-25, 25);

				return b;
			});

			let start = performance.now();

			function render(now) {
				const delay = (now - start) / 100;
				start = now;

				field.forEach(function (b) {
					if (!b.id) {
						return;
					}

					if (b.fadeSpeed) {
						b.fadeLevel += b.fadeSpeed * delay;
					}

					if (b.fadeLevel > 1) {
						b.fadeSpeed = 0;
						scene.remove(b.id);
						b.id = null;
					}
				});

				scene.render();
				requestAnimationFrame(render);
			}

			setInterval(function () {
				const item = rand(0, field.length - 1);
				const b = field[item];
				if (b.fadeLevel > 1 || b.fadeSpeed) {
					return;
				}

				b.fadeSpeed = rand(10, 100) / 1000;
			}, 300);

			requestAnimationFrame(render);
		}
	};
});
