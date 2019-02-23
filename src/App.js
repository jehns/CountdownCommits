import React, { Component } from 'react';

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
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
