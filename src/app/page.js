'use client'

// parent page
import Image from "next/image";

import HomeComponent from './components/HomeComponent/HomeComponent'
export default function Home() {
  return (
    <main className="min-h-screen relative">
      
      {/*Home component self is a closing tag; therefore, we do not need closing tag.*/}  
      <HomeComponent/>  
      <div
      id="projects" 
      className='mt-0 pt-5 -mb-40'
      style={{
        backgroundColor: "gray",
        width: "100%",
      }}>
        <div className="container m-auto">
          <p className="text-[200px]">
            portfolio
          </p>
        </div>

      </div>

      </main>
 
  )
}
