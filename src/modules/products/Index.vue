<template>
  <div class="boutique-container clearfix">
    <div class="index-title d-flex justify-content-between">
      <p class="text-base">精品推荐管理</p>
      <t-button type="primary" icon="plus-circle-outline" icon-placement="left" @click="$_clickAddPress">加入精品报刊</t-button>
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
            <div class="org-title d-flex justify-content-between">
              <p>威海市分公司精品报刊</p>
              <p class="d-flex align-items-center">
                <t-input v-model="searchDetails" icon="magnify" icon-placement="right" placeholder="请输入搜索内容"></t-input>
                <t-button type="success" size="sm">查询</t-button>
              </p>
            </div>
            <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
          </div>
          <div class="table-paging text-right">
            <t-pager :total="100" :current="1"></t-pager>
          </div>
        </div>
      </div>
    </div>
    <t-slipbox :visible.sync="addPressData.visible" :styles="addPressData.styls" class="demo__slipbox--1">
      <template slot="header">
        <div class="slipbox-title d-flex justify-content-between align-items-center">
          <p class="text-base">加入精品报刊</p>
          <t-button type="info" size="sm">保存并提交</t-button>
        </div>
      </template>
      <add-trees></add-trees>
    </t-slipbox>
  </div>
</template>

<script>
import companyTrees from '../components/CompanyTrees.vue'
import addTrees from './components/AddPress.vue'

export default {
  components: {
    companyTrees,
    addTrees
  },
  data() {
    return {
      listHeaderData: [
        {
          title: '报刊名',
          key: 'journalName'
        },
        {
          title: 'Banner置顶',
          key: 'banner'
        },
        {
          title: 'BannerURL',
          key: 'bannerURL'
        },
        {
          title: 'Banner图片',
          key: 'bannerImg'
        },
        {
          title: '操作',
          render: (h, params) => {
            // let vm = this
            return h('div', [
              h('span', {
                style: {'color': '#108EEA'},
                on: {
                  click() {
                  }
                }
              }, '取消精品')
            ])
          }
        }
      ],
      listData: [
        {
          journalName: '参考消息',
          banner: '否',
          bannerURL: '../url/banner/NicePaper',
          bannerImg: '-'
        },
        {
          journalName: '参考消息',
          banner: '是',
          bannerURL: '-',
          bannerImg: '../url/banner/jingjicankao.jpg'
        },
        {
          journalName: '参考消息',
          banner: '否',
          bannerURL: '../url/banner/NicePaper',
          bannerImg: '-'
        },
        {
          journalName: '参考消息',
          banner: '是',
          bannerURL: '-',
          bannerImg: '../url/banner/jingjicankao.jpg'
        }
      ],
      searchDetails: '',
      addPressData: {
        visible: false,
        title: '新增精品报刊',
        styls: {
          width: '520px'
        }
      }
    }
  },
  methods: {
    $_clickAddPress() {
      this.addPressData.visible = true
    }
  }
}
</script>

<style lang="less" scoped>
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
  .align-items-center {
    .btn-success.btn-sm {
      height: 26px;
      line-height: 26px;
      background: #009241;
      font-size: 12px;
      margin-left: 8px;
    }
  }
}
.cust-list-item {
  margin-bottom: 20px;
}
</style>
