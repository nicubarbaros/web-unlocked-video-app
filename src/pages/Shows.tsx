import React from "react";
import { useStore } from "../context/rootStoreContext";
import CardItem from "../components/CardItem";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";

function Shows() {
  const { mediaStore } = useStore();
  const shows = mediaStore.getMediaByClassification("tv_show");
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {shows.map((show) => (
        <CardItem key={show.id} item={show} />
      ))}
      <Outlet />
    </div>
  );
}

export default observer(Shows);
