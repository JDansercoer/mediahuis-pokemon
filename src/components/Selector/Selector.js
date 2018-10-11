import React from 'react';
import Generations from './Generations';
import Pokemon from './Pokemon';

class Selector extends React.Component {
  state = {
    selectedGeneration: '',
    selectedPokemon: '',
  };

  setGeneration = generation => {
    this.setState({
      selectedGeneration: generation,
    });
  };

  unsetGeneration = () => {
    this.setState({
      selectedGeneration: '',
    });
  };

  setPokemon = pokemon => {
    this.setState({
      selectedPokemon: pokemon,
    });
  };

  render() {
    const { selectedGeneration, selectedPokemon } = this.state;

    return (
      <>
        Generation: {selectedGeneration}<br />
        Pokemon: {selectedPokemon}<br />
        <button onClick={this.unsetGeneration}>Reset</button>
        {!selectedGeneration && <Generations setGeneration={this.setGeneration} />}
        {selectedGeneration && (
          <Pokemon generation={selectedGeneration} setPokemon={this.setPokemon} />
        )}
      </>
    );
  }
}

export default Selector;
