import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import ApiFetcher from '../../utils/ApiFetcher';
import Moves from './Moves';
import Stats from './Stats';

const Wrapper = styled.div`
  display: flex;
`;

const GeneralWrapper = styled.div`
  width: 20%;
`;

const PokemonImage = styled.img`
  display: block;
  width: 96px;
  height: 96px;
`;

const PokemonName = styled.h2`
  color: #B97375;
  text-transform: uppercase;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const SaveButton = styled.div`
  background-color: #B97375;
  color: white;
  text-transform: uppercase;
  padding: 7px 14px;
  cursor: pointer;
`;

class Detail extends React.Component {
  state = {
    selectedMoves: [],
  };

  isMoveAllowed = (selectedMoves, move) => {
    if (move.version_group_details[0].move_learn_method.name === 'level-up') {
      return true;
    }

    const selectedMethods = _.map(selectedMoves, 'version_group_details[0].move_learn_method.name');
    return !_.includes(selectedMethods, move.version_group_details[0].move_learn_method.name);
  };

  selectMove = move => {
    const { selectedMoves } = this.state;
    if (_.find(selectedMoves, ['move.name', move.move.name])) {
      this.setState(state => {
        return {
          selectedMoves: _.differenceBy(state.selectedMoves, [move], 'move.name'),
        };
      });
    } else if (_.size(selectedMoves) < 4 && this.isMoveAllowed(selectedMoves, move)) {
      this.setState(state => {
        return {
          selectedMoves: _.concat(state.selectedMoves, [move]),
        };
      });
    }
  };

  selectPokemon = image => {
    const { selectedMoves } = this.state;
    const { addPokemonToSquad, pokemonName } = this.props;

    addPokemonToSquad({
      name: pokemonName,
      image,
      selectedMoves,
    });
  };

  render() {
    const { pokemonName } = this.props;

    return (
      <ApiFetcher url={`pokemon/${pokemonName}/`} fields={['sprites', 'moves', 'stats']}>
        {({ sprites, moves, stats }) => {
          return (
            <Wrapper>
              <GeneralWrapper>
                <PokemonImage src={sprites.front_default} />
                <PokemonName>{pokemonName}</PokemonName>
                <SaveButton
                  onClick={() => {
                    this.selectPokemon(sprites.front_default);
                  }}
                >
                  Save pokemon
                </SaveButton>
              </GeneralWrapper>
              <Stats stats={stats} />
              <Moves moves={moves} selectMove={this.selectMove}/>
            </Wrapper>
          );
        }}
      </ApiFetcher>
    );
  }
}

Detail.propTypes = {
  pokemonName: PropTypes.string.isRequired,
  addPokemonToSquad: PropTypes.func.isRequired,
};

export default Detail;
