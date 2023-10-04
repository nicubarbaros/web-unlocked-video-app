import React, { useState } from "react";
import { Button, Form, Input, Modal, Rating, Select } from "react-daisyui";
import { MediaClassification, MediaItem, formatMediaClassification } from "../store/MediaStore";
import { observer } from "mobx-react";
import { useStore } from "../context/rootStoreContext";

const initialState: Omit<MediaItem, "id"> = {
  title: "",
  description: "",
  rating: 0,
  classification: "movie",
  genre: "",
  releaseYear: new Date().getFullYear(),
  color: "#000000",
};
export function MediaForm() {
  const [open, setOpen] = useState(false);
  const [newMedia, setNewMedia] = useState<Omit<MediaItem, "id">>(initialState);

  const { mediaStore } = useStore();

  const handleSave = () => {
    mediaStore.addMediaItem({
      ...newMedia,
      id: Math.floor(Math.random() * 100) + "",
    });

    setOpen(false);
    setNewMedia(initialState);
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Media</Button>
      <Modal open={open} className="bg-white min-w-[800px]">
        <Button
          size="sm"
          color="neutral"
          shape="circle"
          className="absolute right-2 top-2 z-10"
          onClick={() => {
            setOpen(false);
          }}
        >
          x
        </Button>

        <Modal.Body>
          <Form className="grid gap-14">
            <Input
              className="border-none bg-transparent border-b-1 border-black"
              bordered={false}
              onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
              placeholder="Title"
              value={newMedia.title}
            />

            <Input
              className="border-none bg-transparent border-b-1 border-black"
              bordered={false}
              value={newMedia.description}
              onChange={(e) => setNewMedia({ ...newMedia, description: e.target.value })}
              placeholder="Description"
            />

            <Input
              className="border-none bg-transparent border-b-1 border-black"
              bordered={false}
              value={newMedia.genre}
              onChange={(e) => setNewMedia({ ...newMedia, genre: e.target.value })}
              placeholder="Genre"
            />
            <Input
              className="border-none bg-transparent border-b-1 border-black"
              bordered={false}
              value={newMedia.releaseYear}
              type="number"
              onChange={(e) => {
                const year = parseInt(e.target.value);
                setNewMedia({ ...newMedia, releaseYear: year });
              }}
              placeholder="year"
            />
            <Rating
              value={newMedia.rating}
              onChange={(newRating) => setNewMedia({ ...newMedia, rating: newRating })}
              placeholder="afeafe"
            >
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
              <Rating.Item name="rating-2" className="mask mask-star-2 bg-orange-400" />
            </Rating>
            <Select
              className="border-none bg-transparent border-b-1 border-black"
              value={newMedia.classification}
              onChange={(event) => {
                const value = event.target.value as MediaItem["classification"];
                setNewMedia({ ...newMedia, classification: value });
              }}
            >
              {MediaClassification.map((classification) => (
                <Select.Option key={classification} value={classification}>
                  {formatMediaClassification[classification]}
                </Select.Option>
              ))}
            </Select>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default observer(MediaForm);
