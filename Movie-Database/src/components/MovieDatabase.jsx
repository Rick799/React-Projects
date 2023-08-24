import { useState} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./MovieList";
import MovieDetails from "./MovieDetails";
import { AiOutlineSearch } from "react-icons/ai";

function MovieDatabase() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortByRating, setSortByRating] = useState("");
  const [sortByGenre, setSortByGenre] = useState("");

  // useEffect(() => {
  //   fetchMovies();
  // }, [sortByRating, sortByGenre]);

  const fetchMovies = async () => {
    try {
      let apiUrl = `https://www.omdbapi.com/?apikey=d860c9a&s=${searchTerm}&y=&type=movie`;

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.Search) {
        const moviePromises = data.Search.map(async (movie) => {
          const movieResponse = await fetch(
            `https://www.omdbapi.com/?apikey=d860c9a&i=${movie.imdbID}`
          );
          const movieData = await movieResponse.json();
          return movieData;
        });

        const moviesData = await Promise.all(moviePromises);
        setMovies(moviesData);
        console.log(moviesData);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchMovies();
    }
  };

  const handleSortByRating = (event) => {
    setSortByRating(event.target.value);
  };

  const handleSortByGenre = (event) => {
    setSortByGenre(event.target.value);
  };

  const filteredMovies = movies.filter((movie) => {
    if (sortByGenre) {
      return movie.Genre.includes(sortByGenre);
    }
    return true;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    const ratingA = parseFloat(a.imdbRating) || 0;
    const ratingB = parseFloat(b.imdbRating) || 0;

    if (sortByRating === "asc") {
      return ratingA - ratingB;
    } else if (sortByRating === "desc") {
      return ratingB - ratingA;
    }
    return 0;
  });

  const resetMovieDatabase = () => {
    setMovies([]); // Reset the movies to an empty array or initial state
    setSearchTerm("");
    setSortByRating("");
    setSortByGenre("");
  };

  return (
    <Router>
      <div className="font-mono bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 text-white">
        <div className="border-b-8 border-yellow-500">
          <h1
            onClick={resetMovieDatabase}
            className="cursor-pointer text-3xl text-center pt-4"
          >
            Movie Database
          </h1>
          <div className="text-center my-10">
            <div className="my-10 mx-auto p-2">
              <input
                className="w-60 md:w-5/12 border-b-2 border-white focus:outline-none bg-transparent "
                type="text"
                placeholder="Movie / Series"
                value={searchTerm}
                onChange={handleSearch}
                onKeyPress={handleKeyPress}
              />
              <button
                className="mx-5 border-2 rounded-md p-1 hover:scale-110"
                onClick={fetchMovies}
              >
                <AiOutlineSearch className="w-4 h-4 md:w-6 md:h-6 hover:scale-105" />
              </button>
            </div>
            <div className="w-7/12 xl:w-5/12 flex justify-around mx-auto">
              <label>
                Sort by Rating:
                <select
                  className="text-black mx-2 rounded-md"
                  onChange={handleSortByRating}
                >
                  <option value="">Select</option>
                  <option className="font-semibold" value="asc">
                    Imdb: Low to High
                  </option>
                  <option className="font-semibold" value="desc">
                    Imdb: High to Low
                  </option>
                </select>
              </label>
              <label>
                Sort by Genre:
                <select
                  className="text-black  mx-2 rounded-md"
                  onChange={handleSortByGenre}
                >
                  <option className="font-semibold" value="">
                    Select
                  </option>
                  <option className="font-semibold" value="Action">
                    Action
                  </option>
                  <option className="font-semibold" value="Adventure">
                    Adventure
                  </option>
                  <option className="font-semibold" value="Animation">
                    Animation
                  </option>
                  <option className="font-semibold" value="Biography">
                    Biography
                  </option>
                  <option className="font-semibold" value="Comedy">
                    Comedy
                  </option>
                  <option className="font-semibold" value="Crime">
                    Crime
                  </option>
                  <option className="font-semibold" value="Documentary">
                    Documentary
                  </option>
                  <option className="font-semibold" value="Drama">
                    Drama
                  </option>
                  <option className="font-semibold" value="Fantasy">
                    Fantasy
                  </option>
                  <option className="font-semibold" value="Horror">
                    Horror
                  </option>
                  <option className="font-semibold" value="Mystery">
                    Mystery
                  </option>
                  <option className="font-semibold" value="Romance">
                    Romance
                  </option>
                  <option className="font-semibold" value="Sci-Fi">
                    Sci-Fi
                  </option>
                  <option className="font-semibold" value="Sports">
                    Sports
                  </option>
                  <option className="font-semibold" value="Thriller">
                    Thriller
                  </option>
                  <option className="font-semibold" value="War">
                    War
                  </option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<MovieList movies={sortedMovies} />} />
          <Route path="/details/:imdbID" element={<MovieDetails />} />
        </Routes>
        {/*<div className="bg-slate-800 w-screen text-white absolute bottom-0">
          <footer className=" flex justify-around">
            <span>Copyright 2023</span>
            <span>Rajarshi Sarkar</span>
            <span>Contact</span>
          </footer>
  </div>*/}
      </div>
    </Router>
  );
}

export default MovieDatabase;
