import { Component } from 'react';
import './PokeList.css';

export class PokemonCard extends Component {

  render() {
    const { pokemon } = this.props;

    return (
      <li className="PokemonCard wrapper-v">
        <h4>{pokemon.pokemon}</h4>
        <img src={pokemon.url_image} alt={pokemon.pokemon}/>
      </li>
    );
  }

}

export default class PokeList extends Component {

  render() {
    const { pokedex } = this.props;

    return (
      <ul className="PokeList">
        {pokedex.map(pokemon => (<PokemonCard key={pokemon._id} pokemon={pokemon}/>))}
      </ul>
    );
  }

}