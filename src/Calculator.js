import React from "react";
import { connect } from "react-redux";
import { update, clear } from "./actions";
import "./App.css";

//hello
//sup
//jane
//++++

const buttonList = ["AC", "/", "x", 7, 8, 9, "-", 4, 5, 6, "+", 1, 2, 3, "=", 0, "."];
//**** */
class Calculator extends React.Component {
  update = () => {
    this.props.update();
  };
  clear = () => {
    this.props.clear();
  };

  render() {
    const wideStyle = {
      position: "relative",
      height: "50px",
      width: "100px"
    };

    const tallStyle = {
      position: "absolute",
      height: "100px",
      width: "50px"
    };

    return (
      <div className='App'>
        <div className='container'>
          <h3 className='formula'>{this.props.formula}</h3>
          <h3 className='output'>{this.props.output}</h3>
          {buttonList.map(button => {
            if (button === "AC") {
              return (
                <button style={wideStyle} value={button} onClick={this.clear}>
                  {button}
                </button>
              );
            } else if (button === 0) {
              return (
                <button style={wideStyle} value={button} onClick={() => this.props.update(button, this.props.formula, this.props.output)}>
                  {button}
                </button>
              );
            } else if (button === "=") {
              return (
                <button style={tallStyle} value={button} onClick={() => this.props.update(button, this.props.formula, this.props.output)}>
                  {button}
                </button>
              );
            } else {
              return (
                <button value={button} onClick={() => this.props.update(button, this.props.formula, this.props.output)}>
                  {button}
                </button>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { formula: state.formula, output: state.output };
};

const mapDispatchToProps = {
  update,
  clear
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calculator);

// connect(mapStateToProps, mapDispatchToProps)
