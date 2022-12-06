import { Card,Form ,Input,Button,Icon,Checkbox,message} from 'antd'
import React, { Component } from 'react'
const FormItem = Form.Item;
 class login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        let userInfo=this.props.form.getFieldsValue()//获取一组输入控件的值
        this.props.form.validateFields((err, values) => {//校验并获取一组输入域的值与 Error
          if (!err) {/* 全部都匹配成功的话 */
          message.success(`${userInfo.username} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.userpwd}`)
          }
        });
      };
  render() {
    const { getFieldDecorator } = this.props.form;
   
    return (
      <div>
        <Card title='登录行内表单'>
        <Form layout="inline">{/*layout表单布局*/}
          <FormItem>
              <Input placeholder="请输入用户名"/>
          </FormItem>
          <FormItem>
              <Input placeholder="请输入密码" />
          </FormItem>
          <FormItem>
              <Button type="primary">登录</Button>
          </FormItem>
        </Form>
        </Card>
        {/* ................................................... */}
        <Card title='登录水平表单' style={{marginTop:10}}>
           <Form style={{width:300}}>
           <FormItem>
          {getFieldDecorator('username', {
            initialValue:'tom',//初始化值
            rules: [//规则
                {required: true, message: '用户名不能为空'},
                {min:5,max:10,message:'长度不在范围内'},
                {  pattern:new RegExp('^\\w+$','g'),message:'用户名必须为字母或者数字'}//required正则校验
            ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </FormItem>

        <FormItem>
        {getFieldDecorator('userpwd', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </FormItem>

        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">Forgot password</a><br/>
          <Button type="primary" style={{width:300,textAlign:'center'}} onClick={this.handleSubmit}>登录</Button>
        </Form.Item>
        
           </Form>
        </Card>
      </div>
    )
  }
} 
export default Form.create()(login);/* 这里要创建表单在可以使用 */