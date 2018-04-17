import React, { Component } from 'react'

const FilterItem = ({id, title, isActive, count, onClick = f => f}) => {
  const active = (isActive) ? 'btn-outline-primary' : 'btn-outline-secondary'
  return (
      <li key={id} onClick={() => onClick(id)}
        className={`${isActive} list-group-item d-flex justify-content-between align-items-center`}>
        <span href="#" key={id} className="">
          {title}
        </span>
        <span className="badge badge-primary badge-pill">{count}</span>
      </li>
    )
}
export default FilterItem
