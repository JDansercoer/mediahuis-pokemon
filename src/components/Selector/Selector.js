import React from 'react';
import Pokemon from './Pokemon';

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
        <Pokemon setPokemon={this.setPokemon} />
      </>
    );
  }
}

export default Selector;
