import _ from 'lodash';

const capitalizeMoveName = moveName => {
  return _.capitalize(_.lowerCase(moveName));
};

export { capitalizeMoveName };
