import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/tmdb';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;
    (async () => {
      try { setLoading(true); const data = await fetchMovieReviews(movieId); if (!ignore) setReviews(data); }
      catch { setError('Failed to load reviews'); }
      finally { setLoading(false); }
    })();
    return () => { ignore = true; };
  }, [movieId]);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!reviews.length) return <p>No reviews available.</p>;

  return (
    <ul className={css.list}>
      {reviews.map((r) => (
        <li key={r.id} className={css.item}>
          <p className={css.author}>Author: {r.author}</p>
          <p>{r.content}</p>
        </li>
      ))}
    </ul>
  );
}
