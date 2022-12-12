import React, { Component } from 'react'
import { Card, Form } from 'antd'
import Baseform from '../../components/baseform'
import axios from 'axios'
export default class bikeMap extends Component {
  state={
    total_count:''
  }
  map={}
  params={
    page:1
  }
    formList=[
        {
          type:'city', 
        },
        {
            type:'时间查询'
        },
        {
            type:'SELECT',
            label:'订单状态',
            field:'order_statu',
            placeholder:"全部",
            initialValue: '0',
            width: 100,
            list: [{id: '0', name: '全部'}, {id: '1', name: '进行中'}, {id: '3', name: '行程结束'}]
        }

    ]
    //..................................
    //渲染地图
    renderMap=(res)=>{
      let list = res.data.result.route_list;
      this.map = new window.BMapGL.Map("container");//创建一个地图
      this.map.enableScrollWheelZoom(true);//设置可缩放
      let gps1 = list[0].split(",");//起点
      let gps2 = list[list.length-1].split(",");//终点
      let startPoint = new window.BMapGL.Point(gps1[0],gps1[1]);//起点坐标
      let endPoint = new window.BMapGL.Point(gps2[0],gps2[1]);//终点坐标
      this.map.centerAndZoom(endPoint,11);//以终点为中心点
      //车辆起点图片
      let startPointIcon = new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36,42),{//前两个参数是开辟的空间大小，
        imageSize:new window.BMapGL.Size(36,42),//图片大小
        anchor:new window.BMapGL.Size(18,42)
      })
      let startMarker = new window.BMapGL.Marker(startPoint,{icon:startPointIcon});  
      this.map.addOverlay(startMarker);//需要放进Marker中生效,再放进addOverlay中生效
      //车辆终点图片
      let endPointIcon = new window.BMapGL.Icon("/assets/end_point.png",new window.BMapGL.Size(36,42),{
        imageSize:new window.BMapGL.Size(36,42),
        anchor:new window.BMapGL.Size(18,42)//坐标偏移,微调
      })
      let endMarker = new window.BMapGL.Marker(endPoint,{icon:endPointIcon});
      this.map.addOverlay(endMarker);

      //绘制车辆信息路线
      let routeList=[]
      list.forEach(item=>{
        let p=item.split(',')//将list 的数据遍历后,用逗号分割成数组
        console.log(p);
        routeList.push(new window.BMapGL.Point(p[0],p[1]));//第一个是经度第二个是纬度
      })
      //画线
      let Polyline = new window.BMapGL.Polyline(routeList,{//将坐标信息传过来
        strokeColor:'#ef4136',//颜色
        strokeWeight:2//粗细
      })
      this.map.addOverlay(Polyline);

      //绘制服务区
      let servicePointList  = [];
      let serviceList=res.data.result.service_list;
      serviceList.map(item=>{
        servicePointList.push(new window.BMapGL.Point(item.lon,item.lat));//第一个参数x轴 第二个参数y 轴
        return servicePointList
      })
      //开始绘制
      let polygon = new window.BMapGL.Polygon(servicePointList, {//Polygon多边形
        strokeColor: "#CE0000",
        strokeWeight: 3,
        fillColor:"#ff8605",
        fillOpacity:0.4
      });
      this.map.addOverlay(polygon);

      //添加自行车图标
      let  bikeList = res.data.result.bike_list;
      let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg",new window.BMapGL.Size(20,20),{//宽20高42
        imageSize:new window.BMapGL.Size(20,42),
        anchor:new window.BMapGL.Size(36,42)
      })
      bikeList.forEach(item=>{
        let p =item.split(',')
        let point = new window.BMapGL.Point(p[0],p[1]);
        let bikeMarker = new window.BMapGL.Marker(point,{icon:bikeIcon})
        this.map.addOverlay(bikeMarker);
      })
    }






















    //表单查询的回调
    handleFilterSubmit=(filterParams)=>{
     this.params=filterParams
     this.requestList()//调函数
    }
   //请求数据
   requestList=()=>{
   axios({
    url:'https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/map/bike_list',
    data:{
      params:this.params
    }
   }).then(res=>{
    console.log(res.data);
      this.setState({
        total_count:res.data.result.total_count
      },()=>{
     
      })
      this.renderMap(res)
   })
  
   }
   //
   componentDidMount(){
    this.requestList()
   }
  render() {
    // let {}=this.state
    return (
      <div>
        <Card><Baseform formList={this.formList}  filterSubmit={this.handleFilterSubmit}/></Card>
        <Card style={{marginTop:10}}>
        <div>共{this.state.total_count}辆车</div>
          <div id='container' style={{height:500}}></div>
        </Card>
      </div>
    )
  }
}
