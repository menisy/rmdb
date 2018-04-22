import React, { Component } from 'react'

class Button extends Component{
  constructor(props){
    super(props)

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle = () => {
    if(typeof this.props.onToggle === 'function'){
      this.props.onToggle(this.props.toggle)
    }
  }

  render (){
    const {title, isactive, icon, color, css} = this.props
    const active = (isactive) ? 'btn-primary' : 'btn-outline-primary'
    let iconTag
    if(icon){
      iconTag = <i className={`fa fa-${icon} mr-1`} />
    }
    return (
      <button onClick={this.handleToggle} className={
        `${css || ''}  ${active || ''} btn btn-${color || ''}  ${this.props.className || ''}`
      } {...this.props}>
        <div>
          {iconTag}
          {title}
        </div>
      </button>
    )
  }
}
export default Button
