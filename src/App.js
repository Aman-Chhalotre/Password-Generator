import React, { useState,useCallback, useEffect, useRef, } from 'react';
import './App.css';



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [reset,setReset] = useState(false)

  const passwordRef = useRef(null)
  
  const passwordGenerator = useCallback(() => {
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(characterAllowed) str += "@#$%&*"

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,characterAllowed,setPassword])

  const copyPasswordToClipboard = useCallback(()=> {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])
  
  useEffect(() => {
      passwordGenerator()
    },[length,numberAllowed,characterAllowed,passwordGenerator,reset])

    
  return (
    <div id="app">

      <div id='container'>
        <h1>Password Generator</h1>
        <div id='div1'>
          <input type='text' value={password} placeholder='password' readOnly/>
          <button onClick={()=>copyPasswordToClipboard()}>Copy</button>
        </div>

        <div id='div2'>

          <div>
            <input type='range' min={4} max={15} value={length} onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length : {length}</label>
          </div>

          <div>
            <input type='checkbox' name='number' defaultChecked={numberAllowed} onChange={() => {setNumberAllowed ((prev) => !prev)}}/>
            <label >Number</label>
          </div>

          <div>
            <input type='checkbox' name='character' defaultChecked={characterAllowed} onChange={() => {setCharacterAllowed((prev) => !prev)}}/>
            <label >Character</label>
          </div>

        </div>

        <div id='div3'>
        <button onClick={()=>setReset((prev)=>!prev)}>Change</button>
        </div>
      </div>

    </div>
  )
};

export default App;
