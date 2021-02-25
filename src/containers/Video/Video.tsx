import { Component } from "react";

import { VideoProps } from "../../types/types";

import classes from "./Video.module.scss";

interface Props {
  currentVideo: VideoProps;
  duration: number;
  videoEnded: (video: HTMLVideoElement | undefined) => void;
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
        <video
          poster={this.props.currentVideo.image}
          width={this.props.currentVideo.video_files[0].width}
          height={this.props.currentVideo.video_files[0].height}
          src={source}
          autoPlay
          muted
          onEnded={() => this.props.videoEnded}
        ></video>
        <p className={classes.Author}>{this.props.currentVideo.user.name}</p>
      </div>
    );
  }
}

export default Video;
