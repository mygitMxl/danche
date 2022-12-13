import { Card } from 'antd'
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
export default class index extends Component {
    getOption1=()=>{
     let option={
        title:{
        text:'用户骑行订单',
        left:'center'
        },
      tooltip:{/* 提示框组件 */
        trigger: 'item',/* trigger触发类型 */
        formatter : "{a} <br/>{b} : {c} ({d}%)"
      },
      legend:{/* 图例组件。 */
        orient: 'vertical',//图例列表的布局朝向,垂直布局
        right:'right'//图例组件离容器右侧的距离。
      },
      series:[
        {
            name:'订单量',
            type:'pie',
            radius: '50%',
            data:[
                {
                    value:1000,
                    name:'Mon'
                  },{
                    value:1200,
                    name:'Tue'
                  },{
                    value:1400,
                    name:'Wed'
                  },{
                    value:1500,
                    name:'Thu'
                  },{
                    value:2000,
                    name:'Fri'
                  },{
                    value:2600,
                    name:'Sat'
                  },{
                    value:2500,
                    name:'Sun'
                  }
            ],
            emphasis: {
                itemStyle: {//样式,加一些阴影阴影颜色
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
        }
      ]
     }
     return option
    }

    getOption2=()=>{
     let option = {
      title:{
        text:'用户骑行订单',
         x:"center"
      },
        tooltip: {
          trigger: 'item',
          formatter:'{a}<br/>{b}:{c}({d}%)'
        },
        legend: {
          right:'right',
          orient: 'vertical'
        },
        series: [
          {
            name: '订单量',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data:[{
              value:1000,
              name:'Mon'
            },{
              value:1200,
              name:'Tue'
            },{
              value:1400,
              name:'Wed'
            },{
              value:1500,
              name:'Thu'
            },{
              value:2000,
              name:'Fri'
            },{
              value:2600,
              name:'Sat'
            },{
              value:2500,
              name:'Sun'
            }],
          }
        ]
      };
      return option
    }
    getOption3=()=>{
     let option = {
        legend: {
          right:'right',
          top:150,
          orient: 'vertical'
        },
        symbolSize:20,
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: 'item',
          formatter:'{a}<br/>{b}:{c}({d}%)'
        },
        series: [
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 250],//控制大小
            center: ['50%', '50%'],//控制位置
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data:[{
              value:1000,
              name:'Mon'
            },{
              value:1200,
              name:'Tue'
            },{
              value:1400,
              name:'Wed'
            },{
              value:1500,
              name:'Thu'
            },{
              value:2000,
              name:'Fri'
            },{
              value:2600,
              name:'Sat'
            },{
              value:2500,
              name:'Sun'
            }]
          }
        ]
      };
      return option
    }
    render() {
    return (
      <div>
        <Card title='饼图-基本图'>
      <ReactEcharts option={this.getOption1()} theme="Imooc"    notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
        </Card>
        <Card title='圆角环形图'>
        <ReactEcharts option={this.getOption2()} theme="Imooc"    notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
        </Card>
        <Card title='南丁格尔-基本图'>
        <ReactEcharts option={this.getOption3()} theme="Imooc"    notMerge={true} lazyUpdate={true} style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
