//button in return row may need to be reworked

import { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss";

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

  return (
    <Row className="justify-content-md-center">
      {!user ? (
        <Col md={5}>
          <LoginView 
            onLoggedIn={(user,token) => {
            setUser(user);
            setToken(token);
          }}
          />
          or
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        <Col md={8}>
          <MovieView 
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)} 
          />
        </Col>
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <> 
          <button className="logout-btn" onClick={() => {setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
          {movies.map((movie) => (
            <Col className="mb-5 pt-5" key={movie.id} md={3}>
              <MovieCard 
                movie={movie} 
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )
    }
    </Row>
  )

};
  //old code
  /*if (!user) {
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
}; */