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
    this.setState({ searchField: e.target.value }, () => this.handleSubmit(e));
  }

  handleSortChange = e => {
    this.setState({ sort: e.target.value }, () => this.handleSubmit(e));
  }

  handleReverseClick = e => {
    this.setState({ reverse: !this.state.reverse }, () => this.handleSubmit(e));
  }

  handleFirstPageClick = e => {
    this.setState({ page: 1 }, () => this.handleSubmit(e));
  }

  handlePrevPageClick = e => {
    this.setState({ page: Math.max(1, this.state.page - 1) }, () => this.handleSubmit(e));
  }

  handleNextPageClick = e => {
    const maxPage = Math.ceil(801 / this.state.perPage);
    this.setState({ page: Math.min(this.state.page + 1, maxPage) }, () => this.handleSubmit(e));
  }

  handleLastPageClick = e => {
    this.setState({ page: Math.ceil(801 / this.state.perPage) }, () => this.handleSubmit(e));
  }

  handlePageChange = e => {
    const maxPage = Math.ceil(801 / this.state.perPage);
    const page = Number(e.target.value);
    if (page) this.setState({ page: Math.min(page, maxPage) }, () => this.handleSubmit(e));
  }

  handlePerPageChange = e => {
    const perPage = Number(e.target.value);
    const maxPage = Math.ceil(801 / perPage);
    this.setState({ perPage: perPage, page: Math.min(this.state.page, maxPage) }, () => this.handleSubmit(e));
  }

  // render Search component
  render() {

    const { allTypes, allEggGroups, allShapes } = this.state;
    
    return (
      <form className="Search wrapper-h" onSubmit={this.handleSubmit}>
        {/*search*/}
        <label htmlFor="search">search</label>
        <input className="search" name="search" onChange={this.handleSearchChange}/>
        <select className="searchField" name="searchField" onChange={this.handleSearchFieldChange}>
          <option value="pokemon">name</option>
          <option value="species_id">pokedex #</option>
          <option value="ability_1">ability</option>
        </select>

        {/*filters*/}
        <label htmlFor="filters">filter</label>
        <div className="filters">
          <button className="emoji-button">⬇️</button>
          <div className="filters-dropdown wrapper-v">
            <fieldset>
              <legend>type 1</legend>
              {allTypes.map(type => <span><input type="checkbox"/><label>{type}</label></span>)}
            </fieldset>
            <fieldset>
              <legend>type 2</legend>
              {allTypes.map(type => <span><input type="checkbox"/><label>{type}</label></span>)}
            </fieldset>
            <fieldset>
              <legend>egg group</legend>
              {allEggGroups.map(type => <span><input type="checkbox"/><label>{type}</label></span>)}
            </fieldset>
            <fieldset>
              <legend>shape</legend>
              {allShapes.map(type => <span><input type="checkbox"/><label>{type}</label></span>)}
            </fieldset>
          </div>
        </div>

        {/*sort*/}
        <label htmlFor="sort">sort by</label>
        <select className="sort" name="sort" onChange={this.handleSortChange}>
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
        <button className="reverse emoji-button" name="reverse" onClick={this.handleReverseClick}>🔃</button>

        {/*pages*/}
        <label htmlFor="page-nav">page nav</label>
        <fieldset className="page-nav" name="page-nav">
          <button className="page-button emoji-button" onClick={this.handleFirstPageClick}>|&#9664;</button>
          <button className="page-button emoji-button" onClick={this.handlePrevPageClick}>&#9664;</button>
          <input className="page-number" min="1" type="number" value={this.state.page} onChange={this.handlePageChange}/>
          <button className="page-button emoji-button" onClick={this.handleNextPageClick}>&#9654;</button>
          <button className="page-button emoji-button" onClick={this.handleLastPageClick}>&#9654;|</button>
        </fieldset>

        {/*results per page*/}
        <label htmlFor="per-page">per page</label>
        <select className="per-page" name="per-page" onChange={this.handlePerPageChange}>
          <option value="24" default>24</option>
          <option value="72">72</option>
          <option value="144">144</option>
        </select>
      </form>
    );
  }

}