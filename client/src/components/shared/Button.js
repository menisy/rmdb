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
    const {title, isActive, icon, color, css} = this.props
    const active = (isActive) ? 'btn-primary' : 'btn-outline-primary'
    let iconTag
    if(icon){
      iconTag = <i className={`fa fa-${icon} mr-1`} />
    }
    return (
      <div className={`${css || ''} my-xs-1 mb-sm-1`}>
        <div className={`nav-link btn ${active || ''}  ${color || ''}`}
             onClick={this.handleToggle}>
          {iconTag}
          {title}
        </div>
      </div>
    )
  }
}
export default Button
