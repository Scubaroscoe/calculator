let display = '';

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
	return num1 / num2;
}

function operate(someFunction, num1, num2) {
	return someFunction(num1, num2);
}

function numToDisplay(e) {
	let buttonContent = e.currentTarget.textContent;
	// let buttonContent = this.textContent;
	display += buttonContent;
	calcDisplay.textContent = display;
}

function keyNumToDisplay(e) {
	if (e.key === this.textContent) {
		let buttonContent = e.key;
		// let buttonContent = this.textContent;
		display += buttonContent;
		calcDisplay.textContent = display;
	}
}

function opToDisplay(e) {
	// If the display does NOT end with an operator
	// console.log(`this.textcontent = ${this.textContent} and e.currentTarget.textcontent = ${e.currentTarget.textContent}`);
	if (!(display[display.length - 1].search(/[+\-\/*]/) === 0)) {
		let buttonContent = e.currentTarget.textContent;
		display += buttonContent;
		calcDisplay.textContent = display;
	}
	// Otherwise, add nothing. Should never have two operators in a row
}

function clearToDisplay(e) {
	display = '';
	calcDisplay.textContent = display;
}

function backspcToDisplay(e) {
	if (display) {
		display = display.slice(0, display.length - 1);
		calcDisplay.textContent = display;
	}
}

function periodToDisplay(e) {
	let splitDisplay = display.split(/[+\-\/*]/);
	let splitLength = splitDisplay.length;
	// If the last array element is truthy, check it for periods. Otherwise, do nothing.
	if (splitDisplay[splitLength - 1]) {
		let hasPeriod = splitDisplay[splitLength - 1].search(/[.]/) !== -1 ? true : false;
		if (!hasPeriod) {
			display += '.';
			calcDisplay.textContent = display;
		}
	}
}

function equalsToDisplay(e) {
	let operatorInd = display.search(/[+\-\/*]/);
	let lastInd = display.length - 1;
	while (operatorInd !== -1 && operatorInd !== lastInd) { 
		// console.log(output);
		let firstOperand = display.slice(0, operatorInd);
		let firstOperator = display.charAt(operatorInd);
		let theRest = display.slice(operatorInd + 1);
		
		let secondOperatorInd = theRest.search(/[+\-\/*]/);
		let secondOperand;
		if (secondOperatorInd === -1) {
			secondOperand = theRest; 
		} else {
			secondOperand = theRest.slice(0, secondOperatorInd);
		}
		let output;
		switch (firstOperator) {
			case '+':
				output = operate(add, Number(firstOperand), Number(secondOperand));
				break;
			case '-':
				output = operate(subtract, Number(firstOperand), Number(secondOperand));
				break;
			case '*':
				output = operate(multiply, Number(firstOperand), Number(secondOperand));
				break;
			case '/':
				output = operate(divide, Number(firstOperand), Number(secondOperand));
				break;
			default:
				console.log("You should never make it here...");
		}
		let nextInd = firstOperand.length + 1 + secondOperand.length;
		if (output === Infinity) {
			display = "You can't divide by 0... Clear and try again.";
		} else {
			display = output + display.slice(nextInd);
		}
		operatorInd = display.search(/[+\-\/*]/);
		lastInd = lastInd = display.length - 1; 
	}
	calcDisplay.textContent = display;
}

const calcContainer = document.querySelector('#calc-container');
const numButtons = calcContainer.querySelectorAll('button:not(#clear, #equals, #add, #sub, #mul, #div, #period, #backspc)');
const opButtons = calcContainer.querySelectorAll('#add, #sub, #mul, #div');
const calcDisplay = calcContainer.querySelector('#calc-display');
const clearButton = calcContainer.querySelector('#clear');
const equalsButton = calcContainer.querySelector('#equals');
const backspcButton = calcContainer.querySelector('#backspc');
const periodButton = calcContainer.querySelector('#period');

numButtons.forEach(button => {
	button.addEventListener('click', numToDisplay);
});

opButtons.forEach(button => {
	button.addEventListener('click', opToDisplay);
});

clearButton.addEventListener('click', clearToDisplay);
backspcButton.addEventListener('click', backspcToDisplay);
periodButton.addEventListener('click', periodToDisplay);
equalsButton.addEventListener('click', equalsToDisplay);

// This is used for the dynamic animation on the calculator container
// (in conjunction with the relevant css)
calcContainer.onmousemove = (e) => {
	const x = e.pageX - e.target.offsetLeft
	const y = e.pageY - e.target.offsetTop

	e.target.style.setProperty('--x', `${ x }px`)
	e.target.style.setProperty('--y', `${ y }px`)
}

// Originally tried using keypress event, but there was no backspace key showing up
document.addEventListener("keydown", (e) => {
	// console.log(`From keydown: ${e.key} = ${e.keyCode}`)
	if (document.querySelector(`button[data-key="${e.keyCode}"]`)) {
		document.querySelector(`button[data-key="${e.keyCode}"]`).click();
	}
})