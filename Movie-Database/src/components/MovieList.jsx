/* eslint react/prop-types: 0 */

import { Link } from "react-router-dom";

function MovieList({ movies }) {
  return (
    <div className="h-0">
      <div className="pt-20 w-10/12 mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-20 gap-x-10">
        {movies.map((movie) => (
          <Link to={`/details/${movie.imdbID}`} key={movie.imdbID}>
            <div className=" border-8 border-slate-900 hover:border-yellow-400 bg-white rounded-lg shadow flex  h-full w-full relative hover:scale-105 duration-300">
              <div className="w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </div>
              <div className="opacity-0 hover:opacity-100 hover:border-1 hover:rounded-sm absolute top-0 left-0 w-full h-full rounded-lg bg-black bg-opacity-70 p-2 transition-opacity duration-300">
                <div className="h-full flex flex-col items-center justify-evenly text-lg lg:text-xl text-white text-center cursor-pointer">
                  <h3 className="lg:text-2xl font-bold">{movie.Title}</h3>
                  <p className="font-semibold">
                    IMDb Rating:{" "}
                    <span className="font-extrabold">{movie.imdbRating}</span>
                  </p>
                  <button className="border-2 px-2 py-1 font-semibold rounded-md hover:bg-yellow-500 hover:scale-105">
                    View Details
                  </button>
                </div>
              </div>
            </div>
            <div className="px-2">
              <h3 className="text-lg text-slate-800 text-center font-bold pt-2 truncate">
                {movie.Title}
              </h3>
              <p className="text-gray-600 text-center">Year: {movie.Year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MovieList;
