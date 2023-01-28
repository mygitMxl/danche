
import React from 'react'
import { Redirect, Route,Switch } from 'react-router-dom'
import Home from '../page/01-home'
import City from '@/page/06-city'
export default function Context() {
  return (
    <div>
        <Switch>
       <Route  path={'/home'} component={Home}/>
       <Route  path={'/city'} component={City}/>
        </Switch>
        <Redirect from='/' to={'/home'}/>
    </div>
  )
}
