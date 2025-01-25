import React from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DiagonalDrawer({
  isOpen,
  setIsOpen,
  selectedIndex1,
  setSelectedIndex1,
}) {
  const route = useRouter();
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)} // Close drawer on overlay click
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-72 w-full bg-white shadow-lg transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b cursor-pointer" >
          <span className="text-lg font-bold text-gray-700">Menu</span>
          {/* <button
            className="text-gray-600 text-xl"
            onClick={() => setIsOpen(false)} // Close drawer on '✕' button click
          >
            ✕
          </button> */}
        </div>

        {/* Navigation Links */}
        <nav className="mt-4 text-center">
          <ul className="space-y-4">
            <li className="px-6 py-2">
              <a
                href="/#home"
                className={`text-gray-700 font-semibold ${
                  selectedIndex1 === 0 ? "text-black" : ""
                }`}
                onClick={() => {
                  setSelectedIndex1(0);
                  setIsOpen(false); // Close the drawer after clicking
                }}
              >
                Home
              </a>
            </li>
            <li className="px-6 py-2">
              <a
                href="/#aboutme"
                className={`text-gray-700 font-semibold ${
                  selectedIndex1 === 1 ? "text-black" : ""
                }`}
                onClick={() => {
                  setSelectedIndex1(1);
                  setIsOpen(false);
                }}
              >
                AboutMe
              </a>
            </li>
            <li className="px-6 py-2">
              <a
                href="/#projects"
                className={`text-gray-700 font-semibold ${
                  selectedIndex1 === 2 ? "text-black" : ""
                }`}
                onClick={() => {
                  setSelectedIndex1(2);
                  setIsOpen(false);
                }}
              >
                Projects
              </a>
            </li>
            <li className="px-6 py-2">
              <a
                href="/#contactme"
                className={`text-gray-700 font-semibold ${
                  selectedIndex1 === 3 ? "text-black" : ""
                }`}
                onClick={() => {
                  setSelectedIndex1(3);
                  setIsOpen(false);
                }}
              >
                ContactMe
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
