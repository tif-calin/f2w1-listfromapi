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
    perPage: 50,
    page: 1,
    search: '',
    searchField: 'pokemon',
    sort: 'species_id',
    reverse: false
  }

  // api stuff
  componentDidMount() {
    this.fetchPokedex();
  }

  async fetchPokedex() {

    // create query object
    const { search, searchField, sort, page, perPage, reverse } = this.state;
    const query = {
      perPage: perPage,
      page: page,
      sort: sort
    };
    if (search) query[searchField] = search;
    if (reverse) query.direction = 'desc';

    // try to get the response, query it, and set the state
    try {
      let response = await request.get(POKEMON_API).query(query);
      this.setState({ pokedex: response.body.results });
    } 
    catch (err) {
      console.log(err);
      this.setState({ pokedex: [] });
    }

  }

  // handlers
  handleSearch = (query) => {
    this.fetchPokedex(query);
  }

  render() {
    const { pokedex } = this.state;

    return (
      <div className="App">
        <Header/>

        <main className="wrapper-v">
          <Search/>
          <PokeList pokedex={pokedex}/>
        </main>

        <Footer/>      
      </div>
    );
  }

}

export default App;
