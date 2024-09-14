/* eslint-disable @typescript-eslint/no-unused-vars */

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

export default function Home() {
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

            <TabsContent value="draw">
              <h1>This is the draw tab</h1>
            </TabsContent>

            <TabsContent value="file-picker" className='pr-5'>
              <FilePicker />
            </TabsContent>

            <TabsContent value="type">
              <h1>This is the write tab</h1>
            </TabsContent>

          </Tabs>

        </DialogContent>

      </Dialog>

    </div>
  );
}
