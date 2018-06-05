<template>
  <div class="boutique-container clearfix">
    <div class="index-title d-flex justify-content-between">
      <p class="text-base">精品推荐管理</p>
      <t-button type="primary" icon="plus-circle-outline" icon-placement="left" @click="$_clickAddPress">加入精品报刊</t-button>
    </div>
    <div class="row index-content d-flex clearfix">
      <div class="content-left col-3">
        <div class="top-title">组织机构</div>
        <company-trees></company-trees>
      </div>
      <div class="content-right">
        <div class="top-title d-flex justify-content-between">
          <p>威海市分公司精品报刊</p>
          <p class="d-flex align-items-center">
            <t-input v-model="searchDetails" icon="magnify" icon-placement="right" placeholder="请输入搜索内容"></t-input>
            <t-button type="success" size="sm">查询</t-button>
          </p>
        </div>
        <t-table :columns="listHeaderData" :data="listData" :all-ellipsis="true" line></t-table>
        <div class="table-paging">
          <t-pager :total="100" :current="1"></t-pager>
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
.p-3 {
  padding:0 !important;
}
.boutique-container {
  .row {
    margin: 0;
  }
  .slipbox__wraper {
    .slipbox__content {
      .slipbox__header {
        padding: 0 22px;
        border-bottom: 1px solid #979797;
      }
    }
  }
  .index-title {
    p{
      line-height: 22px;
      margin-bottom: 0;
    }
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
  .index-content {
    width: 100%;
    margin-top: 12px;
    .top-title {
      background: #F7F7F7;
      border-bottom: 1px solid #E9E9E9;
      padding-left: 16px;
      line-height: 40px;
      color: #323232;
      p {
        margin-bottom: 0;
        input{
          height: 30px;
          line-height: 30px;
          font-size: 12px;
          width: 260px;
        }
        button {
          width: 44px;
          height: 28px;
          line-height: 28px;
          background: #009241;
          margin: 0 16px 0 8px;
          span {
            font-size: 12px;
          }
        }
      }
    }
    &>div {
      background: #FFFFFF;
      border: 1px solid #E9E9E9;
      min-height: 350px;
      &:nth-child(1) {
        padding: 0;
        .content-search {
          justify-content: center;
          align-items: center;
          margin-top: 12px;
          .input-wrapper {
            width: 90%;
            input {
              width: 100%;
              height: 28px;
              font-size: 12px;
            }
          }
        }
      }
      &:nth-child(2) {
        margin-left: 20px;
        flex: 1;
        position: relative;
        .table__header {
          table {
            th {
              background: #fff;
              height: 40px;
              font-size: 12px;
              color: #000;
            }
          }
        }
        .table-tbody {
          td {
            height: 40px;
            font-size: 12px;
            color: #000;
            span {
              cursor: pointer;
            }
          }
        }
        .table-paging {
          position: absolute;
          bottom: 20px;
          right: 20px;
        }
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
</style>
