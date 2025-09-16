import "./globals.css";
import { Inter } from 'next/font/google'
import ConditionalHeader from './components/ConditionalHeader'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Brian's Portfolio",
  description: "Brian's portfolio",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  }
};

export default function RootLayout({ children }) {
  return (
    
    <html lang="en">
      <body
        className={inter.className}
      >
        <ConditionalHeader />
        {children}
      </body>
    </html>
  );
}
