module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
    devServer: {
        // proxy: 'http://image.edenfarm.tech/test-produk/',
        host: '0.0.0.0',
        public: '0.0.0.0:8080',
        disableHostCheck: true,
        
    }
}

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;
// module.exports = {
//     configureWebpack: {
//         plugins: [new BundleAnalyzerPlugin()]
//     }
// };