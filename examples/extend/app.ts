import axios from '../../src/index'

axios({
  url: '/extend/post',
  method: 'post',
  data: {
    foo: 'hihihihi'
  }
})
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    foo: 'yoooooooo'
  }
})
axios.get('/extend/get', {
  params: {
    a: 123
  }
})
axios.post('/extend/post', {
  msg: 'ahhhh'
})
