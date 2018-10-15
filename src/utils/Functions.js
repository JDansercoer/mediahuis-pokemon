import _ from 'lodash';

const capitalizeMoveName = moveName => {
  return _.capitalize(_.lowerCase(moveName));
};

const getMoveMethod = move => {
  return move.version_group_details[0].move_learn_method.name;
};

export { capitalizeMoveName, getMoveMethod };
