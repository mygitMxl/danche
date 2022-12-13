import React, { Component } from 'react'
import { HashRouter, Redirect, Route, Switch,} from 'react-router-dom';
import Admin from './admin';
import Login from  './page/login'
import Home from './page/home'
import  NoMatch from './page/nomatch'
//ui组件
import Buttons from './page/ul/button'
import Carousel from './page/ul/carousel';
import Gallery from './page/ul/gallery';
import Loading from './page/ul/loading';
import Messages from './page/ul/messages'
import Modals from './page/ul/modals'
import Notice from './page/ul/notice'
import Tabs from './page/ul/tabs'
//登录组件
import FormLogin from './page/form/login'
import FormRegister from './page/form/register'
//表格组件
import BasicTable from './page/table/basicTable'
import HighTable from './page/table/highTable'
//city组件
import City from './page/city/index'
//order组件
import Order from './page/order/index'
//common组件
import Common from './common'
import OrderDetail from './page/order/detail'
//user
import User from './page/user/index';
//车辆地图
import BikeMap from './page/map/bikeMap'
//echarts
import Bar from './page/echarts/bar';
import Pie from './page/echarts/pie';
import Line from './page/echarts/line';
//富文本
import Rich from './page/rich';
export default class router extends Component {
  render() {
    return (
          <HashRouter>
            <Switch>
            <Route path={'/login'} component={Login}/>
          <Route path="/common" render={() =>
            <Common>
              <Route path="/common/order/detail/:orderId" component={OrderDetail} />
            </Common>
          }
          />
            <Route path={'/'} render={()=>{
                return(
                    <Admin>
                    <Switch>{/* 子路由必须有父路由的路径 '/'*/}
                         {/* ul组件 */}
                        <Route path={'/home'} component={Home}/>
                        <Route path={'/ui/buttons'} component={Buttons}/>
                        <Route path={'/ui/carousel'} component={ Carousel}/>
                        <Route path={'/ui/gallery'} component={Gallery}/>
                        <Route path={'/ui/loadings'} component={Loading}/>
                        <Route path={'/ui/messages'} component={Messages}/>
                        <Route path="/ui/modals" component={Modals} />
                        <Route path="/ui/notification" component={Notice} />
                        <Route path="/ui/tabs" component={Tabs} />
                        {/* ........................................................ */}
                         {/* 登录组件 */}
                        <Route path="/form/login" component={FormLogin} />
                        <Route path="/form/reg" component={FormRegister} />
                        {/* ......................................................... */}
                        {/* 表格组件 */}
                        <Route path="/table/basic" component={BasicTable} />
                        <Route path="/table/high" component={HighTable} />
                        {/*.......city  */}
                        <Route path="/city" component={City} />
                        {/*........order */}
                        <Route path="/order" component={Order} />
                        {/*.......user */}
                        <Route path='/user' component={User}/>
                         {/*......车辆地图  */}
                         <Route path='/bikeMap' component={BikeMap} />
                         {/* echarts */}
                         <Route path='/charts/bar' component={Bar} />
                         <Route path='/charts/pie' component={Pie} />
                         <Route path='/charts/line' component={Line} />
                         {/* 富文本 */}
                         <Route path='/rich' component={Rich} />











                        <Route component={ NoMatch}></Route>
                   
                       
                    </Switch>
                    <Redirect to={'/home'}/>
                   </Admin>
                )
            }}></Route>
          
          </Switch>
          </HashRouter>
    )
  }
}
