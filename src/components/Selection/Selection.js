import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`;

const Selection = ({ selectedSquad }) => (
  <Wrapper>
    {_.map(selectedSquad, pokemon => (
      <div key={pokemon.name}>
        <img src={pokemon.image} />
        {pokemon.name}
      </div>
    ))}
  </Wrapper>
);

Selection.propTypes = {
  selectedSquad: PropTypes.arrayOf(PropTypes.object),
};

export default Selection;
