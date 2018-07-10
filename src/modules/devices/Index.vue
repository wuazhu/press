<template>
  <div class="passage-index">
    <div class="index-title">
      <p class="text-base">设备管理</p>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="content-left">
          <div class="org-title border">组织机构</div>
          <company-trees @emitClickOrgTreeNode="changeOrg"></company-trees>
        </div>
      </div>
      <div class="col-9">
        <div class="content-right">
          <div class="cust-list-item border">
            <div class="org-title">账户列表</div>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="table-paging text-right mt-4">
            <t-pager :total="total" :current="currentPage" @on-change="changePage"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <!-- 设备授权信息 -->
    <t-modal
      v-model="equipmentIsShow"
      closable title="设备授权信息"
      style="width:455px;height:463px;"
      @on-cancel="$_cancelModal">
      <div class="equipment-title">刘德华 拥有的设备</div>
      <div class="equipmentList">
        <p>设备MAC</p>
        <ul>
          <li
            v-for="mac in macs"
            :key="mac.macId"
            class="d-flex justify-content-between">
            <span>{{ mac.macAddress }}</span>
            <span class="link" @click="delDevice(mac)">删除授权</span>
          </li>
          <li v-if="editing" class="d-flex edit">
            <span class="add-input">
              <t-input v-model.trim="addInfo" size="sm" placeholder="请输入设备码..."></t-input>
            </span>
            <div class="confirm-button text-right">
              <t-button type="outline" size="sm" @click="$_reset">取消</t-button>
              <t-button :disabled="!isEdited" type="primary" size="sm" @click="confirmAddDevice">确定</t-button>
            </div>
          </li>
        </ul>
        <span class="new-add link" @click="clickAddButton">+ 新增授权</span>
      </div>
      <div slot="footer"></div>
    </t-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { remove } from 'lodash'
import companyTrees from '../components/CompanyTrees.vue'
import { getOrgStaff, getDevices, delDevices, addDevices } from './server.js'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '账户',
          key: 'staffId'
        },
        {
          title: '员工',
          key: 'staffName'
        },
        {
          title: '设备授权',
          key: 'deviceNum'
        },
        {
          title: '操作',
          align: 'right',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'cursor': 'pointer', 'padding-right': '6px'},
                on: {
                  async click() {
                    let params = {
                      staffId: vm.staffId
                    }
                    let devices = await getDevices(params)
                    if (devices.status === 200) {
                      vm.macs = devices.data
                    } else {
                      vm.$Message.warning(devices.message)
                    }
                    vm.equipmentIsShow = true
                  }
                }
              }, '授权')
            ])
          }
        }
      ],
      listData: [],
      macs: [],
      orgIdNow: this.$store.state.login.orgId,
      equipmentIsShow: false,
      editing: false,
      total: 0,
      currentPage: 1,
      addInfo: ''
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.login.orgId,
      staffId: state => state.login.staffId
    }),
    isEdited() {
      return Boolean(this.addInfo.length)
    }
  },
  created() {
    this.getOrgStaffs({
      orgId: this.orgId
    })
  },
  methods: {
    $_cancelModal() {
      this.$_reset()
    },
    $_reset() {
      this.addInfo = ''
      this.editing = false
    },
    changePage(pageNow) {
      this.currentPage = pageNow
      this.getOrgStaffs()
    },
    changeOrg(orgInfo) {
      this.orgIdNow = orgInfo.orgId
      this.getOrgStaffs()
    },
    clickAddButton() {
      this.editing = true
    },
    async confirmAddDevice() {
      let result = await addDevices({
        staffId: this.staffId,
        identifier: this.addInfo
      })
      if (result.status === 200) {
        this.$Message.success('保存成功!')
        this.macs.push({
          macId: result.data,
          macAddress: this.addInfo
        })
        this.$_reset()
      } else {
        this.$Notice.danger({
          title: `code: ${result.status}`,
          desc: result.message
        })
      }
    },
    async delDevice({ macId }) {
      let params = {
        macId,
        staffId: this.staffId
      }
      let delInfo = await delDevices(params)
      if (delInfo.status === 200) {
        this.$Message.success('删除成功!')
        this.macs = remove(this.macs, mac => {
          return mac.macId !== macId
        })
      }
      console.log(delInfo)
    },
    async getOrgStaffs() {
      let params = {
        orgId: this.orgIdNow,
        currentPage: this.currentPage,
        pageSize: 10
      }
      let orgStaffList = await getOrgStaff(params)
      if (orgStaffList.status === 200) {
        console.log(orgStaffList)
        this.total = orgStaffList.data.total
        this.listData = orgStaffList.data.data
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
.equipment-title {
  font-size: 12px;
  color: rgba(0, 0, 0, .8);
  padding-bottom: 10px;
}
.equipmentList {
  p {
    background: #E9E9E9;
    border: 1px solid #E9E9E9;
    border-radius: 4px 4px 0 0;
    font-size: 12px;
    line-height: 40px;
    text-indent: 1em;
    margin-bottom: 0;
  }
  li {
    line-height: 34px;
    border: 1px solid #E9E9E9;
    margin-top: -1px;
    padding: 0 10px;
    font-size: 12px;
    &.edit {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
  .new-add {
    line-height: 30px;
    display: block;
    border: 1px solid #E9E9E9;
    margin-top: -1px;
    text-indent: 1em;
  }
}
.confirm-button {
  width: 100px;
}
.add-input {
  flex: 1;
}
</style>
