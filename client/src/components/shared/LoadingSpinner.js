import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import { connect } from 'react-redux'

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="text-center spinner-wrapper">
        <SyncLoader loading={this.props.isLoading} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.movies.isLoading
  }
}

export default connect(mapStateToProps, {})(LoadingSpinner)
