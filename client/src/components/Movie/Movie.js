import React, { Component } from 'react'
import Rating from '../Rating/Rating'
import axios from 'axios'
import headerDefaults from '../../headerDefaults'

class Movie extends Component {
  constructor(props){
    super(props)

    this.handleRating = this.handleRating.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleEdit = () => { this.props.onClick(this.props.movie.id) }

  handleDelete = () => { this.props.onDelete(this.props.movie.id) }

  handleRating = (rating) => {
    this.props.rateMovie(this.props.movie.id, rating)
  }

  render() {
    const { title, description, id, average_rating } = this.props.movie

    let userRating

    if(this.props.signedIn){
      userRating = <li className="list-group-item">Your rating
                    <Rating key={id}
                            id={id}
                            rating={average_rating}
                            onRating={this.handleRating}
                            editable={true}/>
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
