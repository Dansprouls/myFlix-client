import { React, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie, user, token, updateUser }) => {
  const [isFavMovie, setIsFavMovie] = useState(
    user?.favoriteMovies?.includes(movie?._id) || false
  );

  useEffect(() => {
    setIsFavMovie(user?.favoriteMovies?.includes(movie?._id) || false);
    window.scrollTo(0, 0);
  }, [movie]);

  const addFavMovie = () => {
    fetch(
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}/movies/${movie._id}`,
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
      `https://star-wars-myflix-1632.herokuapp.com/users/${user.username}/movies/${movie._id}`,
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
    <Card className="h-100 movie-card">
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body className="card-body">
        <Card.Title style={{ color: "black" }}>{movie.title}</Card.Title>
        <Card.Text style={{ color: "black" }}>{movie.director.name}</Card.Text>
        <Row>
          <div className="button-container">
            <Col md={8} sm={10}>
              <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                <Button className="open-btn">Open</Button>
              </Link>
            </Col>
            <Col>
              {isFavMovie ? (
                <Button
                  variant="danger"
                  className="ms-2 add-remove-button"
                  onClick={removeFavMovie}
                >
                  <i className="fa-solid fa-thumbs-down"></i>
                </Button>
              ) : (
                <Button
                  variant="success"
                  className="ms-2 add-remove-button"
                  onClick={addFavMovie}
                >
                  <i className="fa-solid fa-thumbs-up"></i>
                </Button>
              )}
            </Col>
          </div>
        </Row>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthyear: PropTypes.string.isRequired,
      deathyear: PropTypes.string.isRequired,
    }),
    imageURL: PropTypes.string,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};

/* 
<Col>
            {isFavMovie ? (
              <Button
                variant="danger"
                className="ms-2"
                onClick={removeFavMovie}
              >
                <i class="fa-solid fa-thumbs-down"></i>
              </Button>
            ) : (
              <Button variant="success" className="ms-2" onClick={addFavMovie}>
                <i class="fa-solid fa-thumbs-up"></i>
              </Button>
            )}
          </Col>
*/

/* 
import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100 movie-card">
      <Card.Img variant="top" src={movie.imageURL} />
      <Card.Body className="card-body">
        <Card.Title style={{ color: "black" }}>{movie.title}</Card.Title>
        <Card.Text style={{ color: "black" }}>{movie.director.name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button className="open-btn">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthyear: PropTypes.string.isRequired,
      deathyear: PropTypes.string.isRequired,
    }),
    imageURL: PropTypes.string,
    featured: PropTypes.bool.isRequired,
  }).isRequired,
};
*/
