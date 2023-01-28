import React,{useState,useEffect} from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
  } from '@ant-design/icons'
  import { Layout, Dropdown,Menu ,Avatar, Row, Col} from 'antd';
  import './style/Header.less'
  import { showTime } from '../util';
import { connect } from 'react-redux';
  const { Header } = Layout;
 function MyHeader(props) {
    const [collapsed, setcollapsed] = useState(false)
    const [sysTime, setsysTime] = useState('')
    const menu=(
      <Menu>
        <Menu.Item>
           {'孟宪磊'}
        </Menu.Item>
        <Menu.Item danger>
           {'退出'}
        </Menu.Item>
      </Menu>
    )
    /* ........................ */
     useEffect(() => {
      setInterval(() => {
      let sysTime=showTime()
      setsysTime(sysTime)
      }, 1000);
     }, [sysTime])
     
  return (
         <Header
          className="site-layout-background"
          style={{ padding: '0 10px' ,background:'#fff'}}
        >
         <Row style={{borderBottom:'1px solid yellow'}}>
          <Col span={4} style={{padding:'0 18px'}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setcollapsed(!collapsed),
          })}
          </Col>
          <Col span={20} style={{textAlign:'right',}}>
           <div style={{marginRight:'20px'}}>
           <span style={{marginRight:'10px'}}> 欢迎回来</span>
            <Dropdown overlay={menu}>
             <Avatar size="large" icon={<UserOutlined />} />
            </Dropdown>
            </div>
          </Col>
         </Row>
         <Row>
            <Col span={2} style={{textAlign:'center'}}>
              <span className='title
              '>{props.title}</span>
             <div className='sanjiao'></div>
            </Col>
            <Col span={22} style={{textAlign:'right',lineHeight:'43px'}} >
              {sysTime}{/* 时间 */}
            </Col>
           </Row>
        </Header>
  )
}
const mapStateToProps=(state)=>{
  return{
    title:state.Header.title
  }

}
export default connect(mapStateToProps,null)(MyHeader)