import React, { Component } from 'react'
// import './login.less'
import { login } from '@/api/login'

class Index extends Component {

    async componentDidMount(){
        const params = {
            username:'user',
            password:'123456'
        }
        const res = await login(params)
        console.log(res);
    }

    render() {

        return (
            <div>
                首页
            </div>
        );
    }
}

export default Index
