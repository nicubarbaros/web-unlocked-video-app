import React, { useEffect } from "react";
import { useStore } from "../context/rootStoreContext";
import { Badge, Button, Card } from "react-daisyui";
import { observer } from "mobx-react";
import CardItem from "../components/CardItem";
import { Outlet } from "react-router-dom";

function Games() {
  const { mediaStore } = useStore();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {mediaStore.gameItems.map((item) => (
        <CardItem key={item.id} item={item} />
      ))}
      <Outlet />
    </div>
  );
}

export default observer(Games);
