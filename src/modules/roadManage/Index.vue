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
            <t-pager :total="total" :current="currentPage" @on-change="changePage"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <t-modal
      v-model="isShow"
      :closable="false"
      title="分配段道负责人"
      width="580"
      style="height:351px;"
      @on-ok="comfirmPresiders"
      @on-cancel="cancelPresiders">
      <t-transfer
        :operations="['<<','>>']"
        :data="presiderData"
        :targetKeys="presiderChecked"
        size="sm"
        @on-change="selectOrCancel"></t-transfer>
    </t-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { indexOf, remove, forEach } from 'lodash'
import companyTrees from '../components/CompanyTrees'
import { getRoadList, getPresiders, savePresiders } from './server'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      rdSgId: null,
      nowOrg: this.$store.state.login.orgId,
      presiderData: [],
      presiderChecked: [],
      newPresiders: [],
      removePresiders: [],
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
                  async click() {
                    vm.isShow = true
                    vm.rdSgId = params.row.id
                    let presiderList = await getPresiders({
                      orgId: vm.nowOrg,
                      rdSgId: params.row.id
                    })
                    console.log('presiderList', presiderList)
                    if (presiderList.status === 200) {
                      vm.presiderData = presiderList.data.chooseList
                      vm.presiderChecked = presiderList.data.checkedList
                    } else {
                      vm.$Message.danger(presiderList.message)
                    }
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
    cancelPresiders() {
      this.newPresiders = []
      this.delPresiders = []
      this.presiderChecked = []
      this.presiderData = []
    },
    async comfirmPresiders() {
      let params = {
        rdSgId: this.rdSgId,
        orgId: `${this.nowOrg}`,
        addPresiders: [],
        delPresiders: []
      }
      if (this.newPresiders.length > 0) {
        forEach(this.presiderData, aIt => {
          forEach(this.newPresiders, nIt => {
            if (nIt === aIt.key) {
              let obj = {
                key: nIt,
                label: aIt.label
              }
              params.addPresiders.push(obj)
            }
          })
        })
      }
      if (this.removePresiders.length > 0) {
        forEach(this.removePresiders, aIt => {
          let obj = {
            key: aIt,
            label: ''
          }
          params.delPresiders.push(obj)
        })
      }
      let svp = await savePresiders(params)
      if (svp.status === 200) {
        this.$Message.success('保存成功!')
      } else {
        this.$Notice.danger({
          title: `code: ${svp.status}`,
          desc: svp.message
        })
      }
      this.isShow = false
    },
    selectOrCancel(targetKeys, direction, moveKeys) {
      if (direction === 'right') {
        this.newPresiders.push(...moveKeys)
      } else {
        forEach(moveKeys, k => {
          if (indexOf(this.presiderChecked, k) > -1) {
            this.removePresiders.push(k)
            remove(this.presiderChecked, checkItem => {
              return checkItem === k
            })
          } else {
            remove(this.newPresiders, n => {
              return n === k
            })
          }
        })
      }
    },
    changePage(pageNow) {
      this.currentPage = pageNow
      this.getRoadListData({ orgId: this.nowOrg })
    },
    async getRoadListData({ orgId }) {
      this.nowOrg = orgId
      let params = {
        orgId: orgId,
        currentPage: this.currentPage,
        pageSize: 10
      }
      let roadListData = await getRoadList(params)
      if (roadListData.status === 200) {
        if (roadListData.data) {
          this.total = roadListData.data.total
          let _newData = roadListData.data.data
          _newData.forEach((item, key) => {
            item.presider = item.presider ? item.presider.join(', ') : '暂无责任人'
          })
          this.total = roadListData.data.total
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
.transfer-list {
  width: 200px!important;
}
</style>
