import React from 'react';
import _ from 'lodash';
import styled, { ThemeProvider } from 'styled-components';
import Pokemon from './Pokemon';
import Detail from '../Detail';
import Selection from '../Selection/Selection';

const theme = {
  mainColor: '#3A5D9F',
  secondaryColor: '#FDCC07',
  mainWhite: '#FFF',
  mainLight: '#C1C8CA',
};

const Wrapper = styled.div`
  max-width: 980px;
  margin: 0 auto;
`;

const SelectionWrapper = styled.div`
  display: flex;
`;

const DetailWrapper = styled.div`
  width: 80%;
`;

const ListWrapper = styled.div`
  width: 20%;
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
      };
    });
  };

  render() {
    const { selectedPokemon, selectedSquad } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <SelectionWrapper>
            <ListWrapper>
              <Pokemon setPokemon={this.setPokemon} />
            </ListWrapper>
            <DetailWrapper>
              {selectedPokemon && (
                <Detail
                  pokemonName={selectedPokemon}
                  addPokemonToSquad={this.addPokemonToSquad}
                  key={selectedPokemon}
                />
              )}
            </DetailWrapper>
          </SelectionWrapper>
          <Selection selectedSquad={selectedSquad} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default Selector;
