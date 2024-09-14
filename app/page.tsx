/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { LegacyRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import FilePicker from '@/components/FilePicker';
import TypeSignature from '@/components/TypeSignature';
import DrawSignature from '@/components/DrawSignature';
import Draggable from 'react-draggable';

export default function Home() {
  const [drawSignature, setDrawSignature] = useState(undefined);
  const [typeSignature, setTypeSignature] = useState(undefined)
  const [fileSignature, setFileSignature] = useState(undefined)


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

      {drawSignature && <Draggable><img draggable src={drawSignature} /></Draggable>}
      {typeSignature && <Draggable><img draggable src={typeSignature} /></Draggable>}
      {fileSignature && <Draggable><img draggable src={fileSignature} /></Draggable>}

    </div>
  );
}
