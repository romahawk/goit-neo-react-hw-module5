import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/tmdb';
import { getPosterUrl } from '../../utils/images';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backRef = useRef(location.state?.from ?? '/movies');

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    (async () => {
      try { setLoading(true); const data = await fetchMovieDetails(movieId); if (!ignore) setMovie(data); }
      catch { setError('Failed to load movie details'); }
      finally { setLoading(false); }
    })();
    return () => { ignore = true; };
  }, [movieId]);

  return (
    <section>
      <Link to={backRef.current} className={css.back}>← Go back</Link>
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {movie && (
        <div className={css.wrap}>
          <img className={css.poster} src={getPosterUrl(movie.poster_path, 342)} alt={movie.title} />
          <div className={css.info}>
            <h2 className={css.title}>{movie.title}</h2>
            <p>User score: {Math.round((movie.vote_average || 0) * 10)}%</p>
            <h3>Overview</h3>
            <p>{movie.overview || 'No overview'}</p>
            <h4>Genres</h4>
            <p>{movie.genres?.map(g => g.name).join(', ') || '—'}</p>
          </div>
        </div>
      )}
      <div className={css.subnav}>
        <NavLink to="cast" className={({isActive}) => isActive ? css.active : css.link}>Cast</NavLink>
        <NavLink to="reviews" className={({isActive}) => isActive ? css.active : css.link}>Reviews</NavLink>
      </div>
      <Outlet />
    </section>
  );
}
