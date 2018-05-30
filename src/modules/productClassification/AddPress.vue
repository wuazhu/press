<template>
  <div class="add-press">
    <div class="index-title">
      <p class="text-base">加入精品报刊</p>
    </div>
    <div class="add-content">
      <t-form :model="newPress" :rules="ruleFormLabel" :label-span="2" label-position="left" size="sm">
        <t-form-item label="选择报刊" prop="input1">
          <div class="row">
            <div class="col-5">
              <t-input v-model="newPress.input1" placeholder=""></t-input>
            </div>
          </div>
        </t-form-item>
        <t-form-item label="是否 Banner 置顶" prop="input2">
          <div class="form-istrue">
            <t-select v-model="isTrue" size="sm">
              <t-option v-for="item in isTrueList" :value="item.value" :key="item.label">{{ item.label }}</t-option>
            </t-select>
          </div>
        </t-form-item>
        <t-form-item label="Banner URL" prop="bannerUrl">
          <div class="row">
            <div class="col-5">
              <t-input v-model="newPress.bannerUrl" disabled></t-input>
            </div>
          </div>
        </t-form-item>
        <t-form-item label="Banner 图片上传" prop="input4">
          <div class="img-upload">
            <t-upload ref="uploader" :show-upload-list="false" :format="['jpg','jpeg','png']" :max-size="2048" multiple type="drag" action="//jquery-file-upload.appspot.com/" class="demo-upload-list">
              <div style="line-height:48px;">
                <i class="aid aid-plus"></i>
                <i class="upload-txt">上传图片</i>
              </div>
            </t-upload>
          </div>
        </t-form-item>
        <t-form-item class="btn-group">
          <t-button type="primary">提交</t-button>
          <t-button type="secondary">取消</t-button>
        </t-form-item>
      </t-form>
    </div>
  </div>
</template>

<script>
import companyTrees from '../components/companyTrees.vue'

export default {
  components: {
    companyTrees
  },
  data() {
    return {
      newPress: {
        bannerUrl: '../url/banner/NicePaper'
      },
      ruleFormLabel: {},
      isTrue: 'true',
      isTrueList: [
        {
          value: 'true',
          label: '是'
        },
        {
          value: 'flase',
          label: '否'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
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
  }
  .index-title {
    p{
      line-height: 22px;
      margin-bottom: 0;
    }
  }
  .form-istrue {
    .select--sm {
      width: 65px;
    }
  }
  .img-upload {
    .upload--drag {
      width: 96px;
      height: 106px;
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
