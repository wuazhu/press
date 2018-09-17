module.exports = [
  {
    url: '/mock/api/v1/unDistriList',
    method: 'get',
    type: 'func',
    response: req => {
      return {
        "status": 200,
        "message": "系统请求成功！",
        "data": {
          "total": 2, //总条数
          "pageCount": 1, //总页数
          "list": [{
            "cid": "4", //记录主键
            "custId": "89102120102", //客户ID
            "custName": "老A1", //客户名称
            "orgId": "10003105", //机构ID
            "orgName": "北京长安街报刊局", //机构名称
            "segId": "12" //段道ID
          },
          {
            "cid": "5", //记录主键
            "custId": "89102120103", //客户ID
            "custName": "老B", //客户名称
            "orgId": "10003106", //机构ID
            "orgName": "北京王府井报刊局", //机构名称
            "segId": "25" //段道ID
          }]
        }
      }
    }
  },
  {
    url: '/mock/api/v1/distriList',
    method: 'get',
    type: 'func',
    response: req => {
      return {
        "status": 200,
        "message": "系统请求成功！",
        "data": {
          "total": 2, //总条数
          "pageCount": 1, //总页数
          "list": [{
            "cid": "4", //记录主键
            "custId": "89102120102", //客户ID
            "custName": "老c", //客户名称
            "orgId": "10003105", //机构ID
            "orgName": "北京长安街报刊局", //机构名称
            "segId": "12" //段道ID
          },
          {
            "cid": "5", //记录主键
            "custId": "89102120103", //客户ID
            "custName": "老d", //客户名称
            "orgId": "10003106", //机构ID
            "orgName": "北京王府井报刊局", //机构名称
            "segId": "25" //段道ID
          }
          ]
        }
      }
    }
  },
  {
    url: '/mock/api/v1/marketSegList',
    method: 'get',
    type: 'func',
    response: req => {
      return {
        "status": 200,
        "message": "系统请求成功！",
        "data": {
          "total": 2, //总条数
          "pageCount": 1, //总页数
          "list": [{
            "oid": "4", //记录主键
            "orgId": "10003105", //机构ID
            "segName": "营销段道1", //段道名称
            "segId": "12" //段道ID
          },
          {
            "oid": "5", //记录主键
            "orgId": "10003106", //机构ID
            "segName": "营销段道2", //段道名称
            "segId": "15" //段道ID
          }
          ]
        }
      }
    }
  },
  
]