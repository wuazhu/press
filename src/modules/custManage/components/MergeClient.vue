<template>
  <div class="client-distinct">
    <t-form :model="clientInfor" :rules="clienRules" label-position="left" size="sm">
      <t-form-item label="客户名：" prop="name">
        <t-input v-model="clientInfor.name" placeholder=""></t-input>
      </t-form-item>
      <t-form-item label="联系电话：" prop="phone">
        <t-input v-model="clientInfor.phone" placeholder=""></t-input>
      </t-form-item>
      <t-form-item label="地址：" prop="address">
        <div class="row d-flex justify-content-between">
          <div class="col-4">
            <t-select v-model="addressData" clearable>
              <t-option v-for="(item, index) in provinceAddress" :value="item.value" :key="index">{{ item.label }}</t-option>
            </t-select>
          </div>
          <div class="col-4">
            <t-select v-model="cityData" clearable>
              <t-option v-for="(item, index) in cityAddress" :value="item.value" :key="index">{{ item.label }}</t-option>
            </t-select>
          </div>
          <div class="col-4">
            <t-select v-model="districtData" clearable>
              <t-option v-for="(item, index) in districtAddress" :value="item.value" :key="index">{{ item.label }}</t-option>
            </t-select>
          </div>
        </div>
      </t-form-item>
      <t-form-item label="  " prop="addressDetail">
        <t-input v-model="clientInfor.addressDetail" placeholder=""></t-input>
      </t-form-item>
      <div class="border-line"></div>
      <t-form-item label="所属段道：" prop="roadSegment">
        <span>{{ clientInfor.roadSegment }}</span>
      </t-form-item>
      <t-form-item label="段道责任人：" prop="roadLeader">
        <span>{{ clientInfor.roadLeader }}</span>
      </t-form-item>
    </t-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      clientInfor: {
        roadSegment: '3区1段',
        roadLeader: '张卫健'
      },
      clienRules: {},
      provinceAddress: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        }
      ],
      cityAddress: [
        {
          value: 'beijing',
          label: '北京市'
        },
        {
          value: 'shanghai',
          label: '上海市'
        },
        {
          value: 'shenzhen',
          label: '深圳市'
        }
      ],
      districtAddress: [
        {
          value: 'beijing',
          label: '东城区'
        },
        {
          value: 'shanghai',
          label: '西城区'
        },
        {
          value: 'shenzhen',
          label: '通州区'
        }
      ],
      addressData: '',
      cityData: '',
      districtData: ''
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
.client-distinct {
  .row {
    margin: 0;
    width: 100%;
  }
  .col-4 {
    padding: 0;
    width: 100px;
    flex: initial;
  }
}
.form-group {
  &.row {
    margin-bottom: 16px;
  }
  .form-group__content {
    width: 352px;
    span {
      font-size: 12px;
      color: rgba(0,0,0,0.80);
    }
    .select {
      margin: 0;
      padding: 0;
    }
  }
}
.border-line {
  width: 100%;
  height: 1px;
  background: #979797;
  margin-bottom: 16px;
  opacity: 0.3;
}
</style>
