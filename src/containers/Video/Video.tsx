import React, { Component } from "react";

import { VideoProps } from "../../types/types";

import classes from "./Video.module.scss";

interface Props {
  currentVideo: VideoProps;
  duration: number;
  videoEnded: () => void;
}
class Video extends Component<Props> {
  render() {
    let source;
    if (this.props.currentVideo) {
      let maxDuration = this.props.duration;

      const curVideoDuration = this.props.currentVideo.duration;

      if (curVideoDuration < this.props.duration) {
        maxDuration = curVideoDuration;
      }

      source = `${this.props.currentVideo.video_files[0].link}#t=,${maxDuration}`;
    }
    return (
      <div className={classes.Video}>
        <p>{this.props.currentVideo.user.name}</p>
        <video
          id="shownVideo"
          poster={this.props.currentVideo.image}
          width={500}
          // width={this.props.currentVideo.video_files[0].width}
          // height={this.props.currentVideo.video_files[0].height}

          // src={`${this.props.currentVideo.video_files[0].link}#t=,${
          //   this.props.currentVideo.duration > this.props.duration
          //     ? this.props.duration
          //     : this.props.currentVideo.duration
          // }`}
          src={source}
          autoPlay
          muted
          onEnded={this.props.videoEnded}
        ></video>
      </div>
    );
  }
}

export default Video;
