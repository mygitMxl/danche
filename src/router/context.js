
import React from 'react'
import { Redirect, Route,Switch } from 'react-router-dom'
import Home from '../page/01-home'
import City from '@/page/06-city'
import Order from '@/page/07-order'
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
       <Route path={'/Order'} component={Order}/>
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