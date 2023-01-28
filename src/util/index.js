export const  showTime=(time)=>{
    var data=new Date()
    var year =data.getFullYear()<10?'0'+data.getFullYear():data.getFullYear()
    var month =data.getMonth()+1
    var day =data.getDate()<10?'0'+data.getDate():data.getDate()
    var hour =data.getHours()<10?'0'+data.getHours():data.getHours()
    var Minute =data.getMinutes()<10?'0'+data.getMinutes():data.getMinutes()
    var Second =data.getSeconds()<10?'0'+data.getSeconds():data.getSeconds()
    return year+'/'+month+'/'+day+' '+hour+':'+Minute+':'+Second   
} 
