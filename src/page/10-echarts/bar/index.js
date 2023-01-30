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
    title:{
      text:'用户骑行订单'
  },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Direct',
        type: 'bar',
        barWidth: '60%',
        data: [1300, 1400, 1800, 3000, 2000, 1500, 1300]
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

