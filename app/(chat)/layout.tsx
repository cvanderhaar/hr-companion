import React from 'react'

const ChatLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
  return (
    <div className='mx-auto w-full max-w-4xl h-full'>
      {children}
    </div>
  )
}

export default ChatLayout;
