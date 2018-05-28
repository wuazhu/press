<template>
  <div class="layout layout--one-screen bg-gray-lightest-5">
    <div :class="['menu-backdrop', {'show': isOpen===true}]" @click="closeSidebar"></div>
    <div :class="['layout-sidebar bg-gray-darker show',{'layout-sidebar--folded': isOpen===false}]">
      <a href="#" class="layout-logo-left">
        <img src="/static/images/zy-logo.png" alt="" class="layout-logo-img">
        <span class="text-xxl text-white align-middle ml-1 layout-logo-text">
          <img src="/static/images/post-logo.png" alt="" class="logo-text ml-2">
        </span>
      </a>
      <t-menu :open-position="openPosition" :class="[{'menu--folded': isOpen===false}]" type="dark" accordion @on-select="menuSelect">
        <t-menu-item name="dashboard">
          <t-icon type="home"></t-icon>
          <span>首页</span>
        </t-menu-item>
        <t-submenu name="sys">
          <template slot="title">
            <t-icon type="alert-octagram"></t-icon>
            <span>系统管理</span>
          </template>
          <t-menu-item name="user.baseInfo">组织机构</t-menu-item>
          <t-menu-item name="sys-account">账户管理</t-menu-item>
          <t-menu-item name="sys-permission">权限管理</t-menu-item>
          <t-menu-item name="sys-device">账号设备授权</t-menu-item>
        </t-submenu>
        <t-submenu name="road">
          <template slot="title">
            <t-icon type="road-variant"></t-icon>
            <span>段道管理</span>
          </template>
          <t-menu-item name="road-allot">段道分配</t-menu-item>
          <t-menu-item name="2-2">活跃用户</t-menu-item>
        </t-submenu>
        <t-menu-item name="roam">
          <t-icon type="water-percent"></t-icon>
          <span>流转额计划管理</span>
        </t-menu-item>
        <t-submenu name="product">
          <template slot="title">
            <t-icon type="chart-bar"></t-icon>
            <span>产品分类</span>
          </template>
          <t-menu-item name="product-base">基础产品目录</t-menu-item>
          <t-menu-item name="product-quality">精品推荐管理</t-menu-item>
        </t-submenu>
        <t-submenu name="logger">
          <template slot="title">
            <t-icon type="library-books"></t-icon>
            <span>系统日志</span>
          </template>
          <t-menu-item name="logger-device">设备使用日志</t-menu-item>
          <t-menu-item name="logger-login">人员登录日志</t-menu-item>
        </t-submenu>
        <t-submenu name="cust">
          <template slot="title">
            <t-icon type="account-multiple"></t-icon>
            <span>客户管理</span>
          </template>
          <t-menu-item name="cust-repeat">客户去重</t-menu-item>
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
            <t-dropdown-item>退出系统</t-dropdown-item>
          </t-dropdown-menu>
        </t-dropdown>
      </nav>
      <t-breadcrumb class="px-4">
        <t-breadcrumb-item href="#">首页</t-breadcrumb-item>
        <t-breadcrumb-item href="#">二级</t-breadcrumb-item>
        <t-breadcrumb-item href="#">三级</t-breadcrumb-item>
        <t-breadcrumb-item>当前页</t-breadcrumb-item>
      </t-breadcrumb>
      <div class="layout-main px-4" style="top: 105px; bottom: 50px;">
        <div :class="['bg-white', { 'p-3' : needPadding}]" style="min-height: 100%;">
          <transition name="fade">
            <router-view></router-view>
          </transition>
        </div>
      </div>
      <footer class="p-3 text-center text-gray-light text-sm">
        2011-2016 © AI design
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  props: {
  },
  data() {
    return {
      reisezeTimer: null,
      manual: false,
      isOpen: this.initSidebarState(),
      openPosition: this.initMenuPosition()
    }
  },
  computed: {
    needPadding() {
      let reg = /^\/user/
      if (reg.test(this.$route.path)) {
        return false
      }
      return true
    }
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
  updated() {
    console.log(this.$route.matched)
  },
  methods: {
    menuSelect(name) {
      this.$router.push({
        name
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
</style>
