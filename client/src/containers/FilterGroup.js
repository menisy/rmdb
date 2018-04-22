import React, { Component } from 'react'
import Filter from '../components/Filter/Filter'
import Button from '../components/shared/Button'

import { connect } from 'react-redux'
import moviesActions from '../actions/movies-actions'

class FilterGroup extends Component {
  constructor(props) {
    super(props)

    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.handleRatingClick = this.handleRatingClick.bind(this)
    this.handleRatingReset = this.handleRatingReset.bind(this)
    this.handleCategoryReset = this.handleCategoryReset.bind(this)
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }

  componentDidMount(){
    this.props.fetchCategories()
    this.props.fetchRatings()
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

  handleMoviesSelectToggle = (option) => {
    this.props.toggleMyMovies(option)
  }

  render() {
    var userButton = null
    if(this.props.currentUser.isSignedIn){
      userButton = <Button  title="My Movies"
                            onToggle={this.handleMoviesSelectToggle}
                            isactive={this.props.myMovies || ''}
                            toggle={"true"}
                            css={"nav-item mb-sm-1 my-xs-1 "}
                            />
    }
    const {categories, ratings, activeCategory, activeRating} = this.props

    return (
      <div className="filters sticky-top">
        <nav className={"nav nav-fill justify-content-center form-inline my-2"}>
          <Button title={"All Movies"}
                  onToggle={this.handleMoviesSelectToggle}
                  isactive={!this.props.myMovies}
                  option={"false"}
                  css={"nav-item mb-sm-1 my-xs-1 "}
                  />
          {userButton}
        </nav>
        <Filter title="Categories"
                items={categories}
                activeItem={activeCategory}
                handleClick={this.handleCategoryClick}
                handleReset={this.handleCategoryReset}/>
        <div className={"mt-4"}></div>
        <Filter title={"Ratings"}
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
    ratings: state.movies.ratings,
    myMovies: state.movies.myMovies,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const bindActionsToDispatch = ({
      filterByCategory: moviesActions.filterByCategory,
      filterByRating: moviesActions.filterByRating,
      fetchCategories: moviesActions.fetchCategoriesStart,
      fetchRatings: moviesActions.fetchRatingsStart,
      toggleMyMovies: moviesActions.toggleMyMovies
  })
export default connect(mapStateToProps, bindActionsToDispatch)(FilterGroup)

