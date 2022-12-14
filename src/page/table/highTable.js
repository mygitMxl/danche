import React, { Component } from 'react'
import { Card, Table, Modal, Button, message,Badge} from 'antd';
import axios from 'axios';
export default class highTable extends Component {
    state={
        // dataSource:[],
        // dataSource2:[],
        // loading:true,
        // selectedRowKeys:[],
        // selectedItem:[],
        // selectedRows:[],
        // sortOrder:""
    
      }
      params = {
        page:1
      }
    componentDidMount(){
        const data = [
          {
            id: '0',
            userName: 'Tom',
            sex: '1',
            state: '1',
            interest: '1',
            birthday: '2000-01-01',
            address: '北京市海淀区奥林匹克公园',
            time: '09:00'
          },
          {
            id: '1',
            userName: 'BOb',
            sex: '1',
            state: '1',
            interest: '1',
            birthday: '2000-01-01',
            address: '北京市海淀区奥林匹克公园',
            time: '09:00'
          },
          {
            id: '2',
            userName: 'lucy',
            sex: '1',
            state: '1',
            interest: '1',
            birthday: '2000-01-01',
            address: '北京市海淀区奥林匹克公园',
            time: '09:00'
          }
        ]
        data.map((item,index)=>/* 动态获取key值 */
            item.key=index
        )
        this.setState({
          dataSource: data
        })
        this.request()
      }
      request=()=>{
        let _this = this;
        axios.get('https://www.fastmock.site/mock/0d3e0fa5f65bb4cb711295a72e204c65/mockapi/table/high/list',{
          params:{page:this.params.page}
        })
        .then(res=>{
          console.log(res.data.result);
          res.data.result.list.map((item,index)=>
             item.key=index
          )
           this.setState({
           dataSource2:res.data.result.list,
           loading:false,
           selectedRowKeys:[],/* 点击删除后的操作 */
           selectedRows:null,
          //  pagination:pagination(res,(current)=>{
          //   _this.params.page=current;
          //   this.request()
          //  })
           })
        })
       }
       //升降序操作
       handleChange=(pagination, filters, sorter)=>{
           this.setState({
            sortOrder:sorter.order
           })
       }
       //删除操作
       handleDelete=(item)=>{//item就是表格
       let id=item.id;
       Modal.confirm({
        title:'确认',
        content:'您确认要删除吗',
        onOk:()=>{
            message.success('删除成功')
            this.request()
        }
       })
       }
  render() {
      //动态获取mock数据
  
    const columns = [
        {
            title:'id',
            key:'id1',
            dataIndex:'id'
        }, 
        {
            title: '用户名',
            key: 'userName1',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            key: 'sex1',
            dataIndex: 'sex',
            render(sex){
                return sex ===1 ?'男':'女'
            }
        },
        {
            title: '状态',
            key: 'state1',
            dataIndex: 'state',
            render(state){
                let config  = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            key: 'interest1',
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            key: 'birthday1',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            key: 'address1',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            key: 'time1',
            dataIndex: 'time'
        }
    ]
    const columns2 = [
        {
            title: 'id',
            key: 'id',
            width: 80,
            fixed:'left',/* 左侧固定 */
            dataIndex: 'id'
        },
        {
            title: '用户名',
            key: 'userName',
            width: 80,
            fixed: 'left',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            key: 'sex',
            width: 80,
            dataIndex: 'sex',
            render(sex) {
                return sex === 1 ? '男' : '女'
            }
        },
        {
            title: '状态',
            key: 'state',
            width: 80,
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            key: 'interest',
            width: 80,
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        },
        {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        }, {
            title: '生日',
            key: 'birthday',
            width: 120,
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            key: 'address',
            width: 120,
            fixed: 'right',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            key: 'time',
            width: 80,
            fixed: 'right',//右侧固定
            dataIndex: 'time'
        }
    ]
    const columns3 = [
        {
            title: 'id',
            key: 'id3',
            dataIndex: 'id'
        },
        {
            title: '用户名',
            key: 'userName3',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            key: 'sex3',
            dataIndex: 'sex',
            render(sex) {
                return sex === 1 ? '男' : '女'
            }
        },
        {                                                     //在这里实现升序降序
            title: '年龄',//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            key: 'age3',
            dataIndex: 'age',
            sorter:(a,b)=>{
                return a.age - b.age;
            },
            sortOrder:this.state.sortOrder//排序APi
        },
        {
            title: '状态',
            key: 'state3',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            key: 'interest3',
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            key: 'birthday3',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            key: 'address3',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            key: 'time3',
            dataIndex: 'time'
        }
    ]
    const columns4 = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '用户名',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            render(sex) {
                return sex ===1 ? '男' : '女'
            }
        },
        {
            title: '年龄',
            dataIndex: 'age'
        },
        {
            title: '状态',
            dataIndex: 'state',
            render(state) {
                let config = {
                    '1': '咸鱼一条',
                    '2': '风华浪子',
                    '3': '北大才子',
                    '4': '百度FE',
                    '5': '创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': <Badge status="success" text="成功"/>,
                    '2': <Badge status="error" text="报错" />,
                    '3': <Badge status="default" text="正常" />,
                    '4': <Badge status="processing" text="进行中" />,
                    '5': <Badge status="warning" text="警告" />
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            dataIndex: 'address'
        },
        {
            title: '操作',
            render:(text,item)=>{
                return <Button size="small" onClick={(item) => {this.handleDelete(item) }}>删除</Button>
            }
        }
    ]
    return (
      <div>
            <Card title="头部固定">
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.dataSource2}
                    pagination={false}
                    scroll={{ y: 240 }}//y轴滚动
                />
            </Card>
            <Card title="左侧固定" style={{ margin: '10px 0' }}>
                <Table
                    bordered
                    columns={columns2}
                    dataSource={this.state.dataSource2}
                    pagination={{pagSize:5}}
                    scroll={{ x: 1000 }}
                />
            </Card>
            <Card title="表格排序" style={{ margin: '10px 0' }}>
                <Table
                    bordered
                    columns={columns3}
                    dataSource={this.state.dataSource2}
                    pagination={false}
                    onChange={this.handleChange}
                />
            </Card>
            <Card title="操作按钮" style={{ margin: '10px 0' }}>
                <Table
                    bordered
                    columns={columns4}
                    dataSource={this.state.dataSource2}
                    pagination={false}
                />
            </Card>
      </div>
    )
  }
}
