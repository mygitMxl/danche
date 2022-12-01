import { Row,Col} from 'antd'
import Header from './components/Header'/* 如果文件中有index会默认导了index */
import  Footer  from './components/Footer'
import React, { Component } from 'react'
import NavLeft from './components/Navlist'
export default class admin extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span='3'>
             <NavLeft/>
          </Col>
          <Col span='21'>{/* 两个相加必须等于24 */}
            <Header/>
            <Row>
              123
            </Row>
            <Footer/>
          </Col>
        </Row>
      </div>
    )
  }
}
