# 报刊Admin一阶段接口需求

## 版本

|  编号  |        发布时间        |                        描述                         |
| :----: | :--------------------: | :-------------------------------------------------: |
| v0.0.1 | 2018年05月24日09:09:14 |                       初始化                        |
| v0.0.2 | 2018年05月24日19:12:00 |                        公约                         |
| v0.0.3 | 2018年05月30日10:30:00 |                      修改登录                       |
| v0.0.4 | 2018年05月31日17:27:24 | 新增报刊客户管理, <br />统一返回 msg 修改为 message |

## 概述

在请求头里添加 token

本接口供报刊APP调用,原则上使用 https 方式调用

接口前缀使用:  /api/<版本号>/

公共字段说明

- status:  接口响应状态, 可选值为 'ok' 或 'error'
- message:  接口响应状态消息
- data:  具体接口响应数据

请求返回状态码

| 状态码 |     返回message      |    详细描述    |
| :----: | :------------------: | :------------: |
|  200   |     系统请求成功     |    请求成功    |
|  302   |      系统被转发      |   请求被转发   |
|  400   | 系统错误，请稍候再试 |  请求参数有误  |
|  401   | 系统错误，请稍候再试 |   用户未登录   |
|  404   | 系统错误，请稍候再试 |   资源未找到   |
|  405   | 系统错误，请稍候再试 | 请求方法不支持 |
|  500   | 系统错误，请稍候再试 |   服务器错误   |

## 登录

### 登录

- 接口地址: /login
- 请求方式: POST
- 请求参数

| 名称     |  描述  | 默认值 |
| -------- | :----: | -----: |
| username | 用户名 |     无 |
| password |  密码  |     无 |

- 返回数据

```json
{
  "status": 200,
  "message": "请求成功",
  "data": {
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
```



### 登出

## 段道管理

### 查询组织机构树

- 接口地址: /organize
- 请求方式: GET
- 请求参数

|  名称  |     描述     |  默认值  |
| :---- | ------------- | ------ |
| token | 用户登录token值 |   无   |

- 返回数据

```json
{
    "status": "ok",
    "message": "ok",
    "data": [{
        "text": "中国邮政集团节点1", // 节点名称
        "id": "xxx",  // 节点 id
        "children": [{      // 如有子节点需要有此字段, 无此节点不需要有此字段
            "text": "山东分公司",
            "id": "xxx",
        },{
        "text": "中国邮政集团节点2", // 节点名称
        "id": "xxx",  // 节点 id
        "children": [{      // 如有子节点需要有此字段, 无此节点不需要有此字段
            "text": "山东分公司",
            "id": "xxx",
        },
        ...]
    }]
}
```



### 查询段道列表 ( 分页 )

- 接口地址: /region

- 请求方式: GET

- 请求参数


| 名称        |      描述       | 默认值 |
| ----------- | :-------------: | -----: |
| currentPage |      页码       |      1 |
| pageSize    |    每页条数     |     10 |
| orgId       | 组织机构节点 id |     无 |

- 返回参数

```json
{
    "status": "ok",
    "message": "ok",
    "data": [
        {
            "id": "xxx", 	// 段道 id
            "desc": "不可描述",		// 描述
            "name": "A区一段",		// 段道名称
            "presider": "张学友", 	// 责任人
        }
    ]
}
```



### 查询段道负责人

- 接口地址: /presider/:id
- 请求方式: GET
- 请求参数

| 名称 |  描述   | 默认值 |
| :--- | :-----: | -----: |
| id   | 段道 id |     无 |

- 返回数据

```json
{
    "status": "ok",
    "data": {
        "chooseList": [ // 可选人员列表
            {
                id: "xx",
                text: "刘德华",	// 人员名称
            },
            ...
        ],  
        "checkedList": [	//已选人员列表
            {
                id: "xx",
                text: "刘德华",	// 人员名称
            },
            ...
        ]
    }
}
```



### 保存段道负责人

- 接口地址: /presider/:id
- 请求方式: POST
- 请求参数

| 名称      |           描述            | 默认值 |
| :-------- | :-----------------------: | -----: |
| id        |          段道 id          |     无 |
| presiders | 已选人员列表['1','2','3'] |     [] |

- 返回数据

```json
{
    "status": "ok",
    "message": "ok",
    "data": {}
}
```



## 账户管理

### 查询账户列表 (分页)

- 接口地址: /accounts
- 请求方式: GET
- 请求参数

| 名称        |    描述     | 默认值 |
| ----------- | :---------: | -----: |
| orgId       | 组织机构 id |     无 |
| currentPage |    页码     |      1 |
| pageSize    |  每页条数   |     10 |

- 返回参数

```json
{
	"status": "ok",
    "data": [
        {
            "name": "张学友", // 姓名
            "code": "xx",	// 编码
            "jobNumber": "xxx" // 员工工号
        	"thumbnail": "xx", // 员工的头像Url 或者是用户姓名缩写,
            "contacts": {
                "phone": "13712345678", // 电话
                "wechatId": "chinapost_staff_9527",	// 微信id
            },
            "phone": "133",	// 手机号
            "station": "投递员", // 岗位
            "authorization": 3, // 设备授权
            "target": 20000,	// 考核目标
            "id": "xx",		// 账户 id
        },
        ...
    ]
}
```



### 修改账户信息

- 接口地址: /accounts/:id
- 请求方式: POST
- 请求参数

| 名称        |   描述   | 默认值 |
| ----------- | :------: | -----: |
| name        | 员工姓名 |     无 |
| jobNumber   | 员工工号 |     无 |
| wechartId   |  微信号  |     无 |
| phone       |  手机号  |     无 |
| thumbnailId | 员工头像 |     无 |

- 返回参数

```json
{
    "status": "ok",
    "message": "okkk",
    "data": {}
}
```



### 上传员工头像

- 接口地址: /avatar
- 请求方式: POST
- 请求参数

| 名称 | 描述 | 默认值 |
| ---- | :--: | -----: |
|      |      |        |

- 返回参数

``` json
{
    "status": "ok",
    "message": "okkk",
    "data": {
        "fileId": "xx", 	// 文件id
        "thumbnail": "xxx"	// 图片地址
    }
}
```



### 查询员工授权设备列表

- 接口地址: /macs/:jobNumber
- 请求方式: GET
- 请求参数

| 名称      |  描述   | 默认值 |
| --------- | :-----: | -----: |
| jobNumber | 员工 id |     无 |

- 返回参数

``` json
{
    "status": "ok",
    "message": "okkk",
    "data": [{
        "macAddress": "00-05-5D-E8-0F-A3", 	// 设备mac 地址
        "macId": "xxx"	// id
    },
    ...]
}
```



### 删除员工授权设备

- 接口地址: /macs/:jobNumber
- 请求方式: DELETE
- 请求参数

| 名称      |    描述    | 默认值 |
| --------- | :--------: | -----: |
| macId     | mac地址 id |     无 |
| jobNumber |  员工 id   |     无 |

- 返回参数

``` json
{
    "status": "ok",
    "message": "okkk",
    "data": {}
}
```



### 新增员工授权设备

- 接口地址: /macs
- 请求方式: POST
- 请求参数

| 名称       |  描述   | 默认值 |
| ---------- | :-----: | -----: |
| macAddress | mac地址 |     无 |
| jobNumber  | 员工 id |     无 |

- 返回参数

``` json
{
    "status": "ok",
    "message": "okkk",
    "data": {
        macAddress: "00-05-5D-E8-0F-A3", 	// 新增成功的 mac 地址
        macId: "xxx"	// mac地址 id
    }
}
```



### 查询员工考核目标 (分页)

当前年份是否标识?

- 接口地址: /targets
- 请求方式: GET
- 请求参数

| 名称        |   描述   | 默认值 |
| ----------- | :------: | -----: |
| jobNumber   | 员工 id  |     无 |
| currentPage |   页码   |      1 |
| pageSize    | 每页条数 |     10 |

- 返回参数

``` json
{
    "status": "ok",
    "message": "okkk",
    "data": [{	// 返回近3年考核目标数据
        date: "2018", 	// 年度
        total: 4000,	// 目标金额
        actualMoney: 3000,	// 实际完成金额
    },{
        date: "2017",	// 年度
        total: 3000	// 目标金额
        actualMoney: 3000,	// 实际完成金额
    }]
}
```



### 修改员工考核目标

- 接口地址: /targets
- 请求方式: POST
- 请求参数

| 名称      |   描述   | 默认值 |
| --------- | :------: | -----: |
| jobNumber | 员工 id  |     无 |
| goal      | 目标金额 |     无 |

- 返回参数

``` json
{
    "status": "ok",
    "message": "okkk",
    "data": {}
}
```



## 客户管理

### 客户筛重 (分页)

- 接口地址: /customers
- 请求方式: /GET
- 请求参数

| 名称        |    描述     | 默认值 |
| ----------- | :---------: | -----: |
| orgId       | 组织机构 id |     无 |
| currentPage |  当前页码   |      1 |
| pageSize    |  每页条数   |     10 |

- 返回参数

```json
{
    "status": "ok",
    "message": "okkk",
    "data": [
        {
            listId: 'xxxx', 	// 待筛选客户组 id
            custList: [
                {
                    customerId: 'xxx',	// 客户 id
                    name: '刘德华',	// 客户名
                    phone: '100100100',	// 电话号码
                    address: '北京市北京北京市北京', // 地址
                    road: '1区1段',	// 所在段道
                    leader: '陈奕迅',	// 段道负责人
            	},
                {
                    customerId: 'xxx',	// 客户 id
                    name: '刘德华',	// 客户名
                    phone: '100100100',	// 电话号码
                    address: '北京市北京北京市北京', // 地址
                    road: '1区1段',	// 所在段道
                    leader: '陈奕迅',	// 段道负责人
                }
            ]
        },
        {
            listId: 'xxxx', 	// 待筛选客户组 id
            custList: [
                {
                    customerId: 'xxx',	// 客户 id
                    name: '刘德华',	// 客户名
                    phone: '100100100',	// 电话号码
                    address: '北京市北京北京市北京', // 地址
                    road: '1区1段',	// 所在段道
                    leader: '陈奕迅',	// 段道负责人
            	},
                {
                    customerId: 'xxx',	// 客户 id
                    name: '刘德华',	// 客户名
                    phone: '100100100',	// 电话号码
                    address: '北京市北京北京市北京', // 地址
                    road: '1区1段',	// 所在段道
                    leader: '陈奕迅',	// 段道负责人
                }
            ]
        }
    ]
}
```



### 合并其他

- 接口地址: /merge
- 请求方式: /POST
- 请求参数

| 名称   |    描述     | 默认值 |
| ------ | :---------: | -----: |
| orgId  | 组织机构 id |     无 |
| listId |  客户组 id  |     无 |
| mainId | 当前客户 id |     无 |

- 返回参数

```json
{
    "status": "ok",
    "message": "okkk",
    "data": {
        
    }
}
```



### 移出本组

- 接口地址: /moveout
- 请求方式: /DELETE
- 请求参数

| 名称   |    描述     | 默认值 |
| ------ | :---------: | -----: |
| orgId  | 组织机构 id |     无 |
| listId |  客户组 id  |     无 |
| mainId | 当前客户 id |     无 |

- 返回参数

```json
{
    "status": "ok",
    "message": "okkk",
    "data": {
        
    }
}
```



## 报刊

### 新增报刊精品

- 接口地址: /press
- 请求方式: /DELETE
- 请求参数

| 名称      |    描述    | 默认值 |
| --------- | :--------: | -----: |
| pressId   |  报刊 id   |     无 |
| setTop    |  设置置顶  |     无 |
| bannerUrl | banner URL |     无 |
| picture   |    xxx     |     无 |

- 返回参数

```json
{
    "status": "ok",
    "message": "okkk",
    "data": {
    	
    }
}
```



### 精品推荐管理 (分页)

- 接口地址: /recommend
- 请求方式: /PATCH
- 请求参数

| 名称        |    描述     | 默认值 |
| ----------- | :---------: | -----: |
| orgId       | 组织机构 id |     无 |
| currentPage |    页码     |      1 |
| pageSize    |  每页条数   |     10 |
| pressId     |   报刊 id   |     无 |

- 返回参数

```json
{
    "status": "ok",
    "message": "okkk",
    "data": {}
}
```

