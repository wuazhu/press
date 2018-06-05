<template>
  <div class="add-press">
    <div class="add-content">
      <t-form :model="newPress" :rules="ruleFormLabel" label-position="left" size="sm">
        <t-form-item label="选择报刊" prop="input1">
          <t-input v-model="newPress.input1" placeholder=""></t-input>
        </t-form-item>
        <t-form-item label="是否 Banner 置顶" prop="input2">
          <div class="form-istrue">
            <t-select v-model="isTrue" size="sm">
              <t-option v-for="item in isTrueList" :value="item.value" :key="item.label">{{ item.label }}</t-option>
            </t-select>
          </div>
        </t-form-item>
        <t-form-item label="Banner URL" prop="bannerUrl">
          <t-input v-model="newPress.bannerUrl" disabled></t-input>
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
</template>

<script>

export default {
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
