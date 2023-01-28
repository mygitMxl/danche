const CracoLessPlugin = require('craco-less');
const path = require('path')
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1E90FF' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
      // 约定：使用 @scss 表示 样式 文件所在路径
      '@scss': path.resolve(__dirname, 'src', 'assets', 'styles')
    },
  },
};