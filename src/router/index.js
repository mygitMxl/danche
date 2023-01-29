import React from 'react'
import { HashRouter, Route ,Switch} from 'react-router-dom'
import Layout from '../common/Layout'
import Detail from '@/page/07-order/detail'
import Login from '@/page/12-login'
 export default function Index(props) {
  return (
  <HashRouter>
    <Switch>
      <Route path={'/login'} component={Login}/>
     <Route  path={'/detail/:id'} component={Detail}/>
     <Route path={'/'} component={Layout}/>
     </Switch>
  </HashRouter>
  )
}
