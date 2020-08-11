import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, BackTop, message  } from 'antd'

import AppAside from './AppAside.jsx'
import AppHeader from './AppHeader.jsx'
import './AppMain.less'

const { Content } = Layout;

class AppMain extends Component {
    state = {
        collapsed: false,
        menu: [],
        routes: [],
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
                exact: true,
                component: '/Index/Index',
                icon: 'PieChartOutlined',
            },
            {
                title: '通用',
                key: '/public',
                icon: 'PieChartOutlined',
                subs: [
                    { 
                        title: '按钮', 
                        key: '/public/button', 
                        exact: true,
                        component: '/Public/Button/Button',
                        icon: 'PieChartOutlined' 
                    },
                    { 
                        title: '图标', 
                        key: '/public/icon', 
                        exact: true,
                        component: '/Public/Icon/Icon',
                        icon: 'PieChartOutlined' 
                    }
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
                        subs: [
                            { 
                                title: '三级', 
                                key: '/one/two/three', 
                                exact: true,
                                component: '/One/Two/Three/Three',
                                icon: 'PieChartOutlined' 
                            }
                        ]
                    }
                ]
            },
            {
                title: '关于',
                key: '/about',
                exact: true,
                component: '/About/About',
                icon: 'PieChartOutlined',
            }
        ]
    }

    componentDidMount() {
        // this.isLogin()
        this.setState({
            menu: this.getMenu()
        })
        const menus = this.getMenu()
        let routes = []
        function getRoutes(menus) {
            menus.map(async (item) => {
                if(!item.subs){
                    const res = await import(`../views${item.component}.jsx`)
                    item.comp = res.default
                    routes.push(item)
                }
                if (item.subs){
                    getRoutes(item.subs)
                }
            })
        }
        getRoutes(menus)
        this.setState({
            routes
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
        const routes = this.state.routes
        return (
            <Layout className='app'>
                <BackTop className="ant_back_top">
                    <div style={style}>UP</div>
                </BackTop>

                <AppAside menu={this.state.menu}/>

                <Layout className="site-layout">
                    <AppHeader/>
                    <Content className="content" >
                        <Switch>
                            {
                                routes.map(item => {
                                    return (
                                        <Route
                                            key={item.key}
                                            path={item.key}
                                            exact={item.exact}
                                            // render={
                                            //     props => (<item.comp {...props}/>)
                                            // }
                                        >
                                            <item.comp {...this.props}/>
                                        </Route>
                                    )
                                })
                            }
                            {/* <Route path="/index">index</Route>
                            <Route path="/about">about</Route> */}
                            {/* <Redirect to='/404' /> */}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(AppMain);