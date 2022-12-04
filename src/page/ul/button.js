//按钮组件
import React, { Component } from 'react'
import { Card,Button,Radio } from 'antd'
import './style/ui.css'
export default class button extends Component {
  state={
    loading:true,
    size:'default'
  }
  render() {
    let{loading}=this.state
   const handleCloseLoading=()=>{
      this.setState({
        loading:false
      })
    }
    const handleChange=(e)=>{
      this.setState({
        size:e.target.value
      })

    }
    return (
      <div>
        <Card title="基础按钮" className='card-wrap'>
          <Button type='primary'>Imooc</Button>
          <Button>Imooc</Button>
          <Button type='dashed'>Imooc</Button>
          <Button type='danger'>Imooc</Button>
          <Button disabled>Imooc</Button>
        </Card>
        {/* //////////////////////////////////////////////////// */}
        <Card title="图形按钮" className='card-wrap'>
          <Button icon='plus'>创建</Button>
          <Button icon='edit'>编辑</Button>
          <Button type='delete'>删除</Button>
          <Button  shape='circle' icon='search'>原框</Button>
          <Button type='primary' icon='search' >搜索</Button>
          <Button type='primary' icon='dowload'>下载</Button>
        </Card>
        {/* ////////////////////////////////////////////////////// */}
        <Card title="Loading按钮" className='card-wrap'>
          <Button icon='primary' loading={loading}>确定</Button>
          <Button icon='primary' shape='circle' loading={loading}></Button>
          <Button loading={loading}>点击加载</Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={handleCloseLoading}>关闭</Button>
        </Card>
        {/* /////////////////////////////////////////////////////// */}
        <Card title="按钮组" style={{marginBottom:10}}>
         <Button.Group>
           <Button type="primary" icon="left">返回</Button>
           <Button type="primary" icon="right">前进</Button>
          </Button.Group>
          </Card>
          {/* ///////////////////////////////////////////////////////// */}
          <Card title="按钮尺寸" className="card-wrap">
             <Radio.Group value={this.state.size} onChange={handleChange}>
                <Radio value="small">小</Radio>
                <Radio value="default">中</Radio>
                <Radio value="large">大</Radio>
              </Radio.Group> 
               <Button type="primary" size={this.state.size}>Imooc</Button>
               <Button size={this.state.size}>Imooc</Button>
               <Button type="dashed" size={this.state.size}>Imooc</Button>
               <Button type="danger" size={this.state.size}>Imooc</Button>
          </Card>
      </div>
    )
  }
}
