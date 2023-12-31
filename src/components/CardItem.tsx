import React from "react";
import { MediaItem } from "../store/MediaStore";
import { Badge, Card } from "react-daisyui";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";

type Props = {
  item: MediaItem;
};

function CardItem({ item }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Card
      onClick={() => {
        const slugValue = item.id;
        const currentPath = location.pathname;
        const relativePath = currentPath.endsWith("/") ? `${currentPath}${slugValue}` : `${currentPath}/${slugValue}`;
        navigate(relativePath);
      }}
      className="hover:cursor-pointer"
    >
      <Card.Image
        src={`https://source.unsplash.com/random/?${item.title.toLowerCase().split(" ").join(",")}`}
        className="aspect-video object-cover"
        alt={item.title}
      />
      <Card.Body>
        <Card.Title tag="h2">{item.title}</Card.Title>
        <p>{item.description}</p>
        <Card.Actions className="justify-end">
          <Badge color="primary">{item.rating} ★</Badge>
        </Card.Actions>
      </Card.Body>
    </Card>
  );
}

export default observer(CardItem);
