import React, { Component } from 'react';
import { addFavorite, getFavorites, newSearch } from '../api-utils.js';
import '../App.css';

export default class plants extends Component {
  state = {
    query: '',
    plants: [],
    favorites: [],
    plant: '',
    buttonDisabled: false
  };

  componentDidMount = async () => {
    if (this.props.user.token) await this.fetchFavorites();
  };

  handleQueryChange = (e) => this.setState({ query: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    const plants = await newSearch(this.state.query, this.props.user.token);

    this.setState({ plants });
    await this.fetchFavorites();
  };

  //   onError = () => {
  //     src: 'http://www.placekitten.com/200/200';
  //   };

  isAFavorite = (plant) => {
    const determineFavorite = this.state.favorites.find(
      (favorite) => favorite.plant_id === plant.plant_id
    );

    return Boolean(determineFavorite);
  };

  fetchFavorites = async () => {
    const favorites = await getFavorites(this.props.user.token);

    this.setState({ favorites });
    console.log(favorites);
  };
  handleNewFavorite = async (newPlant) => {
    const favorites = await addFavorite(
      {
        name: newPlant.name,
        scientific: newPlant.scientific,
        family: newPlant.family || 'no family provided',
        image: newPlant.image,
        year: newPlant.year,
        plant_id: newPlant.plant_id
      },
      this.props.user.token
    );
    console.log(favorites);
    this.setState({ buttonDisabled: true });

    await this.fetchFavorites();
  };

  render() {
    return (
      <div>
        search bar
        <form onSubmit={this.handleSubmit}>
          <label>find a plant</label>
          <input
            value={this.state.query}
            onChange={this.handleQueryChange}
            placeholder="coconut"
          ></input>
          <button>search!</button>
        </form>
        {/* plant rendering */}
        <div className="plants">
          {this.state.plants.map((plant) => (
            <div key={`${plant.scientific}`} className="plant">
              <h5>{plant.name}</h5>

              <p>
                <button onClick={() => this.handleNewFavorite(plant)}>
                  add to garden
                </button>
              </p>
              <img
                src={`${plant.image}`}
                alt={plant.name}
                className="plant-image"
                onError={this.onError}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
