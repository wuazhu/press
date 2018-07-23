<template>
  <div class="road-index">
    <div class="index-title">
      <p class="text-base">段道管理</p>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="content-left">
          <div class="org-title border">组织机构</div>
          <organize-tree @emitClickOrgTreeNode="changeOrg"></organize-tree>
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
            <t-pager :total="total" :current="currentPage" :page-size="10" @on-change="changePage"></t-pager>
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
        :titles="['可选', '已选']"
        :operations="['<<','>>']"
        :data="presiderData"
        :target-keys="presiderChecked"
        size="sm"
        @on-change="selectOrCancel"></t-transfer>
    </t-modal>
    <t-modal
      v-model="showInnerCust"
      :closable="false"
      title="查看段道内客户"
      width="580"
      style="height:351px;"
      @on-ok="comfirmPresiders"
      @on-cancel="cancelPresiders">
      <div>
        <div class="d-flex justify-content-between">
          <div><t-button type="outline" class="clo-2" size="sm">批量移动到段道</t-button></div>
          <div class="text-right" style="width:300px;">
            <t-input v-model="custSearchInput" placeholder="请输入搜索内容" size="sm" style="width:140px;"></t-input>
            <t-button type="primary" size="sm">查询</t-button>
          </div>
        </div>
        <t-table
          :columns="custHeader"
          :data="custData"
          :all-ellipsis="true"
          line>
        </t-table>
      </div>
      <div class="table-paging text-right mt-2">
        <t-pager :total="custTotal" :current="custCurrentPage" :page-size="10" @on-change="custChangePage"></t-pager>
      </div>
      <div slot="footer"></div>
    </t-modal>
    <t-modal
      v-model="showInnerCust"
      :closable="false"
      title="查看段道内客户"
      width="580"
      style="height:351px;"
      @on-ok="comfirmPresiders"
      @on-cancel="cancelPresiders">
      
    </t-modal>
  </div>
</template>

<script>
import { indexOf, remove, forEach } from 'lodash'
import organizeTree from '../components/OrganizeTree'
import { getRoadList, getPresiders, savePresiders } from './server'

export default {
  components: {
    organizeTree
  },
  data() {
    return {
      custTotal: 0,
      custCurrentPage: 1,
      custSearchInput: '',
      showInnerCust: false,
      rdSgId: null,
      orgId: this.$store.state.login.orgId,
      presiderData: [],
      presiderChecked: [],
      newPresiders: [],
      removePresiders: [],
      custData: [
        {
          custName: '客户',
          contactType: '1',
          address: '1234123412341234123412341234'
        },
        {
          custName: '客户',
          contactType: '2',
          address: '1234123412341234123412341234'
        }
      ],
      custHeader: [
        {
          title: '客户姓名',
          key: 'custName',
          type: 'selection',
          width: 50
        },
        {
          title: '客户姓名',
          key: 'custName'
        },
        {
          title: '联系方式',
          key: 'contactType'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          align: 'right',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'cursor': 'pointer'},
                on: {
                  async click() {
                  }
                }
              }, '移到其他段道')
            ])
          }
        }
      ],
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
          align: 'right',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'cursor': 'pointer'},
                on: {
                  async click() {
                    vm.cancelPresiders()
                    vm.isShow = true
                    vm.rdSgId = params.row.id
                    let presiderList = await getPresiders({
                      orgId: vm.orgId,
                      rdSgId: params.row.id
                    })
                    if (presiderList.status === 200) {
                      vm.presiderData = presiderList.data.chooseList
                      vm.presiderChecked = presiderList.data.checkedList
                    } else {
                      vm.$Message.danger(presiderList.message)
                    }
                  }
                }
              }, '分配责任人'),
              h('span', {
                style: {'color': '#108EEA', 'cursor': 'pointer', 'margin-left': '20px'},
                on: {
                  async click() {
                    vm.showInnerCust = true
                    console.log(123)
                  }
                }
              }, '段道内客户')
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
  },
  created() {
    this.getRoadListData()
  },
  methods: {
    custChangePage(page) {
      this.custCurrentPage = page
    },
    cancelPresiders() {
      this.newPresiders = []
      this.removePresiders = []
      this.presiderChecked = []
      this.presiderData = []
    },
    async comfirmPresiders() {
      let params = {
        rdSgId: this.rdSgId,
        orgId: `${this.orgId}`,
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
      if (params.addPresiders.length === 0 && params.delPresiders.length === 0) {
        return
      }
      let svp = await savePresiders(params)
      if (svp.status === 200) {
        this.getRoadListData()
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
        forEach(moveKeys, mvk => {
          if (indexOf(this.presiderChecked, mvk) > -1) {
            remove(this.removePresiders, item => {
              return mvk === item
            })
          } else {
            this.newPresiders.push(mvk)
          }
        })
      } else {
        forEach(moveKeys, mvk => {
          if (indexOf(this.presiderChecked, mvk) > -1) {
            this.removePresiders.push(mvk)
          } else {
            remove(this.newPresiders, n => {
              return n === mvk
            })
          }
        })
      }
    },
    changeOrg({ orgId }) {
      this.orgId = orgId
      this.getRoadListData()
    },
    changePage(pageNow) {
      this.currentPage = pageNow
      this.getRoadListData()
    },
    async getRoadListData() {
      let params = {
        orgId: this.orgId,
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
        this.total = 0
        this.roadData = []
        if (roadListData.status === 503) {
          this.$Message.warning('暂无段道信息')
        } else {
          this.$Notice.danger({
            desc: roadListData.message,
            title: `错误码: ${roadListData.status}`
          })
        }
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
