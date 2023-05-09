import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(null);

  //figure out correct format
  useEffect(() => {
    fetch("https://star-wars-myflix-1632.herokuapp.com/movies")
    .then((response) => response.json().then(result => {
      setMovies(result)
    }))

  }, []);

  if (!user) {
    return <LoginView onLoggedIn={(user) => setUser(user)} />;
  }

  if (selectedMovie) {
    return <MovieView movie ={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard 
          key={movie._id} 
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
      ))}
    </div>
  );
};