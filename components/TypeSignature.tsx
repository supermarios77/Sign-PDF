'use client'

import React, { ChangeEvent, FC, useState } from 'react'
import { Caveat, Dancing_Script, Great_Vibes, Pacifico } from 'next/font/google'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card'

const caveat = Caveat({ subsets: ['latin'] })
const dancingScript = Dancing_Script({ subsets: ['latin'] })
const greatVibes = Great_Vibes({ weight: '400', subsets: ['latin'] })
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] })

interface TypeSignatureProps {
  setTypeSignature: (signature: { text: string; font: string; fontClass: string }) => void
}

const TypeSignature: FC<TypeSignatureProps> = ({ setTypeSignature }) => {
  const [selectedFont, setSelectedFont] = useState('caveat')
  const [signatureText, setSignatureText] = useState('')
  const [savedSignature, setSavedSignature] = useState({ text: '', font: 'caveat', fontClass: caveat.className })

  const fonts = {
    caveat: { name: 'Caveat', class: caveat.className },
    dancingScript: { name: 'Dancing Script', class: dancingScript.className },
    greatVibes: { name: 'Great Vibes', class: greatVibes.className },
    pacifico: { name: 'Pacifico', class: pacifico.className },
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSignatureText(e.target.value)
  }

  const handleFontChange = (value: string) => {
    setSelectedFont(value)
  }

  const handleSave = () => {
    const newSignature = { 
      text: signatureText, 
      font: fonts[selectedFont as keyof typeof fonts].name, 
      fontClass: fonts[selectedFont as keyof typeof fonts].class 
    }
    setSavedSignature(newSignature)
    setTypeSignature(newSignature)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Type in your Signature</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          placeholder="Your Name"
          value={signatureText}
          onChange={handleTextChange}
          className={`mb-5 text-2xl ${fonts[selectedFont as keyof typeof fonts].class}`}
        />
        <Select value={selectedFont} onValueChange={handleFontChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select a font" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(fonts).map(([key, { name, class: fontClass }]) => (
              <SelectItem key={key} value={key} className={fontClass}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Signature</Button>
      </CardFooter>
      {savedSignature.text && (
        <CardContent>
          <p className="mt-4">
            Saved Signature: 
            <span className={`ml-2 text-2xl ${savedSignature.fontClass}`}>
              {savedSignature.text}
            </span>
          </p>
        </CardContent>
      )}
    </Card>
  )
}

export default TypeSignature