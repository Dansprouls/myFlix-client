import PropTypes from "prop-types";

// props being destructured
export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      {movie.title}
    </div>
  );
};

MovieCard.PropTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    }),
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
      birthyear: PropTypes.string.isRequired,
      deathyear: PropTypes.string.isRequired
    }),
    imageURL: PropTypes.string,
    featured: PropTypes.bool.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};