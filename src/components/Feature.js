import React, { useState } from 'react'

export default function Feature({ sub }) {
    const { imageUrl, name } = sub.data
    const imageId = sub.ref['@ref'].id
    const [revealed, setRevealed] = useState(false)

    const handleRevealClick = async () => {
        const resp = await fetch('/api/reveal', {
            method: 'PATCH',
            body: JSON.stringify({ id: imageId })
        })
        const { error, message } = resp.json()
        error ? console.error('Something went wrong...') : setRevealed(true)
    }

    return (
        <div className="featured">
            <img src={imageUrl} alt="feature"/>
            <code>:belongs_to </code><button onClick={handleRevealClick} disabled={revealed}>{revealed ? name : 'Reveal'}</button>
        </div>
    )
}
