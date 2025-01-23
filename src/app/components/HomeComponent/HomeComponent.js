import React from "react";
// import {Hind} from 'next/font/google'

//importing skewbox
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

// for automatic formatting proper indentation, right click->format with -> 'prettier'
// Home layout setup
// Have to render within the parent page.
// const hind = Hind({
//   subsets: ["latin"],
//   weight: ["300", "400", "500", "600", "700"],
// });
export default function HomeComponent() {
  var settings = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    speed: 2000, //2s
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    loop: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1760,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1460,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
<React.Fragment>
  <div
    id="home"
    style={{
      backgroundImage: "url(code_background.png)",
      backgroundSize: "cover", // Ensures the background covers the entire container
      backgroundRepeat: "no-repeat", // Prevents the image from repeating
      backgroundPosition: "center", // Centers the image both vertically and horizontally
      height: "130vh", // Ensures the height fills the viewport
      width: "100%",
//      padding: "320px 50px 50px 30px",
      fontFamily: "'Times New Roman', Times, serif",
     }}
  >
    
    <div className="container m-auto">
      <div className="grid grid-cols-12">
        {/* Information Section */}
        <div className="bg-transparent flex flex-col justify-center col-span-12 md:col-span-5 md:bg-transparent">
          <div className="container m-auto">
          {/* <div className="pl-0 sm:pl-8 md:pl-16 lg:pl-24 py-20 sm:py-32 md:py-40 text-center md:text-start"> */}
              <div className="xl:pt-[600px] xl:pl-[300px] text-center ">
              <p
                className={`text-[#52c991] text-3xl font-bold md:text-base lg:text-2xl`}
              >
                Welcome
              </p>
              <h1
                className={
                  "text-[#ffffff] font-recoletaBlack text-5xl md:text-5xl lg:text-7xl xl:text-7xl mt-5 md:mt-1"
                }
              >
                I'm Brian
              </h1>
              <h2 className={`text-[#ffffff] py-1 font-bold md:text-xl`}>
                University of California, Irvine Student
              </h2>
              <a
                href="/#portfolio"
                className={`cursor-pointer inline-block bg-[#52c991] transition-all duration-300 ease-in-out rounded-lg text-white py-2 px-5 font-bold mt-8 uppercase md:py-2 lg:py-3 lg:px-8 md:text-xd ls:text-base md:mt-2 xl:mt-10 hover:bg-[#20614b] hover:show-lg treansform hover:translate-y-1`}
              >
                Projects
              </a>
              <a
                href="resume.pdf"
                download="Resume(Brian Seo).pdf"
                className={`ml-10 cursor-pointer inline-block bg-[#52c991] transition-all duration-300 ease-in-out rounded-lg text-white py-2 px-5 font-bold mt-8 uppercase md:py-2 lg:py-3 lg:px-8 md:text-xd ls:text-base md:mt-2 xl:mt-10 hover:bg-[#20614b] hover:show-lg treansform hover:translate-y-1`}
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</React.Fragment>

  );
}
