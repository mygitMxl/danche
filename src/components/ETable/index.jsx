
import { Table } from 'antd';
import React, { Component } from 'react'

export default class index extends Component {
  //判断是单选还是复选
  onRowClick = (record,index) => {
    // 判断是单选还是复选
    let { rowSelection, selectedRowKeys, selectedItem, selectedIds } = this.props;
    if(rowSelection === 'checkbox') {
      if(selectedIds){
        const i = selectedIds.indexOf(record.id);
        if(i===-1){
          selectedIds.push(record.id);
          console.log(selectedIds)
          selectedRowKeys.push(index);
          console.log(selectedRowKeys) 
          selectedItem.push(record);
          console.log(selectedItem)
        }else{
          selectedIds.splice(i,1);
          selectedRowKeys.splice(i,1);
          selectedItem.splice(i,1);
        }
      }else{
        selectedIds=[record.id];
        selectedRowKeys=[index];
        selectedItem=[record];
      }
      this.props.updateSelectedItem(selectedRowKeys,selectedItem,selectedIds)
    }else{
      let selectKey = [index];
      this.props.updateSelectedItem(selectKey,record)
    }
  }

  
  tableInit=()=>{
    let {selectedRowKeys} = this.props;//单选还是多选
    let row_selection=this.props.rowSelection
     const rowSelection={//默认是单选
      type:'radio',
      selectedRowKeys//通过给updateSelectedItem这个函数传值,函数里进行setState这里从而获取selectedRowKeys的值
     }
     if(row_selection===false||row_selection===null){//不需要单选不需要复选
      row_selection=false
     }else if(row_selection==='checkbox'){
      rowSelection.type = "checkbox";
     }else{
      row_selection='radio'
     }
      return(
        <Table
        bordered //边框
        {...this.props}
        rowSelection={row_selection?rowSelection:null}
        onRow={(record,index) => {
          return {
            onClick: () => {
              if(!row_selection) return;
              this.onRowClick(record, index)
            }
          };
        }}
        />
      )
  }
  componentDidMount(){
    console.log(this.props);
  }
  render() {
    return (
      <div>
     {this.tableInit()}
      </div>
    )
  }
}
