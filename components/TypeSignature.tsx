'use client'
import React, { ChangeEvent, FC, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from './ui/select';
import { Input } from './ui/input'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import clsx from 'clsx';

interface TypeSignatureProps {
    setTypeSignature: (signature: { text: string; font: string }) => void;
}

const TypeSignature: FC<TypeSignatureProps> = ({ setTypeSignature }) => {
    const [selectedFont, setSelectedFont] = useState('mono');
    const [signatureText, setSignatureText] = useState('');

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setSignatureText(newText);
        setTypeSignature({ text: newText, font: selectedFont });
    };

    const handleFontChange = (value: string) => {
        setSelectedFont(value);
        setTypeSignature({ text: signatureText, font: value });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Type in your Signature</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    placeholder="Your Name"
                    value={signatureText}
                    onChange={handleTextChange}
                    className={clsx(`${selectedFont === 'mono' ? 'font-mono' :
                        selectedFont === 'sans' ? 'font-sans' :
                            selectedFont === 'cursive' ? 'font-playwrite' : ''} mb-5`)}
                />
                <Select value={selectedFont} onValueChange={handleFontChange}>
                    <SelectTrigger>
                        <SelectValue placeholder='Select a font' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='sans' className='font-sans'>Sans Serif</SelectItem>
                        <SelectItem value='mono' className='font-mono'>Monospace</SelectItem>
                        <SelectItem value='cursive' className='font-playwrite'>Cursive</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    );
};

export default TypeSignature;