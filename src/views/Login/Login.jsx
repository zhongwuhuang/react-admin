import React, { Component } from 'react'
import { withRouter } from 'react-router-dom' 
import { Layout, Input, Icon, Checkbox, Form, Button, Divider, message, notification } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'

class Login extends Component {

    render() {
        console.log(this.props);

        const onFinish = values => {
            console.log('Success:', values);
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

                        <a className="form_forgot" href="javascript:;">
                            Forgot password
                        </a>
                    </Form.Item>                    

                    <Form.Item>
                        <Button className="form_btn" type="primary" htmlType="submit">登 录</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

// export default withRouter(Form.create()(Login))
export default (Login)
