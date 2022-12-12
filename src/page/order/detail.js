import React, { Component } from 'react'
import {Card} from 'antd'
import './style/detail.css'
import  '../../style/common.css'
import axios from 'axios';
export default class Order extends Component {
  state={}
  componentDidMount(){
    console.log(this.props);
    let orderId=this.props.match.params.orderId
     if(orderId){
      this.getDetailInfo(orderId)
     }
  }
  //一进页面就获取数据
  getDetailInfo=(orderId)=>{
  axios({
    url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/order/detail',
    data:{
      params:{
        orderId:orderId
      }
    }
  }).then(res=>{
    console.log(res.data);
    let results=res.data.result
    this.setState({
      orderInfo:results//orderInfo是数组
    })
    this.renderMap(results)//调用下面的函数
  })
  }
  //地图(地图的js文件,已经在public引入了)
   renderMap=(results)=>{
    //创建Map实例
    this.map = new window.BMapGL.Map("orderDetailMap");
    // 初始化地图,设置中心点坐标和地图级别
    this.map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11);
    // 开启鼠标滚轮缩放
    this.map.enableScrollWheelZoom(true);
    // 添加地图控件
    this.addMapControl()
    //调用路线图绘制方法
    this.drawBikeRoute(results.position_list);
    // 调用服务区绘制方
    this.drwaServiceArea(results.area);
    }
    //添加地图控件
    addMapControl=()=>{
      let map=this.map
      map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT}));
      map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    }
    //绘制用户的行驶路线
    drawBikeRoute=(positionList)=>{
      let map=this.map
      let startPoint=''//起始坐标点,
      let endPoint=''//终止坐标点
       if(positionList>0){
        let first =positionList[0]//起始
        let last=positionList[positionList.length-1];//结束
        startPoint = new window.BMap.Point(first.lon,first.lat);//添加一个坐标点
        let startIcon = new window.BMap.Icon('/public/assets/bike.jpg',new window.BMap.Size(36,42),{//设置起始点的图标,以及空间大小
          imageSize:new window.BMap.Size(36,42),//空间里,图片大小
          anchor: new window.BMap.Size(18, 42)//空间里,停靠位置
        })
        //Icon不能直接添加到坐标点,需要依赖Marker
        let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon});
        this.map.addOverlay(startMarker);//这样就完成了一个起始坐标点
        //添加结束坐标及Icon
        endPoint = new window.BMapGL.Point(last.lon, last.lat);
       let endIcon = new window.BMapGL.Icon('/public/assets/bike.jpg', new window.BMapGL.Size(36, 42), {
        imageSize: new window.BMapGL.Size(36, 42),
        anchor: new window.BMapGL.Size(36, 42)
      });
      let endMarker = new window.BMapGL.Marker(endPoint, { icon: endIcon });
      map.addOverlay(endMarker);
      // 连接路线图
      let trackPoint = [];
      for(let i=0;i<positionList.length;i++){//遍历orderInfo中的positionList数据
          let point = positionList[i];
          trackPoint.push(new window.BMap.Point(point.lon, point.lat));//lon经度,lat纬度
      }
      let polyline = new window.BMap.Polyline(trackPoint,{//根据trackPoint中的坐标绘制路路线
          strokeColor:'#1869AD',//路线颜色
          strokeWeight:3,//线的宽度
          strokeOpacity:1//透明度
      })
      this.map.addOverlay(polyline);//路线需要放在addOverlay中生效
      this.map.centerAndZoom(endPoint, 11);//将重点作为区域的中♥点
      }
       }
     
      // 绘制服务区
      drwaServiceArea = (positionList)=>{
        // 连接路线图
        let trackPoint = [];
        for (let i = 0; i < positionList.length; i++) {
            let point = positionList[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat));
        }
        // 绘制服务区
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity:0.4
        })
        this.map.addOverlay(polygon);
    }

  render() {
    const info =this.state.orderInfo||{}
    return (
      <div>
     <div className='Wraper'>{/* 父盒子 */}
     <Card>
     <div id="orderDetailMap" className="order-map"></div>
     <div className="detail-items">
      <div className='item-title'>基础信息</div>
      <ul className="detail-form">
        <li>
          <div className="detail-form-left">用车模式</div>
          <div  className="detail-form-content">{info.mode===1?'服务区':'停车点'}</div>
        </li>
        <li>
          <div className="detail-form-left">订单编号</div>
          <div  className="detail-form-content">{info.order_sn}</div>
        </li>
        <li>
          <div className="detail-form-left">车辆编号</div>
          <div  className="detail-form-content">{info.order_sn}</div>
        </li>
        <li>
          <div className="detail-form-left">用户姓名</div>
          <div  className="detail-form-content">{info.user_name}</div>
        </li>
        <li>
          <div className="detail-form-left">手机号码</div>
          <div  className="detail-form-content">{info.mobile}</div>
        </li>
      </ul>
     </div>
    {/* 。。。。。。。。。。。。。。。。。。。。。。。。 */}
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
          <div className='detail-form-content'>{info.distance/1000}</div>
        </li>
       </ul>
     </div>
     </Card>
       




























        </div>
      </div>
    )
  }
}
