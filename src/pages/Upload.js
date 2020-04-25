import React, { useState } from 'react'

export default function Upload() {
    const [uploadStatus, setUploadStatus] = useState(false)
    const [file, setFile] = useState("")
    const [name, setName] = useState("")

    const storeFileLocally = e => setFile(e.target.files[0])

    const handleNameChange = e => setName(e.target.value)

    const handleUploadClick = async () => {
        const imageData = new FormData()
        imageData.append('upload_preset', 'stand-app')
        imageData.append('file', file)
        // 1. store the image on eg. Cloudinary, get the link 
        const resp = await fetch('https://api.cloudinary.com/v1_1/gingertonic-fis/upload', {
            method: 'POST',
            body: imageData
        })

        const data = await resp.json()
        const imageUrl = data.url

        // // 2. send the image link and user's name to our storage
        const submissionData = { imageUrl, name }

        // console.log(submissionData)
        
        const dbresp = await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify(submissionData)
        })

        const dbdata = await dbresp.json()

        dbdata.message ? setUploadStatus('Success') : console.error('Something went wrong....')

       
    }

    const showUploadWidget = () => {
        return (
            <>
            <h1>Upload</h1>
            <input type="text" value={name} onChange={handleNameChange}/>
            <input type="file" onChange={storeFileLocally}/>
            <button onClick={handleUploadClick}>Upload!</button>
            </>
        )
    }

    return (
        <div>
            {
                uploadStatus !== 'Success' ? showUploadWidget() : <p>Yay you uploaded!</p> 
            }
            
        </div>
    )
}
