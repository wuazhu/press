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
              "id": 2000001,
              "code": "10ADMIN",
              "staffId": 2000001,
              "loginStationId": null,
              "state": null,
              "token": "B4AEEB78893C3F0B08224E817690F12B",
              "staff": {
                "staffId": 2000001,
                "staffCode": null,
                "staffName": "10ADMIN",
                "orgId": 10006404,
                "orgName": "中国邮政集团公司",
                "staffType": null,
                "staffLevel": null,
                "jobNumber": null,
                "thumbnail": null,
                "contactsDTO": null,
                "districtId": "110000",
                "districtTypeId": "10"
              }
            }
        }
      } else {
        return {
          status: 201,
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