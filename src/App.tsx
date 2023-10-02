import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Media from "./components/Media";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/media" element={<Media />} />
      <Route path="*" element={<div>Not found</div>} />
    </Routes>
  );
}

export default App;
