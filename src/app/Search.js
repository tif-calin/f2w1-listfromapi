import { Component } from 'react';
import './Search.css';

export default class Search extends Component {

  handleSubmit = e => {
    e.preventDefault();
  }

  render() {
    return (
      <form className="Search wrapper-h">
        <label for="search">search</label>
        <input className="search" name="search" placeholder="search"/>
        <select className="searchField" name="searchField">
          <option value="pokemon">name</option>
        </select>

        <label for="filters">filter</label>
        <button className="filters">⬇️</button>

        <label for="sort">sort by</label>
        <select className="sort" name="sort">
          <option value="species_id">pokedex #</option>
          <option value="pokemon">name</option>
          <option value="height">height</option>
          <option value="attack">attack</option>
          <option value="defence">defence</option>
          <option value="hp">health</option>
          <option value="speed">speed</option>
          <option value="special_attack">special attack</option>
          <option value="special_defence">special defence</option>
        </select>
        <button className="reverse" name="reverse">🔃</button>

        <label for="page-nav">page nav</label>
        <fieldset className="page-nav" name="page-nav">
          <button className="page-button">&#9664;</button>
          <input className="page-number" min="0" type="number"/>
          <button className="page-button">&#9654;</button>
        </fieldset>

        <label for="per-page">per page</label>
        <select className="per-page" name="per-page">
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </form>
    );
  }

}