import React, { useState, useEffect } from 'react'

export default function Play() {
    const [loading, setLoading] = useState(false) 
    const [featured, setFeatured] = useState([])

    useEffect(() => {
        const fetchFeatured = async () => {
            setLoading(true)
            const resp = await fetch('/api/featured')
            const featured = await resp.json()
            setFeatured(featured)
            setLoading(false)
        }
        fetchFeatured()
    }, [])

    return (
        <div>
           <h1>Play</h1> 
        </div>
    )
}
