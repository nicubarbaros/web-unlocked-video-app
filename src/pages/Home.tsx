import React from "react";
import { observer } from "mobx-react";
import CarouselSection from "../components/CarouselSection";
import { Outlet } from "react-router-dom";
import { useStore } from "../context/rootStoreContext";
function Home() {
  const { mediaStore } = useStore();

  console.log(mediaStore);

  if (mediaStore.mediaItems.length === 0) return <span>Loading...</span>;

  return (
    <div className="">
      <CarouselSection type="movies" mediaItems={mediaStore.itemsByCategory["movie"]} />
      <CarouselSection type="tv_shows" mediaItems={mediaStore.itemsByCategory["tv_show"]} />
      <CarouselSection type="games" mediaItems={mediaStore.itemsByCategory["game"]} />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"></div>
      </div>

      <Outlet />
    </div>
  );
}

export default observer(Home);
