# 开发规范

> 遵循`vue` 官方推荐方案, 可添加项目组规定

## 文件及项目结构

- 结构

```json
// 和父组件紧密耦合的子组件应该以父组件名作为前缀命名。
├── index
├── ├── components			
│       ├── UserList.vue			// 模块下提炼组件, 全局
│       └── UserListItem.vue		// 父组件紧密耦合的子组件
│   └── Home.vue
├── components						// 全局公用提炼组件,如公用组织机构等
│   └── OrgnizeTree.vue
├── login
│   ├── Index.vue
│   └── store
│       ├── action.js				// action 	action相关
│       ├── constant.js				// constant 静态名称静态命名相关
│       ├── index.js				// store  	store入口
│       └── mutation.js				// mutation mutation相关
│   ├── components
│       └── LoginForm.vue			// 模块下提炼组件, 全局
│   └── Login1.vue					// 模块下页面文件
│   └── Login2.vue					// 模块下页面文件
└── welcome.vue						// app 入口文件
```

- 文件

  - 和父组件紧密耦合的子组件应该以父组件名作为前缀命名。

  - 单词顺序 `SerchInput` 以动作开头描述性修饰词结尾

  - 在文件导入及组件注册时总是PascalCase 的, 在 htmlDom 模板中总是 kebab-case 的.

  - 组件名应该倾向于完整的单词而不是缩写

  - 多个特性分多行撰写, 每个特性一行

  - 组件模板应该只包含简单的表达式，复杂的表达式则应该重构为计算属性或方法, 把复杂的计算属性拆成多个简单的计算属性

  - ```javascript
    computed: {
      basePrice: function () {
        return this.manufactureCost / (1 - this.profitMargin)
      },
      discount: function () {
        return this.basePrice * (this.discountPercent || 0)
      },
      finalPrice: function () {
        return this.basePrice - this.discount
      }
    }
    ```

  - 在 html 属性名对应的值应为""双引号形式, 在 javascript 中属性对应的值应为 ''单引号形式

  - 在模板中的指令应为缩写 `v-bind:click="xx"` => `@click="xx"` 其余指令雷同

  - 如无特殊需要, 尽量避免通过 `parent`, `child `  调用父及子组件内方法及属性

  - 对于元素显示隐藏使用` v-show`, 对于元素加载与否使用`v-if`  来决定

  - 在单文件里面至少要有 `script`  `template` 标签, 如有组件内样式, 必须要有 `style lang="less"` 标签, 顺序上` template` `script` `style scoped` 

  - 在样式中, 应该尽量避免元素选择器, 尽量使用类选择器

    

    

## 命名

- 组件命名必须多个单词, 跟组件除外

- 单组件`.vue`文件必须以大写驼峰

- 组件数据 `data` 必须是一个函数

- `Prop`定义应该尽量详细,并以驼峰方式

- ```json
  props: {
      text: {
          type: String,
          default: '暂无',
          require: true,
          ...
      },
      // 至少保证
      textStatus: {
          type: String,
          default: '暂无'
      }
  }
  ```

  

- 为`v-for`设置 key 值, key 值为字符串或数字 (官方规定)

- 尽量避免`v-if` 和 `v-for` 同时在一个元素上

- 为组件样式设置作用域

  > 这条规则只和[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)有关。你*不一定*要使用 [`scoped` 特性](https://vue-loader.vuejs.org/zh-cn/features/scoped-css.html)。设置作用域也可以通过 [CSS Modules](https://vue-loader.vuejs.org/zh-cn/features/css-modules.html)，那是一个基于 class 的类似 [BEM](http://getbem.com/) 的策略，当然你也可以使用其它的库或约定。

- 私有属性名 ([$_私有性]+触发行为+动作+名称+[归属])

  >  **在插件、混入等扩展中始终为自定义的私有属性使用` $_` 前缀。具体命名规则: `$_addMember`
  >
  > - 点击等动作系列: `$_clickAddMember` , `$_clickDelMember`
  > - `action` , `mutation`, `getter` , `mixin`等 `vuex` 相关应为 `doSomethingAct`,  `doSomethingMut`  , `doSomethingGetter`, 

- 在方法内第一行应用`// 注释`写明注释

## 