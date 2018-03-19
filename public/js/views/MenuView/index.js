define('MenuView', function (require) {
	const View = require('View');
	const UsersModel = require('UsersModel');

	return class MenuView extends View {
		constructor() {
			super(`js/views/MenuView/MenuView.tmpl`);
		}

		render() {
			const attrs = {
				navItems: []
			};

			if (UsersModel.isAuthorized()) {
				attrs.navItems = [
					{
						title: 'Список пользователей',
						href: '/scoreboard'
					},
					{
						title: 'Профиль пользователя',
						href: '/profile'
					}
				];
			} else {
				attrs.navItems = [
					{
						title: 'Регистрация',
						href: '/signup'
					},
					{
						title: 'Авторизация',
						href: '/login'
					},
					{
						title: 'Список пользователей',
						href: '/scoreboard'
					}
				];
			}

			return super.render(attrs);
		}
	};
});
