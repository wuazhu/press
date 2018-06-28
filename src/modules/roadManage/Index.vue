<template>
  <div class="road-index">
    <div class="index-title">
      <p class="text-base">段道管理</p>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="content-left">
          <div class="org-title border">组织机构</div>
          <company-trees @emitClickOrgTreeNode="getRoadListData"></company-trees>
        </div>
      </div>
      <div class="col-9">
        <div class="content-right">
          <div class="cust-list-item border">
            <div class="org-title">段道列表</div>
            <t-table
              :columns="roadHeader"
              :data="roadData"
              :all-ellipsis="true"
              line>
            </t-table>
          </div>
          <div class="table-paging text-right">
            <t-pager :total="total" :current="currentPage"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <t-modal
      v-model="isShow"
      :closable="false"
      title="分配段道负责人"
      width="455"
      style="height:351px;">
      <t-transfer :operations="['>>','<<']" size="sm"></t-transfer>
    </t-modal>
  </div>
</template>

<script>
import companyTrees from '../components/CompanyTrees'
import { getRoadList } from './server'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      roadHeader: [
        {
          title: '段道名',
          key: 'name'
        },
        {
          title: '描述',
          key: 'desc'
        },
        {
          title: '责任人',
          key: 'presider'
        },
        {
          title: '操作',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'cursor': 'pointer'},
                on: {
                  click() {
                    vm.isShow = true
                    console.log(params.row)
                  }
                }
              }, '分配责任人')
            ])
          }
        }
      ],
      roadData: [],
      currentPage: 1,
      total: 0,
      isShow: false
    }
  },
  created() {
    this.makeRoadList()
  },
  methods: {
    async getRoadListData({ orgId }) {
      let params = {
        orgId,
        currentPage: this.currentPage,
        pageSize: 10
      }
      let roadData = await getRoadList(params)
      console.log(roadData)
      if (roadData.status === 200) {
        this.total = roadData.data.total
        this.roadData = roadData.data.data
      }
    },
    async makeRoadList() {
      // 获取段道列表
      let obj = {
        currentPage: 1,
        pageSize: 10,
        orgId: 10006404
      }
      let roadListData = await getRoadList(obj)
      if (roadListData.status === 200) {
        if (roadListData.data) {
          let _newData = roadListData.data.data
          _newData.forEach((item, key) => {
            item.presider = item.presider ? item.presider[0] : ''
          })
          this.listData = _newData
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.road-index {
  .index-title {
    p{
      line-height: 22px;
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
.table-wrapper {
  .table--line {
    .table__header {
      thead {
        th {
          background: #fff;
          .text-truncate {
            color: #000;
          }
        }
      }
    }
  }
}
.cust-list-item {
  margin-bottom: 20px;
}
</style>
