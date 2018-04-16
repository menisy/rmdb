import React, { Component } from 'react'
import axios from 'axios'
import FilterItem from './FilterItem'

class Filter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      ratings: [],
      activeCategory: '',
      activeRating: ''
    }
    
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount() {
    this.fetchCategories()
    this.fetchRatings()
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

  fetchRatings = () => {
    axios.get('/ratings/movies_count', {
      params: {
        sort_by: this.state.sortBy
      }
    })
    .then(response => {
      console.log(response.data)
      this.setState({ratings: response.data})
    })
    .catch(error => console.log(error))
  }

  handleCategoryClick = (category) => {
    this.setState({activeCategory: category})
    this.props.category(category)
  }

  handleRatingClick = (rating) => {
    this.setState({activeRating: rating})
    this.props.rating(rating)
  }

  render() {
    const {categories, ratings, activeCategory, activeRating} = this.state
    return (
      <div className="filters">
        <div className="nav flex-column">
          <div className="nav-item">
            Filter by Category
          </div>
          <ul className="list-group mt-2">
            {categories.map(category => {
              const active = (category.id == activeCategory) ? 'active' : ''
              return(
                  <FilterItem key={category.id} id={category.id} title={category.title}
                    count={category.movies_count} onClick={this.handleCategoryClick} active={active}/>
                )
            })}
          </ul>
        </div> 
        <div className="nav flex-column mt-3">
          <div className="nav-item">
            Filter by Rating
          </div>
          <ul className="list-group mt-2">
            {ratings.map(rating => {
              const active = (rating.rate == activeRating) ? 'active' : ''
              return(
                  <FilterItem key={rating.rate} id={rating.rate} title={rating.title}
                    count={rating.movies_count} onClick={this.handleRatingClick} active={active}/>
                )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Filter