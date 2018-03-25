// наименование для нашего хранилища кэша
const CACHE_NAME = 'sampe_sw-v1';
// ссылки на кэшируемые файлы
const cacheUrls = [
	'/',
	'/chat',
	'/login',
	'/signup',
	'/profile',
	'/scoreboard',

	'/css/main.css',
	'/css/reset.css',
	'/css/system-font.css',

	'/js/modules/simple-module-system.js',
	'/js/application.js',
	'/js/modules/ws.js',
	'/js/modules/bus.js',
	'/js/modules/http.js',
	'/js/modules/add-sw.js',
	'/js/modules/router.js',
	'/js/models/UsersModel.js',
	'/js/utils/noop.js',
	'/js/utils/EScoreboardTypes.js',
	'/js/views/MenuView/MenuView.tmpl.js',
	'/js/views/ScoreboardView/ScoreboardView.tmpl.js',
	'/js/views/ProfileView/ProfileView.tmpl.js',
	'/js/views/LoginView/LoginView.tmpl.js',
	'/js/views/SignupView/SignupView.tmpl.js',
	'/js/views/ChatView/ChatView.tmpl.js',
	'/js/views/LoginView/index.js',
	'/js/views/MenuView/index.js',
	'/js/views/ScoreboardView/index.js',
	'/js/views/SignupView/index.js',
	'/js/views/ChatView/index.js',
	'/js/views/ProfileView/index.js',
	'/js/views/View/index.js',
	'/js/components/Scoreboard/Scoreboard.tmpl.js',
	'/js/components/Scoreboard/Scoreboard.js',
	'/js/components/Form/Form.tmpl.js',
	'/js/components/Form/Form.js',
	'/js/components/Scoreboard/Scoreboard.css',
	'/js/components/Form/Form.css',
	'/js/views/View/styles.css',
	'/js/views/LoginView/styles.css',
	'/js/views/MenuView/styles.css',
	'/js/views/ProfileView/styles.css',
	'/js/views/ScoreboardView/styles.css',
	'/js/views/SignupView/styles.css',
	'/js/views/ChatView/styles.css',

	'/images/node-js-128.png',
	'/images/otter.png',
];

this.addEventListener('install', (event) => {
	// задержим обработку события
	// если произойдёт ошибка, serviceWorker не установится
	event.waitUntil(
		// находим в глобальном хранилище Cache-объект с нашим именем
		// если такого не существует, то он будет создан
		caches.open(CACHE_NAME)
			.then((cache) => {
				// загружаем в наш cache необходимые файлы
				return cache.addAll(cacheUrls);
			})
			.catch((err) => {
				console.error('smth went wrong with caches.open: ', err);
			})
	);
});

this.addEventListener('fetch', (event) => {

	/** online first */
	if (navigator.onLine) {
		return fetch(event.request);
	}

	/** cache first */
	event.respondWith(
		// ищем запрашиваемый ресурс в хранилище кэша
		caches
			.match(event.request)
			.then((cachedResponse) => {
				// выдаём кэш, если он есть
				if (cachedResponse) {
					return cachedResponse;
				}

				return fetch(event.request);
			})
			.catch((err) => {
				console.error('smth went wrong with caches.match: ', err);
			})
	);
});
