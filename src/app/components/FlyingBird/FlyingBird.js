'use client'
import React from 'react';

export default function FlyingBird() {
  const colors = {
    '0': 'transparent',
    '1': '#FFFFFF',        // White body
    '2': '#F5F5F5',        // Light gray highlights
    '3': '#CCCCCC',        // Medium gray shading
    '4': '#000000',        // Black (wing tips, eye, outlines)
    '5': '#FF8C00',        // Orange beak and feet
    '6': '#E6E6E6',        // Very light gray
  };

  // Frame 1: Wings spread high (soaring)
  const frame1 = [
    ['0','0','4','4','4','0','0','0','0','0','0','0','0','0','0','0','4','4','4','0','0','0'],
    ['0','4','4','4','4','4','0','0','0','0','0','0','0','0','0','4','4','4','4','4','0','0'],
    ['4','4','4','1','1','1','3','0','0','0','0','0','0','0','3','1','1','1','4','4','4','0'],
    ['4','4','1','1','1','1','1','3','0','0','0','0','0','3','1','1','1','1','1','4','4','0'],
    ['0','4','1','1','1','1','1','1','3','3','3','3','3','1','1','1','1','1','1','4','0','0'],
    ['0','0','3','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','3','0','0','0'],
    ['0','0','0','3','1','1','1','1','1','1','1','1','1','1','1','1','1','3','0','0','0','0'],
    ['0','0','0','0','3','3','1','1','1','1','1','1','1','1','3','3','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','3','1','1','4','1','1','1','3','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','3','1','4','1','5','5','3','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','3','3','3','3','3','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','5','5','0','0','0','0','0','0','0','0','0','0'],
  ];

  // Frame 2: Wings middle position
  const frame2 = [
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','4','4','4','0','0','0','0','0','0','0','0','0','0','0','4','4','4','0','0','0'],
    ['0','4','4','4','1','4','0','0','0','0','0','0','0','0','0','4','1','4','4','4','0','0'],
    ['4','4','1','1','1','1','3','3','3','3','3','3','3','3','3','1','1','1','1','4','4','0'],
    ['4','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','4','0'],
    ['0','3','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','3','0','0'],
    ['0','0','3','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','3','0','0','0'],
    ['0','0','0','3','3','1','1','1','1','1','1','1','1','1','1','3','3','0','0','0','0','0'],
    ['0','0','0','0','0','3','1','1','4','1','1','1','1','3','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','3','1','4','1','5','5','3','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','3','3','3','3','3','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','5','5','0','0','0','0','0','0','0','0','0','0','0'],
  ];

  // Frame 3: Wings swept down (active flapping)
  const frame3 = [
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0'],
    ['4','4','4','4','4','4','3','3','3','3','3','3','3','3','3','3','4','4','4','4','4','4'],
    ['4','4','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','4','4','0'],
    ['0','4','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','4','0','0'],
    ['0','0','3','1','1','1','1','1','1','1','1','1','1','1','1','1','1','1','3','0','0','0'],
    ['0','0','0','3','1','1','1','1','1','1','1','1','1','1','1','1','1','3','0','0','0','0'],
    ['0','0','0','0','3','3','1','1','4','1','1','1','1','3','3','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','3','1','4','1','5','5','3','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','3','3','3','3','3','0','0','0','0','0','0','0','0','0','0'],
    ['0','0','0','0','0','0','0','0','5','5','0','0','0','0','0','0','0','0','0','0','0','0'],
  ];

  // Individual frame states for each bird
  const [bird1Frame, setBird1Frame] = React.useState(0);
  const [bird2Frame, setBird2Frame] = React.useState(1); // Offset
  const [bird3Frame, setBird3Frame] = React.useState(2); // Different offset
  
  const frames = [frame1, frame2, frame3, frame2]; // Smooth flapping cycle

  React.useEffect(() => {
    const interval1 = setInterval(() => {
      setBird1Frame((prev) => (prev + 1) % frames.length);
    }, 200);
    
    const interval2 = setInterval(() => {
      setBird2Frame((prev) => (prev + 1) % frames.length);
    }, 220); // Slightly different timing
    
    const interval3 = setInterval(() => {
      setBird3Frame((prev) => (prev + 1) % frames.length);
    }, 180); // Different timing
    
    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, [frames.length]);

  return (
    <div className="seagull-sky">
      <style jsx>{`
        .seagull-sky {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 3;
          overflow: hidden;
        }

        @keyframes glide-right {
          0% {
            left: -150px;
            top: 8%;
            transform: rotate(-2deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          20% {
            top: 5%;
            transform: rotate(0deg);
          }
          40% {
            top: 12%;
            transform: rotate(1deg);
          }
          60% {
            top: 7%;
            transform: rotate(-1deg);
          }
          75% {
            opacity: 1;
          }
          80% {
            top: 10%;
            transform: rotate(0deg);
            opacity: 0.5;
          }
          85% {
            opacity: 0;
          }
          100% {
            left: calc(100% + 150px);
            top: 8%;
            transform: rotate(-2deg);
            opacity: 0;
          }
        }

        @keyframes soar-left {
          0% {
            right: -150px;
            top: 20%;
            transform: scaleX(-1) rotate(3deg);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          25% {
            top: 16%;
            transform: scaleX(-1) rotate(1deg);
          }
          50% {
            top: 25%;
            transform: scaleX(-1) rotate(-1deg);
          }
          70% {
            opacity: 1;
          }
          75% {
            top: 18%;
            transform: scaleX(-1) rotate(2deg);
            opacity: 0.5;
          }
          80% {
            opacity: 0;
          }
          100% {
            right: calc(100% + 150px);
            top: 20%;
            transform: scaleX(-1) rotate(3deg);
            opacity: 0;
          }
        }

        @keyframes drift-arc {
          0% {
            left: -150px;
            top: 30%;
            transform: rotate(-3deg) scale(0.85);
            opacity: 0;
          }
          5% {
            opacity: 1;
          }
          15% {
            top: 25%;
            transform: rotate(-1deg) scale(0.85);
          }
          35% {
            top: 35%;
            transform: rotate(2deg) scale(0.85);
          }
          55% {
            top: 28%;
            transform: rotate(-2deg) scale(0.85);
          }
          70% {
            opacity: 1;
          }
          75% {
            top: 33%;
            transform: rotate(1deg) scale(0.85);
            opacity: 0.5;
          }
          80% {
            opacity: 0;
          }
          100% {
            left: calc(100% + 150px);
            top: 30%;
            transform: rotate(-3deg) scale(0.85);
            opacity: 0;
          }
        }

        .seagull {
          position: absolute;
          filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.25));
          will-change: transform, left, right, top;
          backface-visibility: hidden;
        }

        .seagull-1 {
          left: -150px;
          top: 8%;
          opacity: 0;
          transform: rotate(-2deg);
          animation: glide-right 18s linear infinite;
          animation-delay: 2s;
          animation-fill-mode: both;
          z-index: 3;
        }

        .seagull-2 {
          right: -150px;
          left: auto;
          top: 20%;
          opacity: 0;
          transform: scaleX(-1) rotate(3deg);
          animation: soar-left 18s linear infinite;
          animation-delay: 8s;
          animation-fill-mode: both;
          z-index: 2;
        }

        .seagull-3 {
          left: -150px;
          top: 30%;
          opacity: 0;
          transform: rotate(-3deg) scale(0.85);
          animation: drift-arc 18s linear infinite;
          animation-delay: 14s;
          animation-fill-mode: both;
          z-index: 1;
        }

        .pixel {
          width: 2.5px;
          height: 2.5px;
          display: inline-block;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          image-rendering: pixelated;
        }

        .pixel-row {
          height: 2.5px;
          line-height: 0;
          font-size: 0;
        }

      `}</style>
      
      {/* First Seagull - Gliding right */}
      <div className="seagull seagull-1">
        <div>
          {frames[bird1Frame].map((row, rowIndex) => (
            <div key={`s1-r${rowIndex}`} className="pixel-row">
              {row.map((pixel, colIndex) => (
                <div
                  key={`s1-p${colIndex}`}
                  className="pixel"
                  style={{ backgroundColor: colors[pixel] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Second Seagull - Soaring left */}
      <div className="seagull seagull-2">
        <div>
          {frames[bird2Frame].map((row, rowIndex) => (
            <div key={`s2-r${rowIndex}`} className="pixel-row">
              {row.map((pixel, colIndex) => (
                <div
                  key={`s2-p${colIndex}`}
                  className="pixel"
                  style={{ backgroundColor: colors[pixel] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Third Seagull - Drifting in arc */}
      <div className="seagull seagull-3">
        <div>
          {frames[bird3Frame].map((row, rowIndex) => (
            <div key={`s3-r${rowIndex}`} className="pixel-row">
              {row.map((pixel, colIndex) => (
                <div
                  key={`s3-p${colIndex}`}
                  className="pixel"
                  style={{ backgroundColor: colors[pixel] }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}