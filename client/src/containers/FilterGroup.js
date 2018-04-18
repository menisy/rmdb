import React, { Component } from 'react'
import axios from 'axios'
import Filter from '../components/Filter/Filter'
import Button from '../components/shared/Button'

import { connect } from 'react-redux'
import moviesActions from '../actions/movies-actions'

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

    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.handleRatingClick = this.handleRatingClick.bind(this)
    this.handleRatingReset = this.handleRatingReset.bind(this)
    this.handleCategoryReset = this.handleCategoryReset.bind(this)
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  // componentDidMount() {
  //   this.fetchCategories()
  //   this.fetchRatings()
  // }

  componentWillMount(){
    this.props.fetchCategories()
    this.props.fetchRatings()
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
    this.props.filterByCategory(category)
  }

  handleRatingClick = (rating) => {
    this.props.filterByRating(rating)
  }

  handleCategoryReset = () => {
    this.props.filterByCategory('')
  }

  handleRatingReset = () => {
    this.props.filterByRating('')
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
                            isActive={this.props.userMoviesActive}
                            />
    }
    const {categories, ratings, activeCategory, activeRating} = this.props
    return (
      <div className="filters">
        <nav className="nav nav-fill justify-content-center form-inline my-2">
          <Button title="All Movies"
                  onClick={this.handleMoviesSelectClick}
                  isActive={!this.props.userMoviesActive}
                  />
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

const mapStateToProps = (state) => {
  return {
    activeCategory: state.movies.categoryFilter,
    activeRating: state.movies.ratingFilter,
    categories: state.movies.categories,
    ratings: state.movies.ratings
  }
}

const bindActionsToDispatch = ({
      filterByCategory: moviesActions.filterByCategory,
      filterByRating: moviesActions.filterByRating,
      fetchCategories: moviesActions.fetchCategories,
      fetchRatings: moviesActions.fetchRatings
  })
export default connect(mapStateToProps, bindActionsToDispatch)(FilterGroup)

