<template>
  <div class="components-tree">
    <span class="mr-5 content-search w-100 d-flex"><t-input v-model="searchContent" placeholder="请输入搜索内容"></t-input></span>
    <span class="mr-5"><t-tree ref="tree" :data="companyList" :filter-node-method="filterNode" class="filter-tree"></t-tree></span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyList: [{
        id: 1,
        label: '中国邮政集团',
        children: [{
          id: 4,
          label: '山东分公司',
          children: [{
            id: 9,
            label: '威海市分公司'
          }, {
            id: 10,
            label: '济南市分公司'
          }]
        },
        {
          id: 5,
          label: '山西分公司',
          children: [{
            id: 14,
            label: '大同分公司'
          }]
        }]
      }],
      searchContent: ''
    }
  },
  watch: {
    searchContent(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>
<style lang="less" scoped>

</style>
