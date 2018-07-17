<template>
  <div class="components-tree">
    <div>
      <t-tree
        ref="prodTreeRef"
        :data="products"
        :props="proDefaultProp"
        :load="loadNodeDynamic"
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
      proDefaultProp: {
        label: 'pressName',
        children: 'children'
      },
      cataId: '',
      products: [],
      orgId: this.$store.state.login.orgId,
      rres: null
    }
  },
  created() {
    Bus.$on('orgIdChanged', ({ orgId }) => {
      this.orgId = orgId
      this.loadNode(this.$refs.prodTreeRef.root, (e) => {
        this.$refs.prodTreeRef.root.doCreateChildren(e)
        console.log(this.$refs.prodTreeRef)
        // this.$refs.prodTreeRef.store._initDefaultCheckedNodes()
      })
    })
  },
  updated() {
  },
  methods: {
    $_clickProdsTreeNode(data, node, self) {
      if (data.isProduct === 0) {
        this.$Message.warning('请选择非目录刊物!')
      } else {
        this.$emit('emitCheckIsProduct', data)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.orgName.indexOf(value) !== -1
    },
    loadNodeDynamic(node, resolve) {
      console.log(resolve)
      this.loadNode(node, resolve)
    },
    async loadNode(node, resolve) {
      this.cataId = node.data.cataId || ''
      if (node.level === 0) {
        this.products = []
        let proList = await getProductsForBoutique({
          orgId: this.orgId,
          cataId: ''
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
            cataId: this.cataId
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
