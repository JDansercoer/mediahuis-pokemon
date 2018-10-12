import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import ApiFetcher from '../../utils/ApiFetcher';
import Selection from '../Selection/Selection';

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
    } else {
      if (_.size(selectedMoves) < 4 && this.isMoveAllowed(selectedMoves, move)) {
        this.setState(state => {
          return {
            selectedMoves: _.concat(state.selectedMoves, [move]),
          };
        });
      }
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
          const groupedMoves = _.groupBy(moves, move => {
            return move.version_group_details[0].move_learn_method.name;
          });
          return (
            <div>
              Pokemon: {pokemonName}
              <br />
              <button
                onClick={() => {
                  this.selectPokemon(sprites.front_default);
                }}
              >
                Save pokemon
              </button>
              <br />
              <img src={sprites.front_default} />
              {_.map(this.state.selectedMoves, 'move.name')}
              {_.map(stats, stat => (
                <div key={stat.stat.name}>
                  <strong>{stat.stat.name}</strong>
                  {stat.base_stat}
                </div>
              ))}
              {_.map(groupedMoves, (moveGroup, groupName) => {
                return (
                  <div key={groupName}>
                    <strong>{groupName}</strong>
                    {_.map(_.sortBy(moveGroup, ['move.name']), move => {
                      return (
                        <div key={move.move.name} onClick={() => this.selectMove(move)}>
                          {move.move.name}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
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
