import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Dropdown, Icon, Layout, Avatar, Badge } from 'antd'
import { SettingOutlined,EditOutlined,UserOutlined,LogoutOutlined} from '@ant-design/icons';

import './AppHeader.less'

const { Header } = Layout;

class AppHeader extends Component {

    render() {
        const menu = (
            <Menu className="drop_menu">
                <Menu.ItemGroup title='用户设置'>
                    <Menu.Divider />
                    <Menu.Item><EditOutlined />个人设置</Menu.Item>
                    <Menu.Item><SettingOutlined />系统设置</Menu.Item>
                </Menu.ItemGroup>            
                <Menu.Divider />
                <Menu.Item><LogoutOutlined />退出登录</Menu.Item>
            </Menu>
        );        
        return (
            <Header className="header">
                <Dropdown overlay={menu} trigger={['hover']}>
                    <div className="head_setting">
                        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        <div className="userName">五环</div>
                    </div>
                </Dropdown>
            </Header>
        )
    }
}

export default withRouter(AppHeader);