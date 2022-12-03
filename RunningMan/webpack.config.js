const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
module.exports = {
  entry: {
    gameConfig: './src/js/gameConfig.js',
    main: './src/js/main.js',
    poker: './src/js/Poker.js',
    pokeralert: './src/js/pokeralert.js',
    landscape: './src/js/landscape.js',
    player: './src/js/Player.js',
    ground: './src/js/Ground.js',
    sky: './src/js/Sky.js',
    gold: './src/js/Gold.js',
    missile: './src/js/Missile.js',
    mstBall: './src/js/MstBall.js',
    myalert: './src/js/myalert.js',
    gameOverAlert: './src/js/gameOverAlert.js',
  },
  output: {
    filename: '[name].[contentHash:6].js',
    path: path.resolve(__dirname, './dist')
  },
  module:{
    rules: []
  },
  plugins: [
    new htmlWebpackPlugin({
      title: '天天酷跑',
      filename: 'main.html',
      chunks: ['gameConfig', 'player', 'ground', 'sky', 'gold', 'missile', 'mstBall', 'main', 'myalert', 'gameOverAlert', 'landscape'],
      template: 'src/main.html'
    }),
    new htmlWebpackPlugin({
      title: '翻牌',
      filename: 'poker.html',
      chunks: ['poker', 'pokeralert', 'landscape'],
      template: 'src/poker.html'
    })
  ]
}