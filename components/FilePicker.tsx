"use client"

import React, { useState, ChangeEvent } from 'react'
import Image from 'next/image'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface FilePickerProps {
    setFileSignature: (signature: string) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ setFileSignature }) => {
    const [preview, setPreview] = useState('')

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const fileURL = URL.createObjectURL(e.target.files[0])
            setPreview(fileURL)
            setFileSignature(fileURL)
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload your signature file</CardTitle>
            </CardHeader>
            <CardContent>
                <Input type="file" accept="image/*" onChange={handleFileChange}/>
                {preview && <Image src={preview} alt="Preview" width={200} height={200} />}
            </CardContent>
        </Card>
    )
}

export default FilePicker