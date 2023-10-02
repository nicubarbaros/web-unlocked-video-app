import React, { useEffect } from "react";
import store from "../store/MediaStore";
import { observer } from "mobx-react";
import Header from "../components/Header";
function Home() {
  const { mediaItems } = store;
  useEffect(() => {
    store.fetchMediaItems(); // Fetch data when the component mounts
  }, []);

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaItems.map((movie) => (
            <div key={movie.id} className="relative">
              <button
                className="absolute top-2 right-2 text-white text-xl cursor-pointer z-10"
                onClick={() => store.removeMediaItemFromServer(movie.id)}
              >
                X
              </button>
              <img
                src={
                  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3518&q=80"
                }
                alt={movie.title}
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 hover:bg-opacity-0 z-0">
                <p className="text-white text-center">{movie.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          store.addMediaItemToServer({
            id: Math.floor(Math.random() * 100) + "",
            title: "Overwatch",
            type: "Game",
            genre: "First-Person Shooter",
            releaseYear: 2016,
            rating: 8.9,
          });
        }}
      >
        add
      </button>
    </div>
  );
}

export default observer(Home);
