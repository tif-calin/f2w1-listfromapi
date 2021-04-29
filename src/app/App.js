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
  state = {
    pokedex: [],
    perPage: 20,
    page: 1
  }

  componentDidMount() {
    this.fetchPokedex();
  }

  async fetchPokedex() {
    try {
      const response = await request.get(POKEMON_API);

      console.log(response.body.results);

      this.setState({ pokedex: response.body.results });
    } catch (err) {
      console.log(err);
    }
    finally {
      this.setState([]);
    }

  }

  render() {
    const { pokedex } = this.state;

    return (
      <div className="App">
        <Header/>

        <main>
          <Search/>
          <PokeList pokedex={pokedex}/>
        </main>

        <Footer/>      
      </div>
    );
  }

}

export default App;
