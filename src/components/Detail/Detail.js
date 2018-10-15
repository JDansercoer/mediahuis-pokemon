import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';
import ApiFetcher from '../../utils/ApiFetcher';
import { capitalizeMoveName, getMoveMethod } from '../../utils/Functions';
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
  color: ${props => props.theme.mainColor};
  text-transform: uppercase;
  margin: 0;
  font-size: 18px;
  font-weight: bold;
`;

const SaveButton = styled.div`
  background-color: ${props => props.theme.mainColor};
  color: ${props => props.theme.mainWhite};
  text-transform: uppercase;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 13px;
  text-align: center;
`;

const MiddleWrapper = styled.div`
  width: 50%;
  margin: 0 15px;
`;

const MiddleHeader = styled.h3`
  text-transform: uppercase;
  margin: 6px 0 3px;
  color: ${props => props.theme.mainBlack};
  text-align: center;
  font-size: 10px;
`;

const SelectedMovesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SelectedMove = styled.div`
  width: 49%;
  padding: 5px;
  border: 1px solid ${props => props.theme.mainColor};
  margin-bottom: 5px;
  box-sizing: border-box;
  user-select: none;
`;

const MoveMethod = styled.div`
  color: ${props => props.theme.mainLight};
  text-transform: uppercase;
  font-size: 10px;
`;

const MoveName = styled.div`
  color: ${props => props.theme.mainBlack};
`;

const NoResultsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const NoResultsString = styled.div`
  font-size: 14px;
  color: ${props => props.theme.mainLight};
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

  selectPokemon = (image, types) => {
    const { selectedMoves } = this.state;
    const { addPokemonToSquad, pokemonName } = this.props;

    addPokemonToSquad({
      name: pokemonName,
      image,
      selectedMoves,
      types,
    });
  };

  render() {
    const { selectedMoves } = this.state;
    const { pokemonName } = this.props;

    return (
      <ApiFetcher url={`pokemon/${pokemonName}/`} fields={['sprites', 'moves', 'stats', 'types']}>
        {({ sprites, moves, stats, types }, hasResults) => {
          if (hasResults) {
            return (
              <Wrapper>
                <GeneralWrapper>
                  <PokemonImage src={sprites.front_default} />
                  <PokemonName>{pokemonName}</PokemonName>
                  <SaveButton
                    onClick={() => {
                      this.selectPokemon(sprites.front_default, types);
                    }}
                  >
                    Save pokemon
                  </SaveButton>
                </GeneralWrapper>
                <MiddleWrapper>
                  <MiddleHeader>Stats</MiddleHeader>
                  <Stats stats={stats} />
                  <MiddleHeader>Selected Moves</MiddleHeader>
                  <SelectedMovesWrapper>
                    {_.map(selectedMoves, selectedMove => (
                      <SelectedMove>
                        <MoveMethod>{getMoveMethod(selectedMove)}</MoveMethod>
                        <MoveName>{capitalizeMoveName(selectedMove.move.name)}</MoveName>
                      </SelectedMove>
                    ))}
                  </SelectedMovesWrapper>
                </MiddleWrapper>
                <Moves moves={moves} selectMove={this.selectMove} />
              </Wrapper>
            );
          }

          return (
            <NoResultsWrapper>
              <NoResultsString>Loading</NoResultsString>
            </NoResultsWrapper>
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
