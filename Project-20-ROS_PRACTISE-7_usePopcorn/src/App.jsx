import { Navbar } from "./Navbar";
import { MoviesList } from "./MoviesList";
import { useEffect, useState } from "react";

// const favMovie = "Interstellar";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");

  const apiKey = 'tt3896198';
  useEffect(
    function () {

      async function MovieApiFetch() {
        setIsLoading(true);
        setError("");
        try {
          const res =
            await fetch(`http://www.omdbapi.com/?i=${apiKey}&apikey=64d97db2
            &s=${query}`);

          if (!res.ok)
            throw new Error(`Something went wrong. Maybe you are offline.`);

          const data = await res.json();

          if (data.Response === "False") {
            throw new Error("Movie not found!", setMovies([]));
          }
          setMovies(data.Search);
          setError('')
        } catch (err) {
            setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      MovieApiFetch();
    },
    [query]
  );

  return (
    <>
      <Navbar movies={movies} query={query} setQuery={setQuery} />
      {isLoading && <Loader />}
      {!isLoading && !error && <MoviesList movies={movies} />}
      {error && <ErrorMessage message={error} />}
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
