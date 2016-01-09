var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  // 有时候需要生成多个入口文件，entry现在变成了一个对象了，而对象名也就是key会作为下面output的filename属性的[name]。当然entry也可以是一个数组。
  // entry: {
  //   main: './src/main.js',
  //   index: './src/index.js'
  // },
  // output: {
  //   filename: '[name].bundle.js'
  // }

  // 模块的入口文件。依赖项数组中所有的文件会按顺序打包，每个文件进行依赖的递归查找，直到所有模块都被打成包；
  entry: './src/main.js',
  // 模块的输出文件，其中有如下参数：filename 打包后的文件名，path 打包文件存放的绝对路径，publicPath 网站运行时的访问路径
  output: {
    path: __dirname,
    filename: './build/build.js'
  },
  module: {
    loaders: [
      // test是正则表达式
      // .css 文件使用 style-loader 和 css-loader 来处理
      { test: /\.css$/, loader: 'style!css' },
      // .js 文件使用 jsx-loader 来编译处理，exclude 排斥某些目录和文件
      // { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: { presets: ['react', 'es2015'] } },
      // url-loader用于在js中加载png/jpg格式的图片文件，limit 表示图片小于 8k 时直接base64编码
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      // sass-loader 用来处理 scss 文件
      { test: /\.scss$/, loader: 'style!css!sass' }
      // { test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!' + 'sass?sourceMap') }
    ]
  },
  // 定义了解析模块路径时的配置，常用的就是extensions; 可以用来指定模块的后缀，这样在引入模块时就不需要写后缀，会自动补全。
  resolve: {
    // 自动扩展文件的后缀名，比如我们在require模块的时候，可以不用写后缀名的。
    extensions: ['', '.js', '.jsx'],
    // 模块别名定义，方便后续直接引用别名，无须多写长长的地址
    alias: {
      a: 'js/assets/a.js'  // 后面直接引用 require('a') 即可引用到模块
    }
  },
  // 定义了需要使用的插件，比如commonsPlugin在打包多个入口文件时会提取公用的部分，生成common.js
  plugins: [
    new ExtractTextPlugin('./build/styles.css')
  ]
};