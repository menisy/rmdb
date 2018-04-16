import React, { Component } from 'react'

class Button extends Component {
  constructor(props) {
    super(props)
    const { movie } = this.props

    this.state = {
      title: this.props.title,
    }
  }

  handleClick = () => { this.props.handleClick() }

  render() {
    const active = (this.props.isActive) ? 
      'btn-outline-primary' : 'btn-outline-secondary'
    return (
      <div className="ptr nav-item mr-2 my-xs-1 mb-sm-1">
        <div className={`nav-link btn  ${active}`} onClick={this.handleClick}>
          {this.state.title}
        </div>
      </div>
    )
  }
}

export default Button