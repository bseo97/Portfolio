import React from 'react'

// props over item, index inside the parameter. it will represent each element within the array
// maps through the data array, and pass in the item to data array
export default function SliderCard({ item, index }) {
  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 max-w-sm mx-auto">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <img 
            src={item.images[0]}
            alt={item.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
          {/* Overlay for hover effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <button className="w-full bg-[#53c9c9] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#244e4e] transition-colors duration-200">
                View Project
              </button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {item.des}
          </p>
          
          {/* Tags/Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-[#53c9c9]/10 text-[#53c9c9] text-xs rounded-full font-medium">
              React.js
            </span>
            <span className="px-3 py-1 bg-[#53c9c9]/10 text-[#53c9c9] text-xs rounded-full font-medium">
              Next.js
            </span>
            <span className="px-3 py-1 bg-[#53c9c9]/10 text-[#53c9c9] text-xs rounded-full font-medium">
              Tailwind
            </span>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs">
              Project #{index + 1}
            </span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-500 text-xs font-medium">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
