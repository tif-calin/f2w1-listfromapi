import { Component } from 'react';
import './App.css';
import React from 'react';
import request from 'superagent';

import Header from './Header';
import Footer from './Footer';
import PokeList from './PokeList';

const POKEMON_API = 'https://pokedex-alchemy.herokuapp.com/api/pokedex';

class App extends Component {
  state = {
    pokedex: []
  }

  componentDidMount() {
    this.fetchPokedex();
  }

  async fetchPokedex() {
    try {
      const response = await request.get(POKEMON_API);

      this.setState(response.results);
    } catch (err) {
      console.log(err);
    }
    finally {
      this.setState([]);
    }

  }

  render() {
    return (
      <div className="App">
        <Header/>
        <main>
          <PokeList/>
        </main>
        <Footer/>      
      </div>
    );
  }

}

export default App;
