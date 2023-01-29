let defaultState={
    showLaing:false
}
export default function getLoading(state=defaultState,action){
   switch(action.type){
     case 'change_loading':
        return state={showLaing:action.payload}
     default:
        return state   
   }
}