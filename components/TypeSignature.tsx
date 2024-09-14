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
        setSignatureText(e.target.value);
        setTypeSignature({ text: e.target.value, font: selectedFont });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Type in your Signature</CardTitle>
            </CardHeader>
            <CardContent>
                <Input
                    placeholder="Your Name"
                    onChange={handleTextChange}
                    className={clsx(`${selectedFont === 'mono' ? 'font-mono' :
                        selectedFont === 'sans' ? 'font-sans' :
                            selectedFont === 'cursive' ? 'font-playwrite' : ''} mb-5`)}
                />
                <Select value={selectedFont} onValueChange={(value) => {
                    setSelectedFont(value);
                    setTypeSignature({ text: signatureText, font: value });
                }}>
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