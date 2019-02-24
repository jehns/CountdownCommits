import React, { Component } from 'react';
import linearRegressionWrapper from './scripts/linearRegression';
import { Statistic, Container, Header, Button } from 'semantic-ui-react';
import axios from 'axios';

// global variable -> creates function for finding linear regression
const linearRegressionCalc = linearRegressionWrapper()


class App extends Component {
  constructor() {
    super()
    this.state={
      data: [],
      timeLeft: 0,
      linearRegressionCalc: ()=>{}
    }
    this.handleCommitButtonClick = this.handleCommitButtonClick.bind(this)
  }

  async componentDidMount() {
    const {data} = await axios.get('https://api.staging.coord.co/codechallenge/commits')
    let xValues = new Array(data.length).fill(1).map((num, i) => i)
    let yValues = data.reverse()
    console.log(yValues, xValues)


    // calculate linear regression with api data
    let linearRegressionResult = linearRegressionCalc(xValues, yValues)

    console.log('result',linearRegressionResult)

    // Find the remaining time from current commit to the 2000th commit
    let remainingTimeInSeconds = (linearRegressionResult.m*(2000) + linearRegressionResult.b) - (linearRegressionResult.m*(xValues.length) + linearRegressionResult.b)

    // set state with fetched data and remaining time
    this.setState({
      data: yValues,
      timeLeft: remainingTimeInSeconds
    })

    // call setInterval to update the estimated remaining time on state
    let timer = setInterval(() => {
      this.setState({
        timeLeft: this.state.timeLeft - 1
      })
      if (this.state.timeLeft < 1) clearInterval(timer);
    }, 1000);

  }

  handleCommitButtonClick() {
    let date = Math.round(new Date().getTime()/1000);
    let linearRegressionResult = linearRegressionCalc([this.state.data.length], [date]);

    // Find the remaining time from current commit to the 2000th commit
    let remainingTimeInSeconds = (linearRegressionResult.m*(2000) + linearRegressionResult.b) - (linearRegressionResult.m*(this.state.data.length) + linearRegressionResult.b)

    // add date to data
    let updatedData = this.state.data
    updatedData.push(date)

    // set state with fetched data and remaining time
    this.setState({
      data: updatedData,
      timeLeft: remainingTimeInSeconds,
    })
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
        <Button inverted color="teal" onClick={this.handleCommitButtonClick}>Add a Commit</Button>
      </Container>
      </Container>
      </div>
    );
  }
}

export default App;
