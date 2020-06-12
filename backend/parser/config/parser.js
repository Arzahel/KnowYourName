const apiKey = 'aedd9b962ab5bfeb65af73f005ce17c9';
const urls = {
  genres: 'https://api.themoviedb.org/3/genre/list',
  search: {
    movies: 'https://api.themoviedb.org/3/search/movie',
    people: 'https://api.themoviedb.org/3/search/person',
    serials: 'https://api.themoviedb.org/3/search/tv',
  },
  movie: 'https://api.themoviedb.org/3/movie/',
  serial: 'https://api.themoviedb.org/3/tv',
  images: 'https://image.tmdb.org/t/p/w500',
  profileImage: 'https://image.tmdb.org/t/p/w138_and_h175_face/',
  credits: '/credits',
  person: 'https://api.themoviedb.org/3/person/',
  latestMovie: 'https://api.themoviedb.org/3/movie/latest',
  latestSerial: 'https://api.themoviedb.org/3/tv/latest',
};

module.exports = {
  apiKey,
  latestMovie: urls.latestMovie,
  latestSerial: urls.latestSerial,
  search: {
    movies(query, page, year, region) {
      let url = `${urls.search.movies}&query=${query}`;

      url += page ? `&page=${page}` : '';
      url += year ? `&year=${year}` : '';
      url += region ? `&region=${region}` : '';

      return url;
    },

    people(query, page, region) {
      let url = `${urls.search.people}&query=${query}`;

      url += page ? `&page=${page}` : '';
      url += region ? `&region=${region.toUpperCase}` : '';

      return url;
    },
  },
  movie: (id, credits = false) => {
    let url = urls.movie + id;

    url += credits ? urls.credits : '';

    return url;
  },

  serial: (id) => `${urls.serial}/${id}`,
  season: (serialId, seasonId) => `${urls.serial}/${serialId}/season/${seasonId}`,

  image: (path) => urls.images + path,
  profileImage: (path) => urls.profileImage + path,

  genres: urls.genres,

  person: (id) => urls.person + id,

  DELAY: 500,
};
