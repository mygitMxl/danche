//轮播组件
import React, { Component } from 'react'
import { Card,Carousel } from 'antd'
export default class carousel extends Component {
  render() {
    return (
      <div>
        <Card title='文字背景轮播' className='card-wrap'>
        <Carousel autoplay effect="fade">{/* autoplay自动播放  */}
         <div><h3>Ant Motion Banner - React</h3></div>
         <div><h3>Ant Motion Banner - Vue</h3></div>
         <div><h3>Ant Motion Banner - Angular</h3></div>
        </Carousel>
        </Card>
        {/* ////////////////////////////////////////////////////////// */}
        <Card title='图片轮播' className='card-wrap'>
        <Carousel autoplay  effect="fade" >{/* autoplay自动播放  */}
        <div>{/* 图片放在 publick 里面相当于有根路径 */}
         <img src="/carousel-img/carousel-1.jpg" alt=""/>
        </div>
        <div>
         <img src="/carousel-img/carousel-2.jpg" alt="" />
        </div>
        <div>
        <img src="/carousel-img/carousel-3.jpg" alt="" />
        </div>
        </Carousel>
        </Card>
      </div>
    )
  }
}
