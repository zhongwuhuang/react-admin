import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './Aside.less'

const { Sider } = Layout;
const { SubMenu } = Menu;

class Aside extends Component {
    state = {
        collapsed: false,
        openKeys: [],
        selectedKeys: []
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

    // 循环遍历导航
    renderMenuItem = ({ key, icon, title }) => (
        <Menu.Item key={key} icon={<PieChartOutlined />}>
            <Link to={key}>
                {/* {icon && <Icon type={icon} />} */}
                <span>{title}</span>
            </Link>
        </Menu.Item>
    )

    // 循环遍历数组中的子项 subs ，生成子级 menu
    renderSubMenu = ({ key, icon, title, subs }) => {
        return (
            <Menu.SubMenu
                key={key}
                icon={<PieChartOutlined />}
                title={
                    <span>
                        {/* {icon && <Icon type={icon} />} */}
                        <span>{title}</span>
                    </span>
                }>
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
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2" icon={<DesktopOutlined />}>
                        Option 2
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<UserOutlined />} title="User">
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(Aside);