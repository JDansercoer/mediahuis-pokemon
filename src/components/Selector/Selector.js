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

const HeaderImage = styled.img`
  width: 200px;
  margin: 0 auto 30px;
  display: block;
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
    const { selectedSquad } = this.state;

    if (_.size(selectedSquad) < 6) {
      this.setState(state => {
        return {
          selectedSquad: _.concat(state.selectedSquad, [pokemon]),
        };
      });
    }
  };

  removePokemonFromSquad = index => {
    const { selectedSquad } = this.state;

    const squadClone = _.cloneDeep(selectedSquad);
    squadClone.splice(index, 1);

    this.setState({
      selectedSquad: squadClone,
    });
  };

  render() {
    const { selectedPokemon, selectedSquad } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <Wrapper>
          <HeaderImage src="https://vignette.wikia.nocookie.net/logopedia/images/2/2b/Pokemon_2D_logo.svg/revision/latest/scale-to-width-down/639?cb=20170115063554" />
          <SelectionWrapper>
            <ListWrapper>
              <Pokemon setPokemon={this.setPokemon} />
            </ListWrapper>
            <DetailWrapper>
              <Detail
                pokemonName={selectedPokemon}
                addPokemonToSquad={this.addPokemonToSquad}
                key={selectedPokemon}
              />
            </DetailWrapper>
          </SelectionWrapper>
          <Selection selectedSquad={selectedSquad} removePokemon={this.removePokemonFromSquad} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

export default Selector;
