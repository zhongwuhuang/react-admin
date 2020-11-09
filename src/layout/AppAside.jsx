import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import * as Icons from '@ant-design/icons';
import './AppAside.less'

const { Sider } = Layout;
// const { SubMenu } = Menu;

class AppAside extends Component {
    state = {
        collapsed: false,
        openKeys: [],
        selectedKeys: []
    }    

    // 页面刷新的时候可以定位到 menu 显示
    componentDidMount() {
        let { pathname } = this.props.location
        this.setState({
            selectedKeys: [pathname],
            openKeys: this.getOpenKeys(pathname)
        })
    }    

    // 处理 pathname
    getOpenKeys = string => {
        let newStr = '',
            newArr = [],
            arr = string.split('/').map(i => '/' + i)
        for (let i = 1; i < arr.length - 1; i++) {
            newStr += arr[i]
            newArr.push(newStr)
        }
        return newArr
    }    

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };   

    // 只展开一个 SubMenu
    onOpenChange = openKeys => {
        if (openKeys.length === 0 || openKeys.length === 1) {
            this.setState({
                openKeys
            })
            return
        }

        // 最新展开的 SubMenu
        const latestOpenKey = openKeys[openKeys.length - 1]

        // 这里与定义的路由规则有关
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({
                openKeys
            })
        } else {
            this.setState({
                openKeys: [latestOpenKey]
            })
        }
    }    

    // React.createElement（ 节点名称 ，节点属性集合，内容集合 ）
    iconBC = (name) => {
        return React.createElement(Icons && Icons[name],{style:{fontSize:'16px'}})
    }

    // 循环遍历导航
    renderMenuItem = ({ key, icon, title }) => (
        <Menu.Item key={key} icon={icon && this.iconBC(icon)}>
            <Link to={key}>
                <span>{title}</span>
            </Link>
        </Menu.Item>
    )

    // 循环遍历数组中的子项 subs ，生成子级 menu
    renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <Menu.SubMenu
                key={key}
                icon={icon && this.iconBC(icon)}
                title={<span>{title}</span>}
            >
                {
                    subs && subs.map(item => {
                        return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                    })
                }
            </Menu.SubMenu>
        )
    }    

    render() {
        let { openKeys, selectedKeys } = this.state
        return (
            <Sider className="sider" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu
                    className="_menu"
                    mode='inline'
                    theme='dark'
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    onClick={({ key }) => this.setState({ selectedKeys: [key] })}
                    onOpenChange={this.onOpenChange}
                >
                    {
                        this.props.menu && this.props.menu.map(item => {
                            return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                        })
                    }
                </Menu>
            </Sider>
        )        
    }
}

export default withRouter(AppAside);