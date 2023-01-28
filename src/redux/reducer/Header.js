const defaultState={
 title:'首页'
}
export default function GetTitle(state=defaultState,action){
   switch(action.type){
    case 'change_title':
       return state={title:action.payload} 
    default:
     return state
   }
}