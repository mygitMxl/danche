import axios from '@/axios'
import React,{useEffect,useState,useRef} from 'react'
import { Button, Card, Modal } from 'antd'
import BaseForm from '@/common/BaseForm'
import BaseTable from '@/common/BaseTable'
import AddCity from './AddCity'
import {pagination} from '@/util'
export default function Index() {
  let params={page:1}
  const [dataSource,setdataSource] = useState([])
  const [isVisible , setisVisible ] = useState(false)
  const [paginations, setpaginations] = useState([])
  //...............................................
  const addFrom = useRef()
  useEffect(() => {
    request()
  }, [])
  const request=()=>{
    axios.ajax({
      url:"/open_city",
      data:{
        params:params
      }
    })
    .then(res=>{
       let data=res.data.result.item_list
       setdataSource(data)
       setpaginations(
        pagination(res.data,current=>{
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
      title:'城市ID',
      dataIndex:'id'
    },
    {
      title:'城市名称',
      dataIndex:'name'
    },
    {
      title:'用车模式',
      dataIndex:'op_mode',
      render(op_mode){
        return op_mode===1? '自营' : '加盟'
      }
    },
    {
      title:"授权加盟商",
      dataIndex:"franchisee_name"
    },
    {
      title:'城市管理员',
      dataIndex:"city_admins",
      render(city_admins){
      return  city_admins.map(item=>{
          return item.user_name
        }).join(',')
      }
    },
    {
      title:"城市开通时间",
      dataIndex:"open_time"
    },{
      title:"操作时间",
      dataIndex:"update_time"
    },{
      title:"操作人",
      dataIndex:"sys_user_name"
    }
   ]
  //..............................
  //表单
  const formList=[
    {
      type:'SELECT',
      label:'城市',
      field:'city',
      width:'100px',
      placeholder:"全部",
      initialValue:'1',
      list:[{id:'1',name:'全部'},{id:"2",name:'北京'},{id:"3",name:'天津'},{id:"4",name:'上海'}]

    },
    {
      type:'SELECT',
      label:'用车模式',
      field:'UsecarOne',
      width:'100px',
      placeholder:"全部",
      initialValue:'1',
      list:[{id:'1',name:'全部'},{id:'2',name:'指定停车点模式'},{id:'3',name:'禁停区模式'}]

    },
    {
      type:'SELECT',
      label:'经营模式',
      field:'jingying',
      width:'100px',
      placeholder:"全部",
      initialValue:'1',
      list:[{id:'1',name:'全部'},{id:'2',name:'自营'},{id:'3',name:'加盟'}]
    },
    {
      type:"SELECT",
      field:'jingyingStatus',
      placeholder:"全部",
      label:'加盟商授权状态',
      initialValue:'1',
      width:'100px',
      list:[{id:'1',name:'全部'},{id:'2',name:'已授权'},{id:'3',name:'未授权'}]
      }
  ]
  /* .................. */
  //表单的回调
  const setFormListValue=(data)=>{
    params=data
    request()
  }
  /* ................ */
  //开通城市
  const addCity =()=>{
    setisVisible(true)
  }
  /* ................. */
  //添加城市提交按钮
  const handleSubmit=()=>{
    console.log(addFrom.current.getFieldValue());
    let data=addFrom.current.getFieldValue()
    params=data
    request()
    setisVisible(false)
  }
  return (
    <div>
       <Card>
        <BaseForm formList={formList} setValue={(value)=>{setFormListValue(value)}}/>
       </Card>
       <Card>
        <Button type='primary' onClick={addCity}>开通城市</Button>
       </Card>
       <Card>
         <BaseTable dataSource={dataSource} columns={columns} rowSelection={null} rowkey={(item)=>item.id}  pagination={paginations}/>
       </Card>
       <Modal
       title='添加城市'
       onOk={handleSubmit}
       onCancel={()=>{setisVisible(false)}}
       open={isVisible}
       >
         <AddCity ref={addFrom}/> 
       </Modal>
    </div>
  )
}
