(function () {

	if (
		window.location.hostname === 'super-frontend.herokuapp.com'
		&& window.location.protocol !== 'https'
	) {
		window.location.assign(window.location.href.replace('http://', 'https://'));
		return;
	}

	document.addEventListener('DOMContentLoaded', function () {
		const HttpModule = require('HttpModule');
		const UsersModel = require('UsersModel');
		const Router = require('Router');

		const MenuView = require('MenuView');
		const ProfileView = require('ProfileView');
		const ScoreboardView = require('ScoreboardView');

		switch (window.location.hostname) {
			case 'localhost':
				HttpModule.baseUrl = 'http://localhost:3001';
				break;
			case 'super-frontend.herokuapp.com':
				HttpModule.baseUrl = '//super-frontend-backend.herokuapp.com';
				break;
			default:
				HttpModule.baseUrl = '';
		}

		const root = document.getElementById('application');

		UsersModel.auth()
			.then(function (currentUser) {

				new Router(root)
					.add('/', MenuView)
					.add('/profile', ProfileView)
					.add('/scoreboard', ScoreboardView)
					.start();
			})
			.catch(console.error);

	});

})();
