import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  //figure out correct format
  useEffect(() => {

    if (!token) {
      return;
    }

    fetch('https://star-wars-myflix-1632.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json().then(result => {
      setMovies(result)
    }))

  }, [token]);

  /*useEffect(() => {

    if (!token) {
      return;
    }

    fetch('https://star-wars-myflix-1632.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

  }, [token]);*/

  /*if (!user) {
    return <LoginView onLoggedIn={(user, token) => setUser(user)} />;
  } */

  if (!user) {
    return (
      <>
        <LoginView 
          onLoggedIn={(user,token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return <MovieView movie ={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
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
    </div>
  );
};