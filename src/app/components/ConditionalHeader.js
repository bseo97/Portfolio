'use client'
import { usePathname } from 'next/navigation'
import Header from './Header/Header'

export default function ConditionalHeader() {
  const pathname = usePathname()
  
  // Hide header on project detail pages
  const hideHeader = pathname.startsWith('/projects/')
  
  if (hideHeader) {
    return null
  }
  
  return <Header />
} 