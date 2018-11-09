import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchArticleView } from '../../redux/actions/articleAction'
import './index.scss'

class ArticleView extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getData(this.props.articleId)
  }

  render () {
    const { article } = this.props
    if (article) {
      var xmlString = article.text || '', 
        parser = new DOMParser(), 
        doc = parser.parseFromString(xmlString, "text/xml");
    }
    return (
      <div className="view-post">
        {
          article &&
            <div className="blog-item">
              <div className="blog-info">
                <figure>
                  <img src={ article.thumbnail } alt="" className="img-responsive"/>
                </figure>
                <div>
                  <h2 className="blog-item_title text-uppercase">{ article.title && article.title }</h2>
                  <div className="blog-item_metadata">
                    <small><i className="fa fa-clock-o" aria-hidden="true"></i> { article.createdAt && window.moment(article.createdAt).format('DD/MM') }</small>
                    <small><i className="fa fa-user" aria-hidden="true"></i> Author</small>
                    <small><i class="fa fa-comment" aria-hidden="true"></i> { article.comments  && article.comments.length } comment</small>
                  </div>
                  <div className="blog-item_cnt" dangerouslySetInnerHTML={{ __html: article.text }} />
                  <div className="blog-item_tags">
                    <a className="tag" href="">Story</a>
                    <a className="tag" href="">Community</a>
                  </div>
                </div>
                <div className="post-stats top-30 clearfix">
                  <div className="pull-left right-10">
                    <div className="like-button-wrapper">
                      <button onClick={() => this.props.clap(article._id)} className="like-button btn btn-default" type="submit">
                        <i className="fa fa-heart-o"></i><span className="hide-text">Like</span>
                      </button>
                      <span className="like-count">{  article.likes }</span>
                    </div>
                  </div>
                  <div className="pull-left right-10">
                    <a className="response-icon-wrapper" href="#">
                      <i className="fa fa-comment-o"></i>
                      <span className="response-count">0</span>
                    </a>
                  </div>
                  <div className="pull-right right-10">
                    <div className="bookmark-button-wrapper">
                      <form className="button_to" method="get" action="">
                        <button className="bookmark-button" type="submit">
                          <span className="icon-bookmark-o"></span>
                          <span className="hide-text">Bookmark</span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return { article: state.articleReducer.article }
}

function mapDispatchToProps(dispatch) {
  return {
    getData: (id) => { dispatch(fetchArticleView(id)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(ArticleView)