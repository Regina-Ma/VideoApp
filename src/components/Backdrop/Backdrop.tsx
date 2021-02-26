import React from "react";
import Spinner from "../Spinner/Spinner";

import classes from "./Backdrop.module.scss";

export interface Props {
  isLoading: boolean;
}
export default class Backdrop extends React.Component<Props> {
  render() {
    return (
      <div className={classes.Backdrop} data-testid="backdrop">
        {this.props.isLoading ? (
          <Spinner />
        ) : (
          <p data-testid="paragraph">Videos will play here</p>
        )}
      </div>
    );
  }
}
