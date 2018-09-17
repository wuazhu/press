<template>
  <div class="big-allot">
    <div class="row">
      <div class="col col-6">
        <h3 class="dfp-title">待分配大宗客户</h3>
        <div class="cust-box">
          <div class="box-header d-flex justify-content-between">
            <t-button :disabled="disabledBatch" size="sm" @click="moveInAllot">批量移动</t-button>
            <div class="search-cust d-flex">
              <div class="area bg-white mb-2">
                <t-dropdown
                  :visible="visibleOrg"
                  trigger="custom"
                  placement="bottom-start">
                  <t-button size="sm" @click="openOrgChange">
                    {{ orgSelect.name }}
                    <t-icon type="arrow-down-drop"></t-icon>
                  </t-button>
                  <t-dropdown-menu slot="list">
                    <div class="area-box index-area">
                      <organize-tree :need-filter="false" :border="false" @emitClickOrgTreeNode="changeOrg"></organize-tree>
                    </div>
                  </t-dropdown-menu>
                </t-dropdown>
              </div>
              <t-input v-model="custSearchName" class="ml-2" size="sm" placeholder="输入客户名称搜索..."></t-input>
              <t-button class="ml-2" type="primary" size="sm" @click="getUnDistriList">查询</t-button>
            </div>
          </div>
          <div class="cust-table">
            <t-table :columns="unAllotList" :data="unAllotData" line @on-selection-change="onSelectChange"></t-table>
            <div class="pgs text-right pt-4 pb-4 pr-2">
              <t-pager :total="unallotTotal" :page-size="10" :current="unallotPage" @on-change="changeUnAllotPage" ></t-pager>
            </div>
          </div>
        </div>
      </div>
      <div class="col col-6">
        <h3 class="dfp-title">已分配客户</h3>
        <div class="cust-box d-flex">
          <div class="seglist">
            <h3 class="cmp-title">营销段道</h3>
            <ul class="cmp-list">
              <li v-for="mk in marketList" :class="['mkt-list', {'active': mk.focus}]" :key="mk.segId" @click="changeMkt(mk)">{{ mk.segName }}</li>
            </ul>
          </div>
          <div class="cust-list flex1 segcust">
            <t-table :columns="allotList" :data="allotData" line></t-table>
            <div class="pgs text-right pt-4 pb-4 pr-2">
              <t-pager :total="allotTotal" :page-size="10" :current="allotPage" @on-change="changeAllotPage"></t-pager>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { map, forEach } from 'lodash'
import { unDistriList, distriList, marketSegList, moveInSeg, moveOutSeg } from './server.js'
import organizeTree from '../components/OrganizeTree.vue'

export default {
  components: {
    organizeTree
  },
  data() {
    return {
      visibleOrg: false,
      segId: '',
      oid: '',
      custSearchName: '',
      orgId: this.$store.state.login.orgId,
      orgSelect: {
        value: this.$store.state.login.orgId,
        name: this.$store.state.login.orgName
      },
      cidList: [],
      mktOrgId: '',
      allotPage: 1,
      allotTotal: 0,
      unallotPage: 1,
      unallotTotal: 0,
      unAllotList: [
        {
          type: 'selection',
          width: 40,
          align: 'center'
        },
        {
          title: '客户名称',
          key: 'custName'
        },
        {
          title: '所属定销局',
          key: 'orgName'
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
                    vm.cidList = [params.row.cid]
                    vm.moveInAllot()
                  }
                }
              }, '加入右侧选中段道')
            ])
          }
        }
      ],
      allotList: [
        {
          title: '客户名称',
          key: 'custName'
        },
        {
          title: '所属定销局',
          key: 'orgName'
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
                    console.log(params);
                    
                    vm.oid = params.row.cid
                    vm.moveOutAllot()
                  }
                }
              }, '移出清单')
            ])
          }
        }
      ],
      unAllotData: [],
      allotData: [],
      marketList: []
    }
  },
  computed: {
    disabledBatch() {
      return this.cidList.length === 0
    }
  },
  created() {
    this.getUnDistriList()
    this.getMarketSegList()
  },
  methods: {
    changeOrg({ orgId, orgName }) {
      this.orgSelect.value = orgId
      this.orgSelect.name = orgName
      this.visibleOrg = false
    },
    openOrgChange() {
      this.visibleOrg = !this.visibleOrg
    },
    onSelectChange(selection) {
      this.cidList = map(selection, selItem => {
        return selItem.cid
      })
    },
    async moveInAllot() {
      let params = {
        segId: this.segId,
        orgId: this.$store.state.login.orgId,
        cidList: this.cidList
      }
      let rs = await moveInSeg(params)
      if (rs.status === 200) {
        this.cidList = []
        this.$Message.success('操作成功!')
        this.getUnDistriList()
        this.getDistriList()
      } else {
        this.$Notice.danger({
          title: `code: ${rs.status}`,
          desc: rs.message
        })
      }
    },
    async moveOutAllot() {
      let params = {
        oid: this.oid,
        orgId: this.$store.state.login.orgId
      }
      console.log(params);
      
      let rs = await moveOutSeg(params)
      if (rs.status === 200) {
        this.oid = ''
        this.$Message.success('操作成功!')
        this.getUnDistriList()
        this.getDistriList()
      } else {
        this.$Notice.danger({
          title: `code: ${rs.status}`,
          desc: rs.message
        })
      }
    },
    changeUnAllotPage(page) {
      this.cidList = []
      this.unallotPage = page
      this.getUnDistriList()
    },
    changeAllotPage(page) {
      this.allotPage = page
      this.getDistriList()
    },
    async changeMkt(mk) {
      this.mktOrgId = mk.orgId
      this.segId = mk.segId
      if (this.allotPage === 1) {
        this.getDistriList()
      }
      this.allotPage = 1
      forEach(this.marketList, mkit => {
        mkit.focus = false
        if (mkit.segId === mk.segId) {
          mkit.focus = true
        }
      })
    },
    async getUnDistriList() {
      let param = {
        orgId: this.orgSelect.value,
        currentPage: this.unallotPage,
        custName: this.custSearchName,
        pageSize: 10
      }
      let unDisList = await unDistriList(param)
      if (unDisList.status === 200) {
        this.unAllotData = unDisList.data.list
        this.unallotTotal = unDisList.data.total
      } else {
        this.$Notice.danger({
          title: `code: ${unDisList.status}`,
          desc: unDisList.message
        })
      }
    },
    async getMarketSegList() {
      let param = {
        orgId: this.orgId,
        currentPage: 1,
        pageSize: 1000
      }
      let marketList = await marketSegList(param)
      if (marketList.status === 200) {
        this.marketList = map(marketList.data.list, (mk, mkIndex) => {
          if (mkIndex === 0) {
            mk.focus = true
            this.segId = mk.segId
            this.mktOrgId = mk.orgId
          } else {
            mk.focus = false
          }
          return mk
        })
      } else {
        this.$Notice.danger({
          title: `code: ${marketList.status}`,
          desc: marketList.message
        })
      }
      this.getDistriList()
    },
    async getDistriList() {
      let param = {
        orgId: this.orgId,
        segId: this.segId,
        currentPage: this.allotPage,
        pageSize: 10
      }
      let disList = await distriList(param)
      if (disList.status === 200) {
        this.allotData = disList.data.list
        this.allotTotal = disList.data.total
      } else {
        this.$Notice.danger({
          title: `code: ${disList.status}`,
          desc: disList.message
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.mkt-list {
  cursor: pointer;
}
.dfp-title {
  font-size: 16px;
  color: #323232;
  text-align: left;
  line-height: 24px;
  padding-bottom: 10px;
}
.box-header {
  background: #F7F7F7;
  padding: 6px 10px;
}
.cust-box {
  border: 1px solid #E9E9E9;
}
.cust-table {
  min-height: 510px;
}
.flex1 {
  flex:1;
}
.seglist {
  border-right: 1px solid #E9E9E9;
  width: 140px;
}
.segcust {
  min-height: 554px;
}
.cmp-title {
  color: #323232;
  font-size: 12px;
  line-height: 44px;
  border-bottom: 1px solid #E9E9E9;
  text-indent: 10px;
}
.cmp-list li{
  line-height: 38px;
  text-indent: 10px;
  border-right: 2px solid #fff;
  &.active {
    color: #2ea765;
    background: #e0f8f0;
    border-color: #029241;
  }
}
</style>
