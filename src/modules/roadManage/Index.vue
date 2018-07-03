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
import { mapState } from 'vuex'
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
  computed: {
    ...mapState({
      orgId: state => state.login.orgId
    })
  },
  created() {
    this.getRoadListData({
      orgId: this.orgId
    })
  },
  methods: {
    async getRoadListData({ orgId }) {
      let params = {
        orgId: orgId,
        currentPage: this.currentPage,
        pageSize: 10
      }
      let roadListData = await getRoadList(params)
      console.log(roadListData)
      if (roadListData.status === 200) {
        console.log(roadListData)
        if (roadListData.data) {
          let _newData = roadListData.data.data
          _newData.forEach((item, key) => {
            item.presider = item.presider ? item.presider.join('') : '暂无责任人'
          })
          // this.total = roadListData.data
          this.roadData = _newData
        }
      } else {
        this.$Notice.danger({
          desc: roadListData.message,
          title: `错误码: ${roadListData.status}`
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>

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
