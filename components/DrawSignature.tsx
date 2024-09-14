'use client'
import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { HexColorPicker } from 'react-colorful'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { EraserIcon } from '@radix-ui/react-icons';

// @ts-expect-error Binding element 'setDrawSignature' implicitly has an 'any' type.
const DrawSignature = ({ setDrawSignature }) => {
    const [color, setColor] = useState("#000")
    const [brushRadius, setBrushRadius] = useState(10)
    const canvasRef = useRef(null)

    const handleErase = () => {
        setColor("#fff")
        setBrushRadius(20)
    }

    const handleSave = () => {
        // @ts-expect-error 'canvasRef.current' is possibly 'null'
        setDrawSignature(canvasRef.current.canvasContainer.children[1].toDataURL())
    }

    return (
        <Card>

            <CardHeader>
                <CardTitle>Draw your signature</CardTitle>
                <div className='flex space-x-2 py-2'>
                    <Popover>
                        <PopoverTrigger >
                            <Button variant="default">Change Pen Color</Button>
                        </PopoverTrigger>
                        <PopoverContent><HexColorPicker color={color} onChange={setColor} /></PopoverContent>
                    </Popover>
                    <Button variant="outline" onClick={handleErase}><EraserIcon /></Button>
                    <Button variant="default" onClick={handleSave}>Save Signature</Button>
                </div>
            </CardHeader>

            <CardContent>
                <CanvasDraw brushRadius={brushRadius} canvasWidth={350} ref={canvasRef} brushColor={color} />
            </CardContent>

        </Card>
    )
}

export default DrawSignature