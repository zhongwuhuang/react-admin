import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
// import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'

class Login extends Component {

    render() {
        // 没有使用 withRouter 的时候，是一个空对象
        console.log(this.props);
        return (
            <div className='login animated fadeIn'>
                登录页
            </div>
        )
    }
}

export default withRouter(Login)
