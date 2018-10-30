import React, { Component } from 'react'
import apiArticle from '../../services/article'
import { connect } from 'react-redux'
import { fetchDataStart } from '../../redux/actions/articleAction'
import './index.scss'

function ejectHtmlTag (str) {
  if (str.trim()) {
    let pattern = /<([^>]+)>/ig
    str = str.replace(pattern, "")
  }
  return str
}

class Articles extends Component {
  constructor (props) {
    super(props)
    this.state = {
      articles: []
    }
  }

  componentDidMount () {
    apiArticle.getList().then(response => {
      if (response) {
        this.setState({ articles: response.data })
      }
    }, err => {
      console.log(err)
    })
    // this.props.getData()
  }
  
  renderList () {
    let result = ''
    if (this.state.articles) {
      const articlesList = this.state.articles
      result = articlesList.map((item, key) => {
        const link = `/${item.url}`
        return (
          <div className="blog-item" key={key}>
            <div className="blog-info">
              <div>
                <figure>
                  <a href={ link }><img src={ item.thumbnail } alt="" className="img-responsive"/></a>
                </figure>
              </div>
              <div>
                <h3 className="blog-item_title"><a href={ link }>{ item.title }</a></h3>
                <div className="blog-item_metadata">
                  <small><i className="fa fa-clock-o" aria-hidden="true"></i> { window.moment(item.createdAt).format('DD/MM') }</small>
                  <small><i class="fa fa-comment" aria-hidden="true"></i> { item.comments.length } comment</small>
                </div>
                <div className="blog-item_cnt">
                  { ejectHtmlTag(item.description) }
                </div>
                
              </div>
            </div>
          </div>
        )
      })
    }
    return result
  }

  render () {
    return (
      <div className="blog">
        { this.renderList() }
      </div>
    )
  } 
}

function mapStateToProps (state) {
  return { articles: state.articleReducer.articles }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => { dispatch(fetchDataStart()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles)