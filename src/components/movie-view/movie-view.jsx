import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, updateUser }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m._id === movieId); //movie is equal to the the instance "m" in the movies array that matched the movieId in the URL

  const [isFavMovie, setIsFavMovie] = useState(
    user?.favoriteMovies?.includes(movie?._id) || false
  );

  useEffect(() => {
    setIsFavMovie(user?.favoriteMovies?.includes(movie?._id) || false);
    window.scrollTo(0, 0); //whats happening here?
  }, [movieId]);

  const addFavMovie = () => {
    fetch(
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to add movie to Favorites");
          return false; //needed?
        }
      })
      .then((user) => {
        alert("Successfully added movie to Favorites!");
        setIsFavMovie(true);
        updateUser(user);
      })
      .catch((e) => {
        alert(e);
      });
  };

  const removeFavMovie = () => {
    fetch(
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove movie from Favorites");
          return false; //needed?
        }
      })
      .then((user) => {
        alert("Successfully deleted movie from Favorites!");
        setIsFavMovie(false);
        updateUser(user);
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div>
      <Row>
        <h1 className="movie-view-title">{movie.title}</h1>
      </Row>
      <Row>
        <Col md={6} className="movie-image">
          <div>
            <img src={movie.imageURL} alt="" />
          </div>
        </Col>
        <Col md={6} className="movie-details">
          <div>
            <span className="title-bold">Description: </span>
            <span>{movie.description}</span>
          </div>
          <div>
            <span className="title-bold">Genre Name: </span>
            <span>{movie.genre.name}</span>
          </div>
          <div>
            <span className="title-bold">Genre Description: </span>
            <span>{movie.genre.description}</span>
          </div>
          <div>
            <span className="title-bold">Director Name: </span>
            <span>{movie.director.name}</span>
          </div>
          <div>
            <span className="title-bold">Director Bio: </span>
            <span>{movie.director.bio}</span>
          </div>
          <div>
            <span className="title-bold">Director Birthyear: </span>
            <span>{movie.director.birthyear}</span>
          </div>
          <div>
            <span className="title-bold">Director Deathyear: </span>
            <span>{movie.director.deathyear}</span>
          </div>
          <a href={`/`}>
            <button className="back-button" style={{ cursor: "pointer" }}>
              Back
            </button>
          </a>
          {isFavMovie ? (
            <Button variant="danger" className="ms-2" onClick={removeFavMovie}>
              Remove from Favorites?
            </Button>
          ) : (
            <Button variant="success" className="ms-2" onClick={addFavMovie}>
              Add to Favorites?
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
};
