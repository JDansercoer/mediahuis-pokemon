import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import { getTypeHexCode } from '../../utils/Functions';

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.theme.mainBlack};
  margin-bottom: 6px;
  text-align: center;
  margin-top: 15px;
`;

const Wrapper = styled.div`
  display: flex;
  height: 200px;
`;

const Pokemon = styled.div`
  background-color: ${props => (props.type ? getTypeHexCode(props.type) : props.theme.mainLight)};
  width: ${100 / 6 - 2}%;
  margin: 0 1%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.justify || 'flex-start'};
`;

const PokemonImage = styled.img`
  width: 96px;
  height: 96px;
  display: block;
`;

const PokemonName = styled.div`
  color: ${props => props.theme.mainWhite};
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
`;

const NoPokemon = styled.div`
  font-size: 10px;
  text-transform: lowercase;
  color: ${props => props.theme.mainBlack};
  text-align: center;
`;

const getPrimaryTypeName = types => {
  const primaryType = _.find(types, ['slot', 1]);

  return primaryType.type.name;
};

const Selection = ({ selectedSquad }) => {
  let paddedSelection;

  if (_.size(selectedSquad) < 6) {
    paddedSelection = _.concat(selectedSquad, _.times(6 - _.size(selectedSquad), _.constant(0)));
  } else {
    paddedSelection = selectedSquad;
  }

  return (
    <>
      <Title>Selected squad</Title>
      <Wrapper>
        {_.map(paddedSelection, (pokemon, index) => {
          if (pokemon) {
            return (
              <Pokemon key={pokemon.name} type={getPrimaryTypeName(pokemon.types)}>
                <PokemonImage src={pokemon.image} />
                <PokemonName>{pokemon.name}</PokemonName>
              </Pokemon>
            );
          }

          return (
            <Pokemon justify="center" key={index}>
              <NoPokemon>Empty</NoPokemon>
            </Pokemon>
          );
        })}
      </Wrapper>
    </>
  );
};

Selection.propTypes = {
  selectedSquad: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Selection;
