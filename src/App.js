import React, { Component } from 'react';
import linearRegressionWrapper from './scripts/linearRegression';


class App extends Component {
  constructor() {
    super()
    this.state={
      data: [],
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  async componentDidMount() {
    // const {data} = await axios.get('https://api.staging.coord.co/codechallenge/commits')
    // let xValues = new Array(data.length).map((num, i) => i)



  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
