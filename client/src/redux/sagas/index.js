import { all } from 'redux-saga/effects'
import userSaga from './user'
import articleSaga from './article'

export default function* rootSaga() {
  yield all([
    userSaga(),
    articleSaga()
  ])
}