import qs from 'query-string'

// 定义 token 失效的 静态变量
const TOKEN_INVALID_EVENT = 'TOKEN_INVALID_EVENT'

const parse4URL = (query) => {
  const {token} = qs.parse(query)
  return token
}

export {
  parse4URL,
  TOKEN_INVALID_EVENT
}
