
import { Button, Card,Form,Input,Modal,Select, Transfer, Tree } from 'antd'
import axios from 'axios'
import React, { Component } from 'react'
import ETable from '../../components/ETable'
import { formateDate} from '../../util/utils'
import menuConfig from '../../config/menuConfig'//菜单数据
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class index extends Component { 
  state={
    list:[],
    isRoleVisible:false,
    isPermVisible:false,
    isUserVisable:false,
    detailInfo:[]
  }

   componentDidMount(){
    this.requestList()
    
   }
   //表格数据
    requestList=()=>{
        axios.get('https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/role/list')
        .then(res=>{
            console.log(res.data);
            this.setState({
                list:res.data.result.item_list
            })
        })
    }
 //..........
 //创建角色按钮
 handleCreateRole=()=>{
this.setState({isRoleVisible:true})
 }
 //角色提交
 handleRoleSubmit=()=>{
  let data =this.roleForm.props.form.getFieldsValue()/* 获取表单中的内容 */
  axios({
    url:"https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/role/create",
    data:{
      params:{...data}
    }
  }).then(res=>{
   if(res.data.code==='0'){
    this.setState({
      isRoleVisible:false
   })
    }
    this.requestList();
  })
 }
 //........
 //设置权限按钮
 handlePermission=()=>{
  let item=this.state.selectedItem
  if(!item){
     Modal.info({
       title:'信息',
       content:"请选择一个角色"
     })
    return
  }
  this.setState({
    isPermVisible:true,
    detailInfo:item,/* 菜单数据 */
    menuInfo:item.menus/* 权限 */
   })
 }
 //权限提交
 handlePermEditSubmit=()=>{
  let data = this.roleForm.props.form.getFieldsValue();
  data.role_id=this.state.selectedItem.id
  data.menus=this.state.menuInfo
  axios({
    url:"https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/permission/edit",
    data:{
      params:{...data}
    }
  }).then(res=>{
    if(res){
      this.setState({
        isPermVisible:false
    })
    this.requestList();
    }
  })
 }
 //.....................................
 //用户授权按钮
 handleUserAuth=()=>{
  let data =this.state.selectedItem
  if(!data){
    Modal.info({
      title:'信息',
      content:'未选中任何项目'
    })
    return
  }
  this.setState({isUserVisable:true,detailInfo:data})
  this.getRoleUserList(data.id)/* 获取选中那一行的id */
 }
 getRoleUserList=(id)=>{
  axios({/* 通过id获取数据 */
    url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/role/user_list',
    data:{
      params:{
        id:id
      }
    }
  }).then(res=>{
    console.log(res.data.result);
    this.getAuthUserList(res.data.result)
  })
 }
 //筛选目标用户
 getAuthUserList=(dataSource)=>{
  const mockData=[];
  const targetKeys=[]//目标用户
  if(dataSource&&dataSource.length>0){
    for(let i=0;i<dataSource.length;i++){
        const data={
          key:dataSource[i].user_id,
          title:dataSource[i].user_name,
          status: dataSource[i].status
        } 
        if(data.status===1){
          targetKeys.push(data.key)/* 显示在右侧框数据的 key 集合 */
        }
        mockData.push(data)
    }
  }
  this.setState({
    mockData,targetKeys
  })
 }
 //用户授权提交
 handleUserSubmit=()=>{
  let data={}
  data.user_ids=this.state.targetKeys
  data.role_id=this.state.selectedItem.id
  axios({
    url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/role/user_role_edit',
    data:{
      params:{...data}
    }
  }).then(res=>{
    if(res){
      this.setState({
        isUserVisable:false
      })
      this.requestList();
  }
  })
 }
  render() {
    //................
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
      //colums
      const columns=[
        {
            title:"角色中心",
            dataIndex:'id'
        },
        {
            title:'角色名称',
            dataIndex:"role_name"
        },
        {
           title:'创建时间',
           dataIndex:'create_time',
           render(create_time){
            return formateDate(new Date(create_time))
           }
        },
        {
            title:'使用状态',
            dataIndex:'status',
            render(status){
                return status===1? '启用':'停用'
            }
        },
        {
            title:"授权时间",
            dataIndex:'authorize_time',
            render(authorize_time){
                return formateDate(new Date(authorize_time))
            }
        },
        {
            title: "授权人",
            dataIndex: 'authorize_user_name'
        }
    ]

    return (
      <div>
        <Card>
            <Button type='primary' onClick={this.handleCreateRole}>创建角色</Button>
            <Button type="primary" style={{ margin: '0 10px' }} onClick={this.handlePermission}>设置权限</Button>
            <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
        </Card>
        <ETable
          updateSelectedItem={updateSelectedItem}
          columns={columns}
          dataSource={this.state.list} 
          selectedRowKeys = {this.state.selectedRowKeys}//代表选中的这一行的索引
          selectedIds={this.state.selectedIds}
          selectedItem={this.state.selectedItem}
          pagination={{pageSize:5}}//页码
        />

        {/* 创建角色model*/}
        <Modal
         title='创建角色'
         visible={this.state.isRoleVisible}
         onOk={this.handleRoleSubmit}
         onCancel={()=>{
         this.roleForm.props.form.resetFields();//清空内容
         this.setState({isRoleVisible:false, selectedRowKeys: []})
         }}
        >
        <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst }/>{/* 存储着表单里的内容 */}
        </Modal>
        {/* 。。。。。。。。。。。 。。。。。。。。。。。。。。。。 */}
        {/* 设置权限 */}
        <Modal 
         title='权限设置'
         visible={this.state.isPermVisible}
         width={600}
         onOk={this.handlePermEditSubmit}
         onCancel={()=>{
          this.setState({isPermVisible:false})
         }}
        >
          <PermEditForm 
           detailInfo={this.state.detailInfo}/* 详情信息 */
           wrappedComponentRef={(inst) => this.roleForm = inst }//表单信息
           patchMenuInfo={(checkedKeys)=>{
             this.setState({
              menuInfo:checkedKeys
             })
           }}
           menuInfo={this.state.menuInfo}
          />
        </Modal>
       {/* 用户授权 */}
       <Modal 
       title='用户授权'
       visible={this.state.isUserVisable}
       width={800}
       onOk={this.handleUserSubmit}
       onCancel={()=>{
        this.setState({
          isUserVisable:false
        })
       }}
       >
      <RoleAuthForm 
      detailInfo={this.state.detailInfo}
      mockData={this.state.mockData}
      targetKeys={this.state.targetKeys}//目标角色
      patchUserInfo={(targetKeys)=>{this.setState({targetKeys})}}/* 修改目标角色 */
      />
       </Modal>
      </div>
    )
  }
}
//角色创建
class RoleForm extends React.Component{
  render(){
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
          labelCol: {span: 5},
          wrapperCol: {span: 16}
      };
      return (
          <Form layout="horizontal">
              <FormItem label="角色名称" {...formItemLayout}>
                  {
                      getFieldDecorator('role_name',{
                          initialValue:''
                      })(
                          <Input type="text" placeholder="请输入角色名称"/>
                      )
                  }
              </FormItem>
              <FormItem label="状态" {...formItemLayout}>
                  {
                      getFieldDecorator('state',{
                          initialValue:1
                      })(
                      <Select>
                          <Option value={1}>开启</Option>
                          <Option value={0}>关闭</Option>
                      </Select>
                  )}
              </FormItem>
          </Form>
      );
  }
}
RoleForm = Form.create({})(RoleForm)
/* 。。。。。。。。。。。。。。。。。。。。。。。 */
//权限设置
class PermEditForm extends React.Component{
  state={}
  renderTreeNodes = (data,key='') => {
    return data.map((item) => {
        let parentKey = key+item.key;
        if (item.children) {
            return (
                <TreeNode title={item.title} key={parentKey} dataRef={item} className="op-role-tree">
                    {this.renderTreeNodes(item.children,parentKey)}
                </TreeNode>
            );
        } 
        return <TreeNode {...item} />;
    });
};
//权限
onCheck=(checkedKeys)=>{
  this.props.patchMenuInfo(checkedKeys)
  }
//。。。。。。。。。。。。。。。。。。
  componentDidMount(){
    console.log(this.props.detailInfo);
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
        labelCol: {span: 5},
        wrapperCol: {span: 18}
    };
    const detail_info=this.props.detailInfo
    const menuInfo=this.props.menuInfo
    return(
      <Form layout="horizontal">
        <FormItem label='角色名称' {...formItemLayout}>
         <Input disabled placeholder={detail_info.role_name}/>
        </FormItem>

        <FormItem label="状态：" {...formItemLayout}>
                    {getFieldDecorator('status',{
                        initialValue: '1'
                    })(
                        <Select style={{ width: 80}}
                                placeholder="启用"
                        >
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>this.onCheck(checkedKeys)}/* onCheck点击复选框触发,发生更改后,调用父组件传过来的回调函数,将更改的值当作实参传过去,从而更改menuInfo */
                    checkedKeys={menuInfo}/* 默认的权限 */
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
      </Form>
    )
  }
}
PermEditForm=Form.create({})(PermEditForm)
/* 。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 */
/* 角色授权 */
class RoleAuthForm extends React.Component{
  //过滤数据
  filterOption=(inputValue,option)=>{
  return option.title.indexOf(inputValue)>1//antd直接复制的
  }
  handleChange=(targetKeys)=>{/*targetKeys是你选中的按钮  */
    this.props.patchUserInfo(targetKeys);//更新target
  }
  render(){
   const formItemLayout={
     labelCol:{span:5},
     wrapperCol:{span:18}
    }
    let detailInfo=this.props.detailInfo
    return(
     <Form layout="horizontal" >
       <FormItem label='角色名称' {...formItemLayout}>
        <Input disabled maxLength={8} placeholder={detailInfo.role_name}/>
       </FormItem>
       <FormItem label='选择用户' {...formItemLayout}>
        <Transfer
          listStyle={{width: 200,height: 400}}
          dataSource={this.props.mockData}/* 所有数据 */
          showSearch//搜索
          title={['待选用户','已选用户']}
          searchPlaceholder='输入用户名'
          filterOption={this.filterOption}//数据过滤
          targetKeys={this.props.targetKeys}//目标数据
          render={item=>item.title}/* 需要render进行渲染 */
          onChange={this.handleChange}
        />
       </FormItem>
     </Form>
    )
  }
}
RoleAuthForm=Form.create({})(RoleAuthForm)