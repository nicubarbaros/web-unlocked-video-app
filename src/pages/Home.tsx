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

      <Outlet />
    </div>
  );
}

export default observer(Home);
