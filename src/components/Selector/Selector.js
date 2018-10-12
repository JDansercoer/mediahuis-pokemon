import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Pokemon from './Pokemon';
import Detail from '../Detail';
import Selection from '../Selection/Selection';

const Wrapper = styled.div`
  max-width: 970px;
  margin: 0 auto;
  display: flex;
`;

class Selector extends React.Component {
  state = {
    selectedPokemon: '',
    selectedSquad: [],
  };

  setPokemon = pokemon => {
    this.setState({
      selectedPokemon: pokemon,
    });
  };

  addPokemonToSquad = pokemon => {
    this.setState(state => {
      return {
        selectedSquad: _.concat(state.selectedSquad, [pokemon]),
        selectedPokemon: '',
      };
    });
  };

  render() {
    const { selectedPokemon, selectedSquad } = this.state;

    return (
      <Wrapper>
        <Selection selectedSquad={selectedSquad} />
        {selectedPokemon && (
          <Detail
            pokemonName={selectedPokemon}
            addPokemonToSquad={this.addPokemonToSquad}
            key={selectedPokemon}
          />
        )}
        <Pokemon setPokemon={this.setPokemon} />
      </Wrapper>
    );
  }
}

export default Selector;
