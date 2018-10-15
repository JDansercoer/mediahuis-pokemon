import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

const GroupName = styled.span`
  margin-right: 5px;
  color: #B97375;
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  border-bottom: ${props => (props.selected ? 1 : 0)}px solid #B97375;
`;

class Moves extends React.Component {
  state = {
    selectedGroup: '',
  };

  setSelectedGroup = groupName => {
    this.setState({
      selectedGroup: groupName,
    });
  };

  render() {
    const { selectedGroup } = this.state;
    const { moves } = this.props;

    const groupedMoves = _.groupBy(moves, move => {
      return move.version_group_details[0].move_learn_method.name;
    });

    return (
      <div>
        {_.map(_.keys(groupedMoves), groupName => {
          return (
            <GroupName
              onClick={() => {
                this.setSelectedGroup(groupName);
              }}
              selected={selectedGroup === groupName}
              key={groupName}
            >
              {groupName}
            </GroupName>
          );
        })}
        {selectedGroup ? (
          <div>
            {_.map(groupedMoves[selectedGroup], move => {
              return <div>{move.move.name}</div>;
            })}
          </div>
        ) : (
          <div>Select a group first</div>
        )}
      </div>
    );
  }
}

Moves.propTypes = {
  moves: PropTypes.array,
};

export default Moves;
