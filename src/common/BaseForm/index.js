import { Button, DatePicker, Form, Input ,Select,Checkbox} from 'antd'
import FormItem from 'antd/es/form/FormItem'
import React, { useReducer } from 'react'
import {getOptionList} from '@/util'
export default function Index({formList,setValue}) {
    const myForm=useReducer()
    const initFormList=()=>{
     let NewDate=[]
      if(formList&&formList.length>0){
        formList.forEach(item=>{
        let{label, field, placeholder, initialValue, width, type, list}=item
        if(type==='时间查询'){
           let startTime= <FormItem label='订单时间' name={'start_time'}>
             <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择开始时间' style={{ width: width }}/>
            </FormItem>
           NewDate.push(startTime)
           let endTime=<FormItem label='~' name={'end_time'}>
             <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择结束时间' style={{ width: width }}/>
           </FormItem>
            NewDate.push(endTime)
        }else if(type==='INPUT'){
            let INPUT=<FormItem label={label} name={field} key={field} initialValue={initialValue}>
              <Input  type="text" placeholder={placeholder} style={{ width: width }}/>
            </FormItem>
            NewDate.push(INPUT)
        }else if(type==='SELECT'){
            let SELECT=<Form.Item label={label} name={field} key={field} initialValue={initialValue} >
            <Select placeholder={placeholder} style={{ width:width }}>
              {getOptionList(list)}
            </Select>
          </Form.Item>
           NewDate.push(SELECT)
        }else if(type==='CHECKBOX'){
            const CHECKBOX = <Form.Item label={label} name={field} valuePropName="checked"
            initialValue={initialValue}>
            <Checkbox>
              {label}
            </Checkbox>
          </Form.Item>
        NewDate.push(CHECKBOX)
        }else if(type==='DATE'){
            const DATE = <Form.Item label={label} key={field} name='日期'>
            <DatePicker format='YYYY-MM-DD HH:mm:ss' placeholder='选择结束时间' style={{ width: width }}/>
          </Form.Item>
          NewDate.push(DATE)
        }
        })
      }
      return NewDate
    }
    //...................
    //查询
    const handleFilterSubmit=()=>{
      let data=myForm.current.getFieldValue()
      setValue(data)
    }
    //重置
    const rest=()=>{
        myForm.current.resetFields()
    }
  return (
    <Form layout="inline"  ref={myForm}>
        {initFormList()}
        <FormItem>
            <Button type="primary" onClick={handleFilterSubmit}>查询</Button>
            <Button danger onClick={rest}>重置</Button>
        </FormItem>
    </Form>
  )
}
