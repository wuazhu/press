<template>
  <div class="client-distinct">
    <div class="index-title">
      <p class="text-base">段道管理</p>
    </div>
    <div class="row index-content d-flex">
      <div class="content-left col-3">
        <div class="top-title">组织机构</div>
        <company-trees></company-trees>
      </div>
      <div class="content-right">
        <div class="screen-module">
          <p class="top-title">待筛客户组1</p>
          <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
        </div>
        <div class="screen-module">
          <p class="top-title">待筛客户组2</p>
          <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
        </div>
        <div class="table-paging">
          <t-pager :total="100" :current="1"></t-pager>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import companyTrees from '../components/companyTrees.vue'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '联系电话',
          key: 'teleNumber'
        },
        {
          title: '客户地址',
          key: 'address'
        },
        {
          title: '所在段道',
          key: 'road'
        },
        {
          title: '段道责任人',
          key: 'responsible'
        },
        {
          title: '操作',
          width: 240,
          render: (h, params) => {
            // let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'border-right': '1px solid #E9E9E9', 'padding-right': '6px'},
                on: {
                  click() {
                  }
                }
              }, '详情'),
              h('span', {
                style: {'color': '#108EEA', 'border-right': '1px solid #E9E9E9', 'padding': '0 6px'},
                on: {
                  click() {
                  }
                }
              }, '合并其他'),
              h('span', {
                style: {'color': '#108EEA', 'padding': '0 6px'},
                on: {
                  click() {
                  }
                }
              }, '移出本组')
            ])
          }
        }
      ],
      listData: [
        {
          name: '刘德华',
          teleNumber: '18219223456',
          address: '北京市海淀区中关村软件园二期西北旺东路1',
          road: '1区1段',
          responsible: '张卫健'
        },
        {
          name: '刘德华',
          teleNumber: '18219223456',
          address: '北京市海淀区中关村软件园二期西北旺东路1',
          road: '1区1段',
          responsible: '张卫健'
        },
        {
          name: '刘德华',
          teleNumber: '18219223456',
          address: '北京市海淀区中关村软件园二期西北旺东路1',
          road: '1区1段',
          responsible: '张卫健'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.p-3 {
  padding:0 !important;
}
.client-distinct {
  .row {
    margin: 0;
  }
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
      margin: 0;
    }
    &>div {
      background: #FFFFFF;
      border: 1px solid #E9E9E9;
      min-height: 350px;
      padding-bottom: 100px;
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
        border: 0;
        .screen-module {
          border: 1px solid #E9E9E9;
          margin-bottom: 20px;
        }
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
            span {
              cursor: pointer;
            }
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
</style>
