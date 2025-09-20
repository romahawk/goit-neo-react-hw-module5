import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/tmdb';
import MovieList from '../../components/MovieList/MovieList.jsx';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('query') || '';
  const [query, setQuery] = useState(q);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const next = query.trim();
    setSearchParams(next ? { query: next } : {});
  };

  useEffect(() => {
    let ignore = false;
    const doSearch = async () => {
      if (!q) { setMovies([]); return; }
      try { setLoading(true); const data = await searchMovies(q); if (!ignore) setMovies(data); }
      catch { setError('Failed to search movies'); }
      finally { setLoading(false); }
    };
    doSearch();
    return () => { ignore = true; };
  }, [q]);

  return (
    <section>
      <h1 className={css.title}>Search movies</h1>
      <form onSubmit={onSubmit} className={css.form}>
        <input className={css.input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Movie title..." />
        <button className={css.btn} type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </section>
  );
}
