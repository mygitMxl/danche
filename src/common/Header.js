import React,{useState} from 'react'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
  } from '@ant-design/icons'
  import { Layout, Dropdown,Menu ,Avatar} from 'antd';
  const { Header } = Layout;
export default function MyHeader() {
    const [collapsed, setcollapsed] = useState(false)
  return (
         <Header
          className="site-layout-background"
          style={{ padding: '0 10px' ,background:'#fff'}}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setcollapsed(!collapsed),
          })}
          123
        </Header>
  )
}
