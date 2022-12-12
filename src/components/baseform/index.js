
import React, { Component } from 'react'
import { Input,Select,Form, Button, Checkbox, Radio, DatePicker} from 'antd'
import {getOptionList} from '../../util/utils'
const FormItem = Form.Item;
const Option = Select.Option

 class FilterForm extends Component {
    componentDidMount(){
        console.log(this.props);
    }
    initFormList=()=>{
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList=[]
        if(formList&&formList.length>0){
            formList.forEach((item,index)=>{
              console.log(item);
               let lable=item.lable;
               let field=item.field;
               let initialValue = item.initialValue || '';
               let placeholder = item.placeholder;
               let width = item.width;
               if(item.type==='时间查询'){
                const begin_time=<FormItem label='订单时间' key={field}>{/* 动态创建出来的子组件 需要key值 */}
                   {getFieldDecorator('begin_time')(
                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                   )}
                </FormItem>
                formItemList.push(begin_time)
               const end_time=<FormItem label='~' colon={false} key={field}>
                 {getFieldDecorator('end_time')(
                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                   )}
               </FormItem>
               formItemList.push(end_time)
               }else if(item.type==='INPUT'){
                const INPUT=<FormItem label={lable} key={field}>
                  {getFieldDecorator([field],{
                     initialValue: initialValue
                  })}
                  <Input type={'text'} placeholder={placeholder}></Input>
                </FormItem>
                formItemList.push(INPUT)
               }else if(item.type==='SELECT'){
                const SELECT=<FormItem label={lable} key={field}>
                 {getFieldDecorator([field],{
                    initialValue: initialValue
                 })(
                  <Select style={{width:width}} placeholder={placeholder}>
                    {getOptionList(item.list)}
                  </Select>
                 )
                 }
                </FormItem>
                formItemList.push(SELECT)
               }else if(item.type==='CHECKBOX'){
                 const CHECKBOX=<FormItem label='lable' key={field}>
                 {getFieldDecorator([field],{
                  valuePropName: 'checked',
                  initialValue: initialValue 
                 })(
                  <Checkbox>
                    {lable}
                  </Checkbox>
                 )}
                 </FormItem>
                  formItemList.push(CHECKBOX)
               }
            })
        }
        return formItemList
    }
    //查询表单
    handleFilterSubmit=()=>{
  let fieldsValue = this.props.form.getFieldsValue();//获取表单里的值
  this.props.filterSubmit(fieldsValue);//调用父组件传来的函数,并把值传过去
    }
    //重置
    reset=()=>{
      this.props.form.resetFields();
    }

  render() {
    return (
      <div>
        <Form layout="inline">
                { this.initFormList() }
                <FormItem>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
      </div>
    )
  }
  
}
export default Form.create({})(FilterForm)