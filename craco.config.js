/* craco.config.js */
const CracoLessPlugin = require("craco-less");

module.exports = {
    devServer: {
        hot: true, //热加载
        historyApiFallback: true,
        host: 'localhost',
        compress: false, // 服务器返回浏览器的时候是否启动gzip压缩
        inline: true, // 文件改变自动刷新页面
        progress: false, // 显示编译进度
        port: 7777, // 服务器端口
        overlay: {
            errors: true
        },
        proxy: [
            {
                context: ['/Help'],
                target: 'http://10.48.186.92/wnjzyh/api_test/Help',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/Help': '/'
                }
            }
        ]
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { "@primary-color": "#1DA57A" },
                        javascriptEnabled: true
                    }
                }
            }
        }
    ],    
};