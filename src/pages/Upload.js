import React, { useState } from 'react'

export default function Upload() {
    const [uploadStatus, setUploadStatus] = useState(false)
    const [file, setFile] = useState("")
    const [name, setName] = useState("")

    const storeFileLocally = e => setFile(e.target.files[0])

    const handleNameChange = e => setName(e.target.value)

    const handleUploadClick = async () => {
        setUploadStatus('Uploading . . .')

        const imageData = new FormData()
        imageData.append('upload_preset', 'stand-app')
        imageData.append('file', file)
        // 1. store the image on eg. Cloudinary, get the link 
        const resp = await fetch('https://api.cloudinary.com/v1_1/gingertonic-fis/upload', {
            method: 'POST',
            body: imageData
        })
        const { error, url } = await resp.json()
        console.log(error, url)
        if(error){return}

        const imageUrl = url
        console.log(url)
        // // 2. send the image link and user's name to our storage
        const submissionData = { imageUrl, name }
        console.log(submissionData)
        const dbresp = await fetch('/api/upload', {
            method: 'POST',
            body: JSON.stringify(submissionData)
        })
        console.log(dbresp)
        const dbdata = await dbresp.json()
        console.log(dbdata)
        dbdata.message ? setSuccess() : console.error('Something went wrong....')    
    }

    const setSuccess = () => {
        setUploadStatus('Upload successful!')
        resetInputs()
    }

    const resetInputs = () => {
        setFile("")
        setName("")
    }

    const reset = () => {
        setUploadStatus(false)
        resetInputs()
    }

    const showUploadWidget = () => {
        return (
            <>
            <input type="text" value={name} placeholder="Your name" onChange={handleNameChange}/>
            <input type="file" onChange={storeFileLocally}/>
            { file ? <img className="preview" src={URL.createObjectURL(file)} alt="upload preview"/> : null }
            <button onClick={handleUploadClick}>Upload!</button>
            </>
        )
    }

    return (
        <div id="upload">
            {
                uploadStatus ? 
                    <div>
                        <h2>{uploadStatus}</h2>
                        <button onClick={reset} disabled={uploadStatus !== 'Upload successful!'}>Upload another?</button>
                    </div> 
                : showUploadWidget()
            }
            
        </div>
    )
}
