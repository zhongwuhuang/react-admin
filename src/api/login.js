import request from '@/utils/request.js'

const login = (params) => {
    return request({
        // url: 'https://www.fastmock.site/mock/2b4ef38b241be69e16617588a8e1f225/test_api/login',//
        url: '/login',//
        method: 'post',
        data: { ...params}
    })
}

export {
    login
}