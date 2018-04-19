import React, { Component } from 'react'

class Button extends Component{
  constructor(props){
    super(props)

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle = () => {
    this.props.onToggle(this.props.toggleBool)
  }

  render (){
    const {title, isActive} = this.props
    const active = (isActive) ? 'btn-outline-primary' : 'btn-outline-secondary'
    return (
      <div className="nav-item my-xs-1 mb-sm-1">
        <div className={`nav-link btn  ${active}`} onClick={this.handleToggle}>
          {title}
        </div>
      </div>
    )
  }
}
export default Button
