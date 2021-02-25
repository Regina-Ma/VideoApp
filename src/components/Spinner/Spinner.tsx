import React from "react";
import Loader from "react-loader-spinner";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import classes from "../Backdrop/Backdrop.module.scss";

export default class Spinner extends React.Component {
  render() {
    return (
      <div className={classes.FallBackContainer}>
        <Loader type="TailSpin" color="#e1b12c" height={250} width={250} />
      </div>
    );
  }
}
