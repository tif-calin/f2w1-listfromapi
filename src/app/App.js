import { Component } from 'react';
import './App.css';
import React from 'react';

import Header from './Header';
import Footer from './Footer';
import PokeList from './PokeList';

class App extends Component {
  state = {
    pokedex: []
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
