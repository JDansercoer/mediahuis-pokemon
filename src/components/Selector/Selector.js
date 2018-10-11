import React from 'react';
import Generations from './Generations';

class Selector extends React.Component {
  state = {
    selectedGeneration: '',
  };

  setGeneration = generation => {
    this.setState({
      selectedGeneration: generation,
    });
  };

  render() {
    const { selectedGeneration } = this.state;

    return (
      <>
        Generation: {selectedGeneration}
        <Generations setGeneration={this.setGeneration} />
      </>
    );
  }
}

export default Selector;
