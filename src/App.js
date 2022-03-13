import React, { useEffect, useState } from "react";
import Movie from "./components/Movie";


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getMovies(FEATURED_API);
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);

      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search-bar"
            type="search"
            value={searchTerm}
            placeholder="Search..."
            onChange={handleOnChange}
           
          />
        </form>
      </header>
      <div className="movies-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie {...movie} key={movie.id} />)}
      </div>
    </>
  );
};

export default App;
