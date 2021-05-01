import { Component } from 'react';
import './App.css';
import React from 'react';
import request from 'superagent';

import Header from './Header';
import Footer from './Footer';
import Search from './Search';
import PokeList from './PokeList';

const POKEMON_API = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';

class App extends Component {
  // state
  state = {
    pokedex: [],
    perPage: 24,
    page: 1,
    search: '',
    searchField: 'pokemon',
    sort: 'species_id',
    reverse: false,
    filterType1: [],
    filterType2: [],
    filterEggGroup: [],
    filterShape: []
  }

  // api stuff
  componentDidMount() {
    this.fetchPokedex();
  }

  async fetchPokedex() {

    // create query object
    const { search, searchField, sort, page, perPage, reverse, filterType1, filterType2, filterEggGroup, filterShape } = this.state;
    const query = {
      perPage: perPage,
      page: page,
      sort: sort
    };
    if (search) query[searchField] = search;
    if (reverse) query.direction = 'desc';
    else query.direction = 'asc';

    //console.log(query);

    // try to get the response, query it, and set the state
    try {
      let response = null;

      if (filterType1.length + filterType2.length + filterEggGroup.length + filterShape.length) {
        // load every single pokemon instead of just some
        query.perPage = 900;
        query.page = 1;
        response = (await request.get(POKEMON_API).query(query)).body.results;
        response = response.filter(pokemon => 
          filterType1.includes(pokemon.type_1) || 
          filterType2.includes(pokemon.type_2) ||
          filterEggGroup.includes(pokemon.egg_group_1) ||
          filterShape.includes(pokemon.shape));
        
        // manually add in paging
        if (response.length > perPage) {
          const start = 0 + ((page - 1) * perPage);
          const end = Math.min(start + perPage, response.length);
          response = response.slice(start, end);
        }
      } else {
        response = (await request.get(POKEMON_API).query(query)).body.results;
      }

      this.setState({ pokedex: response });
    } 
    catch (err) {
      console.log(err);
      this.setState({ pokedex: [] });
    }

  }

  // handlers
  onSearch = (query) => {
    this.setState(query, () => this.fetchPokedex());
  }

  // render
  render() {
    const { pokedex } = this.state;

    return (
      <div className="App">
        <Header/>

        <main className="wrapper-v">
          <Search onSearch={this.onSearch}/>
          <PokeList pokedex={pokedex}/>
        </main>

        <Footer/>      
      </div>
    );
  }

}

export default App;
