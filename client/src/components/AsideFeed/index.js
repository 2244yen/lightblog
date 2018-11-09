import React from 'react'
import apiArticle from '../../services/article'

class AsideFeed extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      featuredList: []
    }
  }

  componentDidMount () {
    const params = { isFeatured: true }
    import ('../../services/article').then(api => {
      api.default.getList(params).then(response => {
        this.setState({ featuredList: response.data })
      }, err => {
        console.log(err)
      })
    })
    
  }

  render () {
    const result = this.state.featuredList.map((item, key) => {
      return (<li key={key}>{ item.title }</li>)
    })

    return (
      <div>
        <ul>
          { result }
        </ul>
      </div>
    )
  }
}

export default AsideFeed