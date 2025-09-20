import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../services/tmdb';
import { getPosterUrl } from '../../utils/images';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    (async () => {
      try { setLoading(true); const data = await fetchMovieCredits(movieId); if (!ignore) setCast(data); }
      catch { setError('Failed to load cast'); }
      finally { setLoading(false); }
    })();
    return () => { ignore = true; };
  }, [movieId]);

  if (loading) return <p>Loading cast...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!cast.length) return <p>No cast information available.</p>;

  return (
    <ul className={css.list}>
      {cast.map((p) => (
        <li key={p.cast_id || `${p.id}-${p.credit_id}`} className={css.item}>
          <img src={getPosterUrl(p.profile_path, 185)} alt={p.name} className={css.avatar} loading="lazy" />
          <div>
            <p className={css.name}>{p.name}</p>
            <p className={css.char}>as {p.character || '—'}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
