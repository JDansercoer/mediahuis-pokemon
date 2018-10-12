import React from 'react';
import PropTypes from 'prop-types';

const Selection = ({ selectedSquad }) => (
  <div>
    {_.map(selectedSquad, pokemon => (
      <div key={pokemon.name}>
        <img src={pokemon.image} />
        {pokemon.name}
      </div>
    ))}
  </div>
);

Selection.propTypes = {
  selectedSquad: PropTypes.arrayOf(PropTypes.object),
};

export default Selection;
