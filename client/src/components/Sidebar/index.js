import React from 'react'
import SearchForm from './SearchForm'
import './index.scss'

class Sidebar extends React.Component {
  render () {
    return (
      <div>
        <aside>
          <SearchForm search={ this.searchData } />
        </aside>
        <aside>
          <h4>Bài viết nổi bật</h4>
          <ul>
            
          </ul>
        </aside>
        <aside>
          <h4>Tags</h4>
          <ul>
            
          </ul>
        </aside>
      </div>
    )
  }

  searchData = () => {
    console.log('search')
  }
}

export default Sidebar