import { isAuthenticated } from '@/lib/actions/auth.action';
import { redirect } from 'next/navigation';
import React from 'react'

const authLayout = async ({ children } : { children: React.ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();

  if(isUserAuthenticated)
    redirect('/');
  return (
    <div className='flex items-center justify-center mx-auto max-w-7xl min-h-screen max-sm:px-4 max-sm:py-8'>
      {children}
    </div>
  )
}

export default authLayout
