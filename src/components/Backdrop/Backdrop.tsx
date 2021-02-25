import React from "react";
import Spinner from "../Spinner/Spinner";

import classes from "./Backdrop.module.scss";

interface Props {
  isLoading: boolean;
}
export default class Backdrop extends React.Component<Props> {
  render() {
    return (
      <div className={classes.Backdrop}>
        {this.props.isLoading ? <Spinner /> : <p>Videos will play here</p>}
      </div>
    );
  }
}
