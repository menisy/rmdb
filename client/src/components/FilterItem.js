import React, { Component } from 'react'

class FilterItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      active: ''
    }
    
  }

  handleClick = () => { this.props.onClick(this.props.id) }


  render() {
    return (
      <a href="#" key={this.props.id+'ch'} className="nav-link" onClick={this.handleClick}>
        {this.props.title}({this.props.count})
      </a>
    )
  }
}

export default FilterItem