import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="text-center spinner-wrapper">
        <SyncLoader loading={this.props.isLoading} />
      </div>
    );
  }
}

export default LoadingSpinner
