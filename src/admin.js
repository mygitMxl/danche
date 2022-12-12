import { Row,Col} from 'antd'
import Header from './components/Header'/* 如果文件中有index会默认导了index */
import  Footer  from './components/Footer'
import React, { Component } from 'react'
import NavLeft from './components/Navleft'
import './style/common.css'
export default class admin extends Component {
  render() {
    return (
      <div>
        <Row className='container'>
          <Col span='4' className='nav-left'>
             <NavLeft/>
          </Col>
          <Col span='20' className='main'>{/* 两个span相加必须等于24 */}
            <Header/>
            <Row className='content'>

           {this.props.children}
            </Row>
            <Footer/>
          </Col>
        </Row>
      </div>
    )
  }
}