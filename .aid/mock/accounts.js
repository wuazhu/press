module.exports = [
  {
    url: '/mock/api/v1/accounts',
    method: 'get',
    type: 'func',
    response: req => {
      let arr = [
        {
          name: 'xxx',
          code: 'xxx'
        }
      ]
      return arr
    }
  }
]
