<template>
  <div :class="['components-tree', { 'border' : border }]">
    <div v-if="needFilter" class="pd-2 content-search d-flex">
      <!-- <t-input
        v-model="searchContent"
        placeholder="请输入搜索内容"
        size="sm">
      </t-input> -->
    </div>
    <div>
      <t-tree
        ref="orgTreeRef"
        :data="orgTreeData"
        :props="orgDefaultProp"
        :load="loadNode"
        :filter-node-method="filterNode"
        lazy
        @on-click="$_clickOrgTreeNode">
      </t-tree>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { getOrgList } from './server'

export default {
  props: {
    needFilter: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: true
    }
  },
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
      orgName: state => state.login.orgName,
      distId: state => state.login.distId
    })
  },
  watch: {
    searchContent(val) {
      this.$refs.orgTreeRef.filter(val)
    }
  },
  methods: {
    $_clickOrgTreeNode(data, node, self) {
      let distId = null
      if (this.orgId === data.orgId) {
        distId = this.distId
      } else {
        distId = data.distId
      }
      this.$emit('emitClickOrgTreeNode', {
        orgId: data.orgId,
        orgName: data.orgName,
        distId: distId
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },
    async loadNode(node, resolve) {
      let orgId = node.data.orgId
      if (node.level === 0) {
        return resolve([{
          orgName: this.orgName,
          orgId: this.orgId
        }])
      } else {
        let nextOrgList = await getOrgList({
          orgId: orgId
        })
        if (nextOrgList.status === 200) {
          if (nextOrgList.data.childOrgs.length) {
            return resolve(nextOrgList.data.childOrgs)
          } else {
            return resolve([])
          }
        } else {
          this.$Message.danger(nextOrgList.message)
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.components-tree {
  max-height: 450px;
  overflow-y: auto;
}
</style>
