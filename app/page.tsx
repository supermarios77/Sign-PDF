'use client'

import React, { FC, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FilePicker from '@/components/FilePicker';
import TypeSignature from '@/components/TypeSignature';
import DrawSignature from '@/components/DrawSignature';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import SignatureImage from '@/components/SignatureImage';

interface SignatureData {
  type: 'draw' | 'type' | 'file';
  content: string;
  font?: string;
}

interface Signature extends SignatureData {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

const Home: FC = () => {
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [selectedId, selectShape] = useState<number | null>(null);
  const [stageSize] = useState({ width: 800, height: 600 });

  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const addSignature = useCallback((type: 'draw' | 'type' | 'file', content: string, font?: string) => {
    const newSignature: Signature = {
      type,
      content,
      font,
      x: Math.random() * (stageSize.width - 100),
      y: Math.random() * (stageSize.height - 50),
      width: 200,
      height: 100,
      rotation: 0,
    };
    setSignatures((prev) => [...prev, newSignature]);
  }, [stageSize]);

  const updateSignature = useCallback((index: number, newAttrs: Partial<Signature>) => {
    setSignatures(signatures.map((sig, i) => {
      if (i === index) {
        return { ...sig, ...newAttrs };
      }
      return sig;
    }));
  }, [signatures]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Add Signature</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Add a Signature</DialogTitle>
            <DialogDescription>Choose a method to add your signature</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="draw" className='w-[400px]'>
            <TabsList>
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="file-picker">Upload</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
            </TabsList>
            <TabsContent value="draw" className='pr-5'>
              <DrawSignature setDrawSignature={(content: string) => addSignature('draw', content)} />
            </TabsContent>
            <TabsContent value="file-picker" className='pr-5'>
              <FilePicker setFileSignature={(content: string) => addSignature('file', content)} />
            </TabsContent>
            <TabsContent value="type" className='pr-5'>
              <TypeSignature setTypeSignature={({ text, font }) => addSignature('type', text, font)} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <div className="mt-8 border border-gray-300 rounded">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {signatures.map((sig, i) => (
              <SignatureImage
                key={i}
                signature={sig}
                isSelected={i === selectedId}
                onSelect={() => selectShape(i)}
                onChange={(newAttrs) => updateSignature(i, newAttrs)}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <div className="mt-4 space-x-2">
        <Button onClick={() => setSignatures([])}>Clear All</Button>
        <Button onClick={() => {
          if (selectedId !== null) {
            setSignatures(signatures.filter((_, i) => i !== selectedId));
            selectShape(null);
          }
        }}>Delete Selected</Button>
      </div>
    </div>
  );
};

export default Home;