export function fetchDataStart () {
  return { type: 'FETCH_ARTICLE_START' }
}

export function fetchFailData () {
  return { type: 'FETCH_ARTICLE_FAIL' }
}

export function fetchSuccessData (payload) {
  return { type: 'FETCH_ARTICLE_SUCCESS', payload: payload }
}