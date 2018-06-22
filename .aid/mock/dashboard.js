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
    url: '/mock/api/v1/dashboard/customers',
    method: 'get',
    type: 'func',
    response: req => {
      let obj = {
        "status": 200,
        "data": {
            // 新增客户情况统计
            "increaseNumbers": 4500, // 新增客户数(人)
            "increaseSalesVolume":400, // 新增客户收入(元)
            "increaseRate": 5,  // 新增率(%)
            "increaseRateDeviation": 1,  // 新增率差额(%)(当年新增率 - 上一年新增率)
            "increaseMonthData": {	// 新增客户月度数据
                dataAxis:['2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10', '2018-11', '2018-12'],//已产生月份
                data:[112, 333, 444, 123, 333, 323, 221, 221, 232, 111, 222, 333],//月新增数
            },
            "increaseRatioData": [// 新增客户分布
                {value:1100, name:'订1-3个月'},
                {value:900, name:'订半年'},
                {value:2500, name:'订全年'}
            ],
            // 流失客户情况统计
            "minusNumbers": 4500, // 流失客户数(人)
            "minusSalesVolume":400, // 流失客户收入(元)
            "minusRate": 5,  // 流失率(%)
            "minusRateDeviation": 1,  // 流失率差额(%)(当年流失率 - 上一年流失率)
            "minusMonthData": {	// 流失客户月度数据
                dataAxis:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],//已产生月份
                data:[112, 333, 444, 123, 333, 323, 221, 221, 232, 111, 222, 333],//月流失数
            },
            "minusRatioData": [// 流失客户分布
                {value:1100, name:'换址搬迁'},
                {value:900, name:'服务不满意'},
                {value:2500, name:'其他'}
            ],
            // 续订客户情况统计
            "minusNumbers": 14500, // 存量客户数(人)
            "minusSalesVolume":4500, // 已续订客户数(人)
            "minusRate": 5,  // 续订率(%)
            "minusMonthData": {	// 已续订客户月度数据
                dataAxis:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],//已产生月份
                data:[112, 333, 444, 123, 333, 323, 221, 221, 232, 111, 222, 333],//月续订数
            },
            "minusRatioData": [// 续订客户比例
                {value:4500, name:'已续订客户'},
                {value:10000, name:'待续订客户'}
            ]
        }
      }
      return obj
    }
  }
]


