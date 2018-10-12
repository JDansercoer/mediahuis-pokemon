import React from 'react';
import PropTypes from 'prop-types';
import ApiFetcher from '../../utils/ApiFetcher';

class Detail extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { pokemonName } = this.props;

    return (
      <ApiFetcher url={`pokemon/${pokemonName}/`} fields={['sprites', 'moves']}>
        {({ sprites, moves }) => <img src={sprites.front_default} />}
      </ApiFetcher>
    );
  }
}

Detail.propTypes = {
  pokemonName: PropTypes.string.isRequired,
};

export default Detail;
