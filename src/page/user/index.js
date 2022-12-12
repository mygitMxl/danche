import React, { Component } from 'react'
import { Card, Button, Modal, Form, Input, Radio, Select, DatePicker } from 'antd';
import Baseform from '../../components/baseform'
import ETable from '../../components/ETable'
import axios from 'axios';
import Moment from 'moment'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
export default class index extends Component {
    state={
        list:[],
        isVisible:false,
        title:''
    }
    params={
        page:1
    }
    //表单数据
    formList=[
        {
            type:'INPUT',
            label:'用户名',
            field:"user_name",
            placeholder:"请输入用户名",
            width:'120',
        },
        {
           type:'INPUT',
           label:'手机号',
           field:'user_mobile',
           placeholder:'请输入手机号',
           width:120
        },
        {
            type:'DATE',
            label:'请选择入职日期',
            field:'user_date',
            placeholder:'请选择结束日期',
            width:140
        }
    ]
    //表单查询来自ETable
    handleFilter=(params)=>{/* 形参是表单里的数据 */
     this.params=params
     this.requestList()
    }
    //员工按钮操作
    handdleOperate=(type)=>{
    let item = this.state.selectedItem;
       if(type==='create'){
        this.setState({
            type,
            title:"创建员工",
            isVisible:true
        })
       }else if(type==='edit'){
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return
            }
            this.setState({
                type,
                title: "编辑员工",
                isVisible: true,
                userInfo: item
            })
        }else if(type==='detail'){
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                  })
                  return
            }
            this.setState({
                type,
                title: "员工详情",
                isVisible: true,
                userInfo: item
            })

        }else{
            if(!item){
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                  })
                  return
            }
            Modal.confirm({
                title:"确认删除",
                content:'是否要删除当前选中的员工',
                onOk:()=>{
                    axios({
                        url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/user/delete',
                        data:{
                            params:{
                                id:item.id
                            }
                        }
                    }).then(res=>{
                        this.setState({
                            isVisible:false,
                            selectedRowKeys:[]//选中的索引表格变为空
                        })
                        this.requestList();//重新render
                    })
                }
            })
        }
       }
       //创建和编辑员工提交按钮
       handleSubmit=()=>{
         let type=this.state.type
         let data = this.userForm.props.form.getFieldsValue();/* 拿到表单中的数据 */
         axios({
            url:type==='create'?' https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/user/add':'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/user/edit',
            data:{
                params:{
                    ...data
                }
            }
         }).then(res=>{
            this.setState({
                isVisible:false
            })
            this.requestList()
         })
       }
       //表格的数据
    requestList=()=>{
        axios({
            url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/user/list',
            data:{
                params: this.params
              }
        }).then(res=>{
            console.log(res.data.result.item_list);
            this.setState({
                list:res.data.result.item_list
            })
        })
    }
    componentDidMount(){
        this.requestList()
    }
  render() {
    const { dataSource, pagination, title, isVisible, selectedItem, selectedRowKeys,type } = this.state;
      //.......................................
      //表格的选中
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
      //表格的columns
      const columns=[
        {
            title:"id",
            dataIndex:"id"
        },
        {
            title:"用户名",
            dataIndex:"username"
        },
        {
            title:"性别",
            dataIndex:'sex',
            render:(sex)=>{
             return sex===1?'男':'女'
            }
        },
        {
            title: "状态",
            dataIndex: "state",
            render:(state)=>{
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子',
                    '4': '百度FE',
                    '5': '创业者'
                  }
                return config[state]
            }
        },
        {
      title: "爱好",
      dataIndex: "interest",
      render(interest) {
        return {
          '1': "跑步",
          '2': "跳舞",
          '3': "唱歌",
          '4': "打台球",
          '5': "打羽毛球",
          '6': "踢足球",
          '7': "爬山",
          '8': "骑行",
        }[interest]
      }
        },
        {
            title: "婚否",
            dataIndex: "isMarried",
            render(isMarried) {
              return isMarried === 1 ? "是" : "否"
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
      //详情按钮不需要footer
     let footer={}
     if(type==='detail'){
        footer={
            footer:null
        }
     }
    return (
      <div>
        <Card><Baseform formList={this.formList} filterSubmit={this.handleFilter}/></Card>
        <Card style={{ marginTop: 10 }} className='operate-wrap'>
            <Button type="primary" icon="plus" onClick={() => { this.handdleOperate('create') }}>创建员工</Button>
            <Button type="primary" icon="edit" onClick={() => { this.handdleOperate('edit') }}>编辑员工</Button>
            <Button type="primary" onClick={() => { this.handdleOperate('detail') }}>员工详情</Button>
            <Button type="primary" icon="delete" onClick={() => { this.handdleOperate('delete') }}>删除员工</Button>
        </Card>

        <div className="content-wrap">
        <ETable 
        updateSelectedItem={updateSelectedItem}
        columns={columns}
        dataSource={this.state.list} 
        selectedRowKeys = {this.state.selectedRowKeys}//代表选中的这一行的索引
        selectedIds={this.state.selectedIds}
        selectedItem={this.state.selectedItem}
        pagination={{pageSize:5}}//页码
        />
        </div>
       
       <Modal 
       title={title}
       visible={isVisible}
       onCancel={()=>{
        // this.userForm.userForm.resetFields();
        this.setState({ isVisible: false})
       }}
       onOk={this.handleSubmit}
        {...footer}/* 详情页不需要 确定取消,这里用解构的方式 */
       >
        <UserForm 
        type={this.state.type}
        userInfo={this.state.userInfo}/* 选中表格的那一行数据 */
        wrappedComponentRef={(inst) => this.userForm = inst}/* 将表格中的数据存储进来 */
        />
       </Modal>
      </div>
    )
  }
}
class UserForm extends React.Component{

    getState = (state)=>{
        return {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'北大才子一枚',
            '4':'百度FE',
            '5':'创业者'
        }[state]
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };
        const userInfo = this.props.userInfo || {};
        const type = this.props.type;
        return (
            <Form layout="horizontal">
                <FormItem label="姓名" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.username:
                        getFieldDecorator('user_name',{
                            initialValue:userInfo.username/* 默认值 */
                        })(
                            <Input type="text" placeholder="请输入姓名"/>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.sex===1?'男':'女':
                        getFieldDecorator('sex',{
                            initialValue:userInfo.sex
                        })(
                        <RadioGroup>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?this.getState(userInfo.state):
                        getFieldDecorator('state',{
                            initialValue:userInfo.state/* 默认值 */
                        })(
                        <Select>
                            <Option value={1}>咸鱼一条</Option>
                            <Option value={2}>风华浪子</Option>
                            <Option value={3}>北大才子一枚</Option>
                            <Option value={4}>百度FE</Option>
                            <Option value={5}>创业者</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.birthday:
                        getFieldDecorator('birthday',{
                            initialValue:Moment(userInfo.birthday)
                        })(
                        <DatePicker />
                    )}
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type==='detail'?userInfo.address:
                        getFieldDecorator('address',{
                            initialValue:userInfo.address
                        })(
                        <Input.TextArea rows={3} placeholder="请输入联系地址"/>
                    )}
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);