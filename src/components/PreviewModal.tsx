import React, { useCallback, useEffect, useRef } from "react";
import { MediaItem } from "../store/MediaStore";
import { Button, Modal } from "react-daisyui";
import { useNavigate } from "react-router-dom";

type Props = {
  item: MediaItem;
};
export default function PreviewModal() {
  const navigate = useNavigate();
  return (
    <Modal open>
      <Button
        size="sm"
        color="ghost"
        shape="circle"
        className="absolute right-2 top-2"
        onClick={() => {
          navigate("..", { relative: "path" });
        }}
      >
        x
      </Button>
      <Modal.Header className="font-bold">Hello!</Modal.Header>
      <Modal.Body>Press ESC key or click the button below to close</Modal.Body>
    </Modal>
  );
}
