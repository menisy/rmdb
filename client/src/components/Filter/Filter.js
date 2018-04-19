import React, { Component } from 'react'
import FilterItem from './FilterItem'

class Filter extends Component {
  constructor(props) {
    super(props)

    this.handleReset = this.handleReset.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (id) => {
    this.props.handleClick(id)
  }

  handleReset = () => {
    this.props.handleReset()
  }
  render() {
    const title = this.props.title
    const items = this.props.items
    const activeItem = this.props.activeItem
    console.log(items)
    return (
      <div className="nav flex-column mt-2">
        <div className="nav-item nav-fill nav">
          <div className="nav-item font-weight-bold text-left pt-1">
            {title}
          </div>
          <div className="btn btn-outline-secondary nav-item btn-sm float-right"
               onClick={this.handleReset}>
            Clear
          </div>
        </div>
        <ul className="list-group mt-1">
          {items.map(item => {
            const active = (item.id === activeItem) ? 'active' : ''
            return(
                <FilterItem key={item.id}
                            id={item.id}
                            title={item.title}
                            count={item.movies_count}
                            onClick={this.handleClick}
                            isActive={active}/>
              )
          })}
        </ul>
      </div>
    )
  }
}

export default Filter