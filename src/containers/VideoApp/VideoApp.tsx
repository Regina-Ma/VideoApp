import React, { Component } from "react";
import Search from "../Search/Search";
import Video from "../Video/Video";
import Backdrop from "../../components/Backdrop/Backdrop";

import { VideoProps, VideoResponse } from "../../types/types";

import classes from "./VideoApp.module.scss";

interface Props {}
interface State {
  query: string;
  quantities: Array<number>;
  selectedQuantity: number;
  durations: Array<number>;
  selectedDuration: number;
  currentUrlindex: number;
  isLoaded: boolean;
  isLoading: boolean;
  results: number;
  videoObjects: Array<VideoProps>;
}
class VideoApp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: "",
      quantities: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedQuantity: 1,
      durations: [10, 20, 30],
      selectedDuration: 10,
      currentUrlindex: 0,
      isLoading: false,
      isLoaded: false,
      results: 0,
      videoObjects: [] as Array<VideoProps>,
    };
    this.handleQueryInput = this.handleQueryInput.bind(this);
    this.handleQuantitySelection = this.handleQuantitySelection.bind(this);
    this.handleDurationSelection = this.handleDurationSelection.bind(this);
    this.searchVideoHandler = this.searchVideoHandler.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
  }

  handleQueryInput(value: string) {
    this.setState({ query: value });
  }
  handleQuantitySelection(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedQuantity: +event.target.value });
  }
  handleDurationSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedDuration: +event.target.value });
  }
  searchVideoHandler = () => {
    const key = process.env.REACT_APP_PEXELS_KEY;
    this.setState({
      isLoading: true,
    });
    const params = new URLSearchParams({
      query: this.state.query,
      per_page: this.state.selectedQuantity.toString(),
    }).toString();
    if (key) {
      fetch(
        `https://api.pexels.com/videos/search?orientation=landscape&${params}`,
        {
          method: "get",
          headers: new Headers({
            Authorization: key, // nepamirsti git ignore
          }),
        }
      )
        .then((res) => res.json())
        .then((res: VideoResponse) => {
          console.log("api response");
          console.log(res);
          this.setState({
            isLoaded: true,
            results: res.total_results,
            videoObjects: res.videos,
            selectedQuantity:
              res.total_results < this.state.selectedQuantity
                ? res.total_results
                : this.state.selectedQuantity,
          });
        })
        .catch(); // TODO: pabaigti
    }
  };
  handleEnded = () => {
    const nextUrlindex =
      (this.state.currentUrlindex + 1) % this.state.videoObjects.length;
    this.setState({ currentUrlindex: nextUrlindex });
  };

  componentDidUpdate() {
    const video = document.querySelector("video") as HTMLVideoElement;
    if (video) {
      video.ontimeupdate = () => {
        if (video.currentTime >= this.state.selectedDuration) {
          this.handleEnded();
        }
      };
    }
  }
  render() {
    return (
      <div className={classes.Main}>
        <h1 className={classes.Heading}>
          {" "}
          The Last Video App You'll Ever Need
        </h1>
        <div className={classes.Content}>
          <Search
            query={this.state.query}
            enterQuery={this.handleQueryInput}
            selectedQuantity={this.state.selectedQuantity}
            selectQuantity={this.handleQuantitySelection}
            quantities={this.state.quantities}
            durations={this.state.durations}
            selectedDuration={this.state.selectedDuration}
            selectDuration={this.handleDurationSelection}
            searchVideo={this.searchVideoHandler}
          />
          {/* <div className={classes.VideoContainer}> */}
          {this.state.isLoaded ? (
            <>
              <Video
                currentVideo={
                  this.state.videoObjects[this.state.currentUrlindex]
                }
                duration={this.state.selectedDuration}
                videoEnded={this.handleEnded}
              />
            </>
          ) : (
            <Backdrop isLoading={this.state.isLoading} />
          )}
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default VideoApp;
