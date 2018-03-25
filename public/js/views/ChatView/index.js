define('ChatView', function (require) {
	const View = require('View');
	const FormComponent = require('FormComponent');
	const Ws = require('Ws');
	const ws = new Ws;

	return class ChatView extends View {
		constructor() {
			super(`js/views/ChatView/ChatView.tmpl`);
			this.attrs = {
				form: {
					fields: [
						{
							labelText: 'Введите текст',
							inputType: 'text',
							inputName: 'text',
							inputPlaceholder: 'Sup, g'
						},
					],
					resetText: 'Очистить ввод',
					submitText: 'Отправить'
				}
			};

			this.bus.on('chat-message', this.updateChat.bind(this));
		}

		allowed() {
			return true;
		}

		create() {
			super.create();

			this.formRoot = this.el.querySelector('.js-chat-form-root');
			this.formComponent = new FormComponent(this.formRoot, this.attrs.form, this.onSubmit.bind(this));

			this.formComponent.init();

			this.chat = this.el.querySelector('.js-chat');
			return this;
		}

		onSubmit(formdata) {
			ws.send('chat-message', formdata.text);
		}

		updateChat(data) {
			this.chat.innerHTML += data + '<br>';
		}
	};
});
