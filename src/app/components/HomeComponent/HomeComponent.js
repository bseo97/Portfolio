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
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh", // Full viewport height
      width: "100%", // Full width
      fontFamily: "DejaVu Sans Mono, monospace",
    }}
  >
    <div className="flex items-center justify-center h-full pt-56">
      <div className="text-center mt-16">
        <p className="text-[#53c9c9] text-3xl font-bold md:text-5xl">
          Welcome
        </p>
        <h1 className="text-[#53c9c9] font-recoletaBlack text-3xl md:text-5xl lg:text-5xl xl:text-5xl mt-2">
          I'm Brian
        </h1>
        <h2 className="mt-3 text-[#53c9c9] py-1 font-bold md:text-xl">
          University of California, <br></br>Irvine Student
        </h2>

        <div className="mt-16 text-[#53c9c9] font-bold font-serif">
            <span>
              Discover
            </span>
            <span className="ml-44">
              Learn More
            </span>
          </div>
        {/*margin between header text and buttons */}
        <div className="mt-3 text-xl font-serif">
          <a
            href="/#portfolio"
            className="cursor-pointer inline-block bg-[#53c9c9] transition-all duration-300 ease-in-out rounded-3xl text-black py-2 px-8 font-bold uppercase hover:bg-[#244e4e] hover:translate-y-1"
          >
            Projects
          </a>
          <a
            href="resume.pdf"
            download="Resume(Brian Seo).pdf"
            className="ml-20 cursor-pointer inline-block bg-[#53c9c9] transition-all duration-300 ease-in-out rounded-3xl text-black py-2 px-10 font-bold uppercase hover:bg-[#244e4e] hover:translate-y-1"
          >
            Resume
          </a>
        </div>
      </div>
    </div>
  </div>
</React.Fragment>


  );
}
