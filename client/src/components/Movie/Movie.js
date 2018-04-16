import React, { Component } from 'react'

class Movie extends Component {
  handleClick = () => { this.props.onClick(this.props.movie.id) }

  handleDelete = () => { this.props.onDelete(this.props.movie.id) }

  render() {
    const { title, description } = this.props.movie

    return (
      <div className="tile">
        <span className="deleteButton" onClick={this.handleDelete}>x</span>
        <h4 onClick={this.handleClick}>{title}</h4>
        <p onClick={this.handleClick}>{description}</p>
      </div>
    )
  }
}

export default Movie
