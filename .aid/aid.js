let {
  join, resolve
} = require('path')

function rules(config) {
  let rules = config.module.rules.map(v => {
    // console.log(v)
    if(v.test.toString() === '/\\.css/') {
      return {
        test: /\.css/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      }
    }
    return v
  })
  rules = rules.concat([
    {
      test: /\.vue$/,
      use: ['vue-loader'],
      include: /node_modules\/vue-core-image-upload/,
      exclude: /src/
    }
  ])
  return {
    module: {
      rules
    },
    resolve: {
      alias: {
        'src': resolve(__dirname, '../src'),
        'asset': resolve(__dirname, '../src/asset'),
        'commonComp': resolve(__dirname, '../src/module/components'),
        'utils': resolve(__dirname, '../src/utils'),
        'module': resolve(__dirname, '../src/module'),
        'styles': resolve(__dirname, '../src/assets/styles'),
      },
      extensions: [
        ".js",
        ".json",
        ".vue",
        ".styl",
        ".css",
        ".less",
        '.scss'
      ]
    }
  }
}
module.exports = {
  type: "frontend", // 项目类型
  spa: '/index.html', //是否单页应用,url rewrites 规则
  jsExt: ".js", //入口js文件后缀名
  cssExt: ".scss", //入口css文件后缀名
  autocheck: ['aid-elements', 'aid-taurus-desktop'],
  strict: true,
  beforeDev(config) {
    return rules(config)
  },
  beforeBuild(config) {
    let result = rules(config)
    result.output = {
      publicPath: '/'
    }
    return result
  },
  proxy: [
    {
      url: '/sso-web',
      options: {
        target: 'http://192.168.248.169:8080',
        changeOrigin: true
      }
    },
    {
      url: '/subpress-web',
      options: {
        target: 'http://192.168.252.237:8080',
        changeOrigin: true
      }
    },
    {
      url: '/uspa-client',
      options: {
        target: 'http://192.168.252.46:8080',
        changeOrigin: true
      }
    },
    {
      url: '/uspa-web',
      options: {
        target: 'http://192.168.252.238:8080',
        changeOrigin: true
      }
    }
  ],
  outputPrefix: '/' // 构建后index.html中资源路径的前缀
}
