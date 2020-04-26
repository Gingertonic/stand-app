import React, { useState } from 'react'

export default function Feature({ sub }) {
    const { imageUrl, name } = sub.data
    const imageId = sub.ref['@ref'].id
    const [revealed, setRevealed] = useState(false)

    const handleRevealClick = async () => {
        if(revealed){return}
        const resp = await fetch('/api/reveal', {
            method: 'PATCH',
            body: JSON.stringify({ id: imageId })
        })
        const { error, message } = resp.json()
        error ? console.error('Something went wrong...') : setRevealed(true)
    }

    return (
        <div className="featured">
            <code>:belongs_to <span onClick={handleRevealClick} disabled={revealed}>{revealed ? name : 'Reveal'}</span></code>
            <img src={imageUrl} alt="feature"/>
        </div>
    )
}
