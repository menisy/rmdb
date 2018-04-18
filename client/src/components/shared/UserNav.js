import React, { Component } from 'react'

class UserNav extends Component {
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <div className="d-flex navbar-dark">
        <h3 className="text-light">Welcome, {this.props.username}</h3>
      </div>
    )
  }
}

export default UserNav