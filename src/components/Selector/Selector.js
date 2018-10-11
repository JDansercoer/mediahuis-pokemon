import React from 'react';
import Pokemon from './Pokemon';
import Detail from '../Detail';

class Selector extends React.Component {
  state = {
    selectedPokemon: '',
  };

  setPokemon = pokemon => {
    this.setState({
      selectedPokemon: pokemon,
    });
  };

  render() {
    const { selectedPokemon } = this.state;

    return (
      <>
        Pokemon: {selectedPokemon}
        <br />
        <Detail pokemonName={selectedPokemon} />
        <br />
        <Pokemon setPokemon={this.setPokemon} />
      </>
    );
  }
}

export default Selector;
