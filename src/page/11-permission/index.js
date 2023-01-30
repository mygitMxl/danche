import axios from '@/axios'
import React,{useEffect,useState,useRef} from 'react'
import { Button, Card, message, Modal,Form } from 'antd'
import BaseForm from '@/common/BaseForm'
import BaseTable from '@/common/BaseTable'
import {pagination} from '@/util'
import { ExclamationCircleOutlined,} from '@ant-design/icons'
import { Link } from 'react-router-dom'
const { confirm } = Modal
export default function Index(props) {
  let params={page:3}
  const [dataSource,setdataSource] = useState([])
  const [isVisible , setisVisible ] = useState(false)
  const [paginations, setpaginations] = useState([])
  const [selectedIds, setselectedIds] = useState('')
  const [selectedItem, setselectedItem] = useState([])
  const [selectedRowKeys, setselectedRowKeys] = useState('')
  //...............................................
  useEffect(() => {
    request()
  }, [])
  const request=()=>{
    axios.ajax({
      url:"/order/list",
      data:{
        params:params
      }
    })
    .then(res=>{
       let data=res.data.result.item_list
       data.forEach((item,index)=>{
        item.key=index
       })
       setdataSource(data)
       setpaginations(
        pagination(res.data,current=>{
          console.log(current);
          params.page = current;
          request()
         })
       )
     
    })
  }
  //..............................
   /* 表格 */
   const columns=[
    {
      title:"订单编号",
    dataIndex:"order_sn"
    },
    {
      title:"车辆编号",
      dataIndex:"bike_sn"
    },
    {
      title:"用户名",
      dataIndex:"user_name",
    },
    {
      title:"手机号",
      dataIndex:"mobile"
    },
    {
      title:"里程",
      dataIndex:"distance",
      render:(distance)=>{
      return distance/1000+'km'
      }
    },
    {
      title:"行驶时长",
      dataIndex: "total_time"
    },{
      title:"状态",
      dataIndex:"status",
      render:(status)=>{
        return status==='1'?'进行中':"结束行程"
      } 
    },{
      title:"开始时间",
      dataIndex:"start_time"
    },{
      title:"结束时间",
      dataIndex:"end_time"
    },{
      title: '订单金额',
      dataIndex: "total_fee"
    }, {
      title: '实付金额',
      dataIndex: "user_pay"
    }
   ]
  //..............................
  //表单
  const formList=[
    {
      type:'SELECT',
      label:'城市',
      field:'cityTwo',
      width:'100px',
      placeholder:"全部",
      initialValue:'1',
      list:[{id:'1',name:'全部'},{id:"2",name:'北京'},{id:"3",name:'天津'},{id:"4",name:'上海'}]
    },
    {
      type:'时间查询',
      width:'100px',
      field:'1'
    },
    {
      type:'SELECT',
      label:'订单状态',
      field:'order_status',
      width:'100px',
      placeholder:"进行中",
      initialValue:'1',
      list:[{  id:'0', name:'全部'},{ id:'1', name:'进行中'},{id:'2', name:'结束行程'}]
    },
  ]
  /* .................. */
  const updateSelectedItem=(selectedRowKeys,selectedItem,selectedIds)=>{
    if(selectedIds){//如果有selectedIds就是多选
      setselectedRowKeys(selectedRowKeys)
      setselectedItem(selectedItem)
      setselectedIds(selectedIds)
    }else{
      setselectedRowKeys(selectedRowKeys)
      setselectedItem(selectedItem)
    //选中的那一行
    }
  }
  /* .................. */
  //表单的回调
  const setFormListValue=(data)=>{
    params=data
    request()
  }
  /* ................ */
  //订单详情
  const order_select =()=>{
    let item = selectedRowKeys;
     let data= selectedItem;
    console.log(item);
    if(!item){
      message.info({
        content:'请选择一条订单'
      })
    }else{
     window.open(`/#/detail/${data.id}`)
    }
  }
  /* ................. */
  //结束订单
  const end_order=()=>{
    let data=selectedRowKeys
    let item=selectedItem
    if(!data||data===[]){
      message.info({
        content:'请选择一条订单'
      })
    }else{
      confirm({
        title: '您确定要删除吗',
        content:content(),
        icon: <ExclamationCircleOutlined />,
        onOk() {
            deleMethod(item)
            setselectedRowKeys([])
        }
    })
    }
  }
  //结束的信息
  const formItemLayout={
    labelCol:{
      span:5
    },
    wrapperCol:{
      span:10
    }
  }
  const content=()=>{
    let orderInfo=selectedItem
    console.log(orderInfo);
    return(
      <Form {...formItemLayout}>
          <Form.Item label="车辆编号">
            {orderInfo.bike_sn}
          </Form.Item>
          <Form.Item label="用户名">
            {orderInfo.user_name} 
          </Form.Item>
          <Form.Item label="行程开始时间">
            {orderInfo.end_time }
          </Form.Item> 
          <Form.Item label="结束时间">
            {orderInfo.start_time}
          </Form.Item>
        </Form>
      
    )
  }
  //结束确认
  const deleMethod=(item)=>{
    axios.ajax({
      url:'/order/ebike_info',
      data:{
        params:{
          orderId:item.id
        }
      }
    })
  setselectedRowKeys([])
  request()
  }
  return (
    <div>
       <Card>
        <BaseForm formList={formList} setValue={(value)=>{setFormListValue(value)}}/>
       </Card>
       <Card>
        <Button type='primary' onClick={order_select} style={{marginRight:'10px'}}>订单查询</Button>
        <Button type='primary' onClick={end_order}>结束订单</Button>
       </Card>
       <Card>
         <BaseTable
         updateSelectedItem={updateSelectedItem}
         dataSource={dataSource} 
         columns={columns} 
         pagination={paginations}
         selectedRowKeys = {selectedRowKeys}
         selectedIds={selectedIds}
         selectedItem={selectedItem}
         />
       </Card>
    </div>
  )
}
