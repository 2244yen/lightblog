import React from 'react'
import Articles from '../components/Articles'

function Category (props) {
  return (
    <div>
      <Articles history={props.history}/>
    </div>
  )
}

export default Category