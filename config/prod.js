const execSync = require('child_process').execSync;

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
    'process.env.buildInfo': JSON.stringify({
      'user': execSync('git config user.name', { encoding: 'utf-8'}).trimEnd(),
      'branch': execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8'}).trimEnd(),
      'commit': execSync('git rev-parse --short HEAD', { encoding: 'utf-8'}).trimEnd(),
      'time': new Date().toLocaleString(),
    })
  },
  mini: {
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     * webpackChain (chain) {
     *   chain.plugin('analyzer')
     *     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])
     * }
     */
  }
};
