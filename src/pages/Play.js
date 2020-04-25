import React, { useState, useEffect } from 'react'
import { Feature } from '../components'

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

    const showFeatured = () => featured.map(f => <Feature key={Math.random()} sub={f}/>)

    return (
        <div>
           <h1>Play</h1>
           { loading ?
            <p>Loading . . .</p>
           :
            showFeatured()
           }
        </div>
    )
}
