module.exports = [
  {
    url: '/mock/api/v1/dologin',
    method: 'post',
    type: 'func',
    response: req => {
      if (req.body.username === 'admin' &&
        req.body.password === '11' &&
        req.body.verify.toLowerCase() === 'itzx') {
        return {
            status: 200,
            msg: "成功",
            data: {
              token: 't1294jiweniweu9gjha'
            }
        }
      } else {
        return {
          status: 200,
          msg: "密码错误"
        }
      }
    }
  },
  {
    url: '/mock/dologout',
    method: 'post',
    type: 'func',
    response: req => {
      return {
        'success': true
      }
    }
  }
]