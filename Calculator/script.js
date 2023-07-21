let expression = "";
const screenElement = document.getElementById("screen");

// MOUSE CLICK
const buttons = document.getElementById("buttons");
buttons.addEventListener("click", handleButtonClick);

function handleButtonClick(event) {
  const buttonValue = event.target.textContent;

  if (isNumber(buttonValue)) {
    handleNumberInput(buttonValue);
  } else if (isOperator(buttonValue)) {
    handleOperatorInput(buttonValue);
  } else if (buttonValue === "A/C") {
    clearDisplay();
  } else if (buttonValue === ".") {
    handleDecimalInput();
  } else if (buttonValue === "=") {
    evaluateExpression();
  }
}


// KEYBOARD
document.addEventListener("keydown", handleKeyDown);

function handleKeyDown(event) {
  const buttonValue = event.key;

  if (buttonValue === "Enter" || buttonValue === "=" ) {
    event.preventDefault(); 
    evaluateExpression();
  } else if (buttonValue === "Escape") {
    event.preventDefault();
    clearDisplay();
  } else if (buttonValue === ".") {
    event.preventDefault(); 
    handleDecimalInput();
  } else if (buttonValue === "*") { 
    handleOperatorInput("×");
  } else if (buttonValue === "/") { 
    handleOperatorInput("÷");
  } else {
    handleInput(buttonValue);
  }
}

// Handling inputs from both keyboard and mouse
function handleInput(input) {
  if (isNumber(input)) {
    handleNumberInput(input);
  } else if (isOperator(input)) {
    handleOperatorInput(input);
  }
}

// Handling inputs
function handleNumberInput(input) {
  expression += input;
  displayExpression();
}

function handleOperatorInput(input) {
  const lastChar = expression[expression.length - 1];
  if (["÷", "×", "+"].includes(lastChar)) {
    expression = expression.slice(0, -1); 
  }
  expression += input;
  displayExpression();
}



function handleDecimalInput(input) {
  expression += ".";
  displayExpression(input);
}



// Evaluating the expression

function evaluateExpression() {
  let result;
  try {
    result = Function(`'use strict'; return ${expression.replace(/--/g, '+').replace(/×/g, '*').replace(/÷/g, '/')}`)();
    displayResult(result);
  } catch (error) {
    displayError();
  }
}


// Validating inputs
function isOperator(input) {
  return input === "+" || input === "-" || input === "÷" || input === "×";
}

function isNumber(input) {
  return ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(input);
}

// Display
function displayExpression() {
  const truncatedExpression = expression.slice(0, 15);
  screenElement.textContent = truncatedExpression;
}


function displayResult(result) {
  const decimalPlaces = (result.toString().split(".")[1] || "").length;
  let roundedResult = result;

  if (decimalPlaces > 15) {
    roundedResult = result.toFixed(9);
  }

  if (result.toString().length > 15) {
    roundedResult = result.toExponential(9);
  }

  if (Number.isInteger(result)) {
    screenElement.textContent = roundedResult;
  } else {
    screenElement.textContent = roundedResult;
  }

  expression = roundedResult;
}


function displayError() {
  screenElement.textContent = "Error";
  expression = "";
}

function clearDisplay() {
  screenElement.textContent = "";
  expression = "";
}
