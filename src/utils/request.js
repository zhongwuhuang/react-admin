import axios from 'axios'
import NProgress from 'nprogress'

// 这里取决于登录的时候将 token 存储在哪里
const token = localStorage.getItem('token')

const instance = axios.create({
    timeout: 5000 // 请求超时时间
})
instance.defaults.baseURL = '/test_api';

// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        NProgress.start();
        // 将 token 添加到请求头
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        NProgress.done();
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        // 相应错误处理
        // 比如： token 过期， 无权限访问， 路径不存在， 服务器问题等
        console.log(error);
        switch (error.response.status) {
            case 401:
                console.log('401')
                break
            case 403:
                console.log('403')
                break
            case 404:
                console.log('404')
                break
            case 500:
                console.log('500')
                break
            default:
                console.log('其他错误信息')
        }
        return Promise.reject(error)
    }
)

export default instance
