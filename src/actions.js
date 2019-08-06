export const UPDATE = "UPDATE";
export const CLEAR = "CLEAR";

export const update = (buttonValue, currentFormula, currentOutput) => {
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

  // 1) number => number
  // 2) operator => number
  // 3) number => operator
  // 4) "="
  const calculate = currentFormula => {
    let formulaCleaned = currentFormula.join("").split(/(\+|-|x|\/)/g);

    let calculation = 0;
    let operator = "+";

    for (let i = 0; i < formulaCleaned.length; i++) {
      if (operators.includes(formulaCleaned[i])) {
        operator = formulaCleaned[i];
        console.log(operator);
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

  // if (buttonValue === "=") {
  //   let formulaCleaned = currentFormula.join("").split(/(\+|-|x|\/)/g);

  //   let calculation = 0;
  //   let operator = "+";

  //   for (let i = 0; i < formulaCleaned.length; i++) {
  //     let item = formulaCleaned[i];
  //     let isOperator = /(\+|-|x|\/)/.test(item);

  //     if (isOperator) {
  //       operator = item;
  //     } else {
  //       calculation = operatorFunctions[operator](calculation, Number(item));
  //     }
  //   }

  //   if (!isNaN(calculation)) {
  //     updateFormula = [...currentFormula, buttonValue, calculation];
  //     updateOutput = [calculation];
  //     console.log(typeof currentFormula[currentFormula.length - 1] === "number");
  //   }
  // } else if (buttonValue === ".") {
  //   if (!currentOutput.includes(".")) {
  //     updateFormula = [...currentFormula, buttonValue];
  //     updateOutput = [...currentOutput, buttonValue];
  //   }
  // } else if (
  //   //CURRENT BUG
  //   typeof currentFormula[currentFormula.length - 1] === "number" ||
  //   currentFormula[currentFormula.length - 1] === "."
  // ) {
  //   if (currentFormula[currentFormula.length - 1] === 0) {
  //     updateFormula = [buttonValue];
  //     updateOutput = [buttonValue];
  //   } else if (digits.includes(buttonValue)) {
  //     updateFormula = [...currentFormula, buttonValue];
  //     updateOutput = [...currentOutput, buttonValue];
  //   } else if (operators.includes(buttonValue)) {
  //     updateFormula = [...currentFormula, buttonValue];
  //     updateOutput = [buttonValue];
  //   }
  // } else if (operators.includes(currentFormula[currentFormula.length - 1])) {
  //   if (digits.includes(buttonValue)) {
  //     updateFormula = [...currentFormula, buttonValue];
  //     updateOutput = [buttonValue];
  //   } else if (currentFormula.includes('=')) {
  //     updateFormula = [...currentFormula, buttonValue];
  //     updateOutput = [buttonValue];
  //   }
  //   else if (operators.includes(buttonValue)) {
  //     currentFormula[currentFormula.length - 1] = buttonValue;
  //     updateOutput = [buttonValue];
  //   }
  // }
  // console.log(currentFormula);
  return {
    type: UPDATE,
    formula: updateFormula,
    output: updateOutput
  };
};

export const clear = () => ({ type: CLEAR });
