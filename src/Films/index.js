import React, { Component } from 'react';
import moment from 'moment';
import './style.css';

export default class Films extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.films !== this.props.films) {
      this.setState({
        cards: [
          {
            id: 'best-rated-film',
            label: "Best rated film",
            value: this.getBestRatedFilm(nextProps.films)
          },
          {
            id: 'longest-film',
            label: "Longest film duration",
            value: this.getLongestFilm(nextProps.films)
          },
          {
            id: 'average-rating',
            label: "Average rating",
            value: this.getAverageRating(nextProps.films)
          },
          {
            id: 'shortest-days-between-releases',
            label: "Shortest days between releases",
            value: this.getShortestNumberOfDaysBetweenFilmReleases(nextProps.films)
          }
        ]
      });
    }
  }

  /**
    * Retrieves the name of the best rated film from the given list of films.
    * If the given list of films is empty, this method should return "N/A".
  */
  getBestRatedFilm(films) {
    if (films.length === 0 ) return "N/A";

    const bestRating = films.sort((a, b) => b.rating - a.rating);
    return bestRating[0].name;
  }
  

  /**
    * Retrieves the length of the film which has the longest running time from the given list of films.
    * If the given list of films is empty, this method should return "N/A".
    * 
    * The return value from this function should be in the form "{length} mins"
    * For example, if the duration of the longest film is 120, this function should return "120 mins".
  */
  getLongestFilm(films) {
    if (films.length === 0 ) return "N/A";

    const longestFilm = films.sort((a, b) => b.length - a.length);
    return `${longestFilm[0].length} mins`;
  }

  /**
    * Retrieves the average rating for the films from the given list of films, rounded to 1 decimal place.
    * If the given list of films is empty, this method should return 0.
  */
  getAverageRating(films) {
    if (films.length === 0 ) return 0;

    const totalRating = films.reduce((acc, film) => acc + film.rating, 0);
    return (totalRating / films.length).toFixed(1);
  }

  /**
    * Retrieves the shortest number of days between any two film releases from the given list of films.
    * 
    * If the given list of films is empty, this method should return "N/A".
    * If the given list contains only one film, this method should return 0.
    * Note that no director released more than one film on any given day.
    * 
    * For example, if the given list is composed of the following 3 entries
    *
    * {
    *    "name": "Batman Begins",
    *    "length": 140,
    *
    *    "rating": 8.2,
    *    "releaseDate": "2006-06-16",
    *    "directorName": "Christopher Nolan"
    * },
    * {
    *    "name": "Interstellar",
    *    "length": 169,
    *    "rating": 8.6,
    *    "releaseDate": "2014-11-07",
    *    "directorName": "Christopher Nolan"
    * },
    * {
    *   "name": "Prestige",
    *   "length": 130,
    *   "rating": 8.5,
    *   "releaseDate": "2006-11-10",
    *   "directorName": "Christopher Nolan"
    * }
    *
    * then this method should return 147, as Prestige was released 147 days after Batman Begins.
  */
  getShortestNumberOfDaysBetweenFilmReleases(films) {
    if (films.length === 0 ) return "N/A";
    if (films.length === 1 ) return 0;

    const sortedFilms = films.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));

    const daysBetweenReleases = sortedFilms.map((film, index) => {
      if (index === 0) return null;

      const days = moment(film.releaseDate).diff(sortedFilms[index - 1].releaseDate, 'days');

      return days;
    });

    return Math.min(...daysBetweenReleases.filter(Boolean));
  }

  render() {
    const {
      cards
    } = this.state;

    return (
      <div className='stats-boxes'>
        {cards.length > 0 && cards.map(card => (
        <div className='stats-box stats-box-right' key={card.id}>
          <p className='stats-box-heading'>{card.label}</p>
          <p className='stats-box-info'>{card.value}</p>
        </div>
        ))}
      </div>
    );
  }
}
