import React, { Component } from 'react'
import FilterItem from './FilterItem'
import Button from '../shared/Button'

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
    return (

      <nav className="navbar-expand-lg navbar-default flex-column mt-2">
        <div className="nav-header nav-fill nav">
          <div className="nav-item font-weight-bold text-left ml-1 pt-1">
            {title}
          </div>
          <Button type="button" className="navbar-toggler"
                  data-toggle="collapse" data-target={`.${title}-collapse`}
                  icon="filter"
                  color="primary">
          </Button>
        </div>
        <div className={`${title}-collapse collapse navbar-collapse w-100`}>
          <ul className="list-group nav nav-stacked mt-1 w-100">
            <li>
              <div className="btn btn-outline-secondary flex-column d-block btn-sm w-100"
                   onClick={this.handleReset}>
                Clear
              </div>
            </li>
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
      </nav>
    )
  }
}

export default Filter