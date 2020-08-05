import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, BackTop, message  } from 'antd'

import Aside from './Aside.jsx'
import './Main.less'

const { Header, Content } = Layout;

class Main extends Component {
    state = {
        collapsed: false,
        menu: []
    }

    isLogin = () => {
        if (!localStorage.getItem('user')) {
            this.props.history.push('/login')
        } else {
            this.setState({
                menu: this.getMenu()
            })
        }
    }
    getMenu =() => {
        return [
            {
                title: '首页',
                key: '/index',
                icon: 'PieChartOutlined',
            },
            {
                title: '通用',
                key: '/public',
                icon: 'PieChartOutlined',
                subs: [
                    { title: '按钮', key: '/public/button', icon: 'PieChartOutlined' },
                    { title: '图标', key: '/public/icon', icon: 'PieChartOutlined' }
                ]
            },
            {
                title: '多级导航',
                key: '/one',
                icon: 'PieChartOutlined',
                subs: [
                    {
                        title: '二级',
                        key: '/one/two',
                        icon: 'PieChartOutlined',
                        subs: [{ title: '三级', key: '/one/two/three', icon: 'PieChartOutlined' }]
                    }
                ]
            },
            {
                title: '关于',
                key: '/about',
                icon: 'PieChartOutlined',
            }
        ]
    }

    loginOut = () => {
        localStorage.clear()
        this.props.history.push('/login')
        message.success('登出成功!')
    }

    componentDidMount() {
        // this.isLogin()
        this.setState({
            menu: this.getMenu()
        })
    }


    render() {
        const style = {
            height: 40,
            width: 40,
            lineHeight: '40px',
            borderRadius: 4,
            backgroundColor: '#1088e9',
            color: '#fff',
            textAlign: 'center',
            fontSize: 14,
        };        
        return (
            <Layout className='app'>
                <BackTop className="ant_back_top">
                    <div style={style}>UP</div>
                </BackTop>

                <Aside menu={this.state.menu}/>

                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        Content
          </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(Main);