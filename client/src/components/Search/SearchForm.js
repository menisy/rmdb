import React, { Component } from 'react'
import $ from 'jquery'

class SearchForm extends Component {
  constructor(props) {
    super(props)
    const { movie } = this.props

    this.state = {

    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.handleChange()
  }

  handleChange = () => {
    const query = $('input#movies-search').val()
    this.props.handleSearch(query)
  }


  render() {
    const { title, description } = this.state

    return (
      <div className="">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input className="form-control mr-sm-2" type="search" 
            placeholder="Search" aria-label="Search" 
            id="movies-search" onChange={this.handleChange}></input>
          <button className="btn btn-outline-success my-2 my-sm-0" 
            type="submit">Search</button>
        </form>
      </div>
    )
  }
}

export default SearchForm