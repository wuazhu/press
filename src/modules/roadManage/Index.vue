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
            <div class="org-title d-flex justify-content-between">
              <span>段道列表</span>
              <t-button type="primary" size="sm" class="mr-2" style="height:24px;line-height:24px;margin-top:6px;" @click="showAddRoads = !showAddRoads">新增段道</t-button>
            </div>
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
      v-model="showAddRoads"
      :closable="false"
      title="新建段道"
      width="450"
      style="height:200px;">
      <t-form ref="addRoadsRef" :model="addRoadsForm" :rules="addRoadsFormRule" :label-span="2" label-position="left" >
        <t-form-item label="段道名称" prop="addRoadName">
          <t-input v-model="addRoadsForm.addRoadName" placeholder="请输入段道名称..."></t-input>
        </t-form-item>
        <t-form-item label="段道描述" prop="segDesc">
          <t-input v-model="addRoadsForm.segDesc" placeholder="请输入段道描述..."></t-input>
        </t-form-item>
      </t-form>
      <div slot="footer">
        <t-button size="sm" @click="cancelAddRoads">取 消</t-button>
        <t-button type="primary" size="sm" @click="comfirmAddRoads">确 定</t-button>
      </div>
    </t-modal>
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
          <div><t-button :disabled="batchDis" type="outline" class="clo-2" size="sm" @click="batchToRoad">批量移动到段道</t-button></div>
          <div class="text-right" style="width:300px;" @keyup.enter="searchCustList">
            <t-input v-model="custSearchInput" placeholder="请输入搜索内容" size="sm" style="width:140px;"></t-input>
            <t-button type="primary" size="sm" @click="searchCustList">查询</t-button>
          </div>
        </div>
        <t-table
          :columns="custHeader"
          :data="custData"
          :all-ellipsis="true"
          line
          @on-select="chooseCustSingle"
          @on-select-cancel="cancelChooseCustSingle"
          @on-select-all="selectAllCust"
          @on-select-all-cancel="cancelSelectAllCust">
        </t-table>
      </div>
      <div class="table-paging text-right mt-2">
        <t-pager :total="custTotal" :current="custCurrentPage" :page-size="5" @on-change="custChangePage"></t-pager>
      </div>
      <div slot="footer"></div>
    </t-modal>
    <t-modal
      v-model="showRegList"
      :closable="false"
      title="选择一个分配的段道"
      width="500"
      style="height:351px;"
      @on-cancel="cancelChangeRegion">
      <t-table :columns="regionModalHeader" :data="regionModalData" all-ellipsis highlight-row border @on-current-change="selOneRegion"></t-table>
      <div class="text-right mt-2 pb-2 border-bottom inner-pager">
        <t-pager :total="totalInner" :current="currentPageInner" :page-size="5" @on-change="regionInnerChangePage"></t-pager>
      </div>
      <div slot="footer">
        <div class="text-right">
          <t-button type="outline" size="sm" @click="cancelChangeRegion">取 消</t-button>
          <t-button type="primary" size="sm" @click="comfirmChangeRegion">确 认</t-button>
        </div>
      </div>
    </t-modal>
    <t-modal
      v-model="confirmChange"
      :closable="false"
      width="400"
      @on-cancel="submitCancel">
      <div>
        <div>
          <t-alert type="danger" show-icon>如下人员已存在段道内, 确认是否提交?</t-alert>
          <div>
            <t-tag v-for="(m, mid) in existsCustList" :key="mid" state="muted">{{ m }}</t-tag>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div class="text-right">
          <t-button type="outline" size="sm" style="width:80px" @click="submitCancel">取 消</t-button>
          <t-button type="primary" size="sm" style="width:80px" @click="submitConfirm">确 认</t-button>
        </div>
      </div>
    </t-modal>
  </div>
</template>

<script>
import { indexOf, remove, forEach, filter, map, uniqBy, concat, pick } from 'lodash'
import organizeTree from '../components/OrganizeTree'
import { getRoadList, getPresiders, savePresiders, regCustList, checkRegion, confirmCustReg, addMarketSeg } from './server'

export default {
  components: {
    organizeTree
  },
  data() {
    return {
      addRoadsFormRule: {
        addRoadName: [
          {required: true, message: '段道名称不能为空', trigger: 'blur'}
        ],
        segDesc: [
          {required: false, message: '请输入段道描述', trigger: 'blur'}
        ]
      },
      addRoadsForm: {
        addRoadName: '',
        segDesc: ''
      },
      showAddRoads: false,
      custIdSingle: '',
      cid: null,
      custIds: [],
      singleSelect: false,
      innerRegionId: null,
      custTotal: 0,
      custCurrentPage: 1,
      custSearchInput: '',
      showInnerCust: false,
      showRegList: false,
      confirmChange: false,
      rdSgId: null,
      orgId: this.$store.state.login.orgId,
      regionId: null,
      presiderData: [],
      presiderChecked: [],
      newPresiders: [],
      removePresiders: [],
      custData: [],
      regionModalData: [],
      regionModalHeader: [
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
          key: 'phone'
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
                    vm.singleSelect = true
                    vm.custIdSingle = ''
                    vm.custIdSingle = params.row.custId
                    vm.cid = params.row.cid
                    vm.$_openRegionList()
                    vm.getRoadListInner()
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
              }, (params.row.type === 0 || params.row.segType === 2) ? '分配责任人' : null),
              h('span', {
                style: {'color': '#108EEA', 'cursor': 'pointer', 'margin-left': '20px'},
                on: {
                  async click() {
                    vm.showInnerCust = true
                    vm.regionId = params.row.id
                    vm.searchCustList()
                  }
                }
              }, '段道内客户')
            ])
          }
        }
      ],
      roadData: [],
      currentPage: 1,
      currentPageInner: 1,
      totalInner: 0,
      total: 0,
      isShow: false,
      existsCustList: [],
      cacheSelectList: []
    }
  },
  computed: {
    batchDis() {
      return this.cacheSelectList.length <= 0
    }
  },
  created() {
    this.getRoadListData()
  },
  methods: {
    comfirmAddRoads() {
      this.$refs.addRoadsRef.validate(async valid => {
        if (valid) {
          let param = {
            orgId: `${this.orgId}`,
            segName: this.addRoadsForm.addRoadName,
            segDesc: this.addRoadsForm.segDesc
          }
          let addResult = await addMarketSeg(param)
          if (addResult.status === 200) {
            this.showAddRoads = false
            this.$refs.addRoadsRef.resetFields()
            this.getRoadListData()
            this.$Message.success('新增段道成功!')
          } else {
            this.$Notice.danger({
              title: `code: ${addResult.status}`,
              desc: addResult.message
            })
          }
        }
      })
    },
    cancelAddRoads() {
      this.showAddRoads = false
      this.$refs.addRoadsRef.resetFields()
    },
    batchToRoad() {
      this.singleSelect = false
      this.$_openRegionList()
      this.getRoadListInner()
    },
    matchArr(custList) {
      // 匹配 _checked 属性
      let ret = map(custList, custItem => {
        if (this.cacheSelectList.length === 0) return custItem
        forEach(this.cacheSelectList, cacheItem => {
          if (custItem.custId === cacheItem.custId) {
            custItem._checked = true
          }
        })
        return custItem
      })
      return ret
    },
    selectAllCust(selection) {
      // 选择所有客户
      this.cacheSelectList = uniqBy(concat(this.cacheSelectList, this.custData), 'custId')
    },
    cancelSelectAllCust() {
      // 取消全选客户
      forEach(this.custData, cust => {
        remove(this.cacheSelectList, c => {
          return cust.custId === c.custId
        })
      })
    },
    chooseCustSingle(selection, row) {
      // 单选客户
      this.cacheSelectList.push(row)
    },
    cancelChooseCustSingle(selection, row) {
      // 取消单选客户
      this.cacheSelectList = filter(this.cacheSelectList, fi => {
        return fi.custId !== row.custId
      })
    },
    selOneRegion(currentRow) {
      // 单选段道列表某行
      this.innerRegionId = currentRow.id
    },
    submitCancel() {
      // 取消提交
      this.$_closeSubmitModal()
      this.existsCustList = []
    },
    submitConfirm() {
      // 确认提交
      this.$_submit()
    },
    $_closeSubmitModal() {
      this.confirmChange = false
    },
    $_openSubmitModal() {
      this.confirmChange = true
    },
    $_openRegionList() {
      this.showRegList = true
    },
    $_closeRegionList() {
      this.showRegList = false
    },
    cancelChangeRegion() {
      // 取消选定移动的段道
      this.singleSelect = false
      this.innerRegionId = null
      this.currentPageInner = 1
      this.showRegList = false
    },
    async comfirmChangeRegion() {
      // 确定选定移动的段道
      if (this.singleSelect) {
        // 是否来自单选
        if (!this.innerRegionId) {
          this.$Message.warning('请指定一个段道!')
        } else {
          let param = {
            regionId: this.innerRegionId,
            orgId: this.orgId,
            custIds: this.custIdSingle
          }
          let checkInfo = await checkRegion(param)
          if (checkInfo.status === 200) {
            if (!checkInfo.data.flg) {
              this.$_submit()
              this.confirmChange = false
            } else {
              this.confirmChange = true
              this.existsCustList = []
              this.existsCustList = checkInfo.data.custNames
            }
          } else {
            this.$Message.danger(checkInfo.message)
          }
        }
      } else {
        // 来自多选
        if (!this.innerRegionId) {
          this.$Message.warning('请指定一个段道!')
        } else {
          let ids = ''
          forEach(this.cacheSelectList, (cs, ind) => {
            if (ind === this.cacheSelectList.length - 1) {
              ids += cs.custId
            } else {
              ids += cs.custId + ','
            }
          })
          let param = {
            regionId: this.innerRegionId,
            orgId: this.orgId,
            custIds: ids
          }
          let checkInfo = await checkRegion(param)
          if (checkInfo.status === 200) {
            if (!checkInfo.data.flg) {
              this.$_submit()
              this.confirmChange = false
            } else {
              this.confirmChange = true
              this.existsCustList = []
              this.existsCustList = checkInfo.data.custNames
            }
          } else {
            this.$Message.danger(checkInfo.message)
          }
        }
      }
    },
    $_resetAllInfo() {
      this.cid = null
      this.innerRegionId = null
      this.custIdSingle = ''
      this.custSearchInput = ''
      this.showInnerCust = false
      this.showRegList = false
      this.confirmChange = false
      this.cacheSelectList = []
    },
    async $_submit() {
      let param = {
        regionId: this.innerRegionId,
        orgId: this.orgId,
        custList: []
      }
      if (this.singleSelect) {
        param.custList.push({
          custId: this.custIdSingle,
          cid: this.cid
        })
      } else {
        forEach(this.cacheSelectList, csl => {
          param.custList.push(pick(csl, ['cid', 'custId']))
        })
      }
      let result = await confirmCustReg(param)
      if (result.status === 200) {
        this.$Message.info('切换段道成功!')
        this.$_resetAllInfo()
      } else {
        this.$Notice.danger({
          title: `code: ${result.status}`,
          desc: result.message
        })
      }
    },
    async searchCustList() {
      let custParam = {
        regionId: this.regionId,
        orgId: this.orgId,
        custName: this.custSearchInput,
        currentPage: this.custCurrentPage,
        pageSize: 5
      }
      let custListResult = await regCustList(custParam)
      if (custListResult.status === 200) {
        this.custTotal = custListResult.data.total
        let arr = []
        if (this.cacheSelectList.length > 0) {
          arr = this.matchArr(custListResult.data.list)
        } else {
          arr = custListResult.data.list
        }
        this.custData = arr
      }
    },
    // 弹窗内段道列表切换分页
    regionInnerChangePage(page) {
      this.currentPageInner = page
      this.getRoadListInner()
    },
    custChangePage(page) {
      this.custCurrentPage = page
      this.searchCustList()
    },
    cancelPresiders() {
      this.custCurrentPage = 1
      this.newPresiders = []
      this.removePresiders = []
      this.presiderChecked = []
      this.presiderData = []
      this.cacheSelectList = []
      this.$_resetAllInfo()
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
    async getRoadListInner() {
      let params = {
        orgId: this.orgId,
        currentPage: this.currentPageInner,
        pageSize: 5
      }
      let roadListData = await getRoadList(params)
      if (roadListData.status === 200) {
        if (roadListData.data) {
          this.totalInner = roadListData.data.total
          let _newData = roadListData.data.data
          _newData.forEach((item, key) => {
            item.presider = item.presider ? item.presider.join(', ') : '暂无责任人'
          })
          this.regionModalData = _newData
        }
      } else {
        this.totalInner = 0
        this.regionModalData = []
        if (roadListData.status === 503) {
          this.$Message.warning('暂无段道信息')
        } else {
          this.$Notice.danger({
            desc: roadListData.message,
            title: `错误码: ${roadListData.status}`
          })
        }
      }
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
.inner-pager {
  margin-bottom: -10px;
}
</style>
