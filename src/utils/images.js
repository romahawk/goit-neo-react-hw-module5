export const getPosterUrl = (path, size=500) =>
  path ? `https://image.tmdb.org/t/p/w${size}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';
