export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imageURL} alt="" />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.description}</span>
      </div>
      <div>
        <span>Genre Name: </span>
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>Genre Description: </span>
        <span>{movie.genre.description}</span>
      </div>
      <div>
        <span>Director Name: </span>
        <span>{movie.director.name}</span>
      </div>
      <div>
        <span>Director Bio: </span>
        <span>{movie.director.bio}</span>
      </div>
      <div>
        <span>Director Birthyear: </span>
        <span>{movie.director.birthyear}</span>
      </div>
      <div>
        <span>Director Deathyear: </span>
        <span>{movie.director.deathyear}</span>
      </div>
      <div>
        <span>Featured: </span>
        <span>{movie.featured}</span>
      </div>
      <button onClick={onBackClick}>Back</button>

    </div>
  );
};