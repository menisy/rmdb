import React, { Component } from 'react'

class UserNav extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="d-flex">
        <h2>Welcome, {this.props.username}</h2>
      </div>
    )
  }
}

export default UserNav