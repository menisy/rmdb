import React, { Component } from 'react'
import ReactPaginate from 'react-paginate'

class Pagination extends Component {


  render(){
    const { movies, searchQuery, pages, page, all_count } = this.props.movies
    let searchResultsMsg
    if(searchQuery.trim().length > 0){
      searchResultsMsg = <div className="d-inline-block">
                            <span className="font-weight-bold px-1">
                            for:
                            </span>
                            <span className="font-italic">
                              "{searchQuery}"
                            </span>
                          </div>
    }
    return(
      <div className="container">
          <div className="row form-inline border rounded mb-2 p-2">
            <div className="col-md-6 col-sm-12 my-1">
              <span className="font-weight-bold">
              Showing {movies.length} results from {all_count}
              </span>
              {searchResultsMsg}
            </div>
            <div className="navbar-nav mr-auto mt-lg-0"></div>
            <div className="col-md-6 col-sm-12 my-1">
              <ReactPaginate previousLabel={<i className='fa fa-chevron-left'/>}
                 nextLabel={<i className='fa fa-chevron-right'/>}
                 breakLabel={<a href="">...</a>}
                 breakClassName={"break-me"}
                 pageCount={pages}
                 initialPage={page-1}
                 forcePage={page-1}
                 marginPagesDisplayed={2}
                 pageRangeDisplayed={5}
                 pageLinkClassName={"nav-link mx-1"}
                 onPageChange={this.props.onPageChange}
                 containerClassName={"nav nav-pills justify-content-end form-inline pagination"}
                 subContainerClassName={""}
                 disabledClassName={"disabled"}
                 pageClassName={"nav-item"}
                 activeClassName={"active"} />
            </div>
          </div>
        </div>
    )
  }
}

export default Pagination