import React, { Component } from 'react';
import linearRegressionWrapper from './scripts/linearRegression';
import { Statistic, Container, Header, Button } from 'semantic-ui-react';

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

    // Find the remaining time from current commit to the 2000th commit
    let remainingTimeInSeconds = (linearRegressionResult.m*(2000) + linearRegressionResult.b) - (linearRegressionResult.m*(xValues.length) + linearRegressionResult.b)

    // set state with fetched data and remaining time
    this.setState({
      data: [],
      timeLeft: remainingTimeInSeconds
    })

    // call setInterval on window object to update the estimated remaining time on state
    setInterval(() => {
      if (this.state.timeLeft < 1) clearInterval();
      this.setState({
        data: [],
        timeLeft: this.state.timeLeft - 1
      })
    }, 1000);

  }

  render() {
    let days = Math.floor(this.state.timeLeft / (60 * 60 * 24));
    let hours = Math.floor((this.state.timeLeft % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((this.state.timeLeft % (60 * 60)) / (60));
    let seconds = Math.floor((this.state.timeLeft % (60)));

    return (
      <div className="App">
      <Container style={{ padding: 200}}>
      <Header inverted color="teal" size="huge" textAlign="center">Estimated Time Until the 2000th Commit</Header>

      <Container textAlign="center" style={{padding: 30}}>
        <Statistic color="red" inverted>
          <Statistic.Value>{days}</Statistic.Value>
          <Statistic.Label>Days</Statistic.Label>
        </Statistic>
        <Statistic color='red' inverted>
          <Statistic.Value>{hours}</Statistic.Value>
          <Statistic.Label>Hours</Statistic.Label>
        </Statistic>
        <Statistic color='red' inverted>
          <Statistic.Value>{minutes}</Statistic.Value>
          <Statistic.Label>Minutes</Statistic.Label>
        </Statistic>
        <Statistic color='red' inverted>
          <Statistic.Value>{seconds}</Statistic.Value>
          <Statistic.Label>seconds</Statistic.Label>
        </Statistic>
      </Container>

      <Container textAlign="center" style={{padding: 30}}>
        <Button inverted color="teal">Add a Commit</Button>
      </Container>
      </Container>
      </div>
    );
  }
}

export default App;
