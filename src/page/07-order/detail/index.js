import { Col, Row } from 'antd'
import axios from '../../../axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './style/index.less'
export default function Index(props) {
  const [info, setinfo] = useState([])
  const back=useRef()
  useEffect(() => {
    const id = props.match.params.id
    if (id) {
      getDetailInfo(id)
    }
  }, [])

  const getDetailInfo = (id) => {
    axios.ajax({
      url: '/order/detail',
      data: {
        params: {
          orderId: id
        }
      }
    })
      .then(res => {
        setinfo(res.data.result)
        console.log(res.data.result);
        renderMap(res.data.result)
      })
  }

  //.................................
  let map={}
  const renderMap=(result)=>{
   //创建Map实例
   map=new window.BMapGL.Map('orderDetailMap')
   //初始化地图,设置中心点坐标和地图级别
   map.centerAndZoom(new window.BMapGL.Point(116,404,39.915),11)
   //开启鼠标滚轮缩放
   map.enableScrollWheelZoom(true);
    // 调用地图控件添加方法
    addMapControl()
     // 调用绘制服务区方法
    drawBikeRoute(  result.position_list);
      // 调用绘制用户行驶路线方法
    drawServiceArea( result.area);
  }
  //添加地图控件
   const addMapControl=()=>{
    map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    map.addControl(new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
   }
   //绘制服务区
   const drawServiceArea=(positionList)=>{
    let maps=map
    let trackPoint=[]
    for (let i=0;i<positionList.length;i++){
      let point=positionList[i]
      trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
    }
    let polyline=new window.BMapGL.Polygon(trackPoint,{//Polygon:多边形
      strokeColor: 'green',//线的颜色
      strokeWeight: 4,//线宽度
      strokeOpacity: 1,//线透明度
      fillColor: '#7CFC00',//填充色
      fillOpacity:0.4//填充色透明度
    })
    maps.addOverlay(polyline)
   }
   //绘制路线
   const drawBikeRoute=(positionList)=>{
    let maps=map
    if(positionList.length>0){
      //开始绘制起点
      let first = positionList[0];//设置起点的参数
      let startPoint=new window.BMapGL.Point(first.lon,first.lat)
      let startIcon=new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36, 42),{
        imageSize: new window.BMapGL.Size(36, 42),//图片大小
        anchor: new window.BMapGL.Size(18, 42)//坐标偏移,微调
      })
      let startMarker = new window.BMapGL.Marker(startPoint, { icon: startIcon });
      maps.addOverlay(startMarker)
      //开始绘制终点
      let last = positionList[positionList.length - 1]//设置终点的参数
      let endPoint=new window.BMapGL.Point(last.lon,last.lat) 
      maps.centerAndZoom(endPoint, 11);//将终点作为区域的中♥点
      let endIcon =new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36,42),{
        imageSize:new window.BMapGL.Size(36,42),
        anchor:new window.BMapGL.Size(18,42)
      })
      let endMarker=new window.BMapGL.Marker(endPoint,{ icon: endIcon})
      maps.addOverlay(endMarker)
    }  
    //开始连线
    let trackPoint=[]
     for(let i=0;i<positionList.length;i++){
       let point=positionList[i]
       trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
       //开始划线
       let polyline=new window.BMapGL.Polyline(trackPoint,{
        strokeColor: "#1869AD",//路线颜色
        strokeWeight: 3,//线的宽度
        strokeOpacity: 1//透明度
       })
       maps.addOverlay(polyline)
     }
   };
  //..................
   window.onscroll=function(){
      if(window.scrollY>=400){
        back.current.style.display='block'
      }else{
        back.current.style.display='none'
      }
   }
  return (
    <>
      <Row className='Head'>
        <Col span={6}>
          <span className='titles'>
            广鸣车行后台管理系统
          </span>
        </Col>
        <Col span={18} style={{ textAlign: 'right' }}>
          欢迎 孟宪磊 <span style={{ color: 'red' }}>退出</span>
        </Col>
      </Row>
      <div className='Wraper'>
        <div id="orderDetailMap" className="order-map"></div>{/* 这里是地图, id="orderDetailMap */}
        <div className="detail-items">
          <div className='item-title'>基础信息</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">用车模式</div>
              <div className="detail-form-content">{info.mode === 1 ? '服务区' : '停车点'}</div>
            </li>
            <li>
              <div className="detail-form-left">订单编号</div>
              <div className="detail-form-content">{info.order_sn}</div>
            </li>
            <li>
              <div className="detail-form-left">车辆编号</div>
              <div className="detail-form-content">{info.order_sn}</div>
            </li>
            <li>
              <div className="detail-form-left">用户姓名</div>
              <div className="detail-form-content">{info.user_name}</div>
            </li>
            <li>
              <div className="detail-form-left">手机号码</div>
              <div className="detail-form-content">{info.mobile}</div>
            </li>
          </ul>
        </div>

        {/* 、。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。。 */}
        <div className='detail-items'>
          <div className="item-title">行驶轨迹</div>
          <ul className="detail-form">
            <li>
              <div className="detail-form-left">行程起点</div>
              <div className='detail-form-content'>{info.start_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行程终点</div>
              <div className='detail-form-content'>{info.end_location}</div>
            </li>
            <li>
              <div className="detail-form-left">行驶里程</div>
              <div className='detail-form-content'>{info.distance / 1000}</div>
            </li>
          </ul>
        </div>
      </div>
       <div className='backHome' id='scroll' ref={back}>
       <Link to={'/order'}><div className='center'>回主页</div></Link>
       </div>
    </>
  )

}
