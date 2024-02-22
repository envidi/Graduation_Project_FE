import React, { useEffect, useState, FC } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';
import { Input } from '@/components/ui/input';

interface Movie {
  id: string;
  image_path: string;
  movie_name: string;
}

interface MovieSelectorProps {
  userMovieId: string;
  handleUserMovieChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  movieData: Movie[];
  getMovieData: (data: Movie[]) => void;
  userDate: string;
  theatreId: string;
}

export const MovieSelector: FC<MovieSelectorProps> = ({
  userMovieId,
  handleUserMovieChange,
  movieData,
  getMovieData,
  userDate,
  theatreId,
}) => {
  const override = {
    display: 'block',
    margin: '0 auto', // Changed to '0 auto' to center the loader without specifying the top and bottom margin
  };

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post<Movie[]>(`${import.meta.env.VITE_API_URL}/uniqueMovies`, {
          theatreId,
          userDate,
        });
        getMovieData(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userDate, theatreId, getMovieData]);

  const movieOptions = movieData.map((movie, idx) => (
    <div className="movie-input-container" key={movie.id}> {/* key changed to movie.id for better key handling */}
      <Input
        type="radio"
        id={`movie-${movie.id}`} // id is prefixed with 'movie-' to ensure it's unique and doesn't clash with other numeric ids
        name="Select Movie"
        value={movie.id}
        onChange={handleUserMovieChange}
        checked={movie.id === userMovieId}
      />

      <label className="form-movie-detail" htmlFor={`movie-${movie.id}`}> {/* htmlFor updated to match the id */}
        <div className="movie-option-box">
          <div className="movie-option-img-box">
            <img
              src={movie.image_path}
              className="movie-option-img"
              alt={movie.movie_name}
            />
          </div>

          <div>
            <p className="movie-option-name">{movie.movie_name}</p>
          </div>
        </div>
      </label>

      <div
        className="checkmark-icon"
        style={{ zIndex: userMovieId === movie.id ? 2 : 'auto' }} // Ternary operator used for proper type handling
      >
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="movie-selector-icon"
        viewBox="0 0 512 512"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="32"
          d="M464 128L240 384l-96-96M144 384l-96-96M368 128L232 284"
        />
      </svg>
      </div>
    </div>
  ));

  return (
    <div>
      <form>
        <div className="form-item-heading">Select a movie</div>
        {loading && <HashLoader cssOverride={override} color="#eb3656" />}
        {!loading && <div className="form-movie-options">{movieOptions}</div>}
      </form>
    </div>
  );
};