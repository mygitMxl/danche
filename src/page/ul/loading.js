import React, { Component } from 'react'
import { Card, Spin, Icon, Alert} from  'antd'
export default class loading extends Component {
  render() {
    const icon = <Icon type="loading" style={{fontSize:24}}/>
    return (
      <div>
        <Card title='spin用法' className='card-wrap'>
        <Spin size="small" />
        <Spin style={{margin:'0 10px'}}/>
        <Spin size="large"/>
        <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true}/>{/*  */}
        </Card>
        {/* //////////////////////////////////////////////////// */}
        <Card title='内容遮罩' className='card-wrap'>
        <Alert
         message="React"
         description="欢迎来到React高级实战课程"
         type="info"
         style={{ marginBottom: 10 }}
        />
        <Spin>
          <Alert
              message="React"
              description="欢迎来到React高级实战课程"
              type="warning"
              style={{ marginBottom: 10 }}
          />
        </Spin>
        <Spin tip="加载中...">{/* tip 当作为包裹元素时，可以自定义描述文案 */}
         <Alert
             message="React"
             description="欢迎来到React高级实战课程"
             type="warning"
             style={{ marginBottom: 10 }}
         />
        </Spin>
        <Spin  indicator={icon} tip='请稍后'>{/* 加载指示符 */}
        <Alert
            message="React"
            description="欢迎来到React高级实战课程"
            type="warning"
          />
        </Spin>
        </Card>
      </div>
    )
  }
}
