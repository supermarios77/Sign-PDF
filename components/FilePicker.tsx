"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const FilePicker = () => {
    const [preview, setPreview] = useState('')
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Upload your signature file</CardTitle>
            </CardHeader>
            <CardContent>
                <Input type="file" resource="images/" onChange={e => setPreview(URL.createObjectURL(e.target.files[0]))}/>
                {preview && <Image src={preview} alt="Preview" width={200} height={200} />}
            </CardContent>
        </Card>
    )
}

export default FilePicker