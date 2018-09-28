<template>
  <div class="layout layout--one-screen bg-gray-lightest-5">
    <div :class="['menu-backdrop', {'show': isOpen===true}]" @click="closeSidebar"></div>
    <div
      :class="['layout-sidebar bg-gray-darker show',{'layout-sidebar--folded': isOpen===false}]">
      <router-link to="/bk" class="layout-logo-left">
        <img src="/static/images/zy-logo.png" alt="" class="layout-logo-img">
        <span class="text-xxl text-white align-middle ml-1 layout-logo-text">
          <img src="/static/images/post-logo.png" alt="" class="logo-text ml-2">
        </span>
      </router-link>
      <!-- {{ roleIdenty }} -->
      <t-menu
        :open-position="openPosition"
        :class="[{'menu--folded': isOpen===false}]"
        :active-name="menuActiveName"
        :open-names="[menuOpenName]"
        type="dark"
        @on-select="menuSelect">
        <t-menu-item name="/bk">
          <t-icon type="home"></t-icon>
          <span>首页</span>
        </t-menu-item>
        <t-menu-item v-if="(roleIdenty === 2 || roleIdenty === 3)" name="/circulate/setCheckGoal">
          <t-icon type="cash-usd"></t-icon>
          <span>流转额设置</span>
        </t-menu-item>
        <t-submenu v-if="(roleIdenty === 1 || roleIdenty === 3)" name="sys">
          <template slot="title">
            <t-icon type="alert-octagram"></t-icon>
            <span>系统管理</span>
          </template>
          <t-submenu name="uspaManage-org">
            <template slot="title">组织架构管理</template>
            <!-- <t-menu-item name="/uspaManage/uspa/stationTypeManager">岗位类型管理</t-menu-item> -->
            <!-- <t-menu-item name="/uspaManage/uspa/stationManager">岗位管理</t-menu-item> -->
            <t-menu-item name="/uspaManage/uspa/organizeManager">组织管理</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/operatorManager">员工管理</t-menu-item>
            <!-- <t-menu-item name="/uspaManage/uspa/virtualGroupManager">虚拟组管理</t-menu-item> -->
            <!-- <t-menu-item name="/uspaManage/uspa/opStationManager">操作员上岗</t-menu-item> -->
          </t-submenu>
          <t-submenu name="uspaManage-permission">
            <template slot="title">权限管理</template>
            <t-menu-item name="/uspaManage/uspa/roleManager">功能集管理</t-menu-item>
            <!-- <t-menu-item name="/uspaManage/uspa/entityManager">实体管理</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/privManager">操作行为管理</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/entityClassManager">实体分类管理</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/functionManager">菜单管理</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/roleExclude">功能集互斥管理</t-menu-item> -->
          </t-submenu>
          <t-submenu name="uspaManage-permission">
            <template slot="title">功能管理</template>
            <t-menu-item name="/uspaManage/uspa/operatorAuthorManager">操作员授权</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/organizeAuthorManager">组织授权</t-menu-item>
            <!-- <t-menu-item name="/uspaManage/uspa/entityPrivRelaManager">实体操作行为绑定</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/stationTypeAuthorManager">岗位类型授权</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/roleEntityRelaManager">实体与功能集绑定</t-menu-item>
            <t-menu-item name="/uspaManage/uspa/roleFunctionRelaManager">菜单与功能集绑定</t-menu-item> -->
          </t-submenu>
        </t-submenu>
        <t-submenu v-if="(roleIdenty === 2 || roleIdenty === 3)" name="road">
          <template slot="title">
            <t-icon type="road-variant"></t-icon>
            <span>段道管理</span>
          </template>
          <t-menu-item name="/road/allot">段道分配</t-menu-item>
          <!-- <t-menu-item name="/road/bigallot">大宗段道分配</t-menu-item> -->
          <!-- <t-menu-item name="2-2">活跃用户</t-menu-item> -->
        </t-submenu>
        <t-submenu v-if="(roleIdenty === 2 || roleIdenty === 3)" name="devices">
          <template slot="title">
            <t-icon type="laptop-mac"></t-icon>
            <span>设备管理</span>
          </template>
          <t-menu-item name="/devices/accountAuthor">设备授权</t-menu-item>
        </t-submenu>
        <t-submenu v-if="(roleIdenty === 2 || roleIdenty === 3)" name="product">
          <template slot="title">
            <t-icon type="chart-bar"></t-icon>
            <span>产品分类</span>
          </template>
          <t-menu-item name="/product/quality">精品推荐管理</t-menu-item>
          <!-- <t-menu-item name="/product/quality">基础产品目录</t-menu-item> -->
        </t-submenu>
      </t-menu>
    </div>
    <div class="layout-content">
      <nav class="navbar  navbar-expand-lg bg-green layout-nav--top px-4">
        <a href="javascript:;"><i class="aid aid-menu text-xxl text-white" @click="switchedSidebarState"></i></a>
        <t-dropdown class="ml-auto" trigger="click" placement="bottom-end">
          <t-badge class="ml-4">
            <t-avatar bg-state="warning" text="HC" size="sm"></t-avatar>
            <t-icon type="arrow-down-drop text-white" size="20"></t-icon>
          </t-badge>
          <t-dropdown-menu slot="list">
            <t-dropdown-item><router-link to="/user">个人中心</router-link></t-dropdown-item>
            <t-dropdown-item><router-link to="/modifyPassword">修改密码</router-link></t-dropdown-item>
            <t-dropdown-item @on-click="clickLogoutMenu">退出系统</t-dropdown-item>
          </t-dropdown-menu>
        </t-dropdown>
      </nav>
      <t-breadcrumb class="px-4">
        <t-breadcrumb-item
          v-for="bread in breadList"
          :key="bread.name"
          :href="bread.path"
        >{{ bread.name }}
        </t-breadcrumb-item>
      </t-breadcrumb>
      <div class="layout-main px-4" style="top: 105px; bottom: 50px;">
        <div :class="['pos-rel', { 'p-3' : true, 'bg-white': bgColor, 'bg-uspa': isUspa}]" style="height: 100%; overflow-x: hidden; overflow-y: auto;">
          <transition name="cust-router-change" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
      <footer class="p-3 text-center text-gray-light text-sm">
        2011-2018 © AI design
      </footer>
    </div>
  </div>
</template>
<script>
import { forEach, find } from 'lodash'
import { mapActions, mapState } from 'vuex'

export default {
  props: {
  },
  data() {
    return {
      reisezeTimer: null,
      manual: false,
      isUspa: false,
      isOpen: this.initSidebarState(),
      openPosition: this.initMenuPosition(),
      breadList: [],
      roleList: this.$store.state.login.roles,
      roleIdenty: null
    }
  },
  computed: {
    ...mapState({
      uuid: state => state.login.uuid
    }),
    bgColor() {
      return !(this.$route.path === '/bk')
    },
    menuActiveName() {
      return this.$route.fullPath
    },
    menuOpenName() {
      let rexg = /^(sys|road|product|logger|cust|uspaManager)/
      let route = this.$route.fullPath.split('/')[1]
      if (rexg.test(route)) {
        return route
      } else {
        return ''
      }
    }
  },
  watch: {
    $route(to, from) {
      if (to.path !== from.path) {
        this.$_changeBreadcrumb()
        this.$_checkUspa()
      }
    }
  },
  created() {
    this.$_chekIden()
    this.$_changeBreadcrumb()
    this.$_checkUspa()
  },
  mounted() {
    window.addEventListener('resize', () => {
      if (!this.manual) {
        if (this.reisezeTimer !== null) {
          clearTimeout(this.reisezeTimer)
        }
        this.reisezeTimer = setTimeout(this.onWindowResize, 400)
      } else {
        return
      }
    })
  },
  methods: {
    ...mapActions('login', {
      doLogoutAc: 'doLogout'
    }),
    $_chekIden() {
      // 120000200 业务管理员
      // 120000400 收订
      // 120000600 系统管理员
      // 124000800 投递人员
      // 120001000 营销人员
      // 1 => 纯系统管理 只有系统管理菜单
      // 2 => 纯业务管理 没有系统管理菜单
      // 3 => 啥都有
      if (this.roleList.length === 1) {
        if (this.$_checkXtgl()) {
          this.roleIdenty = 1
        } else if (this.$_checkYwgl()) {
          this.roleIdenty = 2
        }
      } else if (this.roleList.length === 2) {
        if (this.$_checkXtgl() && (this.$_checkSdry() || this.$_checkStgl() || this.$_checkYxry())) {
          // 系统管理员 + 投递 | 收投 | 营销
          this.roleIdenty = 1
        } else if (this.$_checkYwgl() && (this.$_checkSdry() || this.$_checkStgl() || this.$_checkYxry())) {
          // 业务管理员 + 投递 | 收投 | 营销
          this.roleIdenty = 2
        } else if (this.$_checkXtgl() && this.$_checkYwgl()) {
          // 业务管理员 + 系统管理员
          this.roleIdenty = 3
        }
      } else if (this.roleList.length === 3) {
        if (this.$_checkYwgl() && (this.$_checkSdry() || this.$_checkStgl()) && this.$_checkYxry()) {
          // 业务管理员 + 营销 |投递 | 收投
          this.roleIdenty = 2
        } else if (this.$_checkYwgl() && this.$_checkSdry() && this.$_checkStgl()) {
          // 业务管理员 + 投递 + 收投
          this.roleIdenty = 2
        } else if (this.$_checkXtgl() && (this.$_checkSdry() || this.$_checkStgl()) && this.$_checkYxry()) {
          // 系统管理员 + 营销 | 投递 | 收投
          this.roleIdenty = 1
        } else if (this.$_checkXtgl() && this.$_checkSdry() && this.$_checkStgl()) {
          // 系统管理员 + 投递 + 收投
          this.roleIdenty = 1
        } else if (this.$_checkXtgl() && this.$_checkYwgl() && (this.$_checkSdry() || this.$_checkStgl() || this.$_checkYxry())) {
          // 业务管理员 + 系统管理员
          this.roleIdenty = 3
        }
      } else if (this.roleList.length === 4) {
        if (this.$_checkYwgl() && this.$_checkSdry() && this.$_checkStgl() && this.$_checkYxry()) {
          // 业务管理员 + 营销 + 投递 + 收投
          this.roleIdenty = 2
        } else if (this.$_checkXtgl() && this.$_checkSdry() && this.$_checkStgl() && this.$_checkYxry()) {
          // 系统管理员 + 营销 + 投递 + 收投
          this.roleIdenty = 1
        } else {
          this.roleIdenty = 3
        }
      } else {
        this.roleIdenty = 3
      }
    },
    $_checkYwgl() {
      // 校验业务管理人员
      if (find(this.roleList, {roleId: 120000200})) {
        return true
      }
    },
    $_checkXtgl() {
      // 校验系统管理人员
      if (find(this.roleList, {roleId: 120000600})) {
        return true
      }
    },
    $_checkSdry() {
      // 校验收递管理人员
      if (find(this.roleList, {roleId: 120000400})) {
        return true
      }
    },
    $_checkStgl() {
      // 校验收投管理人员
      if (find(this.roleList, {roleId: 120000800})) {
        return true
      }
    },
    $_checkYxry(rol) {
      // 校验营销人员
      if (find(this.roleList, {roleId: 120001000})) {
        return true
      }
    },
    async clickLogoutMenu() {
      let logout = await this.doLogoutAc(this.uuid)
      if (logout.responseCode === '0') {
        localStorage.clear()
      } else {
        this.$Message.danger(logout.responseMsg)
      }
      this.$router.push('/')
    },
    $_checkUspa() {
      if (this.$route.name === 'uspaManage') {
        this.isUspa = true
      }
    },
    $_changeBreadcrumb() {
      this.breadList = []
      let matchList = this.$route.matched
      forEach(matchList, (routeItem, routeIndex) => {
        if (routeItem.path !== '/bk/') {
          let routeObj = {
            name: routeItem.meta.breadName,
            path: routeItem.path
          }
          if ((matchList.length - 1) === routeIndex) {
            routeObj.path = ''
          }
          this.breadList.push(routeObj)
        }
      })
    },
    menuSelect(name) {
      // uspa页面处理
      let rexg = /^\/uspaManage/
      if (rexg.test(name)) {
        let timeSec = new Date().getTime()
        let timeLog = Math.floor(timeSec / 1000)
        let urlSrc = `${name}/${timeLog}`
        this.$router.push({
          path: urlSrc
        })
        return
      }
      this.$router.push({
        path: name
      })
    },
    switchedSidebarState () {
      this.isOpen = !this.isOpen
      this.openPosition = this.openPosition === 'down' ? 'right' : 'down'
      this.manual = true
    },
    closeSidebar() {
      this.isOpen = false
      this.openPosition = this.openPosition === 'right'
    },
    initSidebarState() {
      if (document.body.clientWidth > 992) {
        return true
      } else {
        return false
      }
    },
    initMenuPosition() {
      if (document.body.clientWidth > 992) {
        return 'down'
      } else {
        return 'right'
      }
    },
    onWindowResize() {
      if (document.body.clientWidth > 992) {
        this.isOpen = true
        this.openPosition = 'down'
      } else {
        this.isOpen = false
        this.openPosition = 'right'
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .layout {
    position: relative;
  }

  .logo-text {
    width: 80px;
  }

  .layout-logo-left {
    display: flex;
    align-items: center;
    height: 60px;
    padding: 12.5px 20px;
    white-space: nowrap;
    background: #007f3b;
  }

  .layout-logo-img {
    width: 34px;
    height: 34px;
  }

  .layout-sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1031;
    width: 240px;
    visibility: visible;
    opacity: 1;
    transition: all .15s;
  }

  .layout-sidebar--folded {
     left: -50%;
     visibility: hidden;
     opacity: 0;
   }

  .menu-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1031;
    visibility: hidden;
    background-color: #000;
    opacity: 0;
    transition: all .2s;
  }

  .menu-backdrop.show {
     visibility: visible;
     opacity: .6;
   }

  @media (min-width: 768px) {
    .menu-backdrop,
    .menu-backdrop.show {
      visibility: hidden;
      opacity: 0;
    }

    .layout-content {
      margin-left: 240px;
    }

    .layout-sidebar--folded {
      left: 0;
      width: 70px;
      visibility: visible;
      opacity: 1;
    }
    .menu--vertical.menu--folded>li,
    .menu--vertical.menu--folded .menu__submenu-title {
      width: 70px;
    }

    .layout-sidebar--folded + .layout-content {
      margin-left: 70px;
    }

    .layout-sidebar--folded .layout-logo-text {
      visibility: hidden;
    }
  }

  .layout-nav--top {
    z-index: 1030;
    height: 60px;
    padding: .5rem 1rem;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
  }

  .layout-content {
    position: relative;
    height: 100%;
    transition: all .15s;
  }

  .layout--one-screen {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .layout--one-screen .layout-sidebar {
    position: fixed;
    .menu__item a {
      display: block;
      width: 100%;
    }
  }

  .layout--one-screen .menu--vertical {
    position: absolute;
    top: 60px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    transition: all .3s;
  }

  .layout--one-screen .layout-sidebar--folded .menu--vertical {
    overflow: visible;
  }

  .layout--one-screen .layout-main {
    position: absolute;
    right: 0;
    left: 0;
    overflow: auto;
  }

  .layout--one-screen .layout-content footer {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 0);
  }
.test-abs {
  position: absolute;
}
.bg-uspa {
  background-color: #f2f6f7!important;
}
.menu__submenu {
  .menu__submenu {
    .menu__submenu-title{
      padding-left: 40px;
    }
    .menu .menu__item{
      padding-left: 50px;
    }
  }
}
</style>
