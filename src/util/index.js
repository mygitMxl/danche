import { Select } from 'antd'
const Option = Select.Option;
//...............................
export const showTime = (time) => {
    var data = new Date()
    var year = data.getFullYear() < 10 ? '0' + data.getFullYear() : data.getFullYear()
    var month = data.getMonth() + 1
    var day = data.getDate() < 10 ? '0' + data.getDate() : data.getDate()
    var hour = data.getHours() < 10 ? '0' + data.getHours() : data.getHours()
    var Minute = data.getMinutes() < 10 ? '0' + data.getMinutes() : data.getMinutes()
    var Second = data.getSeconds() < 10 ? '0' + data.getSeconds() : data.getSeconds()
    return year + '/' + month + '/' + day + ' ' + hour + ':' + Minute + ':' + Second
}
//...............................
export const getOptionList = (data) => {
    if (!data) {
        return []
    }
    let NewDate = []
    data.forEach(item => {
        NewDate.push(
            <Option key={item.id} value={item.id}>{item.name}</Option>
        )
    })
    return NewDate
} 
//................................
export const pagination=(data,callback)=>{
    return {
      onChange: (current) => callback(current), //页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `共${data.result.total}条`
      },
      showSizeChanger:true,
      showQuickJumper: true
    }
  }