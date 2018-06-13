<template>
  <div class="road-index">
    <div class="index-title">
      <p class="text-base">段道管理</p>
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
            <div class="org-title">段道列表</div>
            <t-table
              :columns="listHeaderData"
              :data="listData"
              :all-ellipsis="true"
              line>
            </t-table>
          </div>
          <div class="table-paging text-right">
            <t-pager :total="100" :current="1"></t-pager>
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
      companyList: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
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
                style: {'color': '#108EEA'},
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
  created() {
    this.makeRoadList()
  },
  methods: {
    async makeRoadList() {
      let obj = {
        currentPage: 1,
        pageSize: 10
      }
      let roadListData = await getRoadList(obj)
      console.log(roadListData)
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
