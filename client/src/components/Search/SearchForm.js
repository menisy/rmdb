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
      <div className="nav-item my-2">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="input-group flex-sm-fill">
            <input className="form-control col-12" type="search"
              placeholder="Search" aria-label="Search"
              id="movies-search" onChange={this.handleChange}></input>
            <div className="input-group-append">
              <div className="input-group-text">
                <i className="fa fa-search"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchForm
