"use-client";

import { Companion } from "@prisma/client";
import { ChatMessage, ChatMessageProps } from "./chat-message";
import { ElementRef, useEffect, useRef, useState } from "react";

interface ChatMessagesProps {
    messages: ChatMessageProps[];
    isLoading: boolean ;
    companion: Companion
}

export const ChatMessages = ({
    messages= [],
    isLoading,
    companion
}: ChatMessagesProps) => {
    const scrollRef = useRef<ElementRef<"div">>(null);

    const [fakeLoading, setFakeLoading] = useState(messages.length === 0 ? true : false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setFakeLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timeout);
        };
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages.length]);

    return (
    <div className="flex-1 overflow-y-auto pr-4">
       <ChatMessage 
        role="system"
        content={`Hello, I am ${companion.name}, ${companion.description}`}
        src={companion.src}
        isLoading={fakeLoading}   
       />
       {
        messages.map((message) => (
            <ChatMessage 
                key={message.content}
                role={message.role}
                content={message.content}
                src={message.src}
            />
        ))} 
        {isLoading && (
            <ChatMessage 
                role="system"
                src={companion.src}
                isLoading
            />
        )}
        <div ref={scrollRef} />
    </div>
    )
};