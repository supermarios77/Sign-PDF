'use client'
import React, { FC, useState } from 'react';
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
import Draggable from 'react-draggable';

const Home: FC = () => {
  const [drawSignature, setDrawSignature] = useState<string | undefined>(undefined);
  const [typeSignature, setTypeSignature] = useState<{ text: string; font: string } | undefined>(undefined);
  const [fileSignature, setFileSignature] = useState<string | undefined>(undefined);

  const generateSVG = (text: string, font: string) => {
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="50">
        <text x="10" y="40" class="${font}">${text}</text>
      </svg>`;
    return `data:image/svg+xml;base64,${btoa(svgString)}`;
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Dialog>
        <DialogTrigger>
          <Button variant="outline">Sign PDF</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Sign PDF</DialogTitle>
            <DialogDescription>Sign your PDF here</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="draw" className='w-[400px]'>
            <TabsList>
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="file-picker">Upload</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
            </TabsList>
            <TabsContent value="draw" className='pr-5'>
              <DrawSignature setDrawSignature={setDrawSignature} />
            </TabsContent>
            <TabsContent value="file-picker" className='pr-5'>
              <FilePicker setFileSignature={setFileSignature} />
            </TabsContent>
            <TabsContent value="type" className='pr-5'>
              <TypeSignature setTypeSignature={setTypeSignature} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      {drawSignature && <Draggable><img src={drawSignature} alt="Drawn signature" /></Draggable>}
      {typeSignature && <Draggable><img src={generateSVG(typeSignature.text, typeSignature.font)} alt="Typed signature" /></Draggable>}
      {fileSignature && <Draggable><img src={fileSignature} alt="Uploaded signature" /></Draggable>}
    </div>
  );
};

export default Home;
