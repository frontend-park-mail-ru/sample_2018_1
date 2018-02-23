'use strict';

const httpModule = new window.HttpModule();
const scoreboardComponent = new window.ScoreboardComponent('.js-scoreboard-table');

const application = document.getElementById('application');
const signupSection = document.getElementById('signup');
const signinSection = document.getElementById('signin');
const scoreboardSection = document.getElementById('scoreboard');
const menuSection = document.getElementById('menu');

const subheader = document.getElementsByClassName('js-subheader')[0];
const signupForm = document.getElementsByClassName('js-signup-form')[0];
const signinForm = document.getElementsByClassName('js-signin-form')[0];

const sections = {
	signup: signupSection,
	signin: signinSection,
	scoreboard: scoreboardSection,
	menu: menuSection
};

function openScoreboard() {
	scoreboardComponent.clear();

	loadAllUsers(function (err, users) {
		if (err) {
			console.error(err);
			return;
		}

		console.dir(users);
		scoreboardComponent.data = users;
		// scoreboardComponent.renderDOM();
		// scoreboardComponent.renderString();
		scoreboardComponent.renderTmpl();
	});
}

function onSubmitSigninForm(evt) {
	evt.preventDefault();
	const fields = ['email', 'password'];

	const form = evt.currentTarget;
	const formElements = form.elements;

	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	console.info('Авторизация пользователя', formdata);

	loginUser(formdata, function (err, response) {
		if (err) {
			signupForm.reset();
			alert('Неверно!');
			return;
		}

		checkAuth();
		openSection('menu');
	});
}

function onSubmitSignupForm(evt) {
	evt.preventDefault();
	const fields = ['email', 'password', 'password_repeat', 'age'];

	const form = evt.currentTarget;
	const formElements = form.elements;

	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	console.info('Регистрация пользователя', formdata);

	signupUser(formdata, function (err, response) {
		if (err) {
			signupForm.reset();
			alert('Неверно!');
			return;
		}

		checkAuth();
		openSection('menu');
	});
}

const openFunctions = {
	scoreboard: openScoreboard,
	signup: function () {
		signupForm.removeEventListener('submit', onSubmitSignupForm);
		signupForm.reset();
		signupForm.addEventListener('submit', onSubmitSignupForm);
	},
	signin: function () {
		signinForm.removeEventListener('submit', onSubmitSigninForm);
		signinForm.reset();
		signinForm.addEventListener('submit', onSubmitSigninForm);
	}
};

function openSection(name) {
	Object.keys(sections).forEach(function (key) {
		sections[key].hidden = key !== name;
	});

	if (typeof openFunctions[name] === 'function') {
		openFunctions[name]();
	}
}

application.addEventListener('click', function (evt) {
	const target = evt.target;
	if (target.tagName.toLowerCase() !== 'a') {
		return;
	}

	evt.preventDefault();

	const section = target.getAttribute('data-section');

	console.log(`Открываем секцию`, section);
	openSection(section);
});


function loadAllUsers(callback) {
	httpModule.doGet({
		url: '/users',
		callback
	});
}

function loadMe(callback) {
	httpModule.doGet({
		url: '/me',
		callback
	});
}


function signupUser(user, callback) {
	httpModule.doPost({
		url: '/signup',
		callback,
		data: user
	});
}

function loginUser(user, callback) {
	httpModule.doPost({
		url: '/login',
		callback,
		data: user
	});
}

function checkAuth() {
	loadMe(function (err, me) {
		if (err) {
			subheader.textContent = 'Вы неавторизованы';
			return;
		}

		console.log('me is', me);
		subheader.textContent = `Привет, ${me.email}!!!`;
	});
}

openSection('menu');
checkAuth();
