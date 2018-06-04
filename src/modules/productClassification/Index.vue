<template>
  <div class="product-index">
    <div class="index-title">
      <p class="text-base">段道管理</p>
    </div>
    <div class="row index-content d-flex">
      <div class="content-left col-3">
        <div class="top-title">组织机构</div>
        <company-trees></company-trees>
      </div>
      <div class="content-right">
        <div class="top-title">段道列表1111</div>
        <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
        <div class="table-paging">
          <t-pager :total="100" :current="1"></t-pager>
        </div>
      </div>
    </div>
    <t-modal v-model="isShow" :closable="false" title="分配段道负责人" style="width:455px;height:351px;">
      <t-transfer :operations="['>>','<<']" size="sm"></t-transfer>
    </t-modal>
  </div>
</template>

<script>
import companyTrees from '../components/CompanyTrees.vue'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '段道名',
          key: 'name'
        },
        {
          title: '描述',
          key: 'description'
        },
        {
          title: '责任人',
          key: 'person'
        },
        {
          title: '操作',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'padding': '0 6px'},
                on: {
                  click() {
                    vm.isShow = true
                  }
                }
              }, '分配责任人')
            ])
          }
        }
      ],
      listData: [
        {
          name: 'A 区一段',
          description: '从xxx 街以南到 xxx 街以北',
          person: '郭富城'
        },
        {
          name: 'A 区一段',
          description: '从xxx 街以南到 xxx 街以北',
          person: '郭富城'
        },
        {
          name: 'A 区一段',
          description: '从xxx 街以南到 xxx 街以北',
          person: '郭富城'
        }
      ],
      isShow: false
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
.product-index {
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
