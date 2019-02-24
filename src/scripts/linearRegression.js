const linearRegressionWrapper = () => {

  let previousValues = {
    hasBeenCalled: false
  }

  return (xValues, yValues) => {
    /*
    If this is not the first time the function has been called, use closed over values cached in previousValues
    */
    if (previousValues.hasBeenCalled) {
      /*
      init previous variables with new values
      */
      let x = xValues[0]
      let y = yValues[0]
      let sumX = previousValues.sumX + x;
      let sumY = previousValues.sumY + y;
      let sumXY = previousValues.sumXY + x*y;
      let sumXX = previousValues.sumXX + x*x;
      let count = previousValues.count + 1;

      /*
      Remember the values for next function call
      */
      previousValues.hasBeenCalled = true;
      previousValues.sumX = sumX;
      previousValues.sumY = sumY;
      previousValues.sumXY = sumXY;
      previousValues.sumXX = sumXX;
      previousValues.count = count;

      /*
      Calculate m and b for the formula: y = x * m + b
      */
      let m = (count*sumXY - sumX*sumY) / (count*sumXX - sumX*sumX);
      let b = (sumY/count) - (m*sumX)/count;

      return {m, b}

    }

    /*
    This is the first time the function has been called, initialize variables to zero
    */
    let x = 0;
    let y = 0;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let count = 0;

    if (xValues.length !== yValues.length) {
      throw new Error('The parameters xValues and yValues need to have same size!');
    }

    /*
    Calculate the sum for each of the parts necessary.
    */
    for (let i = 0; i < xValues.length; i++) {
      x = xValues[i];
      y = yValues[i];
      sumX += x;
      sumY += y;
      sumXX += x*x;
      sumXY += x*y;
      count++;
    }

    /*
    Remember the values for next function call
    */
    previousValues.hasBeenCalled = true;
    previousValues.sumX = sumX;
    previousValues.sumY = sumY;
    previousValues.sumXY = sumXY;
    previousValues.sumXX = sumXX;
    previousValues.count = count;

    /*
    Calculate m and b for the formula: y = x * m + b
    */
    let m = (count*sumXY - sumX*sumY) / (count*sumXX - sumX*sumX);
    let b = (sumY/count) - (m*sumX)/count;

    return {m, b}

  }

}

export default linearRegressionWrapper;


