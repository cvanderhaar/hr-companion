import { Companion } from '@prisma/client';
import Image from 'next/image';
import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';

interface CompanionsProps {
   data: (Companion & {
      _count: {
         messages: number
      }
   }) [];
}

const Companions = ({
   data
}: CompanionsProps) => {
  if (data.length === 0) {
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className='relative w-60 h-40'>
          <Image 
            fill
            className="grayscale"
            alt="Empty"
            src="/human-resources.png"
          />  
        </div>
        <p className="text-sm text-muted-foreground">
          No companions found.
        </p>
      </div>
    )
  }

  return (
    <div className='pb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2'>
      {data.map((item) => (
        <Card
          key={item.id}
          className='bg-primary/10 rounded-xl cursor-pointer hover:opacity-75 transition border-0'
        >
          <Link href={`/chat/${item.id}`}>
            <CardHeader className='flex items-center justify-center text-center text-muted-foreground'>
              <div className='relative w-32 h-32'>
                <Image 
                  fill
                  src={item.src}
                  alt={item.name}
                  className='rounded-xl object-cover'
                />
              </div>
              <p className='font-bold'>
                {item.name}
              </p>
              <p className='text-xs'>
                {item.description}
              </p>
            </CardHeader>
            <CardFooter className='flex items-center justify-between text-xs text-muted-foreground'>
              <p className='lowercase'>
                @{item.userName}
              </p>
              <div className='flex items-center'>
                <MessagesSquare className='w-3 h-3 mr-1'/>
                <p className='lowercase'>
                  {item._count.messages}
                </p>
              </div>
            </CardFooter>
          </Link>
        </Card>
      ))}
    </div>
  )
}

export default Companions;
