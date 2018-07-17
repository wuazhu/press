<template>
  <div class="boutique-container clearfix">
    <div class="index-title d-flex justify-content-between">
      <p class="text-base">精品推荐管理</p>
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
            <div class="org-title d-flex justify-content-between align-items-center">
              <p>{{ orgName }}精品报刊<t-button type="primary" size="sm" icon="plus-circle-outline" icon-placement="left" @click="$_clickAddPress">加入精品报刊</t-button></p>
              <p class="d-flex align-items-center" @keyup.enter="searchBout">
                <t-input v-model="searchDetails" icon="magnify" icon-placement="right" placeholder="请输入搜索内容"></t-input>
                <t-button type="primary" size="sm" @click="searchBout">查询</t-button>
              </p>
            </div>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="table-paging text-right">
            <t-pager :total="total" :current="1" :page-size="10" @on-change="changePage"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <t-slipbox :visible.sync="visibleBox" :width="520" class="demo__slipbox--1">
      <template slot="header">
        <div class="slipbox-title d-flex justify-content-between align-items-center">
          <p class="text-base">加入精品报刊</p>
          <t-button :disabled="caniSubmit" type="primary" size="sm" @click="saveAndsubmit">保存并提交</t-button>
        </div>
      </template>
      <div class="add-press">
        <div class="add-content">
          <t-form :model="jpInfo" label-position="left" size="sm">
            <t-form-item label="选择报刊" prop="pressCatas">
              <t-dropdown
                :visible="visibleBk"
                trigger="custom">
                <t-button size="sm" @click="changeBk">
                  {{ pressName }}
                  <t-icon type="arrow-down-drop"></t-icon>
                </t-button>
                <t-dropdown-menu slot="list">
                  <div class="area-box" @click="clickArea">
                    <product-tree @emitCheckIsProduct="checkIsProduct"></product-tree>
                  </div>
                </t-dropdown-menu>
              </t-dropdown>
            </t-form-item>
            <t-form-item label="是否 Banner 置顶" prop="input2">
              <div class="form-istrue">
                <t-select v-model="jpInfo.isBanner" size="sm">
                  <t-option v-for="item in isTopicList" :value="item.value" :key="item.label">{{ item.label }}</t-option>
                </t-select>
              </div>
            </t-form-item>
            <t-form-item label="Banner 图片上传" prop="input4">
              <div class="img-upload">
                <t-upload ref="uploader" :show-upload-list="false" :format="['jpg','jpeg','png']" :max-size="2048" multiple type="drag" action="//jquery-file-upload.appspot.com/" class="demo-upload-list">
                  <div>
                    <i class="aid aid-plus"></i>
                    <i class="upload-txt">上传图片</i>
                  </div>
                </t-upload>
              </div>
            </t-form-item>
          </t-form>
        </div>
      </div>
    </t-slipbox>
  </div>
</template>

<script>
import { remove } from 'lodash'
import Bus from '../../bus.js'
import organizeTree from '../components/OrganizeTree.vue'
import ProductTree from '../components/ProductList.vue'
import { getBoutiqueList, delBoutique, addBoutique } from './server.js'

export default {
  components: {
    organizeTree,
    ProductTree
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '报刊名',
          key: 'pressName'
        },
        {
          title: 'Banner置顶',
          key: 'isBanner',
          render: (h, params) => {
            return h('div', params.row.isBanner !== 1 ? '否' : '是')
          }
        },
        {
          title: 'BannerURL',
          key: 'bannerPicUrld'
        },
        {
          title: '操作',
          align: 'right',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA'},
                on: {
                  async click() {
                    let param = {
                      boutiqueId: params.row.id,
                      orgId: vm.orgId
                    }
                    let delInfo = await delBoutique(param)
                    if (delInfo.status === 200) {
                      vm.$Message.success('取消成功!')
                      vm.listData = remove(vm.listData, item => item.id !== params.row.id)
                    } else {
                      vm.$Message.warning(delInfo.message)
                    }
                  }
                }
              }, '取消精品')
            ])
          }
        }
      ],
      listData: [],
      searchDetails: '',
      currentPage: 1,
      total: 0,
      orgId: this.$store.state.login.orgId,
      orgName: this.$store.state.login.orgName,
      visibleBk: false,
      visibleBox: false,
      // 一下 Wiebox\
      pressName: '请选择报刊',
      isTopicList: [
        {
          value: 1,
          label: '是'
        },
        {
          value: 0,
          label: '否'
        }
      ],
      jpInfo: {
        pressCatalogId: '',
        orgId: '',
        pressId: '',
        pressName: '',
        pressYear: '',
        pressUrl: '',
        isBanner: 1,
        bannerPicUrl: '',
        distId: this.$store.state.login.distId
      }
    }
  },
  computed: {
    caniSubmit() {
      return this.pressName === '请选择报刊'
    }
  },
  created() {
    this.getBoutiqueLists()
  },
  mounted() {
    document.addEventListener('click', () => {
      this.visibleBk = false
    })
  },
  methods: {
    async saveAndsubmit() {
      let addInfo = await addBoutique(this.jpInfo)
      if (addInfo.status === 200) {
        this.visibleBox = false
        this.jpInfo = {
          pressCatalogId: '',
          orgId: '',
          pressId: '',
          pressName: '',
          pressYear: '',
          pressUrl: '',
          isBanner: 1,
          bannerPicUrl: '',
          discId: this.$store.state.login.discId
        }
        this.pressName = '请选择报刊'
        this.$Message.success('新增成功!')
        this.getBoutiqueLists()
      } else {
        this.$Message.danger(addInfo.message)
      }
    },
    searchBout(event) {
      this.currentPage = 1
      event.stopPropagation()
      this.getBoutiqueLists()
      debugger
    },
    $_clickAddPress() {
      this.visibleBox = !this.visibleBox
    },
    changeOrg({ orgId, orgName, distId }) {
      this.orgId = orgId
      this.orgName = orgName
      this.jpInfo.distId = distId
      Bus.$emit('orgIdChanged', { orgId })
      this.getBoutiqueLists()
    },
    changePage(pageNow) {
      this.currentPage = pageNow
      this.getBoutiqueLists()
    },
    async getBoutiqueLists() {
      let params = {
        pageSize: 10,
        currentPage: this.currentPage,
        orgId: this.orgId,
        params: this.searchDetails
      }
      let list = await getBoutiqueList(params)
      if (list.status === 200) {
        this.total = list.data.total
        this.listData = list.data.data
      } else {
        this.listData = []
        this.total = 0
        this.currentPage = 1
        if (list.status === 503) {
          this.$Message.warning('暂无精品报刊!')
        } else {
          this.$Notice.danger({
            title: `code: ${list.status}`,
            desc: list.message
          })
        }
      }
    },
    // yixaiwei
    clickArea($event) {
      $event.stopPropagation()
    },
    checkIsProduct({
      pressCatalogId, orgId, pressId, pressName, pressYear, pressUrl, isBanner, bannerPicUrl
    }) {
      this.jpInfo.pressCatalogId = pressCatalogId
      this.jpInfo.orgId = orgId
      this.jpInfo.pressId = pressId
      this.jpInfo.pressName = pressName
      this.jpInfo.pressYear = pressYear
      this.jpInfo.pressUrl = pressUrl
      this.jpInfo.bannerPicUrl = ''
      this.pressName = pressName
      this.visibleBk = false
    },
    changeBk() {
      this.visibleBk = !this.visibleBk
    }
  }
}
</script>

<style lang="less" scoped>
.area-box {
  width: 300px;
  max-height: 200px;
  overflow-y: auto;
}
.boutique-container {
  .slipbox__wraper {
    .slipbox__content {
      .slipbox__header {
        padding: 0 22px;
        border-bottom: 1px solid #979797;
      }
    }
  }
  .index-title {
    button {
      height: 28px;
      line-height: 28px;
      background: #009241;
      width: 115px;
      i {
        font-size: 14px;
        position: relative;
        top: 1px;
      }
      span {
        font-size: 12px;
      }
      &.btn {
        padding: 0;
      }
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
.slipbox-title {
  p {
    line-height: 54px;
    margin-bottom: 0;
  }
  button {
    height: 28px;
    width:108px;
    line-height: 28px;
    background: #009241;
  }
}
.content-right {
  p {
    margin-bottom: 0;
  }
  .input-group {
    .input-wrapper {
      input {
        height: 28px;
        font-size: 12px;
        width: 260px;
      }
    }
  }
}
.org-title {
  .btn-sm {
    height: 26px!important;
    line-height: 26px!important;
    background: #009241;
    font-size: 12px;
    margin-left: 8px;
  }
}
.cust-list-item {
  margin-bottom: 20px;
}
</style>
