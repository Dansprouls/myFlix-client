import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imageURL} alt="" />
      </div>
      <div>
        <span className="title-bold">Title: </span>
        <span>{movie.title}</span>
      </div>
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
      <div>
        <span className="title-bold">Featured: </span>
        <span>{movie.featured}</span>
      </div>
      <button 
        onClick={onBackClick} 
        className="back-button"
        style={{ cursor: "pointer"}}
      >
        Back
      </button>

    </div>
  );
};