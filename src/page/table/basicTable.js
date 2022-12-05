import React, { Component } from 'react'
import { Card, Table, Modal, Button, message,} from 'antd';
//import pagination from '../../util/utils'
import axios from 'axios';
export default class basicTable extends Component {
  state={
    // dataSource:[],
    dataSource2:[],
    loading:true,
    // selectedRowKeys:[],
    // selectedItem:[],
    // selectedRows:[],

  }
  params = {
    page:1
  }

  componentDidMount(){
    const data = [
      {
        id: '0',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'BOb',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'lucy',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      }
    ]
    data.map((item,index)=>/* 动态获取key值 */
        item.key=index
    )
    this.setState({
      dataSource: data
    })
    this.request()
  }

  //动态获取mock数据
   request=()=>{
    let _this = this;
    axios.get('https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/table/list',{
      params:{page:this.params.page}
    })
    .then(res=>{
      console.log(res.data.result);
      res.data.result.list.map((item,index)=>
         item.key=index
      )
       this.setState({
       dataSource2:res.data.result.list,
       loading:false,
       selectedRowKeys:[],/* 点击删除后的操作 */
       selectedRows:null,
      //  pagination:pagination(res,(current)=>{
      //   _this.params.page=current;
      //   this.request()
      //  })
       })
    })
   }
 
  /* ....................................................... */

  render() {
    const columns = [
      {
          title:'id',
          key:'id',
          dataIndex:'id'
      },
      {
          title: '用户名',
          key: 'userName',
          dataIndex: 'userName'
      },
      {
          title: '性别',
          key: 'sex',
          dataIndex: 'sex',
          render(sex){
              return sex ===1 ?'男':'女'
          }
      },
      {
          title: '状态',
          key: 'state',
          dataIndex: 'state',
          render(state){
              let config  = {
                  '1':'咸鱼一条',
                  '2':'风华浪子',
                  '3':'北大才子',
                  '4':'百度FE',
                  '5':'创业者'
              }
              return config[state];
          }
      },
      {
          title: '爱好',
          key: 'interest',
          dataIndex: 'interest',
          render(abc) {
              let config = {
                  '1': '游泳',
                  '2': '打篮球',
                  '3': '踢足球',
                  '4': '跑步',
                  '5': '爬山',
                  '6': '骑行',
                  '7': '桌球',
                  '8': '麦霸'
              }
              return config[abc];
          }
      },
      {
          title: '生日',
          key: 'birthday',
          dataIndex: 'birthday'
      },
      {
          title: '地址',
          key: 'address',
          dataIndex: 'address'
      },
      {
          title: '早起时间',
          key: 'time',
          dataIndex: 'time'
      }
  ]
  //............................................
  //单选
  const {selectedRowKeys}=this.state
  const rowSelection={
    type:'radio',
    selectedRowKeys//代表选中按钮,告诉按钮选中了哪些key值
  }
  //获得点击的用户信息
  const onRowClick=(record,index)=>{//record是我们点击的数据,用户的一些数据
    let selectKey=[index]//这里需要将索引赋值给变量
    Modal.info({
      title:'用户信息',
      content:`用户名:${record.userName},用户爱好:${record.interest}`
    })
    this.setState({
      selectedRowKeys:selectKey,
      selectedItem:record
    })
  }
  
  //..........................................
  //多选
  const rowCheckSelection={
    type:"checkox",
    selectedRowKeys,
    onChange:(selectedRowKeys,selectedRows)=>{
     this.setState({
      selectedRowKeys,
      selectedRows,//表格内信息
     })
    }
  }
  //删除
  const handleDelete=()=>{
   let {selectedRows}=this.state
   let ids=[]
   selectedRows.map(item=>
    ids.push(item.id)
    )
    Modal.confirm({
       title:'删除提示',
       content:`您确定删除这些数据吗？${ids}`,
       onOk:()=>{
        message.success('删除成功');
        this.request()//重新render相当于,重新动态获取数据
       }
    })
  }
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered//边框
            columns={columns}
            dataSource={this.state.dataSource}
            pagination={false}//分页
          />
        </Card>
        {/* ................................................ */}
        <Card title="动态表格" style={{ marginTop: "10px" }}>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            pagination={{pageSize:5}}//pagination  分页关闭
            loading={this.state.loading}
          />
        </Card>
        {/* ................................................ */}
        {/* 单选按钮 */}
        <Card title="Mock-单选" className='card-wrap'>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={{pageSize:5}}
            rowSelection={rowSelection}  //单选多选
            onRow={(record,index) => {//record是当前行的用户信息,index是索引,onRow设置行属性
              return {
                onClick: ()=>{
                  onRowClick(record,index)
                }
              };
            }}
          />
        </Card>
        {/* ............................................................. */}
        {/* 多选按钮 */}
        <Card title="Mock-多选删除" style={{ margin: '10px 0' }}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            pagination={{pageSize:5}}
            dataSource={this.state.dataSource2}
          />
        </Card>
        {/* ................................................. */}
        <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={this.state.pagination}
                    />
                </Card>
      </div>
    )
  }
}
