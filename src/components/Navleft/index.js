import React, { Component } from 'react'
import { Menu} from 'antd';
import './style/index.css'
import MenuConfig from './../../config/menuConfig'
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
export default class index extends Component {
  state={
    menuTreeNode:[]
  }
  componentDidMount(){
    const menuTreeNode=this.renderMeny(MenuConfig)
    this.setState({menuTreeNode})
  }
  renderMeny=(data)=>{
    return data.map((item)=>{
      if(item.children){/* 如果数据里后孩子就接着遍历 */
          return (
              <SubMenu title={item.title} key={item.key}>
                  { this.renderMeny(item.children)}
              </SubMenu>
          )
      }
      return <Menu.Item title={item.title} key={item.key}>
          {/* <NavLink to={item.key}>{item.title}</NavLink> */}
        <Link to={item.key}>{item.title}</Link>
      </Menu.Item>
  })
  
  }
  render() {
    return (
      <div>
       <div className="logo">
        <img src='./logo512.png' alt=""/>
        <h1>单车管理系统</h1>
        </div>
      <Menu theme='dark'>{/* 主题颜色 */}
       {this.state.menuTreeNode}
    </Menu>
      </div>
    )
  }
}
