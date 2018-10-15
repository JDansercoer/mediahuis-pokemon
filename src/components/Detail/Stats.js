import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-self: flex-start;
  margin-bottom: 10px;
`;

const Stat = styled.div`
  width: 50%;
  text-align: right;
`;

const StatName = styled.span`
  color: ${props => props.theme.mainColor};
  font-size: 12px;
  text-transform: uppercase;
  margin-right: 5px;
`;

const StatValue = styled.span`
  color: ${props => props.theme.mainBlack};
  font-size: 30px;
`;

const Stats = ({ stats }) => {
  return (
    <Wrapper>
      {_.map(stats, stat => (
        <Stat key={stat.stat.name}>
          <StatName>{stat.stat.name}</StatName>
          <StatValue>{stat.base_stat}</StatValue>
        </Stat>
      ))}
    </Wrapper>
  );
};

Stats.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Stats;
