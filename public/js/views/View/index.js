define('View', function (require) {
	const Router = require('Router');

	return class View {
		constructor(name) {
			this.name = name;
			this.attrs = {};
			this.tmpl = window.fest[name];
			this.router = new Router;

			this.el = document.createElement('div');
		}

		hide() {
			this.el.setAttribute('hidden', 'hidden');
			return this;
		}

		show() {
			this.el.removeAttribute('hidden');
			return this;
		}

		render(attrs) {
			this.attrs = attrs || this.attrs;
			this.el.innerHTML = this.tmpl(this.attrs);
			return this;
		}

		create(attrs) {
			return this
				.render(attrs)
				.show();
		}

		destroy() {
			this.hide();
			this.el.innerHTML = '';
			return this;
		}

		renderTo(root) {
			root.appendChild(this.el);
			return this;
		}

		allowed() {
			return true;
		}
	};
});
