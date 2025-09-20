import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList.jsx';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    (async () => {
      try { setLoading(true); const data = await fetchTrendingMovies(); if (!ignore) setMovies(data); }
      catch { setError('Failed to load trending movies'); }
      finally { setLoading(false); }
    })();
    return () => { ignore = true; };
  }, []);

  return (
    <section>
      <h1 className={css.title}>Trending today</h1>
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}
