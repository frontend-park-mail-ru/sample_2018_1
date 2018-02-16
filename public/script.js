const text = window.document.getElementById('text');

console.log('I am js!', text.innerText);

const button = document.getElementById('button');
button.addEventListener('mouseout', () => {
	text.innerText = 'Welcome to frontend';
});

