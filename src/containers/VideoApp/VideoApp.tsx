import React, { Component } from "react";
import Swal from "sweetalert2";

import Search from "../Search/Search";
import Video from "../Video/Video";
import Backdrop from "../../components/Backdrop/Backdrop";

import { VideoProps, VideoResponse } from "../../types/types";

import classes from "./VideoApp.module.scss";

interface Props {}
interface State {
  selectedQuantity: number;
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
      selectedQuantity: 1,
      selectedDuration: 10,
      currentUrlindex: 0,
      isLoading: false,
      isLoaded: false,
      results: 0,
      videoObjects: [] as Array<VideoProps>,
    };
    this.handleQuantitySelection = this.handleQuantitySelection.bind(this);
    this.handleDurationSelection = this.handleDurationSelection.bind(this);
    this.searchVideoHandler = this.searchVideoHandler.bind(this);
    this.handleEnded = this.handleEnded.bind(this);
  }

  handleQuantitySelection(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedQuantity: +event.target.value });
  }
  handleDurationSelection(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedDuration: +event.target.value });
  }
  searchVideoHandler = (query: string) => {
    const key = process.env.REACT_APP_PEXELS_KEY;
    this.setState({ isLoading: true, currentUrlindex: 0 });

    const params = new URLSearchParams({
      query: query,
      per_page: this.state.selectedQuantity.toString(),
    }).toString();

    if (key) {
      fetch(
        `https://api.pexels.com/videos/search?orientation=landscape&${params}`,
        {
          method: "get",
          headers: new Headers({ Authorization: key }),
        }
      )
        .then((res) => {
          if (!res.ok) throw res;
          return res.json();
        })
        .then((res: VideoResponse) => {
          if (res.total_results) {
            this.setState({
              isLoaded: true,
              results: res.total_results,
              videoObjects: res.videos,
              selectedQuantity:
                res.total_results < this.state.selectedQuantity
                  ? res.total_results
                  : this.state.selectedQuantity,
            });
          } else {
            this.setState({ isLoading: false });
            Swal.fire("Sorry, no videos found by this term");
          }
        })
        .catch((error: Response) => {
          this.setState({ isLoading: false });
          error.json().then((body) => {
            body.code
              ? Swal.fire(body.code)
              : Swal.fire("Ups, something went wrong");
          });
        });
    } else {
      Swal.fire("Ups, something went wrong");
    }
  };
  handleEnded = (video: HTMLVideoElement | undefined) => {
    if (this.state.selectedQuantity === 1 && video !== undefined) {
      video.play();
    } else {
      const nextUrlindex =
        (this.state.currentUrlindex + 1) % this.state.videoObjects.length;
      this.setState({ currentUrlindex: nextUrlindex });
    }
  };

  componentDidUpdate() {
    const video = document.querySelector("video") as HTMLVideoElement;
    if (video) {
      video.ontimeupdate = () => {
        if (
          video.currentTime >= this.state.selectedDuration ||
          video.currentTime >= video.duration
        ) {
          this.state.selectedQuantity === 1
            ? this.handleEnded(video)
            : this.handleEnded(undefined);
        }
      };
      video.play();
    }
  }

  render() {
    return (
      <div className={classes.Main}>
        <h1 className={classes.Heading}>The Video App</h1>
        <div className={classes.Content}>
          <Search
            selectedQuantity={this.state.selectedQuantity}
            selectQuantity={this.handleQuantitySelection}
            selectedDuration={this.state.selectedDuration}
            selectDuration={this.handleDurationSelection}
            searchVideo={this.searchVideoHandler}
          />
          {this.state.isLoaded ? (
            <Video
              currentVideo={this.state.videoObjects[this.state.currentUrlindex]}
              duration={this.state.selectedDuration}
              videoEnded={this.handleEnded}
            />
          ) : (
            <Backdrop isLoading={this.state.isLoading} />
          )}
        </div>
      </div>
    );
  }
}

export default VideoApp;
