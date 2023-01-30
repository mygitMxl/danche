import axios from '@/axios'
import React,{useEffect,useState,useRef} from 'react'
import { Button, Card, message, Modal,Form } from 'antd'
import BaseForm from '@/common/BaseForm'
import BaseTable from '@/common/BaseTable'
import {pagination} from '@/util'
import MyForm from './MyForm'
import { ExclamationCircleOutlined,} from '@ant-design/icons'
const { confirm } = Modal

export default function Index(props) {
  let params={page:1}
  const [dataSource,setdataSource] = useState([])
  const [isVisible , setisVisible ] = useState(false)
  const [paginations, setpaginations] = useState([])
  const [selectedIds, setselectedIds] = useState('')
  const [selectedItem, setselectedItem] = useState([])
  const [selectedRowKeys, setselectedRowKeys] = useState([])
  const [userinfo, setuserinfo] = useState([])
  const [type, settype] = useState('')
  const [title, settitle] = useState('')
  const formRef=useRef()
  //...............................................
  useEffect(() => {
    request()
  }, [])
  const request=()=>{
    axios.ajax({
      url:"user/list",
      data:{
        params:params
      }
    })
    .then(res=>{
       let data=res.data.result.item_list
       console.log(data);
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
      title:"id",
      dataIndex:"id"
     },
     {
      title:"用户名",
      dataIndex:'username'
     },
     {
      title:"性别",
      dataIndex:'sex',
      render:(sex)=>{
        return sex===1?"男":'女'
      }
     },
    {
      title:"状态",
      dataIndex:"state",
      render(state){
       let status={
        '1': '咸鱼一条',
        '2': '风华浪子',
        '3': '北大才子',
        '4': '百度FE',
        '5': '创业者'
       }
       return status[state]
      },
    },
    {
      title: "爱好",
      dataIndex: "interest",
      render:(interest)=>{
       let interests={
        '1': "跑步",
        '2': "跳舞",
        '3': "唱歌",
        '4': "打台球",
        '5': "打羽毛球",
        '6': "踢足球",
        '7': "爬山",
        '8': "骑行",
       }
       return interests[interest]
      }
    },
    {
      title:"婚否",
      dataIndex:'isMarried',
      render:(isMarried)=>{
        return isMarried==='1'? '是':'否'
      }
     },
     {
      title: "生日",
      dataIndex: "birthday"
     },
     {
      title: "联系地址",
      dataIndex: "address"
    },
    {
      title: "早起时间",
      dataIndex: "time"
    }
   ]
  //..............................
  //表单
  const formList=[
    {
      type:'INPUT',
      label:'用户名',
      field:'username',
      width:'120px',
      placeholder:"请输入用户名",
    },
    {
      type:'INPUT',
      label:'手机号',
      field:'phone',
      width:'120px',
      placeholder:"请输入手机号",
    },
    {
      type:'DATE',
      width:'130px',
      label:'请选择入职时期',
      field:'data1'
    }
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
  //员工操作按钮
  const handleOperate =(type)=>{
    let data=selectedRowKeys
    let item=selectedItem
    if(type==='create'){
      settype(type)
      settitle('创建员工')
      setisVisible(true)
      setuserinfo(item)
    }else if(type==='edit'){
       if(data.length===0){
        message.info('请选择一条订单')
       }else{
        settype(type)
        settitle('编辑员工')
        setisVisible(true)
        setuserinfo(item)
       }
    }else if(type==='detail'){
      if(data.length===0){
        message.info('请选择一条订单')
      }else{
        settype(type)
        settitle('员工详情')
        setisVisible(true)
        setuserinfo(item)
      }
    }else{
      if(data.length===0){
        message.info('请选择一条订单')
      }else{
        confirm({
          title: '您确定要删除吗',
          content:content(),
          icon: <ExclamationCircleOutlined />,
          onOk() {
              deleMethod(item)
              setselectedRowKeys([])
          },
          onCancel(){
            setselectedRowKeys([])
          }
      })
      }
    }
  }
/* ................. */
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
  let getSex={'1':'男','2':'女'}
  const getStat={
    '1':"咸鱼一条",
    '2':'风华浪子',
    '3':'北大才子一枚',
    '4':'百度FE',
    '5':'创业者'
}
  return(
    <Form {...formItemLayout}>
        <Form.Item label="用户名">
          {orderInfo.username}
        </Form.Item>
        <Form.Item label="性别">
          {getSex[orderInfo.sex]} 
        </Form.Item>
        <Form.Item label="生日">
          {orderInfo.birthday }
        </Form.Item> 
        <Form.Item label="状态">
          {getStat[orderInfo.state]}
        </Form.Item> 
        <Form.Item label="地址">
          {orderInfo.address}
        </Form.Item>
      </Form>
    
  )
}
//结束确认
const deleMethod=(item)=>{
  axios.ajax({
    url:'/user/delete',
    data:{
      params:{
        orderId:item.id
      }
    }
  })
setselectedRowKeys([])
}

  //确认按钮
  const handleOk=(item)=>{
      let getDate=formRef.current.getFieldValue()
     axios.ajax({
      url:type==='create'?'/user/add':'/user/edit',
      data:{
      params:getDate
      }
     }).then(res=>{
      if(res.data.code=='0'){
        setisVisible(false)
      }
     })
      request()
    
  }
  //取消按钮
  const handelCancle=()=>{
      formRef.current.resetFields()
      setisVisible(false);
      setselectedRowKeys([])
      setuserinfo([])
    }
    //........
    let footer={}
if(type==='detail'){
  footer={
    footer:null
  }
}
  return (
    <div>
       <Card>
        <BaseForm formList={formList} setValue={(value)=>{setFormListValue(value)}}/>
       </Card>
       <Card>
        <Button type='primary' onClick={()=>{handleOperate('create')}} style={{marginRight:'10px'}}>创建员工</Button>
        <Button type='primary' onClick={()=>{handleOperate('edit')}} style={{marginRight:'10px'}}>编辑员工</Button>
        <Button type='primary' onClick={()=>{handleOperate('detail')}} style={{marginRight:'10px'}}>员工详情</Button>
        <Button type='primary' onClick={()=>{handleOperate('clear')}}>删除员工</Button>
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
       <Modal
        title={title}
        onCancel={handelCancle}
        onOk={handleOk}
        open={isVisible}
        {...footer}
       >
        <MyForm type={type} ref={formRef} selectedItem={userinfo} title={title}/>
       </Modal>
    </div>
  )
}
