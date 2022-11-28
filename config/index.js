import path from 'path';

const getArgValue = (name) => {
  const arr = process.argv.splice(2);
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (val.includes(name)) {
      if (val.includes('=')) return val.split('=')[1];
      if (val.startsWith('-')) return (arr[i+1]||'').startsWith('-') ? '' : arr[i+1];
    }
  }
  return '';
}

const config = {
  projectName: 'taro-vue3',
  date: '2022-8-16',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    'taro-plugin-pinia',
    '@tarojs/plugin-html'
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass: {
    // 全局 scss 主题变量 https://docs.taro.zone/docs/config-detail#sass
    resource: [
      path.resolve(__dirname, '../src/assets/styles/custom_theme.scss'),
      path.resolve(__dirname, '../src/assets/styles/common.scss')
    ],
    data: '@import "@nutui/nutui-taro/dist/styles/variables.scss";',
  },
  mini: {
    webpackChain (chain) {
      chain.merge({
        module: {
          rule: {
            mjsScript: {
              test: /\.mjs$/,
              include: [/pinia/],
              use: {
                babelLoader: {
                  loader: require.resolve('babel-loader')
                }
              }
            }
          }
        }
      });
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          config: {
            selectorBlackList: ['nut-']
          }
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'global', // xxx.global.less 不转换
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    miniCssExtractPluginOption: { // [mini-css-extract-plugin] Conflicting order error: https://github.com/NervJS/taro/issues/7160
      ignoreOrder: true,
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          // namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  defineConstants: {
    'process.env': JSON.stringify({
      'NODE_ENV': process.env.NODE_ENV,
      'TARO_ENV': process.env.TARO_ENV,
      'BUILD_ENV': getArgValue('buildEnv'),
    })
  },
  alias: {
    '@/apis': path.resolve(__dirname, '..', 'src/apis'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/stores': path.resolve(__dirname, '..', 'src/stores'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/custom-tab-bar': path.resolve(__dirname, '..', 'src/custom-tab-bar'),
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return merge({}, config, require('./dev'));
  }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
  return merge({}, config, require('./prod'));
};
