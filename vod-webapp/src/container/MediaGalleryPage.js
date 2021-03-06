import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { searchMediaAction, selectVideoAction } from "../actions/mediaActions";

import VideoCarousel from "../components/VideoCarousel";

// MediaGalleryPage Component.
class MediaGalleryPage extends Component {
  constructor() {
    super();
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.historyVideos = localStorage.getItem("historyVideos")
      ? JSON.parse(localStorage.getItem("historyVideos"))
      : [];
  }

  // Dispatches *searchMediaAction*  immediately after initial rendering.
  // Note that we are using the dispatch method from the store to execute this task, courtesy of react-redux.
  componentDidMount() {
    this.props.dispatch(searchMediaAction());
  }

  handleSelectVideo(selectedVideo) {
    //console.log(selectedVideo);

    var elem = document.getElementById(selectedVideo.id);

    this.props.dispatch(selectVideoAction(selectedVideo));

    this.handleFullScreenVideo(selectedVideo, elem);
  }

  handleKeyPress(selectedVideo, i, event) {
    var elem = document.getElementById(selectedVideo.id);
    var videoCarousel = document.getElementById("video-thumbnail");

    // Reset video.
    elem.pause();
    elem.currentTime = 0;
    elem.load();

    if (event.keyCode === 37) {
      if (i > 0) {
        elem = videoCarousel.childNodes[i - 1];
        elem.firstElementChild.focus();
      }
    } else if (event.keyCode === 39) {
      if (i < videoCarousel.childNodes.length - 1) {
        elem = videoCarousel.childNodes[i + 1];
        elem.firstElementChild.focus();
      }
    }

    if (event.key === "Enter") {
      this.handleFullScreenVideo(selectedVideo, elem);
    }
  }

  handleFullScreenVideo(selectVideo, elem) {
    //var elem = document.getElementById(selectVideo.id);

    // Reset video.
    elem.pause();
    elem.currentTime = 0;
    elem.load();

    if (elem != null) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }

      // Show loading animation.
      var playPromise = elem.play();

      if (playPromise !== undefined) {
        var exists = false;
        for (var i = 0; i < this.historyVideos.length; i++) {
          if (this.historyVideos[i].id === selectVideo.id) {
            exists = true;
            this.historyVideos[i].countViews =
              this.historyVideos[i].countViews + 1;
            localStorage.setItem(
              "historyVideos",
              JSON.stringify(this.historyVideos)
            );
            break;
          }
        }

        if (exists === false) {
          selectVideo.countViews = 1;
          this.historyVideos.unshift(selectVideo);
          localStorage.setItem(
            "historyVideos",
            JSON.stringify(this.historyVideos)
          );
        }

        playPromise
          .then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            console.log(error);
          });
      }

      // Video Ended.
      document
        .getElementById(selectVideo.id)
        .addEventListener("ended", myHandler, false);
      function myHandler(e) {
        elem.webkitExitFullScreen();
      }

      document.addEventListener("webkitfullscreenchange", exitHandler, false);
      document.addEventListener("mozfullscreenchange", exitHandler, false);
      document.addEventListener("fullscreenchange", exitHandler, false);
      document.addEventListener("MSFullscreenChange", exitHandler, false);

      function exitHandler() {
        if (document.webkitIsFullScreen === false) {
          elem.pause();
          elem.currentTime = 0;
          elem.load();
        } else if (document.mozFullScreen === false) {
          elem.pause();
          elem.currentTime = 0;
          elem.load();
        } else if (document.msFullscreenElement === false) {
          elem.pause();
          elem.currentTime = 0;
          elem.load();
        }
      }
    }
  }

  render() {
    const { videos, selectedVideo, historyVideos } = this.props;
    return (
      <div className="container center">
        <h2 align="left"> Popular Movies </h2>
        {videos && selectedVideo ? (
          <div>
            <div className="row">
              <VideoCarousel
                videos={videos}
                selectedVideo={selectedVideo}
                onHandleSelectVideo={this.handleSelectVideo}
                onHandleKeyPress={this.handleKeyPress}
              />
            </div>
          </div>
        ) : (
          "Loading content ...."
        )}
      </div>
    );
  }
}

MediaGalleryPage.propTypes = {
  videos: PropTypes.array,
  selectedVideo: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

/* Subscribe component to redux store and merge the state into component's props. */
const mapStateToProps = ({ images, videos }) => ({
  videos: videos[0],
  selectedVideo: videos.selectedVideo
});

/* Connect method from react-router connects the component with redux store. */
export default connect(mapStateToProps)(MediaGalleryPage);
