import React, { useEffect } from "react";
import { observer } from "mobx-react";
import Header from "../components/Header";
import { Button, Carousel } from "react-daisyui";
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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          mediaStore.addMediaItemToServer({
            id: Math.floor(Math.random() * 100) + "",
            title: "Overwatch",
            type: "Movie",
            classification: "game",
            genre: "First-Person Shooter",
            releaseYear: 2016,
            rating: 8.9,
            description: "feafea",
            color: "red",
          });
        }}
      >
        add
      </button>

      <Outlet />
    </div>
  );
}

export default observer(Home);
