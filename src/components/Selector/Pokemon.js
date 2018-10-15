import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _ from 'lodash';
import ApiFetcher from '../../utils/ApiFetcher';

const Title = styled.div`
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${props => props.theme.mainBlack};
  margin-bottom: 3px;
  text-align: center;
`;

const ResultsWrapper = styled.div`
  height: 200px;
  overflow-y: auto;
  visibility: hidden;

  &:focus,
  &:hover {
    visibility: visible;
  }
`;

const Results = styled.div`
  visibility: visible;
`;

const Loading = styled.div`
  visibility: visible;
  color: ${props => props.theme.mainLight};
  font-size: 12px;
  text-align: center;
`;

const Search = styled.input`
  outline: none;
  border: 3px solid ${props => props.theme.mainColor};
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const Result = styled.div`
  background-color: ${props => props.theme.mainColor};
  color: ${props => props.theme.mainWhite};
  padding: 7px 14px;
  text-transform: uppercase;
  font-size: 14px;
  border-radius: 10px;
  margin: 4px 0;
  cursor: pointer;
`;

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
      <div>
        <Title>Select a pokemon</Title>
        <Search
          onChange={this.updateSearchString}
          value={searchString}
          placeholder="Type to filter"
        />
        <ResultsWrapper>
          <ApiFetcher url="pokemon/" fields={['results']}>
            {({ results: species }, hasResults) => {
              const filteredSpecies = _.filter(species, specie => {
                return _.startsWith(specie.name, searchString);
              });
              if (hasResults) {
                return (
                  <Results>
                    {_.map(_.sortBy(filteredSpecies, ['name']), specie => (
                      <Result
                        key={specie.name}
                        onClick={() => {
                          setPokemon(specie.name);
                        }}
                        onKeyPress={() => {
                          setPokemon(specie.name);
                        }}
                      >
                        {specie.name}
                      </Result>
                    ))}
                  </Results>
                );
              }

              return <Loading>Loading Pokémon...</Loading>;
            }}
          </ApiFetcher>
        </ResultsWrapper>
      </div>
    );
  }
}

Pokemon.propTypes = {
  setPokemon: PropTypes.func.isRequired,
};

export default Pokemon;
