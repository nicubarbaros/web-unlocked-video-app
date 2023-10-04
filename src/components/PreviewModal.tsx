import React from "react";
import { Badge, Button, Hero, Input, Modal } from "react-daisyui";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useStore } from "../context/rootStoreContext";

function PreviewModal() {
  const navigate = useNavigate();
  let { id } = useParams();
  const { mediaStore } = useStore();
  const item = mediaStore.getMediaById(id ?? "");

  if (!item) {
    return <div>Media not found</div>;
  }

  const handleDelete = () => {
    mediaStore.removeMediaItem(item.id);
    navigate("..", { relative: "path" });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    mediaStore.updateMediaItemTitle(item.id, event.target.value);
  };

  return (
    <Modal open className="bg-white p-0 min-w-[800px]">
      <Button
        size="sm"
        color="neutral"
        shape="circle"
        className="absolute right-2 top-2 z-10"
        onClick={() => {
          navigate("..", { relative: "path" });
        }}
      >
        x
      </Button>
      <Hero
        style={{
          backgroundImage: "url(https://daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.jpg)",
        }}
        className="h-[400px] relative"
      >
        <Hero.Overlay />
        <Hero.Content className="absolute left-0 bottom-0">
          <Badge color="ghost">{item.rating} ★</Badge>
          <Badge color="ghost">{item.genre}</Badge>
          <Badge color="ghost">{item.releaseYear}</Badge>
        </Hero.Content>
      </Hero>
      <div className="p-10">
        <Input
          className="text-5xl font-bold border-none bg-transparent border-b-1 border-black"
          value={item.title}
          onChange={handleTitleChange}
          bordered={false}
        />
        <p className="py-6">{item.description}</p>

        <div className="flex gap-4">
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default observer(PreviewModal);
