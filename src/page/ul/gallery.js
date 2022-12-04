//对话框
import React, { Component } from 'react'
import {Card,Row,Col,Modal} from 'antd'

export default class gallery extends Component {
    state={
        visable:false,
        currentImg:''
    }
  render() {
    const imgs = [
        ['1.png', '2.png', '3.png', '4.png', '5.png'],
        ['6.png', '7.png', '8.png', '9.png', '10.png'],
        ['11.png', '12.png', '13.png', '14.png', '15.png'],
        ['16.png', '17.png', '18.png', '19.png', '20.png'],
        ['21.png', '22.png', '23.png', '24.png', '25.png']
    ]
    const openGallery=(imgSrc)=>{
      this.setState({
        visable:true,
        currentImg:'/gallery/'+imgSrc
      })
    }
    const imgList = imgs.map((list) => list.map((item) => /* 这里除了要遍历一维数组,还要再遍历二维数组 */
    <Card
        style={{marginBottom:10}}
        cover={<img src={'/gallery/'+item} onClick={()=>openGallery(item)} alt=''/>}/* 这里的图片放在了public所以是根路径 */
    >
        <Card.Meta
            title="React Admin"
            description="I Love Imooc"
        />
    </Card>
))
    return (
      <div>
        <div className='card-wrap'>
            <Row gutter={10}>{/* 边距,上下左右是5 */}
                <Col md={5}>
                    {imgList[0]}
                </Col>
                <Col md={5}>
                    {imgList[1]}
                </Col>
                <Col md={5}>
                     {imgList[2]}   
                </Col>
                <Col md={5}>
                     {imgList[3]}   
                </Col>
                <Col md={4}>
                     {imgList[4]}
                </Col>
            </Row>
            <Modal
                    width={300}
                    height={500}
                    visible={this.state.visable}/* 开关 */
                    title="图片画廊"
                    onCancel={()=>{
                        this.setState({
                            visable:false
                        })
                    }}
                    footer={null}
                >
                   {<img src={this.state.currentImg} alt="" style={{width:'100%'}}/>}
                </Modal>
        </div>
      </div>
    )
  }
}
