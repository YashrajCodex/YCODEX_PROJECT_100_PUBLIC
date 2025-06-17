import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export function MoviesList({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState("");

  function handleSelectId(id) {
    setSelectedMovie((selectedId) => (id === selectedId ? null : id));
  }

  function onCloseSelectMovie() {
    setSelectedMovie(null);
  }
  return (
    <main className="main">
      <ListBox movies={movies} handleSelectId={handleSelectId} />
      <ListMovies
        selectedMovie={selectedMovie}
        onCloseSelectMovie={onCloseSelectMovie}
      />
    </main>
  );
}

function ListBox({ movies, handleSelectId }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <Button open={isOpen1} setOpen={setIsOpen1} />

      <ul className="list list-movies">
        {isOpen1 &&
          movies?.map((movie) => (
            <li key={movie.imdbID} onClick={() => handleSelectId(movie.imdbID)}>
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function ListMovies({ selectedMovie, onCloseSelectMovie }) {
  const [watched, setWatched] = useState(function () { 
    const storedMovies = JSON.parse(localStorage.getItem('WatchedMovie'))
    return storedMovies
  });
  const [isOpen2, setIsOpen2] = useState(true);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDelWatched(id) {
    setWatched((watched) =>watched.filter((movie) => movie.imdbID !== id))
  }
  useEffect(function () {
    const localWatched = JSON.stringify(watched);
    localStorage.setItem('WatchedMovie', localWatched)

    if(watched === undefined) setWatched([])
  }, [watched])
  return (
    <div className="box">
      <Button open={isOpen2} setOpen={setIsOpen2} />
      {selectedMovie ? (
        <SelectedMovie
          selectedMovie={selectedMovie}
          onCloseSelectMovie={onCloseSelectMovie}
          onAddWatched={handleAddWatched}
          watched={watched}
        />
      ) : (
        <>
          <WatchedSummary watched={watched} />
          {isOpen2 && (
            <>
              <ul className="list">
                {watched &&
                  watched.map((watch) => (
                    <li key={watch.imdbID}>
                      <img src={watch.poster} alt={`${watch.title} poster`} />
                      <h3>{watch.title}</h3>
                      <div>
                        <p>
                          <span>⭐️</span>
                          <span>{watch.imdbRating}</span>
                        </p>
                        <p>
                          <span>🌟</span>
                          <span>{watch.userRating}</span>
                        </p>
                        <p>
                          <span>⏳</span>
                          <span>{watch.runtime} min</span>
                        </p>
                        <p><button className="btn-delete" onClick={()=> handleDelWatched(watch.imdbID)}>❌</button></p>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </>
      )}
    </div>
  );
}
function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(0)} min</span>
        </p>
      </div>
    </div>
  );
}
function Button({ open, setOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setOpen((open) => !open)}>
      {" "}
      {open ? "–" : "+"}
    </button>
  );
}

function SelectedMovie({
  selectedMovie,
  onCloseSelectMovie,
  onAddWatched,
  watched,
}) {
  const [selMovie, setSelMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorNet, setErrorNet] = useState("");
  const [userRating, setUserRating] = useState(0);
  let key = "64d97db2";

  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectedMovie);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedMovie
  )?.userRating;
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    Year: year,
    imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = selMovie;


  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedMovie,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseSelectMovie();
  }
  useEffect(
    function () {

      async function fetchMovieDetails() {
        setIsLoading(true);
        setErrorNet("");
        try {
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${selectedMovie}`
          );
          if (!res.ok) throw new Error("Looks like you are offline");

          const data = await res.json();
          setSelMovie(data);
          setErrorNet('')
        } catch (error) {
              setErrorNet("Looks like you are offline");
        } finally {
          setIsLoading(false);
        }
      }

      fetchMovieDetails();
    },
    [selectedMovie]
  );
  
  useEffect(function () { 
    if (!title) return
      document.title = `Movie | ${title}`   
      
    return function () {
        document.title = 'usePopcorn'
      }
  }, [title])
  
  useEffect(function () {
    function callBackkk(e) {
        if (e.code === 'Escape') {
          onCloseSelectMovie();
        }
    }

    document.addEventListener('keydown', callBackkk)
    return function () {
      document.removeEventListener('keydown', callBackkk)
    }
  },[onCloseSelectMovie])
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : errorNet ? (
        <Errorss errors={errorNet} />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseSelectMovie}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating}
              </p>
            </div>
          </header>

          <section>
            {isWatched ? (
              <span style={{WebkitUserSelect: 'none'}}>
                    {/* <StarRating rated={ watchedUserRating } size="24px" /> */}
                    You rated: { watchedUserRating } ⭐
              </span>
            ) : (
              <div className="rating">
                <StarRating
                  len={10}
                  size="24px"
                  setUserRating={setUserRating}
                />
                {userRating > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    Add to list
                  </button>
                )}
              </div>
            )}
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading ....</p>;
}

function Errorss({ errors }) {
  return (
    <p className="error">
      <span>⛔</span>
      {errors}
    </p>
  );
}
