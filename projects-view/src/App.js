import React, { Component } from 'react';
import './App.css';

import axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }
  componentDidMount() {
    axios.get('http://localhost:8888/projects')
    .then(response => {
      console.log("GET RESPONSE", response);
      this.setState({ projects: response});
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.projects}
      </div>
    );
  }
}



export default App;
