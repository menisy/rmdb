import React, { Component } from 'react'
import FilterItem from './FilterItem'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      items: [],
      activeItem: ''
    }   
  }

  componentDidMount = () => {
    this.setState({
      title: this.props.title,
      items: this.props.items,
      activeItem: this.props.activeItem
    })
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
      <div className="nav flex-column mb-2">
        <div className="nav-item">
          {title}
          <div className="btn btn-outline-secondary btn-sm float-right" onClick={this.handleReset}>
            Reset
          </div>
        </div>
        <ul className="list-group mt-1">
          {items.map(item => {
            const active = (item.id === activeItem) ? 'active' : ''
            return(
                <FilterItem key={item.id} id={item.id} title={item.title}
                  count={item.movies_count} onClick={this.handleClick}
                  active={active}/>
              )
          })}
        </ul>
      </div> 
    )
  }
}

export default Filter