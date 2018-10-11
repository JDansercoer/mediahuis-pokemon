import React from 'react';
import PropTypes from 'prop-types';

class ApiFetcher extends React.Component {
  state = {
    result: [
      {
        name: 'hihih',
        url: 'https://pokeapi.co/api/v2/generation/1/',
      },
    ],
  };

  componentWillMount = () => {
    const { url, field } = this.props;

    fetch(`https://pokeapi.co/api/v2/${url}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          result: data[field],
        });
      });
  };

  render() {
    const { result } = this.state;
    const { children } = this.props;

    return children(result);
  }
}

ApiFetcher.propTypes = {
  url: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default ApiFetcher;
