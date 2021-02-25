import React, { Component } from "react";
import VideoApp from "./containers/VideoApp/VideoApp";
import classes from "./App.module.scss";

class App extends Component {
  render() {
    return (
      <div>
        <VideoApp />
      </div>
    );
  }
}

export default App;
