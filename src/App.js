import React, { Component } from 'react';
import linearRegressionWrapper from './functions/linearRegression';
import { Statistic, Container, Header, Button, Modal, Grid } from 'semantic-ui-react';
import axios from 'axios';

// global variable -> creates function for finding linear regression
const linearRegressionCalc = linearRegressionWrapper()

class App extends Component {
  constructor() {
    super()
    this.state={
      data: [],
      timeLeft: 0,
      commitButtonDisabled: false,
      toggleModal: false
    }
    this.handleCommitButtonClick = this.handleCommitButtonClick.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }

  async componentDidMount() {
    try {
      // fetch commit data from API.
      const { data } = await axios.get('https://api.staging.coord.co/codechallenge/commits');

      // initialize data for linear regression calculation
      let xValues = new Array(data.length).fill(1).map((num, i) => i);
      let yValues = data.reverse();

      // calculate linear regression of api data. returns m & b from equation y = x * m + b
      let linearRegressionResult = linearRegressionCalc(xValues, yValues);

      // find the remaining time from current commit to the 2000th commit
      let remainingTimeInSeconds = (linearRegressionResult.m * (2000) + linearRegressionResult.b) - (linearRegressionResult.m * (xValues.length) + linearRegressionResult.b);

      // set state with fetched data and remaining time
      this.setState({
        data: yValues,
        timeLeft: remainingTimeInSeconds
      });

      // use setInterval to update the estimated remaining time on state every second
      let timer = setInterval(() => {
        if (this.state.timeLeft < 1) {
          clearInterval(timer)
        } else {
          this.setState({
            timeLeft: this.state.timeLeft - 1
          })
        }
      }, 1000);

    } catch (err) {
      console.log(err);
    }

  }

  handleCommitButtonClick() {
    // get current UNIX timestamp and round to nearest second
    let newDate = Math.round(new Date().getTime() / 1000);

    // calculate linear regression again. returns m & b from equation y = x * m + b
    let linearRegressionResult = linearRegressionCalc([this.state.data.length], [newDate]);

    // find the remaining time from current commit to the 2000th commit
    let remainingTimeInSeconds = (linearRegressionResult.m * (2000) + linearRegressionResult.b) - (linearRegressionResult.m * (this.state.data.length + 1) + linearRegressionResult.b);

    // add date to data
    let updatedData = this.state.data;
    updatedData.push(newDate);

    // set state with fetched data and remaining time. if time is up disable button and render modal.
    if (!remainingTimeInSeconds) {
      this.setState({
        data: updatedData,
        timeLeft: 0,
        commitButtonDisabled: true,
        toggleModal: true
      });
    } else {
      this.setState({
        data: updatedData,
        timeLeft: remainingTimeInSeconds
      });
    }
  }

  handleModalClose() {
    this.setState({
      toggleModal: false
    });
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

      <Modal open={this.state.toggleModal} centered basic>
        <Modal.Content>
          <Grid container textAlign="center">
            <Grid.Row>
              <Header inverted as="h1" color="yellow">2000th Commit Made!</Header>
            </Grid.Row>
            <Grid.Row>
              <Button onClick={this.handleModalClose} color="red">Close Window</Button>
            </Grid.Row>
          </Grid>
        </Modal.Content>
      </Modal>

      <Container textAlign="center" style={{padding: 30}}>
        <Statistic color="red" inverted style={{padding: 5}}>
          <Statistic.Value>{days}</Statistic.Value>
          <Statistic.Label>Days</Statistic.Label>
        </Statistic>
        <Statistic color='red' inverted style={{padding: 5}}>
          <Statistic.Value>{hours}</Statistic.Value>
          <Statistic.Label>Hours</Statistic.Label>
        </Statistic>
        <Statistic color='red' inverted style={{padding: 5}}>
          <Statistic.Value>{minutes}</Statistic.Value>
          <Statistic.Label>Minutes</Statistic.Label>
        </Statistic>
        <Statistic color='red' inverted style={{padding: 5}}>
          <Statistic.Value>{seconds}</Statistic.Value>
          <Statistic.Label>Seconds</Statistic.Label>
        </Statistic>
      </Container>

      <Container textAlign="center" style={{padding: 30}}>
        <Button inverted color="teal" onClick={this.handleCommitButtonClick} size="large" disabled={this.state.commitButtonDisabled}>Add a Commit</Button>
      </Container>
      </Container>
      </div>
    );
  }
}

export default App;
