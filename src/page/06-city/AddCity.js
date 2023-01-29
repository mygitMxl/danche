import React, { forwardRef, useRef } from 'react'
import { Form, Select } from 'antd'
const { Option } = Select;
 const AddCity= forwardRef((pros,ref)=>{
    const formItemLayout={
        labelCol:{
          span:5
        },
        wrapperCol:{
          span:10
        }
      }
    return (
        <div>
            <Form  {...formItemLayout} ref={ref} >
                <Form.Item label='选择城市' name='city_id' initialValue={'1'}>
                    <Select>
                        <Option value='0'>全部</Option>
                        <Option value="1">北京市</Option>
                        <Option value="2">天津市</Option>
                    </Select>
                </Form.Item>
                <Form.Item label='运营模式' name='op_mode' initialValue={1}>
                    <Select>
                        <Option value="0">全部</Option>
                        <Option value="1">自营</Option>
                        <Option value="2">加盟</Option>
                    </Select>
                </Form.Item>
                <Form.Item label="用车模式" name="use_mode" initialValue="1">
                    <Select>
                        <Option value="0">全部</Option>
                        <Option value="1">指定停车点</Option>
                        <Option value="2">禁停区</Option>
                    </Select>
                </Form.Item>
            </Form>
        </div>
    )
}) 
export default AddCity