import axios, { AxiosTransformer } from '../../src/index'
const instance = axios.create({
  transformRequest: [(function(data) {
    // return qs.stringify(data)
    data.c = 'abc'
    return data
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = 2
    }
    return data
  }]
})


instance({
  url: '/base/post',
  method: 'post',
  data: {
    a: 1
  }
}).then((res) => {
  console.log(res.data)
})
// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: ['bar', 'baz']
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     fooooooooooo: {
//       barrrrrrrr: 'baz'
//     }
//   }
// })

// const date = new Date()

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: '@:$, '
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: 'bar',
//     baz: null
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get#hash',
//   params: {
//     foo: 'bar'
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get?foo=bar',
//   params: {
//     bar: 'baz'
//   }
// })


// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     aaaaaa: 1,
//     bbbbbb: 2
//   }
// })

// const arrrrrr = new Int32Array([21, 31])

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: arrrrrr
// })

