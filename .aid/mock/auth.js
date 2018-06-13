module.exports = [
  {
    url: '/mock/api/v1/dologin',
    method: 'post',
    type: 'func',
    response: req => {
      return {
        status: 200,
        msg: "成功",
        data: {
          "ID": 2000001,
          "isMock": true,
          "NAME": "10ADMIN",
          "staffId": 2000001,
          "ORG_ID": 2000001,
          "ORG_NAME": '中国邮政集团',
          "responseCode": '0',
          "GLOBAL_SIGN": "B4AEEB78893C3F0B08224E817690F12B",
          "STAFF_ID": 2000001,
          "staff": {
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