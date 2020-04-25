import React, { useState, useEffect } from 'react'

export default function Overview() {
    const [ov, setOv] = useState()

    useEffect(() => {
        const fetchOverview = async () => {
            const resp = await fetch('/api/overview')
            const data = await resp.json()
            setOv(data)
        }
        fetchOverview()
    }, [])

    return (
        <div>
            <h1>Overview</h1>
            { ov ? 
                <p>Out of {ov.total} submissions, {ov.remaining} are yet to be guessed!</p>
            : "Loading..." 
            }

        </div>
    )
}
