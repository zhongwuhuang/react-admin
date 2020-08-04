import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

// import AppHeader from './AppHeader.jsx'


class Main extends Component {
    // state = {
    //     avatar,
    //     show: true,
    //     menu: []
    // }

    // isLogin = () => {
    //     if (!localStorage.getItem('user')) {
    //         this.props.history.push('/login')
    //     } else {
    //         this.setState({
    //             menu: this.getMenu(menu)
    //         })
    //     }
    // }

    // loginOut = () => {
    //     localStorage.clear()
    //     this.props.history.push('/login')
    //     message.success('登出成功!')
    // }
    // getMenu = menu => {
    //     let newMenu,
    //         auth = JSON.parse(localStorage.getItem('user')).auth
    //     if (!auth) {
    //         return menu
    //     } else {
    //         newMenu = menu.filter(res => res.auth && res.auth.indexOf(auth) !== -1)
    //         return newMenu
    //     }
    // }

    componentDidMount() {
        // this.isLogin()
    }


    render() {
        return (
            <div className='app'>
                主页
            </div>
        )
    }
}

export default Main;