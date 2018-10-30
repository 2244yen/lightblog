import React from 'react'
import Articles from '../components/Articles'

function Category (props) {
  return (
    <div>
      <h2>Bài viết nổi bật</h2>
      <Articles history={props.history}/>
    </div>
  )
}
export default Category