import React from 'react'

function SortFeature({onSetSort, onSetOrder}) {
  return (
    <div className="sort-options">
    <div>
      <label htmlFor="sort-by">Sort By:</label>
      <select id="sort-by" onChange={(e) => onSetSort(e.target.value)}>
        <option value="device_id">Device Id</option>
        <option value="device_type">Device Type</option>
      </select>
    </div>
    <div>
      <label htmlFor="sort-order">Order:</label>
      <select id="sort-order" onChange={(e) => onSetOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  </div>
  )
}

export default SortFeature