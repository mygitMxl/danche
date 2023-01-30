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
      text: '用户出行方式'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['私家车', '公交', '摩托车', '电动车', '自行车']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '私家车',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: '摩托车',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: '电动车',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410]
      },
      {
        name: '自行车',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320]
      },
      {
        name: '公交',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320]
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

