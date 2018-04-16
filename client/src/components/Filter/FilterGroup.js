import React, { Component } from 'react'
import axios from 'axios'
import Filter from './Filter'

class FilterGroup extends Component {
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
    this.props.setCategory(category)
  }

  handleRatingClick = (rating) => {
    this.setState({activeRating: rating})
    this.props.setRating(rating)
  }

  handleCategoryReset = () => {
    this.setState({activeCategory: ''})
    this.props.setCategory('')
  }

  handleRatingReset = () => {
    this.setState({activeRating: ''})
    this.props.setRating('')
  }

  render() {
    const {categories, ratings, activeCategory, activeRating} = this.state
    return (
      <div className="filters">
        <Filter title="Filter by Category" items={categories}
          activeItem={activeCategory}
          handleClick={this.handleCategoryClick}
          handleReset={this.handleCategoryReset}/>
        <div className="mt-4"></div>
        <Filter title="Filter by Rating" items={ratings}
          activeItem={activeRating}
          handleClick={this.handleRatingClick}
          handleReset={this.handleRatingReset}/>
      </div>
    )
  }
}

export default FilterGroup
