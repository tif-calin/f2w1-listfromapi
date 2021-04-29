import { Component } from 'react';
import './PokeList.css';

export class PokemonItem extends Component {

  render() {
    console.log('hi');
    return (
      <li className="PokemonItem">
        hi
      </li>
    );
  }

}

export default class PokeList extends Component {

  render() {
    const { pokedex } = this.props;

    return (
      <ul className="PokeList">
        {pokedex.map(pokemon => <PokemonItem key={pokemon._id} pokemon={pokemon}/>)}
      </ul>
    );
  }

}