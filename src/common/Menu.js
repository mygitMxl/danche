import React,{useState} from 'react'
import { Layout, Menu } from 'antd';
import menuList from './mock/menuConfig';
import './style/Layout.less'
import {
  UserOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link, withRouter } from 'react-router-dom';
import './style/logo.css'
const { Sider } = Layout;
 function MYMenu(props) {
    const renderMenu=(menuList)=>{
       return menuList.map(item=>{
        if(item.children){
          return(
            <SubMenu title={item.title} key={item.key}>
              {renderMenu(item.children)}
            </SubMenu>
          )
        }
         return <Menu.Item title={item.title} key={item.key}>
            <Link to={item.key}>{item.title}</Link>
         </Menu.Item>
       })
    }
  const selectKeys=[props.location.pathname]
  const defaultOpenKeys=['/'+props.location.pathname.split('/')[1]]
  console.log(props);
  return (
      <Sider trigger={null} collapsible>
         <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}> 
         <div className="logo">广鸣车行后台管理系统</div>
        <div style={{overflow:'auto'}}>
         <Menu theme='dark' mode='inline' selectedKeys={selectKeys} defaultOpenKeys={defaultOpenKeys}>
          {renderMenu(menuList)}
         </Menu>
        </div>
        </div>
      </Sider>
  )
}
export default withRouter(MYMenu)