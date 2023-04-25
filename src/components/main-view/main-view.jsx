import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Star Wars: Episode I - The Phantom Menace',
      description: 'Two Jedi escape a hostile blockade to find allies and come across a young boy who may bring balance to the Force, but the long dormant Sith resurface to claim their original glory.',
      genre: {
        name: 'Science Fiction',
        description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets.',
      },
      director: {
        name: 'George Lucas',
        bio: 'George Walton Lucas, Jr. is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd.',
        birthyear: '1944',
        deathyear: 'n/a'
      },
      imageURL: 'https://m.media-amazon.com/images/M/MV5BYTRhNjcwNWQtMGJmMi00NmQyLWE2YzItODVmMTdjNWI0ZDA2XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg'
    },
    {
      id: 2,
      title: 'Star Wars: Episode II - Attack of the Clones',
      description: 'Ten years after initially meeting, Anakin Skywalker shares a forbidden romance with Padmé Amidala, while Obi-Wan Kenobi discovers a secret clone army crafted for the Jedi.',
      genre: {
        name: 'Science Fiction',
        description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets.'
      },
      director: {
        name: 'George Lucas',
        bio: 'George Walton Lucas, Jr. is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd.',
        birthyear: '1944',
        deathyear: 'n/a'
      },
      imageURL: 'https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'Star Wars: Episode III - Revenge of the Sith',
      description: 'Three years into the Clone Wars, Obi-Wan pursues a new threat, while Anakin is lured by Chancellor Palpatine into a sinister plot to rule the galaxy, and Darth Vader is born...',
      genre: {
        name: 'Science Fiction',
        description: 'Numerous scenes, and/or the entire background for the setting of the narrative, should be based on speculative scientific discoveries or developments, environmental changes, space travel, or life on other planets.'
      },
      director: {
        name: 'George Lucas',
        bio: 'George Walton Lucas, Jr. is an American filmmaker, creator of the film sagas of Star Wars and Indiana Jones, and former president of Lucasfilm Limited, LucasArts Entertainment Company, Lucas Digital Ltd, Lucas Licensing, LucasBooks and Lucas Learning Ltd.',
        birthyear: '1944',
        deathyear: 'n/a'
      },
      imageURL: 'https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_FMjpg_UX1000_.jpg',
      featured: true
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
          key={movie.id} 
          movie={movie} 
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
          />
      ))}
    </div>
  );
};