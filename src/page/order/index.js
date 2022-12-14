import React, { Component } from 'react'
import { Button, Card,Form,Select, Table,Modal,message,DatePicker } from 'antd';
import axios from 'axios';
import Baseform from '../../components/baseform';
import ETable from '../../components/ETable'
//import {updateSelectedItem} from '../../util/utils'
const FormItem = Form.Item;
const Option = Select.Option;

export default class index extends Component {
  state={
    // // selectedItem:[],//选中后的表格数据
    list:[],//表格数据
    orderConfirmVisble:false,
    orderInfo:{},//要删除的订单信息
    selectedRowKeys:0,//选中的索引
  
  }
  params = {
    page: 1
}
//给baseform传的属性
formList = [
  {
      type:'SELECT',
      label:'城市',
      field:'city',
      placeholder:'全部',
      initialValue:'1',
      width:80,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '北京' }, { id: '2', name: '天津' }, { id: '3', name: '上海' }]
  },
  {
      type: '时间查询'
  },
  {
      type: 'SELECT',
      label: '订单状态',
      field:'order_status',
      placeholder: '全部',
      initialValue: '1',
      width: 80,
      list: [{ id: '0', name: '全部' }, { id: '1', name: '进行中' }, { id: '2', name: '结束行程' }]
  }
]
  //订单详情
  openOrderDetail=()=>{
    let item=this.state.selectedItem;
    console.log(item);
    if(!item){
      Modal.info({
        title:'信息',
        content:'请选择一条订单进行结束'
      })
      return; //这里要return,不然还是原来的数据
    }
    // window.open(`/#/common/order/detail/${item.id}`,'_blank')
    this.props.history.push(`/common/order/detail/${item.id}`)
  }
  
  //结束订单详情页
  handleConfirm=()=>{
    let item=this.state.selectedItem;
    console.log(item);
    if(!item){
      Modal.info({
        title:'信息',
        content:'请选择一条订单进行结束'
      })
      return; //这里要return,不然还是原来的数据
    }
  axios({
    url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/order/ebike_info',
    data:{
      params:{
          orderId: item.id
      }
  }
  })
  .then(res=>{
    let result=res.data.result
    this.setState({
      orderConfirmVisble:true,
      orderInfo:result
    })
  })

  }
  componentDidMount(){
    this.requestList()
    console.log(this.props);
  }
//订单结束
 handleFinishOrder=()=>{
  axios({
    url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/order/finish_order',
    data:{
      params:1
    }
  })
  .then(res=>{
    console.log(res.data);
    if(res.data.code==='0'){
      message.success('订单结束成功')
      this.setState({
        orderConfirmVisble:false
      })
      this.requestList()//重新render
    }
  })
}
//封装的表格中的函数
 handleFilter=(params)=>{
  this.params = params;
  this.requestList();
 }
  //表格数据
  requestList=()=>{
    axios({
      url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/order/list',
      data:{
        params: this.params
      }
    })
    .then(res=>{
      console.log(res.data.result.item_list);
      let list=res.data.result.item_list
      this.setState({
        list
      })
    })
  }
  render() {

  //表格类型
//   const selectedRowKeys = this.state.selectedRowKeys;
//   const rowSelection={
//     type:'radio',
//     selectedRowKeys
//   }
//  const onRowClick=(record, index)=>{
//   console.log(record);
//   let selectKey=[index]//要加括号
//   this.setState({
//    selectedRowKeys:selectKey,
//    selectedItem: record//选中的信息
//   })
//  }
  
  
    const columns=[
      {
        title:"订单编号",
        dataIndex:'order_sn'
      },
      {
        title:'车辆编号',
        dataIndex:'bike_sn'
      },
      {
        title:"用户名",
        dataIndex: 'user_name'
      },
      {
        title: '手机号',
        dataIndex: 'mobile'
      },
      {
        title:'里程',
        dataIndex:'distance',
        render:(distance)=>{
          return distance/1000+'km'
        }
      },
      {
        title: '行驶时长',
        dataIndex: 'total_time'
    },
    {
        title: '状态',
        dataIndex: 'status'
    },
    {
        title: '开始时间',
        dataIndex: 'start_time'
    },
    {
        title: '结束时间',
        dataIndex: 'end_time'
    },
    {
        title: '订单金额',
        dataIndex: 'total_fee'
    },
    {
        title: '实付金额',
        dataIndex: 'user_pay'
    }
    ]
    //栅格布局
 const formItemLayout = {
        labelCol:{span:5},//左五右19
        wrapperCol:{span:19}
 }

 const updateSelectedItem=(selectedRowKeys,selectedItem,selectedIds)=>{
  if(selectedIds){//如果有selectedIds就是多选
    this.setState({
      selectedRowKeys, //选中的那一行的索引
      selectedItem,  //选中的那一行的值
      selectedIds
    })
  }else{
    this.setState({
      selectedRowKeys,  //选中的那一行
      selectedItem
    })
  }
}
    return (
      <div>
       {/*  <Card><FilterForm/></Card>  */}  {/* 组件在下方 */} 
  <Card><Baseform formList={this.formList} filterSubmit={this.handleFilter}/></Card>{/* 引入的封装后的表单 */} 
       <Card  style={{marginTop:10}}>
        <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
        <Button type='primary' style={{marginLeft:10}}  onClick={this.handleConfirm}>结束订单</Button>
        {/* <Table 
         dataSource={this.state.list} 
         columns={columns}
         pagination={{pageSize:5}} 
         rowSelection={rowSelection}
         onRow={(record, index) => {
          return {
              onClick: () => {
                  onRowClick(record, index);//选中的一行的数据和索引
              }
          };
      }}
         >
         </Table> */}

        <ETable 
        updateSelectedItem={updateSelectedItem}
        columns={columns}
        dataSource={this.state.list} 
        selectedRowKeys = {this.state.selectedRowKeys}//代表选中的这一行的索引
        selectedIds={this.state.selectedIds}
        selectedItem={this.state.selectedItem}
        pagination={{pageSize:5}}//页码
        
        
        />
       </Card>
       <Modal
       title="结束订单"
       visible={this.state.orderConfirmVisble}
       onCancel={()=>{
        this.setState({orderConfirmVisble:false})
       }}
       onOk={this.handleFinishOrder}
       >
        <Form layout="horizontal">{/* 垂直排列 */}
          <FormItem label='车辆编号' {...formItemLayout}>
          {this.state.orderInfo.bike_sn}
          </FormItem>
          <FormItem label='剩余电量' {...formItemLayout}>
           {this.state.orderInfo.battery+'%'}
          </FormItem>
          <FormItem label='形成开始时间' {...formItemLayout}>
           {this.state.orderInfo.start_time}
          </FormItem>
          <FormItem label='当前位置' {...formItemLayout}>
           {this.state.orderInfo.location}
          </FormItem>
        </Form>
       </Modal>
      </div>
    )
  }
}
class FilterForm extends Component {
  render() {
 const { getFieldDecorator } = this.props.form;
    return (
    <Form layout='inline'>
       <FormItem label='城市'>
        {
            getFieldDecorator('city_id')(
                <Select style={{width:100}} placeholder='全部'>
                <Option value='1'>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='1'>天津市</Option>
                <Option value='1'>深圳市</Option>
                </Select>
            )
        }
       </FormItem>
       <FormItem >
        {getFieldDecorator('start_time')(
            <DatePicker
            style={{ width: 100 }}
             placeholder='请选择开始时间'
              showTime
              format="YYYY-MM-DD HH:mm:ss"
            />
        )}
       </FormItem>
       <FormItem >
        {getFieldDecorator('end_time')(
           <DatePicker
           style={{ width: 30 }}
           placeholder='请选择结束时间'
            showTime
            format="YYYY-MM-DD HH:mm:ss"
          />

        )}
       </FormItem>
            <FormItem label="订单状态">
                {
                    getFieldDecorator('op_mode')(
                        <Select
                            style={{ width: 100 }}
                            placeholder="全部"
                        >
                            <Option value="">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">进行中(临时所测)</Option>
                            <Option value="2">形成结束</Option>
                        </Select>
                    )
                }
            </FormItem>
            <FormItem>
            <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
            <Button>重置</Button>
            </FormItem>
    </Form>
    )
  }
}
FilterForm = Form.create({})(FilterForm);