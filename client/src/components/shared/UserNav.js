import React, { Component } from 'react'

class UserNav extends Component {
  constructor(props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this)
  }

  handleSignOut = (e) => {
    this.props.onSignOut()
  }

  render() {
    const { username } = this.props.attributes
    return (
      <div className="d-flex">
        <h5 className="text-light my-2 mx-2">{username}</h5>
        <a href="#" className="btn btn-outline-danger" onClick={this.handleSignOut}>
          Sign out
        </a>
      </div>
    )
  }
}

export default UserNav
