import React, { Component } from 'react'

let _search

class SearchForm extends Component {
  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.handleChange()
  }

  handleChange = () => {
    this.props.handleSearch(_search.value)
  }

  render() {
    return (
      <div className="nav-item my-2">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="input-group flex-sm-fill">
            <input ref={input => _search = input}
                    className="form-control col-12"
                    type="search"
                    placeholder="Search" aria-label="Search"
                    id="movies-search" onChange={this.handleChange}>
              </input>
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
