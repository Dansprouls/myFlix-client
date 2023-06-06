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
