define('FormComponent', function (require) {
	const FormTemplate = window.fest['js/components/Form/Form.tmpl'];

	return class FormComponent {
		constructor(el, attrs, callback) {
			this._el = el;
			this._attrs = attrs;
			this._callback = callback;

			this.form = null;
		}

		init() {
			this.form = this._el.querySelector('.js-form');

			this.form.addEventListener('submit', function (evt) {
				evt.preventDefault();

				const formdata = {};
				this._attrs.fields.forEach(function (field) {
					const name = field.inputName;
					formdata[name] = this.form.elements[name].value;
				}.bind(this));

				this._callback(formdata);
			}.bind(this));
		}

		clear() {
			this._el.innerHTML = '';
		}

		render(attrs) {
			this._attrs = attrs || this._attrs;
			this._el.innerHTML = FormTemplate(this._attrs);
		}
	};
});
