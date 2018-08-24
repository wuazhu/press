<template>
  <div class="components-tree">
    <div class="pd-2 content-search d-flex">
      <!-- <t-input
        v-model="bookName"
        placeholder="请输入搜索内容"
        size="sm">
      </t-input> -->
    </div>
    <div>
      <t-tree
        ref="prodTreeRef"
        :data="products"
        :props="proDefaultProp"
        :load="loadNodeDynamic"
        :filter-node-method="filterNode"
        lazy
        highlight-current
        @on-click="$_clickProdsTreeNode">
      </t-tree>
    </div>
  </div>
</template>
<script>
import Bus from '../../bus.js'
import { getProductsForBoutique } from './server'

export default {
  data() {
    return {
      bookName: '',
      proDefaultProp: {
        label: 'labelName',
        children: 'children'
      },
      cataId: '',
      products: [],
      orgId: this.$store.state.login.orgId,
      distId: this.$store.state.login.distId
    }
  },
  watch: {
    bookName(val) {
      this.$refs.prodTreeRef.filter(val)
    }
  },
  created() {
    Bus.$on('orgIdChanged', ({ orgId, distId }) => {
      this.orgId = orgId
      this.distId = distId
      this.loadNode(this.$refs.prodTreeRef.root, (e) => {
        this.$refs.prodTreeRef.root.doCreateChildren(e)
      })
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.pressName.indexOf(value) !== -1
    },
    $_clickProdsTreeNode(data, node, self) {
      if (data.isProduct === 0) {
        this.$Message.warning('请选择非目录刊物!')
      } else {
        this.$emit('emitCheckIsProduct', data)
      }
    },
    loadNodeDynamic(node, resolve) {
      this.loadNode(node, resolve)
    },
    async loadNode(node, resolve) {
      this.cataId = node.data.cataId || ''
      if (node.level === 0) {
        this.products = []
        let proList = await getProductsForBoutique({
          orgId: this.orgId,
          cataId: '',
          distId: this.distId
        })
        if (proList.status === 200 && proList.data.length > 0) {
          return resolve(proList.data)
        } else {
          return resolve([])
        }
      } else {
        if (node.data.isProduct === 0) {
          let proList = await getProductsForBoutique({
            orgId: this.orgId,
            cataId: this.cataId,
            distId: this.distId
          })
          if (proList.status === 200 && proList.data.length > 0) {
            return resolve(proList.data)
          } else {
            return resolve([])
          }
        } else {
          return resolve([])
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
