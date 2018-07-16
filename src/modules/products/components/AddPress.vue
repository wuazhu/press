<template>
  <div>
    <t-slipbox :visible.sync="showBox" class="demo__slipbox--1" :styles="boxstyle">
      <template slot="header">
        <div class="slipbox-title d-flex justify-content-between align-items-center">
          <p class="text-base">加入精品报刊</p>
          <t-button type="info" size="sm">保存并提交</t-button>
        </div>
      </template>
      <div class="add-press">
        <div class="add-content">
          <t-form :model="newPress" :rules="ruleFormLabel" label-position="left" size="sm">
            <t-form-item label="选择报刊" prop="input1">
              <t-dropdown
                :visible="visibleBk"
                trigger="custom">
                <t-button size="sm" @click="changeBk">
                  {{ showOrgName }}
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
                <t-select v-model="isTop" size="sm">
                  <t-option v-for="item in isTrueList" :value="item.value" :key="item.label">{{ item.label }}</t-option>
                </t-select>
              </div>
            </t-form-item>
            <!-- <t-form-item label="Banner URL" prop="bannerUrl">
              <t-input v-model="newPress.bannerUrl" disabled></t-input>
            </t-form-item> -->
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
import ProductTree from '../../components/ProductList.vue'

export default {
  props: {
    showBox: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ProductTree
  },
  data() {
    return {
      boxstyle: {
        width: '530px'
      },
      newPress: {
        cateId: '',
        isTop: false
      },
      visibleBk: false,
      showOrgName: '请选择报刊',
      ruleFormLabel: {},
      isTop: 1,
      isTrueList: [
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
        isBanner: 0,
        bannerPicUrl: ''
      },
      caniSubmit: false
    }
  },
  watch: {
    showOrgName() {

    }
  },
  mounted() {
    document.addEventListener('click', () => {
      this.visibleBk = false
    })
  },
  methods: {
    clickArea($event) {
      $event.stopPropagation()
    },
    checkIsProduct({ pressCatalogId, orgId, pressId, pressName, pressYear }) {
      this.jpInfo.pressCatalogId = pressCatalogId
      this.jpInfo.orgId = orgId
      this.jpInfo.pressId = pressId
      this.jpInfo.pressName = pressName
      this.jpInfo.pressYear = pressYear
      this.jpInfo.isBanner = this.isTop
      this.jpInfo.pressYear = pressYear
      this.showOrgName = pressName
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
.p-3 {
  padding:0 !important;
}
.add-press {
  .row {
    margin: 0;
  }
  .col-5,.col-2 {
    padding: 0;
  }
  .form-group {
    margin-top: 21px;
    .form-group__label {
      width: 150px;
    }
  }
  .form-istrue {
    .select--sm {
      width: 65px;
    }
  }
  .img-upload {
    .upload--drag {
      height: 102px;
      i {
        display: block;
        font-size: 28px;
        margin-top: 15px;
        &.upload-txt {
          font-size: 12px;
          margin: 0;
        }
      }
    }
  }
  .btn-group {
    margin-top: 30px;
    button {
      height: 28px;
      width: 60px;
      line-height: 28px;
      span {
        display: inline-block;
        font-size: 12px;
        line-height: 28px;
        margin: 0;
      }
      &:nth-child(1) {
        width: 102px;
        background: #009241;
      }
      &:nth-child(2) {
        margin-left: 20px;
        span {
          position: relative;
          top: -1px;
        }
      }
    }
  }
}
</style>
