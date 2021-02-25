import React, { Component } from "react";

import classes from "./Search.module.scss";

interface Props {
  query: string;
  enterQuery: any;
  selectedQuantity: number;
  selectQuantity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  quantities: Array<number>;
  durations: Array<number>;
  selectedDuration: number;
  selectDuration: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchVideo: () => void;
}

class Search extends Component<Props> {
  render() {
    return (
      <div className={classes.Search}>
        <div className={classes.Query}>
          <input
            type="text"
            value={this.props.query}
            onChange={(e) => this.props.enterQuery(e.target.value)}
            placeholder="Video search term"
          />
        </div>
        <div className={classes.Quantity}>
          <label htmlFor="">Number of videos to play</label>
          <select
            name=""
            id=""
            value={this.props.selectedQuantity}
            onChange={this.props.selectQuantity}
          >
            {this.props.quantities.map((quantity) => {
              return (
                <option key={quantity} value={quantity}>
                  {quantity}
                </option>
              );
            })}
          </select>
        </div>
        <div className={classes.Duration}>
          <label htmlFor="">Each video play up to</label>
          <select
            name=""
            id=""
            value={this.props.selectedDuration}
            onChange={this.props.selectDuration}
          >
            {this.props.durations.map((duration) => {
              return (
                <option key={duration} value={duration}>
                  {duration} seconds
                </option>
              );
            })}
          </select>
        </div>
        <button onClick={this.props.searchVideo}>Search</button>
      </div>
    );
  }
}

export default Search;
