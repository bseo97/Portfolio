import "./globals.css";
import { Plus_Jakarta_Sans } from 'next/font/google'
import ConditionalHeader from './components/ConditionalHeader'
import { ThemeProvider } from './hooks/useTheme'

// Premium geometric grotesk — replaces Inter across the whole site.
// Exposed as a CSS variable so both globals.css and styled-jsx blocks
// can reference it via var(--font-sans).
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
})

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
    
    <html lang="en" className={jakarta.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body
        className={jakarta.className}
      >
        <ThemeProvider>
          <ConditionalHeader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
