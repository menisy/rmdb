import React, { Component } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Button from '../shared/Button'

class FilterGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      ratings: [],
      activeCategory: '',
      activeRating: '',
      allMoviesActive: true,
      userMoviesActive: false
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

  handleMoviesSelectClick = (option) => {
    // Call setMyMovies prop with mine set to true
    console.log(option)
    this.setState({ userMoviesActive: option,
                    allMoviesActive: !option},
        () => this.props.setMyMovies(option))
  }

  render() {
    var userButton = null
    if(this.props.signedIn){
      userButton = <Button  title="Your Movies"
                            onClick={this.handleMoviesSelectClick}
                            isActive={this.state.userMoviesActive}
                            option={true}/>
    }
    const {categories, ratings, activeCategory, activeRating} = this.state
    return (
      <div className="filters">
        <nav className="nav nav-fill justify-content-center form-inline my-2">
          <Button title="All Movies"
                  onClick={this.handleMoviesSelectClick}
                  isActive={this.state.allMoviesActive}
                  option={false}/>
          {userButton}
        </nav>
        <Filter title="Category"
                items={categories}
                activeItem={activeCategory}
                handleClick={this.handleCategoryClick}
                handleReset={this.handleCategoryReset}/>
        <div className="mt-4"></div>
        <Filter title="Rating"
                items={ratings}
                activeItem={activeRating}
                handleClick={this.handleRatingClick}
                handleReset={this.handleRatingReset}/>
      </div>
    )
  }
}

export default FilterGroup
