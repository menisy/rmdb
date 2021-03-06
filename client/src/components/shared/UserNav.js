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
      <div className="d-flex justify-content-end">
        <h5 className="text-light my-2 mx-3">
          <i className="fa fa-user mx-2"/>
          Hello, {username}
        </h5>
        <a href="#logout" className="btn btn-outline-danger" onClick={this.handleSignOut}>
          Sign out
        </a>
      </div>
    )
  }
}

export default UserNav
