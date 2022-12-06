import { Row,Col } from 'antd'
import React, { Component } from 'react'
import axios from 'axios' //文件里面有index的情况不需要引index
import {formateDate} from '../../util/utils'/* 处理事件的函数 */
import './index.css'
export default class index extends Component {
  state={
    userName:'河畔一角',
    sysTime:'',
    weather:''
  }
  //..........................................
  componentDidMount(){
   const getWeatherAPIData=()=>{
    axios.get('https://devapi.qweather.com/v7/weather/now?location=101010100&key=13ce1a680faf4c0a866ac9846926042f')
    .then(res=>{
      console.log(res.data);
      let weather=res.data.now.text+'  '+res.data.now.windDir
      this.setState({
        weather:weather
      })
    })
   }
  
   getWeatherAPIData();
    }
  //.......................................
  render() {
    let{userName,sysTime,weather}=this.state

    setInterval(() => {
      let sysTime=formateDate(new Date().getTime())
      this.setState({sysTime})
    }, 1000);

    return (
      <div className="header">
        <Row className="header-top">
          <Col span='24'>
          <span>{userName}</span>
           <a href='/'>退出</a>
          </Col>
        </Row>
        <Row className='breadcrum'>
          <Col span='4' className='breadcrumb-title'>
            首页
          </Col>
          <Col span='20' className='weather'>
            <span className='date'>{sysTime}</span>
            <span className='weather-detail'>
             <span className='weather-detail'>
               {weather}
             </span>
            </span>
          </Col>
        </Row>
      </div>
    )
  }

}


  //   const getWeatherAPIData=()=>{
  //     // let city = '北京';
  //     // axios.jsonp({
  //     //     url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
  //     // }).then((res)=>{
  //     //     if(res.status === 'success'){
  //     //         let data = res.results[0].weather_data[0];
  //     //         this.setState({
  //     //             dayPictureUrl:data.dayPictureUrl,
  //     //             weather:data.weather
  //     //         })
  //     //     }
  //     // })
  //     axios.get()
  // }