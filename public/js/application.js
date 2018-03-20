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
		const bus = require('bus');

		const MenuView = require('MenuView');
		const ProfileView = require('ProfileView');
		const ScoreboardView = require('ScoreboardView');
		const LoginView = require('LoginView');
		const SignupView = require('SignupView');

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
					.add('/login', LoginView)
					.add('/signup', SignupView)
					.add('/profile', ProfileView)
					.add('/scoreboard', ScoreboardView)
					.start();
			})
			.catch(console.error);

		bus.on('login', function (userdata) {
			UsersModel.login(userdata.email, userdata.password)
				.then(function (user) {
					new Router().open('/');
				})
				.catch(function (error) {
					bus.emit('login-error', error);
				});
		});

		bus.on('signup', function (userdata) {
			UsersModel.signup(userdata)
				.then(function (user) {
					new Router().open('/');
				})
				.catch(function (error) {
					bus.emit('signup-error', error);
				});
		});

	});

})();
