import React, { Component } from 'react'
import axios from 'axios'
import FilterItem from './FilterItem'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: []
    }
    
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount() {
    this.fetchCategories()
  }

  fetchCategories = () => {
    axios.get('/categories', {
      params: {
        sort_by: this.state.sortBy
      }
    })
    .then(response => {
      console.log(response.data)
      this.setState({categories: response.data})
    })
    .catch(error => console.log(error))
  }

  handleClick = (id) => {
    this.props.getCategoryMovies(id)
  }

  render() {
    const categories = this.state.categories
    return (
      <div className="nav flex-column">
        {categories.map(category => {
          return(
            <div key={`ni${category.id}`} className="nav-item">
              <FilterItem key={`c${category.id}`} id={category.id+''} title={category.title}
                count={category.movies_count} onClick={this.handleClick} />
            </div>
            )
        })}
      </div>
    )
  }
}

export default Filter