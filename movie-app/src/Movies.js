

import React, { useState, useEffect } from 'react';

export const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('Avengers');
  const [selectedMovies, setSelectedMovies] = useState([]);

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?apikey=278924d5&s=${searchTerm}&type=movie&page=1&plot=short&r=json`)
      .then((res) => res.json())
      .then((data) => setMovies(data.Search.slice(0, 20)));
  }, [searchTerm]);

  const handleAddToList = (movie) => {
    setSelectedMovies((prevSelectedMovies) => [...prevSelectedMovies, movie]);
  };

  return (
    <div className='wrapper'>
      <h1> Movies</h1>
      <div className='search'>
        <input
          type='text'
          placeholder='Search movies...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='card'>
        {movies.map((movie) => (
          <div key={movie.imdbID} className='scard'>
          <h2>{movie.Title}</h2>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <button className='add-to-list' onClick={() => handleAddToList(movie)}>
            Add to List
          </button>
        </div>
        ))}
      </div>
      <div>
        <h2>Selected Movies</h2>
        <ul>
          {selectedMovies.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
