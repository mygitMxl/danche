
import React from 'react'
import { Redirect, Route,Switch } from 'react-router-dom'
import Home from '../page/01-home'
import City from '@/page/06-city'
import Order from '@/page/07-order'
import User from '@/page/08-user'
import Bike from '@/page/09-bikeMap'
import Bar  from '@/page/10-echarts/bar'
import Line  from '@/page/10-echarts/line'
import Pie  from '@/page/10-echarts/pie'
import Permission from '@/page/11-permission'
import { Spin } from 'antd'
import { connect } from 'react-redux'
 function Context(props) {
  console.log(props);
  return (
    <div>
       <Spin size='large' spinning={props.showLaing}>
       <Switch>
       <Route  path={'/home'} component={Home}/>
       <Route  path={'/city'} component={City}/>
       <Route path={'/order'} component={Order}/>
       <Route path={'/user'} component={User}/>
       <Route path={'/bikeMap'} component={Bike}/>

       <Route path='/charts/bar' component={Bar} />
        <Route path='/charts/pie' component={Pie} />
        <Route path='/charts/line' component={Line} />
        
        <Route path='/permission' component={Permission}/>
       </Switch>
      </Spin>
    </div>
  )
}
const MapStateToProps=(state)=>{
  console.log(state);
  return{
    showLaing:state.Loading.showLaing
  }
}
export default connect (MapStateToProps,null)(Context)