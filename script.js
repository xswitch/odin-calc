function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2;
}

function divide(num1, num2) {
	if (num1 === 0 || num2 === 0) {
		return `Lel`;
	} else {
		return num1 / num2;
	}
}

function operate(operator, num1, num2) {
	switch (operator) {
		case `add`:
			return add(num1, num2);

		case `subtract`:
			return subtract(num1, num2);

		case `multiply`:
			return multiply(num1, num2);

		case `divide`:
			if (num2 === 0) {
				return `NO 0!`;
			} else {
				return divide(num1, num2);
			}

		default:
			break;
	}
}

let displayValue = `0`;
let savedValue = 0;
let operator = ``;
let decimal = false;

//Links buttons to events
function addButtons() {
	const numberButtons = Array.from(document.querySelectorAll(`.number`));
	const operatorButtons = document.querySelectorAll(`.operator`);
	numberButtons.forEach((button) => {
		button.addEventListener(`click`, numberEvent);
	});
	operatorButtons.forEach((button) => {
		button.addEventListener(`click`, operatorEvents);
	});
	//Keyboard support
	document.addEventListener(`keydown`, keyBoard);
}

//Makes the number buttons function
function numberEvent(e) {
	const button = e.currentTarget;
	const displayScreen = document.querySelector(`.display-screen`);
	//Checks if only 0 is currently shown, if so dont add another 0
	if (Number(button.textContent) === 0 && displayValue == `0`) {
		return;
	} else if (displayValue == `0`) {
		//Replaces the 0 at the start
		displayValue = button.textContent;
		//only replace screen text, if there is no stored value. if not, add it after the operator sign.
		if (savedValue === 0) {
			displayScreen.textContent = displayValue;
		} else {
			displayScreen.textContent += displayValue;
		}
	} else {
		displayValue += button.textContent;
		displayScreen.textContent += button.textContent;
	}
}

//based on the dataString on the button, performs an action.
function operatorEvents(e) {
	const button = e.currentTarget;
	//Makes it so you cannot add an operator if there is already one, or if no number has been input.
	if (displayValue != 0) {
		if (operator === ``) {
			switch (button.dataset.operator) {
				case `add`:
					updateCalc(`add`, `+`);
					break;
				case `subtract`:
					updateCalc(`subtract`, `-`);
					break;
				case `multiply`:
					updateCalc(`multiply`, `*`);
					break;
				case `divide`:
					updateCalc(`divide`, `/`);
					break;
				default:
					break;
			}
		} else {
			switch (button.dataset.operator) {
				case `add`:
					equal();
					updateCalc(`add`, `+`);
					break;
				case `subtract`:
					equal();
					updateCalc(`subtract`, `-`);
					break;
				case `multiply`:
					equal();
					updateCalc(`multiply`, `*`);
					break;
				case `divide`:
					equal();
					updateCalc(`divide`, `/`);
					break;
				default:
					break;
			}
		}
	}
	//Only operate if possible
	if (operator != ``) {
		if (button.dataset.operator === `equal` && displayValue > 0) {
			equal();
		}
	}
	//CLEAR BUTTON
	if (button.dataset.operator === `clear`) {
		displayValue = `0`;
		savedValue = 0;
		operator = ``;
		decimal = false;
		document.querySelector(`.result-screen`).textContent = ``;
		document.querySelector(`.display-screen`).textContent = `0`;
	}
	//Adds a decimal only if there are no decimal in the current number
	if (button.dataset.operator === `decimal` && decimal == false) {
		displayValue += `.`;
		if (displayValue == 0 && savedValue != 0) {
			document.querySelector(`.display-screen`).textContent += `0.`;
		} else {
			document.querySelector(`.display-screen`).textContent += `.`;
		}
		decimal = true;
	}
}

//Updates the screen with an operator sign. and stores the display value and operator in variables.
function updateCalc(ope, sign) {
	const displayScreen = document.querySelector(`.display-screen`);
	operator = ope;
	savedValue = displayValue;
	displayValue = `0`;
	displayScreen.textContent += sign;
	decimal = false;
}

//Converts the savedvalue and displayvalue to numbers then passes them to the operator function
function equal() {
	let savedNum = Number(savedValue);
	let displayNum = Number(displayValue);
	let result = operate(operator, savedNum, displayNum);
	if (result % 1 != 0) {
		result = result.toFixed(2);
		decimal = true;
	} else {
		decimal = false;
	}

	const resultScreen = document.querySelector(`.result-screen`);
	const displayScreen = document.querySelector(`.display-screen`);

	resultScreen.textContent = `${displayScreen.textContent} = ${result}`;
	displayScreen.textContent = result;
	savedValue = 0;
	displayValue = result;
	operator = ``;
}

function keyBoard(e) {
	console.log(e.key);
	const buttons = document.querySelectorAll(`.calc-button`);
	buttons.forEach((button) => {
		if (button.textContent == e.key) {
			button.click();
		} else if (button.textContent == `=` && e.key == `Enter`) {
			button.click();
		} else if (button.textContent == `C` && e.key == `Delete`) {
			button.click();
		}
	});
}

addButtons();
