import React, { Component } from 'react'
import Rating from '../Rating/Rating'
import Button from '../shared/Button'
import EditMenu from './EditMenu'
import Timeago from 'react-timeago'

class Movie extends Component {
  constructor(props){
    super(props)

    this.handleRating = this.handleRating.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleEdit = () => { this.props.onEdit(this.props.movie) }

  handleDelete = () => { this.props.onDelete(this.props.movie.id) }

  handleRating = (rating) => {
    this.props.rateMovie(this.props.movie.id, rating)
  }

  render() {
    const { movie } = this.props
    const { isSignedIn } = this.props.currentUser
    const { editable } = this.props
    let userRating, editMenu

    if(isSignedIn){
      userRating = <li className="list-group-item">Your rating
                      <Rating key={movie.id}
                              id={movie.id}
                              rating={movie.user_rating}
                              onRating={this.handleRating}
                              editable={isSignedIn}/>
                   </li>
    }
    if(editable){
      editMenu =  <EditMenu
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}/>
    }

    return (
      <div className="col-md-6 col-lg-4 col-xl-3 mb-3">
        <div className="card h-100">
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">{movie.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Users rating
              <Rating key={movie.id} id={movie.id} rating={movie.average_rating} editable={false}/>
            </li>
            {userRating}
          </ul>
          <div className="card-footer">
            {editMenu}
            <p className="card-text">
              <small className="text-muted">
                By {movie.user.nickname} <Timeago date={movie.created_at} />
              </small>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Movie
