import React, { useState } from 'react'

export default function Feature({ sub }) {
    const { imageUrl, name } = sub.data
    const imageId = sub.ref['@ref'].id
    const [revealed, setRevealed] = useState(false)
    const [responded, setResponded] = useState(false)

    const handleRevealClick = async () => {
        if(revealed){return}
        const resp = await fetch('/api/reveal', {
            method: 'PATCH',
            body: JSON.stringify({ id: imageId })
        })
        const { error, message } = resp.json()
        error ? console.error('Something went wrong...') : setRevealed(true)
    }

    const setResult = async result => {
        if(responded){return}
        const resp = await fetch('/api/result', {
            method: 'POST',
            body: JSON.stringify({ result })
        })
        setResponded(result ? "Y" : "N")
    }

    const resultClasses = revealed ? "result visible" : "result hidden"

    const resultMessage = () => <p>{responded === "Y" ? "Nice one" : "Boo..." }</p>

    return (
        <div className="featured">
            <code>:belongs_to <span onClick={handleRevealClick} disabled={revealed}>{revealed ? name : 'Reveal'}</span></code>
            <img src={imageUrl} alt="feature"/>
            <div className={resultClasses}>
                { responded ? 
                    resultMessage()
                :
                    <><div>Did we get it right?</div>
                    <button disabled={responded} onClick={()=>setResult(false)}>No</button>  <button disabled={responded} onClick={()=>setResult(true)}>Yes!</button></>
                }
            </div>
        </div>
    )
}
