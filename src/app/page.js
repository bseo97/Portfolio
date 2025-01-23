'use client'

// parent page
import Image from "next/image";

import HomeComponent from './components/HomeComponent/HomeComponent'
export default function Home() {
  return (
    <main className= "">
      <HomeComponent/>  {/*Home component self is a closing tag; therefore, we do not need closing tag.*/}  
    
      </main>
 
  )
}
