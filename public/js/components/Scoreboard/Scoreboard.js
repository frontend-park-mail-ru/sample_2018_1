(function () {

	const noop = window.noop;
	const EScoreboardTypes = window.EScoreboardTypes;
	const ScoreboardTemplate = window.fest['js/components/Scoreboard/Scoreboard.tmpl'];

	class ScoreboardComponent {
		constructor({selector = 'body', type = EScoreboardTypes.DOM} = {}) {
			this._el = document.querySelector(selector);
			this._type = type;
		}

		get data() {
			return this._data;
		}

		set data(data) {
			this._data = data || [];
		}

		clear() {
			this._el.innerHTML = '';
		}

		render() {
			let method = noop;
			switch (this._type) {
				case EScoreboardTypes.DOM:
					console.dir('renderDOM');
					method = this._renderDOM;
					break;
				case EScoreboardTypes.STRING:
					console.dir('renderString');
					method = this._renderString;
					break;
				case EScoreboardTypes.TMPL:
					console.dir('renderTmpl');
					method = this._renderTmpl;
					break;
				default:
					console.dir('render none (noop)');
					break;
			}

			method.call(this);
		}

		_renderDOM() {
			if (!this._data) {
				return;
			}

			const table = document.createElement('table');
			const tbody = document.createElement('tbody');
			table.appendChild(tbody);

			this._data.forEach(function ({email = 'lol@mail.ru', age = 13, score = 146} = {}) {
				const trow = document.createElement('tr');
				trow.classList.add('scoreboard__row');

				const tdEmail = document.createElement('td');
				tdEmail.textContent = email;

				const tdAge = document.createElement('td');
				tdAge.textContent = age;

				const tdScore = document.createElement('td');
				tdScore.textContent = score;

				trow.appendChild(tdEmail);
				trow.appendChild(tdAge);
				trow.appendChild(tdScore);

				tbody.appendChild(trow);
			});

			this._el.appendChild(table);

			table.style.fontSize = '18px';
		}

		_renderString() {
			if (!this._data) {
				return;
			}

			this._el.innerHTML = `
				<table class="scoreboard__table">
					<tbody>
						${this._data.map(({email = 'lol@mail.ru', age = 13, score = 146} = {}) => {
							return `
								<tr class="scoreboard__row">
									<td>${email}</td>
									<td>${age}</td>
									<td>${score}</td>
								</tr>
							`;
						}).join('\n')}
					</tbody>
				</table>
			`;
		}

		_renderTmpl() {
			if (!this._data) {
				return;
			}

			this._el.innerHTML = ScoreboardTemplate(this._data);
		}
	}

	window.ScoreboardComponent = ScoreboardComponent;

})();
