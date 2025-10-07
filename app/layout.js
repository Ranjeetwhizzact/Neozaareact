import './globals.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import { Inter, Roboto_Mono } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
// import { DefaultSeo } from 'next-seo';



const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

// export const metadata = {
//   title: {
//     default: 'Your Website Name',
//     template: '%s | Your Website Name'
//   },
//   description: 'Default description for your website',
//   metadataBase: new URL('https://yourwebsite.com'),
//   openGraph: {
//     type: 'website',
//     locale: 'en_US',
//     siteName: 'Your Website Name',
//   },
//   robots: {
//     index: true,
//     follow: true,
//   },
// }


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
    
      <body className="antialiased" suppressHydrationWarning={true}>
         {/* <DefaultSeo {...defaultSEOConfig} /> */}
      {/* <Component {...pageProps} /> */}
        {/* <Header /> */}
        {children}
        {/* <Footer /> */}
        <Toaster position="top-right" reverseOrder={false} />
      </body>
    </html>
  );
}
