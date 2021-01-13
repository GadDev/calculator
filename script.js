'use strict';
const calculatorDisplay = document.querySelector('h2');
const clearBtn = document.getElementById('clear-btn');
const btnWrapper = document.getElementById('btns');
const BUTTONS = [
	{
		id: '',
		class: 'operator',
		value: '+',
		label: '+',
	},
	{
		id: '',
		class: 'operator',
		value: '-',
		label: '-',
	},
	{
		id: '',
		class: 'operator',
		value: '*',
		label: 'x',
	},
	{
		id: '',
		class: 'operator',
		value: '/',
		label: '÷',
	},
	{
		id: '',
		class: '',
		value: '7',
		label: '7',
	},
	{
		id: '',
		class: '',
		value: '8',
		label: '8',
	},
	{
		id: '',
		class: '',
		value: '9',
		label: '9',
	},
	{
		id: '',
		class: '',
		value: '4',
		label: '4',
	},
	{
		id: '',
		class: '',
		value: '5',
		label: '5',
	},
	{
		id: '',
		class: '',
		value: '6',
		label: '6',
	},
	{
		id: '',
		class: '',
		value: '1',
		label: '1',
	},
	{
		id: '',
		class: '',
		value: '2',
		label: '2',
	},
	{
		id: '',
		class: '',
		value: '3',
		label: '3',
	},
	{
		id: '',
		class: 'decimal',
		value: '.',
		label: '.',
	},
	{
		id: '',
		class: '',
		value: '0',
		label: '0',
	},
	{
		id: 'clear-btn',
		class: 'clear',
		value: '',
		label: 'C',
	},
	{
		id: '',
		class: 'equal-sign operator',
		value: '=',
		label: '=',
	},
];
const calculate = {
	'/': (firstNumber, secondNumber) => firstNumber / secondNumber,
	'*': (firstNumber, secondNumber) => firstNumber * secondNumber,
	'+': (firstNumber, secondNumber) => firstNumber + secondNumber,
	'-': (firstNumber, secondNumber) => firstNumber - secondNumber,
	'=': (firstNumber, secondNumber) => secondNumber,
};
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function createButtonEl(btnEl, parent) {
	let btn = document.createElement('button');
	btn.setAttribute('value', btnEl.value);
	btn.setAttribute('class', btnEl.class);
	btn.setAttribute('id', btnEl.id);
	btn.innerText = btnEl.label;
	parent.appendChild(btn);
}

function createButtons(btns, parent) {
	return btns.map(function (btn) {
		createButtonEl(btn, parent);
	});
}

function sendNumberValue(number) {
	console.log(number);
	if (awaitingNextValue) {
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	} else {
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent =
			displayValue === '0' ? number : displayValue + number;
	}
}

function addDecimal(input) {
	if (awaitingNextValue) {
		return;
	}
	if (!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	} else {
		input.disabled = true;
	}
}

function useOperator(operator) {
	console.log(operator);
	const currentValue = Number(calculatorDisplay.textContent);
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}
	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}
	awaitingNextValue = true;
	operatorValue = operator;
}

function resetAll() {
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
	calculatorDisplay.textContent = '0';
}

function clickEvent(input) {
	if (input.classList.length === 0) {
		input.addEventListener('click', () => sendNumberValue(input.value));
	} else if (input.classList.contains('operator')) {
		input.addEventListener('click', () => useOperator(input.value));
	} else if (input.classList.contains('decimal')) {
		input.addEventListener('click', () => addDecimal(input));
	} else if (input.classList.contains('clear')) {
		input.addEventListener('click', () => resetAll());
	}
}

function init() {
	createButtons(BUTTONS, btnWrapper);
	const inputsBtns = document.querySelectorAll('button');
	inputsBtns.forEach(function (input) {
		clickEvent(input);
	});
}

(function () {
	init();
})();
