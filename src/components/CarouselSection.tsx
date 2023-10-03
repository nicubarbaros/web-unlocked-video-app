import { Carousel } from "react-daisyui";
import { MediaItem } from "../store/MediaStore";
import { useNavigate } from "react-router-dom";

type Props = {
  type: "movies" | "tv_shows" | "games";
  mediaItems: MediaItem[];
};

const beautifyType: Record<Props["type"], string> = {
  movies: "Movies",
  tv_shows: "TV Shows",
  games: "Games",
};

export default function CarouselSection({ type, mediaItems }: Props) {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] my-14">
      <p className="text-lg capitalize mb-4 font-medium">{beautifyType[type]}</p>
      <Carousel className="w-[100%] flex gap-4" snap="start">
        {mediaItems.map((movie) => (
          <Carousel.Item
            key={movie.id}
            alt={movie.title}
            onClick={() => {
              navigate(`../${movie.id}`, { relative: "path" });
            }}
            className="w-[250px] rounded-lg hover:cursor-pointer"
            src={`https://placehold.co/600x400?text=${movie.title}`}
          />
        ))}
      </Carousel>
    </div>
  );
}
