 const formateDate=(time)=>{
    if(!time)return '';
    let date = new Date(time);
    let year= date.getFullYear()
    let month=date.getMonth()+1
        month=month<10?'0'+month:month
    let day=date.getDate()
        day=day<10?'0'+day:day
    let hour=date.getHours()   
        hour=hour<10?'0'+hour:hour
    let Minute=date.getMinutes()    
        Minute=Minute<10?'0'+Minute:Minute
    let Second= date.getSeconds();  
        Second=Second<10?'0'+Second:Second
        return year+'-'+month+'-'+day+' '+hour+':'+Minute+':'+Second   
}
export default formateDate