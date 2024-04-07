import React, { useState } from 'react'
import './prompt.css'
import axios from 'axios'
export const PromptGenerator = () => {
    const [query, setQuery] = useState('')
    const [prompt, setPrompt] = useState([])
    const [load, setLoad] = useState(false)
    const handleSubmit = () => {
        const obj = {
            query,
        }
        setLoad(true)
        axios.post('http://localhost:8080/propmt-generator/generate', obj).then((res) => {
            console.log(res)
            setLoad(false)
            setPrompt(res.data.prompt.split('\n\n'))
        })

    }

    const handleCopy = (text) => {
        console.log(text,'text')
        navigator.clipboard.writeText(text).then(() => {
                alert('Text copied to clipboard:', text);
            })
            .catch((error) => {
                alert('Error copying text:', error);
            });
    };
    console.log(prompt)
    return (
        <>
            <div className='main-cont'>
                <h1>Prompt Generator</h1>
                <div className='container'>
                    <textarea value={query} placeholder='Enter your Query' onChange={(e) => setQuery(e.target.value)} rows={4} cols={50} />
                    <button className='btn-1' onClick={handleSubmit}>
                        {
                            load ? <p className='p-1'>Generating...</p> : <p className='p-1'>Submit</p>
                        }
                    </button>
                </div>
                <div className='container-1'>
                    {
                        prompt?.map((paragraph, index) => (
                            <div key={index} style={{ marginBottom: '10px', width:'40vw',margin:'auto' }}>
                                <p>{paragraph}</p>
                            </div>
                        ))
                    }
                    
                    <button className='copy-btn' onClick={() => handleCopy(prompt.join('\n\n'))}>Copy</button>
                </div>
            </div>
        </>
    )
}
