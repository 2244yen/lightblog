import React from 'react'

function SearchForm (props) {
  let changeInput = (e) => {
    e.preventDefault()
    if (e.keyCode === 13) {
      props.search(e.target.value)
    }
  }
  return (
    <div>
      <input type="text" name="search" className="form-control" onKeyUp={ changeInput } placeholder="Tìm kiếm..." />
    </div>
  )
}

export default SearchForm