import React, { Component } from 'react'

class MovieForm extends Component {
  constructor(props) {
    super(props)
    const { idea } = this.props

    this.state = {
      title: idea.title,
      description: idea.description
    }
  }

  handleInput = (e) => {
    this.props.resetNotification()
    this.setState({[e.target.name]: e.target.value})
  }


  render() {
    const { title, description } = this.state

    return (
      <div className="tile">
        <form>
          <input className="input" type="text" name="title"
            placeholder="Enter a Title"
            value={title}
            onChange={this.handleInput}
            ref={this.props.titleRef} />
          <textarea className="input" name="description"
            placeholder="Describe your idea"
            value={description}
            onChange={this.handleInput}></textarea>
        </form>
      </div>
    )
  }
}

export default MovieForm