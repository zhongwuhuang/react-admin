import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { 
    Layout, 
    BackTop, 
    // message  
} from 'antd'

import AppAside from './AppAside.jsx'
import AppHeader from './AppHeader.jsx'
import './AppMain.less'

const { Content } = Layout;

class AppMain extends Component {
    state = {
        isLoad: false,
        collapsed: false,
        menu: [],
        routes: [],
    }

    isLogin = () => {
        const that = this
        if (!localStorage.getItem('token')) {
            that.props.history.push('/login')
        } else {
            that.setState({
                menu: that.getMenu()
            })
            const menus = that.getMenu()
            let routes = []
            function getRoutes(menus) {
                menus.map(async (item) => {
                    if (!item.subs) {
                        //如果用import加载，由于import是异步行数导致 render 比 componentWillMount 先执行完毕问题导致无法渲染ui需要设置加载完毕在执行render返回函数
                        // const res = await import(`../views${item.component}.jsx`)  
                        const res = require(`../views${item.component}.jsx`)
                        item.comp = res.default
                        routes.push(item)
                    }
                    if (item.subs) {
                        getRoutes(item.subs)
                    }
                    // 异步设置状态再渲染render
                    // that.setState({
                    //     isload:true
                    // })        
                })
            }
            getRoutes(menus)
            that.setState({
                routes
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
                icon: 'HomeOutlined',
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
                        icon: '' 
                    },
                    { 
                        title: '图标', 
                        key: '/public/icon', 
                        exact: true,
                        component: '/Public/Icon/Icon',
                        icon: '' 
                    }
                ]
            },
            {
                title: '多级导航',
                key: '/one',
                icon: 'ControlOutlined',
                subs: [
                    {
                        title: '二级',
                        key: '/one/two',
                        icon: '',
                        subs: [
                            { 
                                title: '三级', 
                                key: '/one/two/three', 
                                exact: true,
                                component: '/One/Two/Three/Three',
                                icon: '' 
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
                icon: 'GitlabOutlined',
            }
        ]
    }

    componentDidUpdate() {
        console.log('componentDidUpdate');
    }
    
    componentDidMount () {
        console.log('componentDidMount');
        this.isLogin()

    }

    render() {
        // console.log('render');
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
        const { menu,routes,isload} = this.state
        if (!isload && routes.length > 0){
        // if (isload){
            return (
                <Layout className='app'>
                    <BackTop className="ant_back_top">
                        <div style={style}>UP</div>
                    </BackTop>
    
                    <AppAside menu={menu}/>
    
                    <Layout className="site-layout">
                        <AppHeader/>
                        <Content className="content" >
                            <Switch>
                                <Route path='/' exact render={() => <Redirect to='/index' />} />
                                {
                                    routes.map(item => {
                                        return (
                                            <Route
                                                key={item.key}
                                                path={item.key}
                                                exact={item.exact}
                                                render={(props) => {
                                                    document.title = item.title
                                                    return (<item.comp {...props} />)
                                                }}
                                            >
                                                {/* <item.comp {...this.props}/> */}
                                            </Route>
                                        )
                                    })
                                }
                                {/* 如果路由错误重定向到404页面 */}
                                <Redirect to='/404' />
                            </Switch>
                        </Content>
                    </Layout>
                </Layout>
            )
        }else{
            return 'loadding'
        }
        
    }
}

export default withRouter(AppMain);