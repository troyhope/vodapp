import React from "react";
import PropTypes from "prop-types";

// First, we extract videos, onHandleSelectVideo, and selectedVideo
// from props and then render.
const VideoCarousel = ({
  videos,
  onHandleSelectVideo,
  selectedVideo,
  onHandleKeyPress
}) => (
  <div className="col-md-12">
    <div className="select-video" style={{ display: "none" }}>
      <div key={selectedVideo.id}>
        <h1 className="title">{selectedVideo.description}</h1>
        <video
          id="selectedVideo"
          preload="none"
          poster={selectedVideo.thumbnail}
          controls
          src={selectedVideo.mediaUrl}
          alt={selectedVideo.title}
        />
      </div>
    </div>
    <div id="video-thumbnail" className="video-thumbnail">
      {videos.map((video, i) => (
        <div
          key={i}
          onClick={onHandleSelectVideo.bind(this, video)}
          onKeyDown={onHandleKeyPress.bind(this, video, i)}
        >
          <video
            tabIndex="0"
            id={video.id}
            poster={video.thumbnail}
            src={video.mediaUrl}
            alt={video.description}
          />
          <div
            style={{
              width: "21.5rem",
              height: "7rem",
              margin: "0.5rem",
              backgroundColor: "#eee",
              display: "inline - block",
              borderRadius: "5px"
            }}
          >
            <p
              style={{
                fontSize: "12pt",
                paddingTop: "20px",
                border: "4px",
                borderColor: "red"
              }}
            >
              {video.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Define PropTypes.
VideoCarousel.propTypes = {
  videos: PropTypes.array.isRequired,
  selectedVideo: PropTypes.object.isRequired,
  onHandleSelectVideo: PropTypes.func.isRequired,
  onHandleKeyPress: PropTypes.func.isRequired
};

export default VideoCarousel;
