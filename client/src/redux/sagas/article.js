import { takeLatest, put } from 'redux-saga/effects'
import apiArticle from '../../services/article'
import * as articleAction from '../actions/articleAction'

export default function* watchFetchArticlesSaga () {
  yield takeLatest('FETCH_ARTICLE_START', fetchArticlesSaga)
}

function* fetchArticlesSaga () {
  try {
    const response = yield apiArticle.getList()
    yield put (articleAction.fetchSuccessData(response.data))
  } catch (error) {
    yield put (articleAction.fetchFailData())
  }
}