import React, { Component } from 'react'
import { Row, Col } from 'antd';
import Header from './components/Header';

export default class common extends Component {
  render() {
    return (
      <div>
        <Row className='simple-page'>
           <Header menuType='123'/>{/* 传了一个属性 */}
        </Row>
        <Row className='content'>
           {this.props.children}
        </Row>
      </div>
    )
  }
}
