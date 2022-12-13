import { Card } from 'antd'
import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react';
export default class index extends Component {
    getOptiton1=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            tooltip:{//鼠标划入显示数据
                trigger:'axis'/* 触发类型 */
              },
            xAxis:{//x轴
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis:{//y轴
                type:'value'
            },
            series: [
                {
                  name:'订单量',
                  type: 'bar',
                  data: [1300, 1400, 1800, 3000, 2000, 1500, 1300]
                }
              ]
        }
        return option
    }
    getOption2=()=>{
        let option={
            title:{
                text:'用户骑行订单'
            },
            legend:{
                // data:['哈啰','美团','青桔']，会将series的name作为显示
            },
            tooltip:{
                trigger:'axis'
              },
              xAxis: {
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [
                {
                  name:'哈啰',
                  type: 'bar',
                  data:[2000,3000,5500,7000,8000,12000,20000]
                },{
                    name:'青桔',
                    type: 'bar',
                    data:[1000,2000,2500,4000,6000,7000,8000]
                },{
             
                  name:'美团',
                  type: 'bar',
                  data:[1500,3000,4500,6000,8000,10000,15000]
                }
              ]
            }
            return option;
        }
    
    render() {
    return (
      <div>
        <Card title='柱形图表1'>
            <ReactEcharts option={this.getOptiton1()}  theme="Imooc" style={{ height: 500 }}/>
        </Card>
        <Card title='柱形图表2'>
        <ReactEcharts option={this.getOption2()} theme="Imooc" style={{ height: 500 }} />
        </Card>
      </div>
    )
  }
}
