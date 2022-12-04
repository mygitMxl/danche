import { Card,Button,message} from 'antd'
import React, { Component } from 'react'

export default class messages extends Component {
  render() {
  const showMessage=(type)=>{
    message[type]('恭喜你,React课程晋级成功')
    }
    return (
      <div>
        <Card title='全局提示框' className='card-wrap'>
        <Button type="primary" onClick={()=>showMessage('success')}>Success</Button>
        <Button type="primary" onClick={()=>showMessage('info')}>Info</Button>
        <Button type="primary" onClick={()=>showMessage('warning')}>Warning</Button>
        <Button type="primary" onClick={()=>showMessage('error')}>Error</Button>
        <Button type="primary" onClick={()=>showMessage('loading')}>Loading</Button>
        </Card>
      </div>
    )
  }
}
