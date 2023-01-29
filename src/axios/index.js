import { Modal } from "antd";
import axios from "axios"
export default class Axios{
     static ajax(options){
      let baseApi='https://www.fastmock.site/mock/cdc4042cc4f966d000d0fccc4fd892ba/mockapi'
      return new Promise((resolve,reject)=>{
        axios({
          url:options.url,
          method:'get',
          baseURL:baseApi,//根路径
          timeout:2000,//延迟时间
          params:(options.data&&options.data.params)||''//获取参数, options.data是ture就取options.data,否则取空
        }).then(response=>{
          if(response.status=='200'){// http请求成功返回200 
            let res=response
              resolve(res)
          }else{
            reject(response.data)/* 失败用reject */
          }
        })
      })
     }
}