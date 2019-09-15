import React, { Component } from "react";
import PropTypes from "prop-types";
import VideoCarousel from "../components/VideoCarousel";
import MediaGalleryPage from "../container/MediaGalleryPage";
import MediaGalleryPageHistory from "../container/MediaGalleryPageHistory";

// History page component.
const HistoryPage = () => (
  <div className="container center">
    <p style={{ fontSize: "12pt" }}>Welcome to the goat streaming site </p>
    <MediaGalleryPageHistory />
  </div>
);

HistoryPage.propTypes = {
  videos: PropTypes.array
};

export default HistoryPage;
