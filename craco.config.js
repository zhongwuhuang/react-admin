/* craco.config.js */
const CracoLessPlugin = require("craco-less");
const path = require('path');
const pathResolve = pathUrl => path.join(__dirname, pathUrl)

module.exports = {
    // resolve: {
    //     extensions: ['.jsx', '.js', '.css', '.less'],
    //     alias: {
    //         '@': path.resolve(__dirname, './src'),
    //         '@views': path.resolve(__dirname, './src/views'),
    //     }
    // },  
    webpack: {
        alias: {
            '@': pathResolve('src'),
            '@views': pathResolve('src/views'),
        }
    },      
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
                context: ['/test_api'],
                target: 'https://www.fastmock.site/mock/2b4ef38b241be69e16617588a8e1f225/',
                changeOrigin: true,
                secure: false,
                pathRewrite: {
                    '^/test_api': '/test_api'
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