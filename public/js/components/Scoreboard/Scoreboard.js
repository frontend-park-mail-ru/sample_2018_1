(function () {

	class ScoreboardComponent {
		constructor(selector = 'body') {
			this._el = document.querySelector(selector);
		}

		get data() {
			return this._data;
		}

		set data(data = []) {
			this._data = data;
		}

		clear() {
			this._el.innerHTML = '';
		}

		renderDOM() {
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

		renderString() {
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

		renderTmpl() {
			if (!this._data) {
				return;
			}

			const template = window.fest['js/components/Scoreboard/Scoreboard.tmpl'](this._data);
			this._el.innerHTML = template;
		}

	}

	window.ScoreboardComponent = ScoreboardComponent;

})();
