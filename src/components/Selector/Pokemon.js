import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ApiFetcher from '../../utils/ApiFetcher';

class Pokemon extends React.Component {
  state = {
    searchString: '',
  };

  updateSearchString = event => {
    this.setState({
      searchString: event.target.value,
    });
  };

  render() {
    const { searchString } = this.state;
    const { setPokemon } = this.props;

    return (
      <>
        <input onChange={this.updateSearchString} value={searchString} />
        <ApiFetcher url="pokemon/" fields={['results']}>
          {({ results: species }) => {
            const filteredSpecies = _.filter(species, specie => {
              return _.startsWith(specie.name, searchString);
            });
            return _.map(_.sortBy(filteredSpecies, ['name']), specie => (
              <div
                key={specie.name}
                onClick={() => {
                  setPokemon(specie.name);
                }}
                role="button"
                tabIndex={0}
                onKeyPress={() => {
                  setPokemon(specie.name);
                }}
              >
                {specie.name}
              </div>
            ));
          }}
        </ApiFetcher>
      </>
    );
  }
}

Pokemon.propTypes = {
  setPokemon: PropTypes.func.isRequired,
};

export default Pokemon;
