<template>
  <div class="passage-index">
    <div class="index-title">
      <p class="text-base">账户管理</p>
    </div>
    <div class="row">
      <div class="col-3">
        <div class="content-left">
          <div class="org-title border">组织机构</div>
          <company-trees></company-trees>
        </div>
      </div>
      <div class="col-9">
        <div class="content-right">
          <div class="cust-list-item border">
            <div class="org-title">账户列表</div>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="table-paging text-right mt-4">
            <t-pager :total="10" :current="1"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <!-- 设备授权信息 -->
    <t-modal v-model="equipmentIsShow" :closable="false" title="设备授权信息" style="width:455px;height:463px;">
      <div class="equipment-title">刘德华 拥有的设备</div>
      <div class="equipmentList">
        <p>设备MAC</p>
        <ul>
          <li class="d-flex justify-content-between">
            <span>00-05-5D-E8-0F-A3</span>
            <span>删除授权</span>
          </li>
          <li class="d-flex justify-content-between">
            <span>00-05-5D-E8-0F-A3</span>
            <span>删除授权</span>
          </li>
        </ul>
        <i class="new-add">+ 新增授权</i>
      </div>
    </t-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import companyTrees from '../components/CompanyTrees.vue'
import { getOrgStaff } from './server.js'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '账户',
          key: 'account'
        },
        {
          title: '员工',
          key: 'staff'
        },
        {
          title: '编码',
          key: 'code'
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
          title: '操作',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA', 'cursor': 'pointer', 'padding-right': '6px'},
                on: {
                  click() {
                    vm.equipmentIsShow = true
                  }
                }
              }, '授权')
            ])
          }
        }
      ],
      listData: [
        {
          account: 'zhanghu1',
          staff: '张学友',
          code: '09287621',
          station: '投递员',
          equipment: '3'
        },
        {
          account: 'zhanghu1',
          staff: '张学友',
          code: '09287621',
          station: '投递员',
          equipment: '3'
        },
        {
          account: 'zhanghu1',
          staff: '张学友',
          code: '09287621',
          station: '投递员',
          equipment: '3'
        }
      ],
      equipmentIsShow: false
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.login.orgId
    })
  },
  created() {
    this.getOrgStaffs({
      orgId: this.orgId
    })
  },
  methods: {
    async getOrgStaffs({ orgId }) {
      let params = {
        orgId
      }
      let orgStaffList = await getOrgStaff(params)
      console.log('====================================')
      console.log(orgStaffList)
      console.log('====================================')
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
</style>
