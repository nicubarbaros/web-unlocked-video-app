import React, { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<{ id: string }[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("http://localhost:8000/api/movies");
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.log(error);
      }
    }

    void fetchMovies();
  }, []);
  return (
    <div>
      {movies.map((movie) => (
        <div key={movie.id}>{movie.id}</div>
      ))}
    </div>
  );
}
