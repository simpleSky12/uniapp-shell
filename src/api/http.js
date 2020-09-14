import request from '~/uview-ui/libs/request'

class Http {
  // 这个方法 将 运来配置在拦截器中的方法进行了改造，取消了 loading 过渡动画
  static myRequest() {
    //获取拦截器里面的配置，拦截器
    const {config, interceptor} = request

    // 根据request的construct重新构建一个请求实例，目的是长轮询去除loading的遮罩
    return Object.assign(new request.constructor(), {
      config: {...config, showLoading: false},
      interceptor
    })
  }

  // 获取 学生的 成绩列表
  static async getDetail(params) {
    return await request.get('/api/std-grade/detail', params)
  }
}

export {
  Http
}
