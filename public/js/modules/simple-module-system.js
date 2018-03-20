(function () {
	/**
	 * В этом файле содержится самая простая реализация модульной системы AMD
	 * @see http://requirejs.org/docs/whyamd.html - по этой ссылочке есть
	 * очень интересная история появления этой модульной системы и описание её синтаксиса в целом
	 *
	 * Текущая реализация очень урезанная и охватывает лишь часть всего AMD, вы можете её доработать
	 *
	 * Но даже в таком виде она предоставляет два больших плюса. Тем, кто сможет объяснить, какие именно,
	 * можно будет поставить доп. балл (заодно это проверка, смотрит ли хоть кто-нибудь наши примеры)
	 */

	const modules = {};
	const factories = {};

	/**
	 * Получить модуль по его имени
	 * @param {string} name - имя модуля
	 * @return {*|null}
	 */
	window.require = function (name) {
		return modules[name] || factories[name] && (modules[name] = factories[name](require)) || null;
	};

	/**
	 * Задать модуль по имени
	 * @param {string} name - имя модуля
	 * @param {function} factory - функция-конструктор модуля
	 */
	window.define = function (name, factory) {
		factories[name] = factory;
	};

})();
