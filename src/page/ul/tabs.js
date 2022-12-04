import {Tabs,Card, message,Icon} from 'antd'
import React, { Component } from 'react'
const { TabPane } = Tabs;
export default class tabs extends Component {
    newTabIndex=1 /* 下面要用this.newTabIndex 所以放在构造器里 */
    state={
        activeKey:'',
        panes:[]
    }
    handleCallback(key){
        message.info('Hi,您选择了标签页：'+key)
    }
    componentDidMount(){
        const panes=[
            {
                title:'Tab 1',
                content: 'Tab 1',
                key:'1'
            },
            {
                title: 'Tab 2',
                content: 'Tab 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Tab 3',
                key: '3'
            }
        ]
        this.setState({
         activeKey: panes[0].key,/* 一进来页面时让第一个标签亮 */
         panes
        })
    }
     onChange = (activeKey)=>{/* activeKey是Key值 是API中规定的 */
        this.setState({
            activeKey
        })
    }
     onEdit = (targetKey, action) => {
        this[action](targetKey);
      };
      add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;/*newTabIndex 初始是1  */
        panes.push({ title: activeKey, content: 'Content of new Tab', key: activeKey });/* 点击添加 */
        this.setState({ panes, activeKey });
      };
    
      remove = (targetKey) => {/* targetKey是小x 号的索引 */
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {//当x号索引与当前tap相同时,
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;//当前的key再减一的下标值,比如x号和当前tab下标都是2,active就等于panes[1].key,此时高亮在panes[1].key上
        }
        this.setState({ panes, activeKey });
    }

  render() {
    return (
      <div>
        <Card title='Tab页签' className='card-wrap'>
            <Tabs defaultActiveKey="1" onChange={this.handleCallback}>{/*defaultActiveKey 初始化页面中的key,当前默认哪个面板 */}
             <TabPane tab="Tab 1" key="1">欢迎学习React课程</TabPane>
             <TabPane tab="Tab 2" key="2" disabled>欢迎学习React课程</TabPane>
             <TabPane tab="Tab 3" key="3">React是一个非常受欢迎的MV*框架</TabPane>
            </Tabs>
        </Card>
        {/* /////////////////////////////////////////////////// */}
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
              <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">欢迎学习React课程</TabPane>
              <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">欢迎学习React课程</TabPane>{/* 有 icon 必须用span包裹起来 */}
              <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">React是一个非常受欢迎的MV*框架</TabPane>
          </Tabs>
        </Card>
        {/* ////////////////////////////////////////////////// */}
          <Card  title="Tab带图的页签" className="card-wrap">
           <Tabs 
            onChange={this.onChange}/* 切回面板的回调,显示高亮 */
            activeKey={this.state.activeKey}/*不使用defaultActiveKey是因为要让状态控制 key值,也就是变成受控 */
            type="editable-card"/* 可编辑卡片类型 */
            onEdit={this.onEdit}
           >
            {
                this.state.panes.map(item=>
                    <TabPane 
                     tab={item.title}
                     key={item.key}
                    >
                        {item.title}
                    </TabPane>
                    )
            }

           </Tabs>
          </Card>
      </div>
    )
  }
}
