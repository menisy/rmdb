import React from 'react'

const FilterItem = ({id, title, isActive, count, onClick = f => f}) => {
  return (
      <li key={id}  onClick={() => onClick(id)}
        className={`${isActive} cursor-ptr list-group-item d-flex justify-content-between align-items-center`}>
        <span key={id}>
          {title}
        </span>
        <span className="badge badge-primary badge-pill">{count}</span>
      </li>
    )
}
export default FilterItem
