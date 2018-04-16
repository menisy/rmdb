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
    return (
      <div className="flex-sm-fill nav-item ml-sm-2">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <input className="form-control col-9 mr-xs-2" type="search" 
            placeholder="Search" aria-label="Search" 
            id="movies-search" onChange={this.handleChange}></input>
          <button className="btn btn-outline-success ml-2 my-2 my-sm-0 col-2" 
            type="submit"><i className="fa fa-search"/></button>
        </form>
      </div>
    )
  }
}

export default SearchForm