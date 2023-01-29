import React, { useRef } from 'react'

export default function Index() {
   const addFrom=useRef()
  return (
    <div>
      <div ref={addFrom} onClick={()=>{console.log(addFrom.current);}}>123</div>
    </div>
  )
}
