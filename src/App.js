import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import './style/reset.css'
// 引入antd样式文件
import 'antd/dist/antd.css';

// 公共模块
// const Main = loadable(() => import(/* webpackChunkName: 'default' */ './layout/Main'))
import AppMain from './layout/AppMain.jsx'

// 基础页面
// const View404 = loadable(() => import(/* webpackChunkName: '404' */ './views/Error/404'))
// const View500 = loadable(() => import(/* webpackChunkName: '500' */ './views/Error/500'))
// const Login = loadable(() => import(/* webpackChunkName: 'login' */ './views/Login/Login'))
import View404 from './views/Error/404'
import View500 from './views/Error/500'
import Login from './views/Login/Login.jsx'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact render={() => <Redirect to='/index' />} />
        <Route path='/500' component={View500} />
        <Route path='/login' component={Login} />
        <Route path='/404' component={View404} />
        <Route component={AppMain} onEnter={(nexState, replace) => {
          console.log(nexState, replace);
        }}/>
      </Switch>
    </Router>
  );
}

export default App;
