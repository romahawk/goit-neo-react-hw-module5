import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import { getPosterUrl } from '../../utils/images';

export default function MovieList({ movies = [] }) {
  const location = useLocation();
  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id} className={css.card}>
          <Link to={`/movies/${m.id}`} state={{ from: location }} className={css.itemLink} title={m.title || m.name}>
            <img src={getPosterUrl(m.poster_path, 342)} alt={m.title || m.name} className={css.poster} loading="lazy" />
            <span className={css.title}>{m.title || m.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
