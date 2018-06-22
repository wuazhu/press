<template>
  <div class="components-tree border">
    <div class="pd-2 content-search d-flex">
      <t-input
        v-model="searchContent"
        placeholder="请输入搜索内容"
        size="sm">
      </t-input>
    </div>
    <div>
      <t-tree
        :data="orgTreeData"
        :props="orgDefaultProp"
        :load="loadNode"
        lazy>
      </t-tree>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getOrgList } from './server'

export default {
  data() {
    return {
      orgDefaultProp: {
        label: 'orgName',
        children: 'childOrgs'
      },
      orgTreeData: [],
      searchContent: ''
    }
  },
  computed: {
    ...mapState({
      orgId: state => state.login.orgId,
      orgName: state => state.login.orgName
    })
  },
  watch: {
    searchContent(val) {
      this.$refs.tree.filter(val)
    }
  },
  creatd() {
    
  },
  mounted() {
    console.log(this.orgId)
  },
  methods: {
    loadNode(node, resolve) {
      console.log(node)
      if (node.level === 0) {
        return resolve([{
          orgName: this.orgName,
          orgId: this.orgId
        }])
      } else {
        this.getNextOrgTree(node.data.orgId, resolve)
      }
    },
    async getNextOrgTree(prevOrgId, resolve) {
      let nextOrgList = await getOrgList({
        orgId: prevOrgId
      })
      if (nextOrgList.status === 200) {
        if (nextOrgList.data.length) {
          return resolve(nextOrgList.data)
        } else {
          return resolve([])
        }
      } else {
        this.$Message.danger(nextOrgList.message)
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
