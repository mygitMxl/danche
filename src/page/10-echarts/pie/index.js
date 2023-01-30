import React, { useRef,useEffect } from 'react'
import * as echarts from 'echarts';
import { Card } from 'antd';
export default function Index() {
  const barRef = useRef()
  useEffect(() => {
    first()
  }, [])
  
   var first=()=>{
  var myChart = echarts.init(barRef.current);
  return  myChart.setOption({
    title: {
      text: '用户骑行订单',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {//工具箱
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  }
  return (
    <div>
      <Card>
      <div ref={barRef} style={{ width: '100%', height: '400px', marginTop: '30px' }}></div>
      </Card>

    </div>
  )
}

