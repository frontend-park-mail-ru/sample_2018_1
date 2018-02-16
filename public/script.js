'use strict';


const application = document.getElementById('application');
const signupSection = document.getElementById('signup');
const signinSection  = document.getElementById('signin');
const scoreboardSection  = document.getElementById('scoreboard');
const menuSection  = document.getElementById('menu');

const signupForm = document.getElementsByClassName('js-signup-form')[0];
const signinForm = document.getElementsByClassName('js-signin-form')[0];
const scoreboardContainer = document.getElementsByClassName('js-scoreboard-table')[0];

signupSection.hidden = true;
signinSection.hidden = true;
scoreboardSection.hidden = true;

const sections = {
	signup: signupSection,
	signin: signinSection,
	scoreboard: scoreboardSection,
	menu: menuSection,
};

let users = {
	'a.ostapenko@corp.mail.ru': {
		email: 'a.ostapenko@corp.mail.ru',
		age: 20,
		score: 72
	},
	'd.dorofeev@corp.mail.ru': {
		email: 'd.dorofeev@corp.mail.ru',
		age: 20,
		score: 100500
	},
	'a.udalov@corp.mail.ru': {
		email: 'a.udalov@corp.mail.ru',
		age: 20,
		score: 72
	},
	'marina.titova@corp.mail.ru': {
		email: 'marina.titova@corp.mail.ru',
		age: 20,
		score: 72
	},
	'a.tyuldyukov@corp.mail.ru': {
		email: 'a.tyuldyukov@corp.mail.ru',
		age: 20,
		score: 72
	}
};
users = Object.values(users);

console.dir(users);


function openScoreboard() {
	const table = document.createElement('table');
	const tbody = document.createElement('tbody');
	table.appendChild(tbody);

	scoreboardContainer.innerHTML = '';

	users.forEach(function (user) {
		const trow = document.createElement('tr');

		const tdEmail = document.createElement('td');
		tdEmail.textContent = user.email;

		const tdAge = document.createElement('td');
		tdAge.textContent = user.age;

		const tdScore = document.createElement('td');
		tdScore.textContent = user.score;

		trow.appendChild(tdEmail);
		trow.appendChild(tdAge);
		trow.appendChild(tdScore);

		tbody.appendChild(trow);
	});

	scoreboardContainer.appendChild(table);

	table.style.fontSize = '18px';
}

function onSubmitSigninForm(evt) {
	evt.preventDefault();
	const fields = ['login', 'password'];

	const form = evt.currentTarget;
	const formElements = form.elements;

	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	console.info('Авторизация пользователя', formdata);
}

function onSubmitSignupForm(evt) {
	evt.preventDefault();
	const fields = ['login', 'password', 'password_repeat'];

	const form = evt.currentTarget;
	const formElements = form.elements;

	const formdata = fields.reduce(function (allfields, fieldname) {
		allfields[fieldname] = formElements[fieldname].value;
		return allfields;
	}, {});

	console.info('Ргистрация пользователя', formdata);
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
		signinForm.addEventListener('click', onSubmitSigninForm);
	},
};

function openSection(name) {
	Object.keys(sections).forEach(function (key) {
		if (key === name) {
			sections[key].hidden = false;
		} else {
			sections[key].hidden = true;
		}
	});

	if (openFunctions[name]) {
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
