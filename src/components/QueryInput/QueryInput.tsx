import React, { Component } from "react";
// import classes from "./QueryInput.scss";

interface Props {
  query: string;
}
class QueryInput extends Component<Props> {
  //   <div className={classes.QueryInput}>
  render() {
    return (
      <div>
        <input type="text" value={this.props.query} />
        iveskite video uzklausa
      </div>
    );
  }
}
export default QueryInput;
