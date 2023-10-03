import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PreviewModal from "./components/PreviewModal";
import { RootStoreContext } from "./context/rootStoreContext";
import { RootStore } from "./store/RootStore";
import Movies from "./pages/Movies";
import Games from "./pages/Games";
import Shows from "./pages/Shows";
import Header from "./components/Header";
import Search from "./pages/Search";

function App() {
  return (
    <RootStoreContext.Provider value={new RootStore()}>
      <div className="container mx-auto min-h-screen px-10">
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path=":id" element={<PreviewModal />} />
          </Route>
          <Route path="/movies" element={<Movies />}>
            <Route path=":id" element={<PreviewModal />} />
          </Route>
          <Route path="/games" element={<Games />}>
            <Route path=":id" element={<PreviewModal />} />
          </Route>
          <Route path="/tv-shows" element={<Shows />}>
            <Route path=":id" element={<PreviewModal />} />
          </Route>
          <Route path="/search" element={<Search />} />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </div>
    </RootStoreContext.Provider>
  );
}

export default App;
