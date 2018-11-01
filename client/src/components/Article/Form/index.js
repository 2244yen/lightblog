import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import CKEditor from 'react-ckeditor-component'
import { convertText } from '../../../utils/helper'
import FormValidator from '../../../utils/validator'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import apiArticle from '../../../utils/validator'
import './index.scss'

class ArticleForm extends React.Component {
  constructor (props) {
    super(props)
    this.validator = new FormValidator([
      {
        field: 'title',
        method: 'isEmpty',
        validWhen: false,
        message: 'Tiêu đề không được bỏ trống'
      },
      {
        field: 'text',
        method: 'isEmpty',
        validWhen: false,
        message: 'Nội <dung></dung> không được bỏ trống'
      }
    ])
    this.state = {
      title: '',
      text: '',
      description: '',
      tags: '',
      thumbnail: '',
      loading: false,
      validation: this.validator.valid()
    }
    this.submitForm = this.submitForm.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.previewImg = this.previewImg.bind(this)
    this.updateData = this.updateData.bind(this)
    this.updateText = this.updateText.bind(this)
  }

  componentDidMount () {
  }

  render() {
    return (
      <div>
        <form className="article-form" autocomplete="off">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Article Title" name="title" onChange={ this.updateData } />
          </div>
          <div className="form-group">
            <CKEditor 
              activeClass="p10" 
              content={ this.state.text } 
              events={{
                "change": this.updateText
              }}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Tags" name="tags" onChange={ this.updateData } />
          </div>
          <div className={this.state.thumbnail ? 'file-upload-previewer' : 'file-upload-previewer hidden'}>
            <img id="img-previewer" src="" class="img-responsive" />
          </div>
          <div className="exist-img-previewer"></div>
          <div className="form-group">
            <div className="picture-upload">
              <i className="fa fa-camera" onClick={ this.handleClick }></i>
            </div>
          </div>
          <div className="form-group hidden">
            <input type="file" className="form-control" ref="fileUploader" onChange={ this.previewImg }/>
          </div>
          <div class="text-right">
            <button className="btn btn-primary float-right" onClick={ e => this.submitForm(e) }>Submit</button>
          </div>
        </form>
        <NotificationContainer/>
      </div>
    )
  }
  
  updateText (e) {
    let content = e.editor.getData()
    this.setState({
      text: content,
      description: content.substring(0, 30).toString()
    })
  }

  updateData (e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  
  previewImg () {
    const file = this.refs.fileUploader.files[0]
    let reader = new FileReader()
    reader.onload = function (e) {
      document.getElementById('img-previewer').src = e.target.result
    }.bind(this)
    this.setState({
      thumbnail: file
    })
    reader.readAsDataURL(file)
  }

  handleClick () {
    this.refs.fileUploader.click()
  }

  submitForm (e) {
    e.preventDefault()
    this.setState({
      loading: true
    })
    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    if (validation.isValid) {
      const url = convertText(this.state.title)
      const _url = 'http://localhost:8000/api/'
      let formData = new FormData()
      formData.append('title', this.state.title)
      formData.append('url', url)
      formData.append('description', this.state.description)
      formData.append('text', this.state.text)
      formData.append('tags', this.state.tags)
      formData.append('thumbnail', this.state.thumbnail)
      formData.append('author', this.props.user._id)
      formData.append('likes', 0)
      axios({
        method: 'post',
        url: `${_url}articles/create`,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        NotificationManager.success('Đăng bài thành công!', 'Thông báo', 2000)
      })
      .catch(error => NotificationManager.error(err, 'Thông báo', 2000))
    } else {
      NotificationManager.error('Error message', 'Thông báo', 2000)
    }
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(ArticleForm)