import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

let MovieForm = props => {
  const { handleSubmit, onDismiss, categories} = props
  const formTitle = (props.editingMovie.id) ? 'Edit movie' : 'Create new movie'
  return (
      <div className="modal fade" id="movieFormModal" tabIndex="-1"
            role="dialog" aria-labelledby="movieFormModal" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"
                  id="exampleModalLongTitle">{formTitle}
              </h5>
              <button type="button" className="close"
                      data-dismiss="modal" aria-label="Close"
                      onClick={onDismiss}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Field name="title"
                          component="input"
                          type="text"
                          autoFocus={true}
                          className="form-control col-12"/>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Field name="description"
                          component="textarea"
                          type="text"
                          className="form-control col-12"/>
                  <label htmlFor="category">Category</label>
                  <Field name="category_id"
                          component="select"
                          className="form-control col-12">
                    <option value="">Select one</option>
                    {categories.map(category => (
                      <option value={category.id} key={category.id}>
                        {category.title}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="float-right">
                  <button type="button" className="btn btn-secondary mr-2"
                          data-dismiss="modal"
                          onClick={onDismiss}>Close
                  </button>
                  <button type="submit"
                          className="btn btn-success">Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
}

MovieForm = reduxForm({
  form: 'movieForm',
  enableReinitialize: true,
})(MovieForm)

MovieForm = connect(
  state => ({
    initialValues: state.movies.editingMovie,
    editingMovie: state.movies.editingMovie,
    categories: state.movies.categories
  }),
  {}
)(MovieForm)

export default MovieForm