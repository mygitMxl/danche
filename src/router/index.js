import React from 'react'
import { HashRouter, Route ,Switch} from 'react-router-dom'
import Layout from '../common/Layout'
import Detail from '@/page/07-order/detail'

export default function index() {
  return (
  <HashRouter>
     <Route path={'/'} component={Layout}/>
     <Route path={'/detail/:id'} component={Detail}/>
  </HashRouter>
  )
}
