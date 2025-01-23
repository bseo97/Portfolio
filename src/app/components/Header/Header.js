// Need to switch from server side to client side rendering
// to import the use effect and use state hook
"use client";
import React, { useEffect, useState } from "react";
import Drawer from './DiagonalDrawer'

export default function Header() {
  // When the application on page Y offset = 0, set initial state to false

  // When the application is scrolled, use state is going to be greater than 0, thus true
  // Updating state everytime application is scrolled
  const [selectedIndex1, setSelectedIndex1] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // applying empty dependency,[] to use effect
  }, []);

  const openDrawer = () =>{
    setIsOpen(true)
  }
//  console.log(isScrolled);

  return (
    // using react fragment to not add extra nodes to the tree
<React.Fragment>
  {/* Drawer component for mobile navigation */}
  <div className={`diagonal-drawer ${isOpen ? "open" : ""}`}>
    <Drawer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      selectedIndex1={selectedIndex1}
      setSelectedIndex1={setSelectedIndex1}
    />
  </div>

  {/* Header */}
  <header
    className={`fixed top-0 z-50 w-full transition-all duration-500`}
    style={{
      backgroundColor: "black", // Background color
    }}
  >
    <div className="relative flex justify-between items-center p-4">
      {/* Hamburger Button for Mobile */}
      <button
        className="text-white text-3xl xl:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Home Link (Visible Only on Mobile) */}
      <div className="flex-grow text-center xl:hidden">
        <a
          href="/#home"
          className="text-white text-2xl font-bold"
          onClick={() => setSelectedIndex1(0)}
        >
          Home
        </a>
      </div>

      {/* Placeholder for alignment */}
      <div className="hidden xl:block w-14"></div>
    </div>

    {/* Navigation Links (Visible Only on Desktop) */}
    <nav className="hidden xl:block mt-4">
      <ul className="flex justify-center space-x-8">
        <li>
          <a
            className={`menu-item ${
              selectedIndex1 === 0 ? "text-blue" : ""
            } text-[#ffffff] hover:text-emerald-500`}
            href="/#home"
            onClick={() => setSelectedIndex1(0)}
          >
            Home
          </a>
        </li>
        <li>
          <a
            className={`menu-item ${
              selectedIndex1 === 1 ? "text-blue-200" : ""
            } text-[#ffffff] hover:text-emerald-500`}
            href="/#aboutme"
            onClick={() => setSelectedIndex1(1)}
          >
            AboutMe
          </a>
        </li>
        <li>
          <a
            className={`menu-item ${
              selectedIndex1 === 2 ? "text-black" : ""
            } text-[#ffffff] hover:text-emerald-500`}
            href="/#projects"
            onClick={() => setSelectedIndex1(2)}
          >
            Projects
          </a>
        </li>
        <li>
          <a
            className={`menu-item ${
              selectedIndex1 === 3 ? "text-blue" : ""
            } text-[#ffffff] hover:text-emerald-500`}
            href="/#contactme"
            onClick={() => setSelectedIndex1(3)}
          >
            ContactMe
          </a>
        </li>
      </ul>
    </nav>
  </header>
</React.Fragment>



  );
}
