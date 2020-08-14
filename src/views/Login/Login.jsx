import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { 
    Checkbox, 
    Button, 
    Input, 
    Form, 
    // Layout, 
    // Icon, 
    // Divider, 
    // message, 
    // notification 
} from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/api/login'

import './login.less'

class Login extends Component {

    render() {
        const onFinish = async (values) => {
            const { username, password } = values
            const params = {username, password}
            const res = await login(params)
            // console.log(res);
            if (res.IsSuccess){
                if (res.data.verifySuccess){
                    localStorage.setItem('token',res.data.userInfo.token)
                    this.props.history.replace('/') // replace表示没有上一次的历史记录
                }
            }
        };

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        };

        return (
            <div className="loginForm">
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
                    </Form.Item>

                    {/* <Form.Item name="remember" valuePropName="checked" >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item> */}

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <span className="form_forgot">
                            Forgot password
                        </span>
                    </Form.Item>                    

                    <Form.Item>
                        <Button className="form_btn" type="primary" htmlType="submit">登 录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default withRouter(Login)
// export default (Login)
