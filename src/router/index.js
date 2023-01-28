import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Layout from '../common/Layout'
export default function index() {
  return (
  <HashRouter>
     <Route path={'/'} component={Layout}/>
  </HashRouter>
  )
}
