import React from 'react'
import SearchForm from './SearchForm'
import AsideFeed from '../AsideFeed'
import { connect } from 'react-redux'
import './index.scss'

class Sidebar extends React.Component {
  render () {
    return (
      <div>
        <aside>
          <SearchForm search={ this.searchInSidebar } />
        </aside>
        <aside>
          <h4>Bài viết nổi bật</h4>
          <AsideFeed />
        </aside>
        <aside>
          <h4>Tags</h4>
        </aside>
      </div>
    )
  }

  searchInSidebar = (data, path) => {
    this.props.search(data, path)
  }
}

function mapStateToProps (state) {
  return { articles: state.articleReducer.articles }
}

export default connect(mapStateToProps)(Sidebar)