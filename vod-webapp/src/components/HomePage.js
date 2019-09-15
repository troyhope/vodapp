import React from "react";

import MediaGalleryPage from "../container/MediaGalleryPage";

// Home page component.
const HomePage = () => (
  <div className="container center">
    <p style={{ fontSize: "12pt" }}>Welcome to the goat streaming site </p>
    <MediaGalleryPage />
  </div>
);

export default HomePage;
