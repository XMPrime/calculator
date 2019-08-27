import React from "react";
import { connect } from "react-redux";
import { update, clear } from "./actions";
import "./App.css";
import "bulma/css/bulma.css";

//hello
//sup
//jane
//++++
//jason was here

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
      height: "100px",
      width: "50px"
    };

    return (
      <div className='App'>
        {/* <div className='block'>
          <div className='rows'>
            <div className='row is-1'>
              <h3 className='formula'>{this.props.formula}</h3>
            </div>
            <div className='row is-1'>
              <h3 className='output'>{this.props.output}</h3>
            </div>
          </div>
          <div className='row is-10'>
            <div className='columns'>
              <div className='column is-1'>
                <button className='button' value={1} onClick={() => this.props.update(1, this.props.formula, this.props.output)}>
                  {1}
                </button>
              </div>
              <div className='column is-1'>
                <button className='button' value={2} onClick={() => this.props.update(2, this.props.formula, this.props.output)}>
                  {2}
                </button>
              </div>

              <button className='button' value={3} onClick={() => this.props.update(3, this.props.formula, this.props.output)}>
                {3}
              </button>
              <button className='button' value={3} onClick={() => this.props.update(4, this.props.formula, this.props.output)}>
                {3}
              </button>
              <button className='button' value={5} onClick={() => this.props.update(5, this.props.formula, this.props.output)}>
                {5}
              </button>
              <button className='button' value={6} onClick={() => this.props.update(6, this.props.formula, this.props.output)}>
                {6}
              </button>
              <button className='button' value={7} onClick={() => this.props.update(7, this.props.formula, this.props.output)}>
                {7}
              </button>
              <button className='button' value={8} onClick={() => this.props.update(8, this.props.formula, this.props.output)}>
                {8}
              </button>
              <button className='button' value={9} onClick={() => this.props.update(9, this.props.formula, this.props.output)}>
                {9}
              </button>
              <button className='button' value={"+"} onClick={() => this.props.update("+", this.props.formula, this.props.output)}>
                {"+"}
              </button>
              <button className='button' value={"-"} onClick={() => this.props.update("-", this.props.formula, this.props.output)}>
                {"-"}
              </button>
              <button className='button' value={"x"} onClick={() => this.props.update("x", this.props.formula, this.props.output)}>
                {"x"}
              </button>
              <button className='button' value={"/"} onClick={() => this.props.update("/", this.props.formula, this.props.output)}>
                {"/"}
              </button>
              <button className='button' style={wideStyle} value={0} onClick={() => this.update(0, this.props.formula, this.props.output)}>
                {0}
              </button>
              <button className='button' style={wideStyle} value={"AC"} onClick={this.clear}>
                {"AC"}
              </button>
              <button className='button' style={tallStyle} value={"="} onClick={() => this.update("=", this.props.formula, this.props.output)}>
                {"="}
              </button>
            </div>
          </div>
          <br />
          <div className='block'>
            <div className='column is-2'> */}

        <div className='container'>
          <div className='spacing' />
          <div className='display'>
            <h3 className='formula'>{this.props.formula}</h3>
            <h3 className='output'>{this.props.output}</h3>
          </div>
          <div className='spacing' />

          {buttonList.map(button => {
            if (button === "AC") {
              return (
                <div className='button' style={wideStyle} value={button} onClick={this.clear}>
                  {button}
                </div>
              );
            } else if (button === 0) {
              return (
                <div
                  className='button bottomRow'
                  style={wideStyle}
                  value={button}
                  onClick={() => this.props.update(button, this.props.formula, this.props.output)}
                >
                  {button}
                </div>
              );
            } else if (button === ".") {
              return (
                <div className='button bottomRow' value={button} onClick={() => this.props.update(button, this.props.formula, this.props.output)}>
                  {button}
                </div>
              );
            } else if (button === "=") {
              return (
                <div className='button' style={tallStyle} value={button} onClick={() => this.props.update(button, this.props.formula, this.props.output)}>
                  {button}
                </div>
              );
            } else {
              return (
                <div className='button' value={button} onClick={() => this.props.update(button, this.props.formula, this.props.output)}>
                  {button}
                </div>
              );
            }
          })}
        </div>
      </div>
      //   </div>
      // </div>
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
