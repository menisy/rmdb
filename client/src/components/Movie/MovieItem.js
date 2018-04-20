import React, { Component } from 'react'
import Rating from '../Rating/Rating'
import EditMenu from './EditMenu'
import Timeago from 'react-timeago'

class MovieItem extends Component {
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
    const { movie, currentUser } = this.props
    const { editable } = this.props
    const userName = (movie.user_id === currentUser.attributes.id) ? 'You' : movie.user.nickname
    let userRating, editMenu

    if(currentUser.isSignedIn){
      userRating = <li className="list-group-item">Your rating
                      <Rating key={movie.id}
                              id={movie.id}
                              rating={movie.user_rating}
                              onRating={this.handleRating}
                              editable={currentUser.isSignedIn}/>
                   </li>
    }
    if(editable){
      editMenu =  <EditMenu
                    onEdit={this.handleEdit}
                    onDelete={this.handleDelete}/>
    }

    return (
      <div className="col-sm-4 col-md-6 col-lg-4 col-xl-3 mb-3">
        <div className="card h-100">
          <div className="card-body text-center">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">{movie.description}</p>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <strong>Category:</strong> {movie.category.title}
            </li>
            <li className="list-group-item">
              Users rating
              <Rating key={movie.id} id={movie.id} rating={movie.average_rating} editable={false}/>
            </li>
            {userRating}
          </ul>
          <div className="card-footer">
            {editMenu}
            <p className="card-text text-center">
              <small className="text-muted mx-1">
                By <strong>{userName}</strong>
              </small>
              <small>
                <Timeago date={movie.created_at} />
              </small>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieItem
