define('ScoreboardView', function (require) {
	const View = require('View');
	const UsersModel = require('UsersModel');
	const ScoreboardComponent = require('ScoreboardComponent');

	return class ScoreboardView extends View {
		constructor() {
			super(`js/views/ScoreboardView/ScoreboardView.tmpl`);
		}

		create(attrs) {
			super.create(attrs);
			const scoreboardRoot = this.el.querySelector('.js-scoreboard-root');
			UsersModel.loadList()
				.then(function (users) {
					this.scoreboard = new ScoreboardComponent({el: scoreboardRoot});
					this.scoreboard.data = users;

					this.scoreboard.render();
				}.bind(this))
				.catch(console.error);

			return this;
		}
	};
});
