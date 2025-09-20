import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <section className={css.wrap}>
      <h1>Page not found</h1>
      <Link to="/">Go to Home</Link>
    </section>
  );
}
