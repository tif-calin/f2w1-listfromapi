import { Component } from 'react';
import './Search.css';
import request from 'superagent';

const [TYPES_API, SHAPES_API, EGGGROUPS_API] = [
  'https://pokedex-alchemy.herokuapp.com/api/pokedex/types', 
  'https://pokedex-alchemy.herokuapp.com/api/pokedex/shapes', 
  'https://pokedex-alchemy.herokuapp.com/api/pokedex/eggGroups'
];

export default class Search extends Component {

  state = {
    allTypes: [],
    allShapes: [],
    allEggGroups: [],
    perPage: 50,
    page: 1,
    search: '',
    searchField: 'pokemon',
    sort: 'species_id',
    reverse: false
  }

  async fetchFilters() {
    try {
      const allTypes = (await request(TYPES_API)).body.map(obj => obj.type).sort();
      const allShapes = (await request(SHAPES_API)).body.map(obj => obj.shape).sort();
      const allEggGroups = (await request(EGGGROUPS_API)).body.map(obj => obj.eggGroup).sort();

      this.setState({ allTypes: allTypes, allShapes: allShapes, allEggGroups: allEggGroups });
    }
    catch (err) {
      console.log(err);
    }
  }

  async componentDidMount() {
    this.fetchFilters();
  }

  // handlers
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state);
  }

  handleSearchChange = e => {
    this.setState({ search: e.target.value });
  }

  handleSearchFieldChange = e => {
    this.setState({ searchField: e.target.value });
  }

  // render Search component
  render() {
    return (
      <form className="Search wrapper-h" onSubmit={this.handleSubmit}>
        {/*search*/}
        <label htmlFor="search">search</label>
        <input className="search" name="search" placeholder="search" onChange={this.handleSearchChange}/>
        <select className="searchField" name="searchField">
          <option value="pokemon">name</option>
        </select>

        {/*filters*/}
        <label htmlFor="filters">filter</label>
        <button className="filters">⬇️</button>

        {/*sort*/}
        <label htmlFor="sort">sort by</label>
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

        {/*pages*/}
        <label htmlFor="page-nav">page nav</label>
        <fieldset className="page-nav" name="page-nav">
          <button className="page-button">&#9664;</button>
          <input className="page-number" min="0" type="number"/>
          <button className="page-button">&#9654;</button>
        </fieldset>

        {/*results per page*/}
        <label htmlFor="per-page">per page</label>
        <select className="per-page" name="per-page">
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </form>
    );
  }

}