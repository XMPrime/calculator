export const UPDATE = "UPDATE";
export const CLEAR = "CLEAR";

export const update = (buttonValue, currentFormula, currentOutput) => {
  console.log(buttonValue, currentFormula, currentOutput);
  let updateFormula = currentFormula;
  let updateOutput = currentOutput;
  let operators = ["/", "x", "+", "-"];

  const operatorFunctions = {
    "+": (a, b) => {
      return a + b;
    },
    "-": (a, b) => {
      return a - b;
    },
    x: (a, b) => {
      return a * b;
    },
    "/": (a, b) => {
      return a / b;
    }
  };

  const calculate = currentFormula => {
    let formulaCleaned = currentFormula.join("").split(/(\+|-|x|\/)/g);

    let calculation = 0;
    let operator = "+";

    for (let i = 0; i < formulaCleaned.length; i++) {
      if (operators.includes(formulaCleaned[i])) {
        operator = formulaCleaned[i];
      } else {
        calculation = operatorFunctions[operator](calculation, Number(formulaCleaned[i]));
      }
    }

    if (!isNaN(calculation)) {
      return calculation.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 10
      });
    }
    return "ERROR";
  };

  //SPECIAL CASES:
  //Two operators in a row
  if (operators.includes(buttonValue) && operators.includes(currentFormula[currentFormula.length - 1])) {
    currentFormula[currentFormula.length - 1] = buttonValue;
    updateOutput = [buttonValue];
  }
  //Two decimals in a row
  else if (buttonValue === "." && currentOutput.includes(".")) {
    updateOutput = [...currentOutput];
  }
  //Gets rid of the starting "0" and also eliminate two "=" in a row
  else if (currentFormula[0] === 0 && buttonValue !== "=") {
    updateFormula = [buttonValue];
    updateOutput = [buttonValue];
  }
  //When the 2nd to last item in the currentFormula is an "="
  else if (currentFormula[currentFormula.length - 2] === "=") {
    //Continuing the formula
    if (operators.includes(buttonValue)) {
      updateFormula = [currentOutput, buttonValue];
      updateOutput = [buttonValue];
    }
    //Starting a new Formula
    if (typeof buttonValue === "number") {
      updateFormula = [buttonValue];
      updateOutput = [buttonValue];
    }
  } else if (buttonValue === "=") {
    updateFormula = [...currentFormula, buttonValue, calculate(currentFormula)];
    updateOutput = [calculate(currentFormula)];
  } else {
    updateFormula = [...currentFormula, buttonValue];
    updateOutput = [...currentOutput, buttonValue];
  }

  return {
    type: UPDATE,
    formula: updateFormula,
    output: updateOutput
  };
};

export const clear = () => ({ type: CLEAR });
