import React, { Component } from 'react'
import Rating from '../Rating/Rating'
import axios from 'axios'
import headerDefaults from '../../headerDefaults'

class Movie extends Component {
  constructor(props){
    super(props)

    this.state = {
      signedIn: this.props.signedIn,
      movie: this.props.movie
    }
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleEdit.bind(this)
    this.handleRating = this.handleRating.bind(this)
  }
  handleEdit = () => { this.props.onClick(this.state.movie.id) }

  handleDelete = () => { this.props.onDelete(this.state.movie.id) }

  handleRating = (rating) => {
    headerDefaults.setHeader(axios)
    const {movies} = this.state
    const userId = this.props.userId
    axios.post('/ratings/',
                  {
                    rating:{
                      movie_id: this.state.movie.id,
                      rate: rating,
                      user_id: this.state.movie.user_id
                    }
                  }
    )
    .then(response => {
      // replace movie in the movies array
      const movie = response.data
      this.setState({
        movie: movie
      })
    }).catch((error, response) => console.log([error, response]))
  }

  render() {
    const { title, description, id, average_rating } = this.state.movie

    let userRating

    if(this.state.signedIn){
      userRating = <li className="list-group-item">Your rating
                    <Rating key={id} id={id} rating={average_rating} onRating={this.handleRating} editable={true}/>
                   </li>
    }

    return (
      <div className="col-md-6 col-lg-4 col-xl-3 mb-3">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Users rating
              <Rating key={id} id={id} rating={average_rating} editable={false}/>
            </li>
            {userRating}
          </ul>
          <div className="card-body">
            <a href="#" className="card-link">Card link</a>
            <a href="#" className="card-link">Another link</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Movie
