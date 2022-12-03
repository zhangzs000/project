require('shelljs/global') // 支持rm等操作
var path = require('path')
var ora = require('ora')

var webpack = require('webpack')
var webpackConfig = require('./webpack.config')
var ProgressPlugin = require('webpack/lib/ProgressPlugin')
var prodRoot = path.join(__dirname, 'dist')

webpackCompile()

// webpack编译
function webpackCompile() {

  var
  spinner = ora('')
  spinner.start()

  rm('-rf', prodRoot)
  mkdir('-p', prodRoot)
  cp('-R', path.join(__dirname, './src/css/'), prodRoot + '/css/');
  cp('-R', path.join(__dirname, './src/images/'), prodRoot + '/images/');
  cp('-R', path.join(__dirname, './src/external/'), prodRoot + '/external/');
  webpackConfig.watch = true
  // webpackConfig.progress = true

  var compiler = webpack(webpackConfig)

  compiler.apply(
    new ProgressPlugin(function (percentage, msg) {
      spinner.text = 'building for production... ' + (percentage * 100).toFixed(0) + '% ' + msg
    })
  )

  compiler.run(function (err, stats) {

    if(stats.hasErrors()) {
      console.log('构建失败，错误信息如下：')
      console.log(stats.toString({
        'errors-only': true
      }))
    } else {
      console.log('\nwebpack打包完成, 时间为：' + (stats.endTime - stats.startTime) + 'ms')
    }

    spinner.stop()
    if (err) {throw err}
  })
}
