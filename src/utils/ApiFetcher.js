import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ApiFetcher extends React.Component {
  state = {
    result: null,
  };

  componentWillMount = () => {
    this.fetchData();
  };

  componentDidUpdate = ({ url: previousUrl }) => {
    const { url } = this.props;

    if (url !== previousUrl) {
      this.fetchData();
    }
  };

  fetchData = () => {
    const { url } = this.props;

    fetch(`https://pokeapi.co/api/v2/${url}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          result: data,
        });
      });
  };

  render() {
    const { result } = this.state;
    const { children, fields } = this.props;

    return children(_.pick(result, fields), !!result);
  }
}

ApiFetcher.propTypes = {
  url: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.func.isRequired,
};

export default ApiFetcher;
