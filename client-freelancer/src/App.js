import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Homepage from "./component/Homepage";

class App extends Component {
  render() {
    return (
      <div className="App">
      <BrowserRouter>
          <Homepage/>
      </BrowserRouter>

      </div>
    );
  }
}
export default App;
