import { useEffect, useRef } from "react";

export function Navbar({ movies, query, setQuery }) {
  const inputElement = useRef(null);

  useEffect(
    function () {
      inputElement.current.focus();
    },
    [inputElement]
  );
  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
      <p className="num-results">
        Found <strong>{movies ? movies.length : 0}</strong> results
      </p>
    </nav>
  );
}
