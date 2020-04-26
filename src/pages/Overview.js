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
        <div id="overview">
            { ov ? 
                <p>Out of {ov.total} submissions, {ov.remaining} are yet to be guessed!</p>
            : "Loading..." 
            }

        </div>
    )
}
