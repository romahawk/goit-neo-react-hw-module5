import axios from 'axios';
const token = import.meta.env.VITE_TMDB_TOKEN;

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: { Authorization: `Bearer ${token}` },
  params: { language: 'en-US' },
});

export const fetchTrendingMovies = async () => {
  const { data } = await api.get('/trending/movie/day');
  return data.results || [];
};
export const searchMovies = async (query, page=1) => {
  const { data } = await api.get('/search/movie', { params:{ query, include_adult:false, page } });
  return data.results || [];
};
export const fetchMovieDetails = async (id) => (await api.get(`/movie/${id}`)).data;
export const fetchMovieCredits = async (id) => (await api.get(`/movie/${id}/credits`)).data.cast || [];
export const fetchMovieReviews = async (id, page=1) => (await api.get(`/movie/${id}/reviews`, { params:{ page } })).data.results || [];
