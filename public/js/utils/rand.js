define('rand', function (require) {
	return function rand(from, to) {
		return Math.floor(from + Math.random() * (to + 1 - from));
	};
});
