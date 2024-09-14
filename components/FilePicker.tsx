"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

// @ts-expect-error Binding element 'setFileSignature' implicitly has an 'any' type.
const FilePicker = ({ setFileSignature }) => {
    const [preview, setPreview] = useState('')

    // @ts-expect-error Parameter 'e' implicitly has an 'any' type.
    const handleFileChange = (e) => {
        const fileURL = URL.createObjectURL(e.target.files[0])
        setPreview(fileURL)
        setFileSignature(fileURL)
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload your signature file</CardTitle>
            </CardHeader>
            <CardContent>
                <Input type="file" resource="images/" onChange={handleFileChange}/>
                {preview && <Image src={preview} alt="Preview" width={200} height={200} />}
            </CardContent>
        </Card>
    )
}

export default FilePicker