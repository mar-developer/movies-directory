import React, { Component } from 'react';
import axios from 'axios';

import Films from '../Films';
import './style.css';

const filmsEndpointURL = "https://app.codescreen.com/api/assessments/films"
const apiToken = "8c5996d5-fb89-46c9-8821-7063cfbc18b1"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      value: ''
    }
  }

  getDirectorFilms = (e) => {
    e.preventDefault();

    axios.get(filmsEndpointURL, {
      headers: {
        Authorization: `Bearer ${apiToken}`
      },
      params: {
        directorName: this.state.value
      }
    }).then(response => {
      const films = response.data;

      this.setState({
        films
      });
    }).catch(error => {
      console.log(error);
    });
  }

  handleChange = (event) => { 
    this.setState({value: event.target.value});
  }



  render() {
    return (
      <div>
        <p className="films-analysis-service">Films Analysis Service </p>

        <form id="input-form" onSubmit={this.getDirectorFilms} className='form'>
          <input 
            id="input-box" 
            className="enter-director-name" 
            placeholder='Enter director name'
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button
            type='submit'
            className="submit-button"
          >
            <p className="submit-button-text">Submit</p>
          </button>
        </form>

        <Films 
          films={this.state.films}
        />
      </div>
    );
  }
}

export default App;