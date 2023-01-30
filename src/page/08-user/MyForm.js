import React, { forwardRef, useRef,useImperativeHandle } from 'react'
import { Button, Card, Form, Modal,Input, Radio, Select ,DatePicker} from 'antd'
import FormItem from 'antd/es/form/FormItem'
import moment from 'moment'
const { Option } = Select;
const { TextArea } = Input;

const MyForm = forwardRef((props, ref) => {
    const formItemLayout={
        labelCol:{
          span: 5
        },
        wrapperCol:{
          span:19
        }
      }
    const formRef=useRef()
    let{type,title}=props
   const selectedItem=props.selectedItem||{}
    const getStat={
        '1':"咸鱼一条",
        '2':'风华浪子',
        '3':'北大才子一枚',
        '4':'百度FE',
        '5':'创业者'
    }
    const getSex={'1':'男','2':'女'}

    //....................
    useImperativeHandle(ref,()=>({
        resetFields:()=>{
           return formRef.current.resetFields()
        },
        getFieldValue:()=>{
         return  formRef.current.getFieldValue()
        },
    }))
     console.log(type);
    return (
        <div>
     <Form  {...formItemLayout} ref={formRef}>
       <FormItem  label={'用户名'} name='userName' initialValue={selectedItem.username}>
         {
            selectedItem&&type==='detail'?selectedItem.username:
            <Input placeholder='请输入姓名'/>
         }
       </FormItem>

       <FormItem  label={'性别'} name='sex'  initialValue={getSex[selectedItem.sex]}>
        {
             selectedItem&&type==='detail'?getSex[selectedItem.sex]:
           <Radio.Group>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
           </Radio.Group>
         }
       </FormItem>

       <FormItem  label={'状态'} name='state'  initialValue={selectedItem.state}>
        {
             selectedItem&&type==='detail'?getStat[selectedItem.state]:
            <Select>
            <Option value={1}>咸鱼一条</Option>
            <Option value={2}>风华浪子</Option>
            <Option value={3}>北大才子</Option>
            <Option value={4}>百度FE</Option>
            <Option value={5}>创业者</Option>
           </Select>
         }
       </FormItem>

       <FormItem label='生日' name='birthday' initialValue={moment(selectedItem.birthDate)}>
       {
          selectedItem&&type==='detail'?selectedItem.birthday:
           <DatePicker/>          
         }
       </FormItem>

       <FormItem label='地址' name='address' initialValue={selectedItem.address}>
      { selectedItem&&type==='detail'? selectedItem.address:
          <TextArea rows={3} placeholder="请输入联系地址" />
      }
    </FormItem>


     </Form>
        </div>
    )
})

export default MyForm