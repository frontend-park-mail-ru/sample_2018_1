define('UsersModel', function (require) {
	const HttpModule = require('HttpModule');

	let currentUser = null;

	return class UsersModel {
		constructor(data) {
			this.email = data.email;
			this.password = data.password;
			this.age = data.age;
			this.score = data.score;
		}

		/**
		 * Проверяет авторизацию текущего пользователя
		 * если пользователь авторизован, возвращает его модель
		 * иначе - возвращает null
		 * @return {Promise<UsersModel|null>}
		 */
		static auth() {
			if (currentUser) {
				return Promise.resolve(currentUser);
			}

			return new Promise(function (resolve, reject) {
				HttpModule.doGet({
					url: '/me',
					callback(err, response) {
						if (err) {
							if (err.status == 401) {
								return resolve(null);
							}
							return reject(err);
						}

						currentUser = new UsersModel(response);
						resolve(currentUser);
					}
				});
			});
		}

		/**
		 * Проверка, авторизован ли пользователь
		 * @return {boolean}
		 */
		static isAuthorized() {
			return !!currentUser;
		}

		/**
		 * Возвращает модель текущего пользователя
		 * @return {UsersModel|null}
		 */
		static getCurrentUser() {
			return currentUser;
		}

		/**
		 * Логин пользователя
		 * @param {string} email
		 * @param {string} password
		 * @return {Promise<UsersModel>}
		 */
		static login(email, password) {
			return new Promise(function (resolve, reject) {
				HttpModule.doPost({
					url: '/login',
					data: {email, password},
					callback(err, response) {
						if (err) {
							return reject(err);
						}

						resolve(UsersModel.auth());
					}
				});
			});
		}

		/**
		 * Регистрация пользователя
		 * @param {string} password
		 * @param {string} email
		 * @param {string} age
		 * @return {Promise<UsersModel>}
		 */
		static signup({password, email, age}) {
			return new Promise(function (resolve, reject) {
				HttpModule.doPost({
					url: '/signup',
					data: {password, email, age},
					callback(err, response) {
						if (err) {
							return reject(err);
						}

						resolve(UsersModel.auth());
					}
				});
			});
		}

		/**
		 * Загружает список всех пользователей
		 * @return {Promise<UsersModel[]>}
		 */
		static loadList() {
			return new Promise(function (resolve, reject) {
				HttpModule.doGet({
					url: '/users',
					callback(err, response) {
						if (err) {
							return reject(err);
						}

						resolve(response.map(item => new UsersModel(item)));
					}
				});
			});
		}
	};
});
