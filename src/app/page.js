'use client'

// parent page
import Image from "next/image";

import HomeComponent from './components/HomeComponent/HomeComponent'
import MySlider from "./components/SliderCard/MySlider";

// import { transform } from "next/dist/build/swc/generated-native";
export default function Home() {
  return (
    // minimum height = 100vh
    <main className="min-h-screen relative">

      {/*Home component self is a closing tag; therefore, we do not need closing tag.*/}
      <HomeComponent />
      <div
        id="projects"
        className='mt-0 pt-5 -mb-40'
        style={{
          backgroundColor: "gray",
          width: "100%",     
          fontFamily: "DejaVu Sans Mono, monospace",
        }}>
        <div className="container m-auto">
          <p className="text-[100px] text-[#F7FBFD] md:pl-[50px] px-5 max-w-[750px] w-[100%] overflow-hidden"
            style={{ transform: "translate(0px, -20px)" }}
          >
            projects
          </p>
          <div style={{ transform: "translate(0px, -20px)" }}>
            <p className="text-[#53c9c9] md:pl-[80px] px-5 font-extrabold text-5xl">
              Recent Works
            </p>
            <p className={`max-w-2xl md:pl-[80px] text-[16px] text-[#ffffff] leading-8 mt-5`}>

              Developed a responsive portfolio website using Next.js 14, React.js, and Tailwind CSS, implementing dynamic routing, smooth scrolling, fade-in animations, and a "Get Resume" PDF download button. Integrated Nodemailer for email functionality and deployed the site to Vercel, ensuring cross-device compatibility and modern web development best practices.
            </p>
          </div>
        </div>
        <div className="">
          <MySlider/>
        </div>
      </div>

    </main>

  )
}
