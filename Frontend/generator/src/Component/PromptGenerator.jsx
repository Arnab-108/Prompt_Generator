import React, { useState } from 'react'
import axios from 'axios'
export const PromptGenerator = () => {
    const [query , setQuery] = useState('')
    const [prompt , setPrompt] = useState('')

    const handleSubmit=()=>{
        const obj ={
            query,
        }

        axios.post('http://localhost:8080/propmt-generator/generate',obj).then((res)=>{
            console.log(res)
            setPrompt(res.data.prompt)
        })
        
    }
  return (
    <div>
        <h1>Prompt Generator</h1>
        <div>
            <input value={query} type='text' placeholder='Enter your Query' onChange={(e)=>setQuery(e.target.value)} />
            <button onClick={handleSubmit}>Submit</button>
        </div>
        <h2>Generated Prompt:</h2>
        <div>
            <p>{prompt}</p>    
        </div>
    </div>
  )
}
