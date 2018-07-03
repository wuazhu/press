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
          <div class="table-paging text-right">
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
import companyTrees from '../components/CompanyTrees.vue'

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
      equipmentIsShow: false,
      inforData: {},
      targetItem: {},
      equipmenttItem: {}
    }
  },
  created() {
    // console.log(this.$http)
    // this.$http.get('/api/v1/accounts', {
    //   params: {
    //     orgId: '100',
    //     currentPage: 1,
    //     pageSize: 10
    //   }
    // })
    // .then((res) => {
    //   console.log(res)
    // })
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>

.passage-index {
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
.demo-upload-list {
  .upload--drag {
    width: 48px;
    height: 48px;
    border-radius: 50%;
  }
}
.form--label-left {
  .form-group {
    &:nth-child(1) {
      .form-group__label {
        line-height: 48px;
      }
    }
  }
}
.form-title {
  color: #009241;
  font-size: 14px;
  line-height: 40px;
  border-bottom: 1px solid #E9E9E9;
  margin-bottom: 16px;
}
.plan-title {
  line-height: 30px;
  font-size: 12px;
}
.border-line {
  width: 100%;
  height: 1px;
  background: #E9E9E9;
  margin-bottom: 20px;
}
.equipment-title {
  font-size: 12px;
  line-height: 18px;
  margin: 0 0 11px;
}
.equipmentList {
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  p {
    background: #E9E9E9;
    border-bottom: 1px solid #E9E9E9;
    line-height: 40px;
    padding-left: 16px;
    margin:0;
  }
  ul {
    list-style: none;
    padding:0;
    margin: 0;
    li{
      line-height: 32px;
      border-bottom: 1px solid #E9E9E9;
      padding:0 16px;
      span {
        &:nth-child(2) {
          color: #108EEA;
        }
      }
    }
  }
  .new-add {
    line-height: 32px;
    font-style: normal;
    color: #108EEA;
    font-size: 12px;
    padding-left: 16px;
  }
}
.cust-list-item {
    margin-bottom: 20px;
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
</style>
