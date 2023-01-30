import axios from '@/axios'
import React,{useEffect,useState,useRef} from 'react'
import { Button, Card, Modal } from 'antd'
import BaseForm from '@/common/BaseForm'
import {pagination} from '@/util'
export default function Index() {
  let params={page:1}
  const [total_count, settotal_count] = useState('')
  
  //...............................................
  useEffect(() => {
    request()
  }, [])
  const request=()=>{
    axios.ajax({
      url:"/map/bike_list",
      data:{
        params:params
      }
    })
    .then(res=>{
      console.log(res.data);
       settotal_count(res.data.result.total_count)
       renderMap(res.data.result);
    })
  }
  //..............................
  //地图
  let map={}
  const renderMap=(results)=>{
    console.log(results);
    //创建一个地图
    map = new window.BMapGL.Map("orderDetailMap");
     // 初始化地图,设置中心点坐标和地图级别
    map.centerAndZoom(new window.BMapGL.Point(116.404, 39.915), 11)
    //设置可缩放
    map.enableScrollWheelZoom(true)
    // 调用地图控件添加方法
    addMapControl()
    //绘制用户路线
    drawBikeRoute(results.route_list)
    //绘制服务区
    drawServiceArea(results.service_list)
    ///添加自行车图标
    setBikeIcon(results.bike_list)
  }
// 添加地图控件
   const addMapControl = () => {
     map.addControl(new window.BMapGL.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
     map.addControl(new window.BMapGL.ZoomControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
}
  
   //绘制用户行走路线
    const drawBikeRoute=(list)=>{
      console.log(list);
      let maps=map
      if(list.length>0){
        //开始绘制起点
        let first=list[0].split(',')
         let startPoint=new window.BMapGL.Point(first[0],first[1])
         let startIcon=new window.BMapGL.Icon('/assets/start_point.png',new window.BMapGL.Size(36, 42),{
          imageSize:new window.BMapGL.Size(36,42),//图片大小
          anchor:new window.BMapGL.Size(18,42)
         })
         let startMarker=new window.BMapGL.Marker(startPoint,{icon: startIcon})
         maps.addOverlay(startMarker);//需要放进Marker中生效,再放进addOverlay中生效

        //开始绘制终点
        let last=list[list.length-1].split(',')
        console.log(last);
        let lastPoint=new window.BMapGL.Point(last[0],last[1])
        let lastIcon=new window.BMapGL.Icon('/assets/end_point.png',new window.BMapGL.Size(36, 42),{
         imageSize:new window.BMapGL.Size(36,42),//图片大小
         anchor:new window.BMapGL.Size(18,42)
        })
        let lastMarker=new window.BMapGL.Marker(lastPoint,{icon: lastIcon})
        maps.addOverlay(lastMarker);//需要放进Marker中生效,再放进addOverlay中生效
      }
       //开始连接路线
       let trackPoint=[]
       for(var i=0;i<list.length;i++){
        let data=list[i]
         let point=data.split(',')
         trackPoint.push(new window.BMapGL.Point(point[0],point[1]))//准备路线中的各个节点
       }
       //划线
       let Polyline = new window.BMapGL.Polyline(trackPoint,{//将坐标信息传过来
        strokeColor:'#ef4136',//颜色
        strokeWeight:2//粗细
       })
      map.addOverlay(Polyline);
    }
    /* ............................................................................ */
    //绘制服务区
    const drawServiceArea=(list)=>{
      let maps=map
      let trackPoint=[]
      list.forEach(item=>{
       let point=item
       trackPoint.push(new window.BMapGL.Point(point.lon,point.lat))
      })
      let Polyline=new window.BMapGL.Polygon(trackPoint,{//Polygon:多边形
        strokeColor: 'green',//线的颜色
        strokeWeight: 4,//线宽度
        strokeOpacity: 1,//线透明度
        fillColor: '#7CFC00',//填充色
        fillOpacity:0.4//填充色透明度
      })
      maps.addOverlay(Polyline)
    }
    /* ........................................................... */
    //添加自行车图标
    const setBikeIcon=(list)=>{
         if(list.length){
          
          let bikeIcon = new window.BMapGL.Icon("/assets/bike.jpg",new window.BMapGL.Size(20,20),{//宽20高42
            imageSize:new window.BMapGL.Size(20,42),
            anchor:new window.BMapGL.Size(36,42)
          })


         list.forEach(item=>{
          let p=item.split(',')
          let point = new window.BMapGL.Point(p[0],p[1]);
          let bikeMarker = new window.BMapGL.Marker(point,{icon:bikeIcon})
          map.addOverlay(bikeMarker);
         })
         }
    }
  //表单
  const formList=[
    {
      type:'SELECT',
      label:'城市',
      field:'cityThree',
      width:'100px',
      placeholder:"全部",
      initialValue:'1',
      list:[{id:'1',name:'全部'},{id:"2",name:'北京'},{id:"3",name:'天津'},{id:"4",name:'上海'}]

    },
    {
      type:"时间查询",
      width:130
     },
    {
      type:'SELECT',
      label:'订单状态',
      field:'state1',
      width:'100px',
      placeholder:"全部",
      initialValue:'1',
      list:[{id:'1',name:'全部'},{id:'2',name:'进行中'},{id:'3',name:'行程结束'}]
    },
  ]
  /* .................. */
  //表单的回调
  const setFormListValue=(data)=>{
    params=data
    request()
  }
  /* ................ */

  return (
    <div>
       <Card>
        <BaseForm formList={formList} setValue={(value)=>{setFormListValue(value)}}/>
       </Card>
       <Card>
      <div>共{total_count}辆车</div>
      <div id="orderDetailMap" style={{height:500}}></div>
      </Card>
    </div>
  )
}
