"use client";

import React from 'react'
import { ChatRequestOptions } from 'ai';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SendHorizonal } from 'lucide-react';

interface ChatFormPorps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>, chatRequestOptions?: ChatRequestOptions | undefined) => void;
    isLoading: boolean;
}

const ChatForm = ({
    input,
    handleInputChange,
    onSubmit,
    isLoading
}: ChatFormPorps) => {
  return (
    <form onSubmit={onSubmit} className="border-t border-primary/10 py-4 flex items-center gap-x-2">
      <Input 
        value={input}
        onChange={handleInputChange}
        disabled={isLoading}
        placeholder="Type a message"
        className="rounded-lg bg-primary/10"
      />
      <Button variant="ghost" disabled={isLoading}>
        <SendHorizonal className='w-6 h-6'/>
      </Button>  
    </form>
  )
}

export default ChatForm;
