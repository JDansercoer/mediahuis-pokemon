import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ApiFetcher from '../../utils/ApiFetcher';

const Generations = ({ setGeneration }) => {
  return (
    <ApiFetcher url="generation/" field="results">
      {generations =>
        _.map(generations, generation => (
          <div
            onClick={() => {
              setGeneration(generation.name);
            }}
            key={generation.name}
            role="button"
            tabIndex={0}
            onKeyPress={() => {
              setGeneration(generation.name);
            }}
          >
            {generation.name}
          </div>
        ))
      }
    </ApiFetcher>
  );
};

Generations.propTypes = {
  setGeneration: PropTypes.func.isRequired,
};

export default Generations;
