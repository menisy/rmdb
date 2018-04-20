import React, { Component } from 'react'
import Button from '../shared/Button'

class EditMenu extends Component{
  constructor(props){
    super(props)

    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleEdit = () => {
    this.props.onEdit()
  }

  handleDelete = () => {
    this.props.onDelete()
  }

  render(){
    return(
        <nav className="nav justify-content-center nav-fill nav-justified">
          <Button icon="edit"
                  color="btn-outline-warning mx-2"
                  onToggle={this.handleEdit}/>
          <Button icon="trash"
                  color="btn-outline-danger mx-2"
                  onToggle={this.handleDelete}/>
        </nav>
      )
  }
}

export default EditMenu
