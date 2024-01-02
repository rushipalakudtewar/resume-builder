import React from 'react'

const Spinner = () => {
  return (
    <>
    <div className='fixed z-10 top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
    <div className='h-8 w-8 bg-slate-900 shadow-md rounded-full animate-bounce mr-1' style={{ animationDelay: '-0.3s' }}></div>
    <div className='h-8 w-8 bg-slate-900 shadow-md rounded-full animate-bounce mr-1' style={{ animationDelay: '-0.15s' }}></div>
    <div className='h-8 w-8 bg-slate-900 shadow-md rounded-full animate-bounce mr-1'></div>
    <span className='sr-only'>Loading...</span>
  </div>
  </>
  )
}

export default Spinner