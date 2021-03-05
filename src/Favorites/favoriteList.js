import React, { Component } from 'react';
import { getFavorites, deleteFavorite } from '../api-utils.js';

export default class favoriteList extends Component {
  state = {
    favorites: [],
    favorite: ''
  };

  componentDidMount = async () => {
    const favorites = await getFavorites(this.props.user.token);
    console.log(favorites);
    this.setState({ favorites });
  };

  handleDeleteItem = async (favorite) => {
    console.log(favorite);
    await deleteFavorite(favorite.id, this.props.user.token);

    const newFavorites = await getFavorites(this.props.user.token);
    this.setState({ favorites: newFavorites });
  };

  render() {
    return (
      <div>
        <div className="plants">
          {this.state.favorites.map((favorite) => (
            <div key={`${favorite.id}`} className="plant">
              <h5>{favorite.name}</h5>
              <img
                src={`${favorite.image}`}
                alt={favorite.name}
                className="plant-image"
                onError={this.onError}
              />
              <p>
                <button onClick={() => this.handleDeleteItem(favorite)}>
                  remove this plant
                </button>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
