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
            <t-pager :total="total" :current="currentPage" :page-size="10" @on-change="changePage"></t-pager>
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
                  <div class="area-box books" @click="clickArea">
                    <product-tree @emitCheckIsProduct="checkIsProduct"></product-tree>
                  </div>
                </t-dropdown-menu>
              </t-dropdown>
            </t-form-item>
            <t-form-item label="是否轮播图置顶" prop="input2">
              <div class="form-istrue">
                <t-select v-model="jpInfo.isBanner" size="sm">
                  <t-option v-for="item in isTopicList" :value="item.value" :key="item.label">{{ item.label }}</t-option>
                </t-select>
              </div>
            </t-form-item>
            <!-- <t-form-item label="轮播图片上传" prop="input4" class="upls">
              <div class="img-upload">
                <div class="upl-box">
                  <t-button @click="changeImg" class="btn">上传图片</t-button>
                  <vue-cropper
                    ref="cropperUpl"
                    :img="uplOpts.img"
                    :outputSize="uplOpts.size"
                    :outputType="uplOpts.outputType"
                    :info="uplOpts.info"
                    :canScale="uplOpts.canScale"
                    :autoCrop="uplOpts.autoCrop"
                    :autoCropWidth="uplOpts.autoCropWidth"
                    :autoCropHeight="uplOpts.autoCropHeight"
                    :fixed="uplOpts.fixed"
                    :fixedNumber="uplOpts.fixedNumber"
                  ></vue-cropper>
                </div>
              </div>
            </t-form-item> -->
          </t-form>
        </div>
      </div>
    </t-slipbox>
    <!-- <t-modal
      v-model="showUpl"
      width="800"
      height="500">
      <div class="cut-box">
        <vue-cropper
          ref="cropperUpl"
          :img="uplOpts.img"
          :outputSize="uplOpts.size"
          :outputType="uplOpts.outputType"
          :info="uplOpts.info"
          :canScale="uplOpts.canScale"
          :autoCrop="uplOpts.autoCrop"
          :autoCropWidth="uplOpts.autoCropWidth"
          :autoCropHeight="uplOpts.autoCropHeight"
          :fixed="uplOpts.fixed"
          :fixedNumber="uplOpts.fixedNumber"
          :original="true"
          :fixedBox="false"
          :canMoveBox="true">
        </vue-cropper>
      </div>
    </t-modal> -->
  </div>
</template>

<script>
import { remove, map } from 'lodash'
// import VueCoreImageUpload from 'vue-core-image-upload'
import VueCropper from 'vue-cropper'
import Bus from '../../bus.js'
import organizeTree from '../components/OrganizeTree.vue'
import ProductTree from '../components/ProductList.vue'
import { getBoutiqueList, delBoutique, addBoutique, modifyBoutiqueTop } from './server.js'

export default {
  components: {
    organizeTree,
    ProductTree,
    VueCropper
  },
  data() {
    return {
      showUpl: false,
      uplOpts: {
        img: 'http://ofyaji162.bkt.clouddn.com/bg1.jpg',
        info: true,
        size: 1,
        outputType: 'png',
        canScale: true,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 75,
        autoCropHeight: 40,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1.875, 1]
      },
      listHeaderData: [
        {
          title: '报刊名',
          key: 'pressName'
        },
        {
          title: '报刊年份',
          key: 'pressYear'
        },
        {
          title: '轮播图置顶',
          key: 'isBanner',
          render: (h, params) => {
            return h('div', params.row.isBanner !== 1 ? '否' : '是')
          }
        },
        {
          title: '操作',
          align: 'right',
          render: (h, params) => {
            let vm = this
            return h('div', [
              h('span', {
                style: {
                  'color': '#108EEA',
                  'cursor': 'pointer'
                },
                on: {
                  async click() {
                    let param = {
                      boutiqueId: params.row.id,
                      orgId: vm.orgId
                    }
                    let delInfo = await delBoutique(param)
                    if (delInfo.status === 200) {
                      vm.$Message.success('操作成功!')
                      vm.listData = remove(vm.listData, item => item.id !== params.row.id)
                    } else {
                      vm.$Message.warning(delInfo.message)
                    }
                  }
                }
              }, '取消精品'),
              h('span', {
                style: {
                  'color': '#108EEA',
                  'cursor': 'pointer'
                },
                class: ['ml-2'],
                on: {
                  async click() {
                    let param = {
                      pressId: params.row.pressId,
                      orgId: vm.orgId,
                      pressYear: params.row.pressYear,
                      pressUrl: params.row.pressUrl,
                      bannerPicUrl: params.row.bannerPicUrl,
                      pressCatalogId: params.row.pressCatalogId,
                      isBanner: params.row.isBanner === 0 ? 1 : 0
                    }
                    let mdfResult = await modifyBoutiqueTop(param)
                    if (mdfResult.status === 200) {
                      vm.$Message.success('操作成功!')
                      map(vm.listData, item => {
                        if (item.pressId === params.row.pressId) {
                          item.isBanner = (item.isBanner === 0 ? 1 : 0)
                        }
                      })
                    } else {
                      vm.$Message.warning(mdfResult.message)
                    }
                  }
                }
              }, params.row.isBanner === 0 ? '设置置顶' : '取消置顶')
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
        cataId: '',
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
    changeImg() {
      this.showUpl = !this.showUpl
    },
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
          cataId: '',
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
    },
    $_clickAddPress() {
      this.visibleBox = !this.visibleBox
    },
    changeOrg({ orgId, orgName, distId }) {
      this.orgId = orgId
      this.orgName = orgName
      this.jpInfo.distId = distId
      this.currentPage = 1
      this.getBoutiqueLists()
      Bus.$emit('orgIdChanged', { orgId, distId })
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
      pressCatalogId, orgId, pressId, pressName, pressYear, pressUrl, isBanner, bannerPicUrl, cataId
    }) {
      this.jpInfo.pressCatalogId = pressCatalogId
      this.jpInfo.orgId = orgId
      this.jpInfo.pressId = pressId
      this.jpInfo.pressName = pressName
      this.jpInfo.pressYear = pressYear
      this.jpInfo.pressUrl = pressUrl
      this.jpInfo.cataId = cataId
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
  width: 400px;
  max-height: 400px;
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
.upl-box {
  height: 200px;
  width: 375px;
}
.area-box.books {
  .components-tree {
    overflow-y: hidden!important;
    max-height: none!important;
  }
}
.cut-box {
  width:350px;
  height: 200px;
}
</style>
