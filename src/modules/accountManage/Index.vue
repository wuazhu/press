<template>
  <div class="passage-index">
    <div class="index-title">
      <p class="text-base">账户管理</p>
    </div>
    <div class="row index-content d-flex">
      <div class="content-left col-3">
        <div class="top-title">组织机构</div>
        <span class="mr-5 content-search w-100 d-flex"><t-input placeholder="请输入搜索内容"></t-input></span>
        <span class="mr-5"><t-tree ref="tree" :data="companyList" class="filter-tree"></t-tree></span>
      </div>
      <div class="content-right">
        <div class="top-title">账户列表</div>
        <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
        <div class="table-paging">
          <t-pager :total="100" :current="1"></t-pager>
        </div>
      </div>
    </div>
    <!-- 修改基本信息 -->
    <t-modal v-model="isShow" :closable="false" title="修改基本信息" style="width:455px;height:463px;">
      <t-form :model="inforData" :label-span="2" label-position="left" size="sm">
        <t-form-item label="头像" prop="input1">
          <t-upload ref="uploader" :show-upload-list="false" :format="['jpg','jpeg','png']" :max-size="2048" multiple type="drag" action="//jquery-file-upload.appspot.com/" class="demo-upload-list">
            <div style="line-height:48px;">
              <i class="aid aid-plus"></i>
            </div>
          </t-upload>
        </t-form-item>
        <t-form-item label="姓名" prop="input2">
          <t-input v-model="inforData.input2" placeholder=""></t-input>
        </t-form-item>
        <t-form-item label="工号" prop="input3">
          <t-input v-model="inforData.input3" placeholder=""></t-input>
        </t-form-item>
        <div class="form-title">联系方式</div>
        <t-form-item label="微信号" prop="input4">
          <t-input v-model="inforData.input4" placeholder=""></t-input>
        </t-form-item>
        <t-form-item label="手机号码" prop="inpu5">
          <t-input v-model="inforData.input5" placeholder=""></t-input>
        </t-form-item>
      </t-form>
    </t-modal>
    <!-- 设定考核目标 -->
    <t-modal v-model="targetIsShow" :closable="false" title="设定考核目标" style="width:455px;height:463px;">
      <t-form :model="targetItem">
        <t-form-item label="为 刘德华 设定 2018年度 流转额">
          <t-input v-model="targetItem.input" placeholder="请填写年度流转额"></t-input>
        </t-form-item>
        <div class="border-line"></div>
        <div class="plan-title d-flex justify-content-between">
          <span>2017年目标</span>
          <span>￥3000 / ￥4000</span>
        </div>
        <t-progress :percent="55" status="active"></t-progress>
        <div class="plan-title d-flex justify-content-between">
          <span>2016年目标</span>
          <span>￥3000 / ￥4000</span>
        </div>
        <!-- <t-modal v-model="targetIsShow" :closable="false" title="设定考核目标" style="width:455px;height:463px;"> -->
        <t-progress :percent="75" status="active"></t-progress>
      </t-form>
    </t-modal>
    <!-- 设备授权信息 -->
    <t-modal v-model="equipmentIsShow" :closable="false" title="设备授权信息" style="width:455px;height:463px;"></t-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyList: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      listHeaderData: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '编码',
          key: 'coding'
        },
        {
          title: '岗位',
          key: 'station'
        },
        {
          title: '设备授权',
          key: 'equipment'
        },
        {
          title: '考核目标',
          key: 'target'
        },
        {
          title: '操作',
          key: 'operation'
        }
      ],
      listData: [
        {
          name: '张学友',
          coding: '09287621',
          station: '投递员',
          equipment: '3',
          target: '￥26000',
          operation: '删除'
        },
        {
          name: '张学友',
          coding: '09287621',
          station: '投递员',
          equipment: '3',
          target: '￥26000',
          operation: '删除'
        },
        {
          name: '张学友',
          coding: '09287621',
          station: '投递员',
          equipment: '3',
          target: '￥26000',
          operation: '删除'
        }
      ],
      isShow: false,
      targetIsShow: false,
      equipmentIsShow: true,
      inforData: {},
      targetItem: {},
      equipmenttItem: {}
    }
  }
}
</script>

<style lang="less" scoped>
.p-3 {
  padding:0 !important;
}
.passage-index {
  .index-title {
    p{
      line-height: 22px;
      margin-bottom: 0;
    }
  }
  .index-content {
    width: 100%;
    margin-top: 12px;
    .top-title {
      background: #F7F7F7;
      border-bottom: 1px solid #E9E9E9;
      padding-left: 16px;
      line-height: 40px;
      color: #323232;
    }
    &>div {
      background: #FFFFFF;
      border: 1px solid #E9E9E9;
      min-height: 350px;
      &:nth-child(1) {
        padding: 0;
        .content-search {
          justify-content: center;
          align-items: center;
          margin-top: 12px;
          .input-wrapper {
            width: 90%;
            input {
              width: 100%;
              height: 28px;
              font-size: 12px;
            }
          }
        }
      }
      &:nth-child(2) {
        margin-left: 20px;
        flex: 1;
        position: relative;
        .table__header {
          table {
            th {
              background: #fff;
              height: 40px;
              font-size: 12px;
              color: #000;
            }
          }
        }
        .table-tbody {
          td {
            height: 40px;
            font-size: 12px;
            color: #000;
          }
        }
        .table-paging {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
      }
    }
  }
  .pagination__item--active {
    .pagination__item-link {
      background-color: #009241;
      border-color: #009241;
    }
  }
}
.transfer {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  .transfer-list {
    width: 180px;
    height: 185px;
    border: 1px solid #E9E9E9;
    span {
      color: #000;
    }
    .transfer-list__header {
      background: #fff;
      border-bottom: 1px solid #E9E9E9;
    }
  }
}
.demo-upload-list {
  .upload--drag {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
}
.form--label-left {
  .form-group {
    &:nth-child(1) {
      .form-group__label {
        line-height: 48px;
      }
    }
  }
}
.form-title {
  color: #009241;
  font-size: 14px;
  line-height: 40px;
  border-bottom: 1px solid #E9E9E9;
  margin-bottom: 16px;
}
.plan-title {
  line-height: 30px;
  font-size: 12px;
}
.border-line {
  width: 100%;
  height: 1px;
  background: #E9E9E9;
  margin-bottom: 20px;
}
</style>
