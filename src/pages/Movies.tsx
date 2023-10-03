import React from "react";
import { useStore } from "../context/rootStoreContext";
import CardItem from "../components/CardItem";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";

function Movies() {
  const { mediaStore } = useStore();

  const movies = mediaStore.getMediaByClassification("movie");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {movies.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
      <Outlet />
    </div>
  );
}

export default observer(Movies);
