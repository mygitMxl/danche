import React from 'react'
import { HashRouter, Route ,Switch} from 'react-router-dom'
import Layout from '../common/Layout'
import Home from '../page/01-home'

export default function index() {
  return (
  <HashRouter>
     <Route path={'/'} component={Layout}/>
  </HashRouter>
  )
}
