import React, { useEffect } from "react";
import { useStore } from "../context/rootStoreContext";
import CardItem from "../components/CardItem";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";

function Shows() {
  const { mediaStore } = useStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaStore.showItems.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
      <Outlet />
    </div>
  );
}

export default observer(Shows);
