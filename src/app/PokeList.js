import { Component } from 'react';
import './PokeList.css';

export class PokemonCard extends Component {

  render() {
    const { pokemon } = this.props;

    return (
      <li className="PokemonCard wrapper-v">
        <h4>{pokemon.pokemon}</h4>
        <img src={pokemon.url_image} alt={pokemon.pokemon}/>
        <div className="pokemon-stats">
          <span>{pokemon.hp}</span>
          <span>{pokemon.attack}</span>
          <span>{pokemon.defense}</span>
          <span>{pokemon.special_attack}</span>
          <span>{pokemon.special_defense}</span>
          <span>{pokemon.speed}</span>
        </div>
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