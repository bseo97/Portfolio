import "./globals.css";
import { Inter } from 'next/font/google'
import ConditionalHeader from './components/ConditionalHeader'
import { ThemeProvider } from './hooks/useTheme'

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body
        className={inter.className}
      >
        <ThemeProvider>
          <ConditionalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
