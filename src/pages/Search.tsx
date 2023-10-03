import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../context/rootStoreContext";
import { Card } from "react-daisyui";

export function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  const { mediaStore } = useStore();
  const searchQuery = searchParams.get("q") ?? "";
  const filteredMedia = mediaStore.filterMediaByTitle(searchQuery);
  if (filteredMedia.length === 0) {
    return (
      <p className="mt-20 mx-auto w-full text-center">
        Your search for <i>{searchQuery}</i> did no have any matches{" "}
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-20">
      {filteredMedia.map((media) => (
        <Card key={media.id} className="overflow-hidden">
          <Card.Image src={`https://placehold.co/600x400?text=${media.title}&font=roboto&`} alt={media.title} />
        </Card>
      ))}
    </div>
  );
}

export default observer(Search);
