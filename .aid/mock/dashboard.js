module.exports = [
  {
    url: '/mock/api/v1/dashboard/business',
    method: 'get',
    type: 'func',
    response: req => {
      let obj = {
        "status": 200,
        "message": "666",
        "data": {
            "salesVolumeFinish": 4500,
            "salesVolumeMonthly": 400,
            "salesVolumeData": {
              "dataAxis": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              "data": [112, 333, 444, 123, 333, 323, 221, 221, 232, 111, 222, 333]
            },
            "salesVolumeGoal": 6400,
            "salesVolumeGoalFinishRate": 3,
            "orderFinish":2000,
            "orderFinishRate":10,
            "orderData": {
              "dataAxis": ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
              "data": [112, 333, 444, 123, 333, 323, 221, 221, 232, 111, 222, 333]
            }
        }
      }
      return obj
    }
  },
  {
    url: '/mock/org',
    method: 'get',
    type: 'func',
    response: req => {
      let obj = {
        status: 200,
        message: "请求成功",
        data: {
          orgId: "10006405",
          orgName: "中国邮政集团公司",
          distId: "666",
          childOrgNum: 2,
          childOrgs: [
            {
              orgId: "10000400", orgName: "北京市报刊发行局1", distId: "666", isLeaf: "0",
              childOrgs: [
                {
                  orgId: "10000401", orgName: "测试数据1", distId: "110003", isLeaf: "0"
                }
              ]
            },
            {
              orgId: "10000401", orgName: "北京市报刊发行局2", distId: "777", isLeaf: "0"
            }
          ]
        }
      }
      return obj
    }
  },
  {
    url: '/mock/book',
    method: 'get',
    type: 'func',
    response: req => {
      let obj = {
        status: 200,
        message: "请求成功",
        data: [
          {
            pressCatalogId: 0, cataId: "68", pressId: "", pressName: "时政新闻1", pressYear: "", labelName: '1', pressUrl: ""
          },
          {
            pressCatalogId: 0, cataId: "69", pressId: "", pressName: "时政新闻2", pressYear: "", labelName: '2', pressUrl: ""
          },
        ]
      }
      return obj
    }
  }
]


