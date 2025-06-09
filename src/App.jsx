import { useState,useCallback,useEffect,useRef } from 'react'
import './App.css'

function App() {
  const[length,setLength]=useState(8)
  const[numAllo,setNumAllo]=useState(false)
  const[charAllo,setCharAllo]=useState(false)
  const[password,setPassword]=useState("")

  const passRef=useRef(null)

  const passGen=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numAllo) str+="0123456789"
    if(charAllo) str+="!@#$%^&*()_+{}[]?"

    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setPassword(pass)
  },[length,numAllo,charAllo,setPassword])

  const copyPassToClipboard=useCallback(()=>{
    passRef.current?.select();
    
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passGen()
  },[length,numAllo,charAllo,passGen])
  return (
    <>
    <div style={{ 
  width: '100%', 
  maxWidth: '400px', 
  margin: '2rem auto', 
  padding: '1rem', 
  boxShadow: '0px 4px 6px rgba(255, 20, 147, 0.1)', 
  borderRadius: '8px', 
  color: '#FF69B4',
  backgroundColor: '#FFD1DC', 
  textAlign: 'center',
  fontSize:'2.5rem'
}}>
<h1 style={{ 
  color: 'white', 
  textAlign: 'center', 
  marginTop: '3rem', 
  marginBottom: '3rem', 
  fontSize: '2.5rem' 
}}>  
  Password Generator  
</h1>

<div style={{ 
  display: 'flex', 
  boxShadow: '0px 4px 6px rgba(239, 25, 197, 0.1)', 
  borderRadius: '8px', 
  overflow: 'hidden', 
  marginBottom: '1rem' 
}}>
  <input 
    type="text" 
    value={password} 
    style={{ 
      outline: 'none', 
      width: '100%', 
      padding: '0.5rem 1rem', 
      border: 'none', 
      fontSize: '1.5rem', 
      height: '2rem',
      color:'#FF1493'
    }} 
    placeholder="Password"
    readOnly 
    ref={passRef}
  />
  <button 
  onClick={copyPassToClipboard}  
  style={{ 
  outline: 'none', 
  backgroundColor: '#FF1493',
  color: 'white', 
  padding: '0.25rem 0.75rem', 
  flexShrink: 0, 
  border: 'none', 
  borderRadius: '4px', 
  cursor: 'pointer',
   
}}>  
  Copy  
</button>
</div>
<div className='flex text-sm gap-x-2' style={{color:'white'}}>
  <div className='flex items-center gap-x-1' style={{color:'white'}}>
    <input type="range" min={6} max={15} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
    <label htmlFor="">Length:{length}</label>
  </div>
      <div className='flex items-center gap-x-1' style={{color:'white'}}>
    <input type="checkbox" defaultChecked={numAllo} id="numberInput" onChange={()=>{setNumAllo((prev)=>!prev);}} />
    <label htmlFor="numberInput">Numbers</label>
  </div>
  <div className='flex items-center gap-x-1' style={{color:'white'}}>
    <input type="checkbox" defaultChecked={charAllo} id="characterInput" onChange={()=>{setCharAllo((prev)=>!prev);}} />
    <label htmlFor="characterInput">Characters</label>
  </div>
</div>
</div>


    </>
  )
}

export default App
