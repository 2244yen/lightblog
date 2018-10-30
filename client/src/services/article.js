import api from './api'
const err = "Có lỗi trong quá trình xử lý. Vui lòng kiểm tra lại."

var getList = () => {
  return new Promise((resolve, reject) => {
    api.get('/articles').then(respone => {
      resolve(respone.data)
    }, respone => {
      reject(respone)
    })
  })
}

var createArticle = (data) => {
  api.post('/articles/create').then(respone => {
    resolve(respone.data)
  }, respone => {
    reject(respone)
  })
}

export default {
  getList,
  createArticle
}