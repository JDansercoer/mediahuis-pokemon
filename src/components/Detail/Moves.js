import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const GroupNames = styled.div``;

const GroupName = styled.span`
  margin-right: 5px;
  color: ${props => props.theme.mainColor};
  font-size: 12px;
  text-transform: uppercase;
  cursor: pointer;
  border-bottom: ${props => (props.selected ? 1 : 0)}px solid ${props => props.theme.mainColor};
`;

const MovesWrapper = styled.div`
  max-height: 210px;
  overflow: auto;
`;

const Move = styled.div`
  color: ${props => props.theme.mainBlack};
  cursor: pointer;
`;

const NoGroupWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoGroupMessage = styled.div`
  color: #e2dcde;
  text-transform: uppercase;
  font-size: 10px;
  text-align: center;
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
      <Wrapper>
        <GroupNames>
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
        </GroupNames>
        {selectedGroup ? (
          <MovesWrapper>
            {_.map(groupedMoves[selectedGroup], move => {
              return <Move key={move.move.name}>{_.capitalize(_.lowerCase(move.move.name))}</Move>;
            })}
          </MovesWrapper>
        ) : (
          <NoGroupWrapper>
            <NoGroupMessage>Select a group first</NoGroupMessage>
          </NoGroupWrapper>
        )}
      </Wrapper>
    );
  }
}

Moves.propTypes = {
  moves: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Moves;
