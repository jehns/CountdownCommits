import React, { Component } from 'react';
import linearRegressionWrapper from './scripts/linearRegression';


class App extends Component {
  constructor() {
    super()
    this.state={
      data: [],
      timeLeft: 0
    }
  }

  async componentDidMount() {
    // const {data} = await axios.get('https://api.staging.coord.co/codechallenge/commits')
    // let xValues = new Array(data.length).map((num, i) => i)


    // ************ test data **************
    let xValues = [0,1,2,3,4]
    let yValues = [3,7,11,39,44]

    // create function for finding linear regression
    const linearRegressionCalc = linearRegressionWrapper()

    // calculate linear regression with api data
    let linearRegressionResult = linearRegressionCalc(xValues, yValues)

    console.log('linear reg', linearRegressionResult)

    // Find the remaining time from current commit to the 2000th commit
    let remainingTimeInSeconds = (linearRegressionResult.m*(2000) + linearRegressionResult.b) - (linearRegressionResult.m*(xValues.length) + linearRegressionResult.b)

    // set state with fetched data and remaining time
    this.setState({
      data: [],
      timeLeft: remainingTimeInSeconds
    })

    // call setInterval on window object to update the estimated remaining time on state
    setInterval(() => {
      this.setState({
        data: [],
        timeLeft: this.state.timeLeft - 1
      })
    }, 1000);

  }

  render() {
    return (
      <div className="App">
        <ul>
          <li>{this.state.timeLeft}</li>
        </ul>
      </div>
    );
  }
}

export default App;
