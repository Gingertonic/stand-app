import React, { useState, useEffect } from 'react'

export default function Overview() {
    const [ov, setOv] = useState()

    useEffect(() => {
        const fetchOverview = async () => {
            console.log('Fetching overview')
            const resp = await fetch('/api/overview')
            const data = await resp.json()
            setOv(data)
        }
        fetchOverview()
    }, [])

    return (
        <div id="overview">
            { ov ? 
                <><p>Out of {ov.total} submissions, {ov.totalRemaining} are yet to be guessed!</p>
                <p>Out of {ov.totalShown} guesses, we've got {ov.totalCorrect} correct!</p></>
            : "Loading..." 
            }

        </div>
    )
}