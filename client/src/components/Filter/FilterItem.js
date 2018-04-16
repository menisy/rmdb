import React, { Component } from 'react'

class FilterItem extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = () => { this.props.onClick(this.props.id) }


  render() {
    const active = this.props.active
    return (
      <li key={this.props.id} onClick={this.handleClick}
        className={`${active} list-group-item d-flex justify-content-between align-items-center`}>
        <span href="#" key={this.props.id}  onClick={this.handleClick} className="">
          {this.props.title}
        </span>
        <span className="badge badge-primary badge-pill">{this.props.count}</span>
      </li>
    )
  }
}

export default FilterItem