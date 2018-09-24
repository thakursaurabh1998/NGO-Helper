import React, { Component } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Homepage from "./Components/Homepage";
import Header from "./Components/Header";
import BottomNav from "./Components/BottomNav";
import Validate from "./Components/Validate";

class App extends Component {
  state = {
    wall: false
  };

  addData = obj => {
    this.setState(obj);
    console.log(this.state);
  };

  wallChange = () => {
    this.setState({ wall: true });
  };

  render() {
    return (
      <div>
        <Header />
        <Route exact path="/" render={() => <Homepage />} />
        <Route exact path="/validate" render={() => <Validate />} />
        <div
          style={{
            position: "fixed",
            bottom: "0",
            zIndex: "200"
          }}
        >
          <BottomNav />
        </div>
      </div>
    );
  }
}

export default App;
