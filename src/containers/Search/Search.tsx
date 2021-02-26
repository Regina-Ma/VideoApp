import React, { Component } from "react";
import Swal from "sweetalert2";

import classes from "./Search.module.scss";

export interface Props {
  selectedQuantity: number;
  selectedDuration: number;
  selectQuantity: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectDuration: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  searchVideo: (value: string) => void;
}
export interface State {
  query: string;
  quantities: Array<number>;
  durations: Array<number>;
}

class Search extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: "",
      quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      durations: [10, 20, 30],
    };
  }

  handleSubmit() {
    if (!this.state.query) {
      Swal.fire("Please fill in the query field");
    } else {
      this.props.searchVideo(this.state.query);
    }
  }
  render() {
    return (
      <div className={classes.Search} data-testid="search">
        <div className={classes.Query}>
          <input
            data-testid="query"
            type="text"
            required
            value={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
            placeholder="Video search term"
          />
        </div>
        <div className={classes.Quantity}>
          <label htmlFor="">Number of videos to play</label>
          <select
            data-testid="quantity"
            // name=""
            // id=""
            value={this.props.selectedQuantity}
            onChange={this.props.selectQuantity}
          >
            {this.state.quantities.map((quantity) => {
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
            data-testid="duration"
            // name=""
            // id=""
            value={this.props.selectedDuration}
            onChange={this.props.selectDuration}
          >
            {this.state.durations.map((duration) => {
              return (
                <option key={duration} value={duration}>
                  {duration} seconds
                </option>
              );
            })}
          </select>
        </div>
        <button type="submit" onClick={() => this.handleSubmit()}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
