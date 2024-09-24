"use client";

import { JetBrains_Mono } from "next/font/google";
import './globals.css';
import { useEffect } from 'react';
import { useRouter, usePathname } from "next/navigation";
import Cookies from 'js-cookie';

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-jetbrainsMono",
});

const metadata = {
  author : "Muhamad Andhika Bagaskra",
  title : "TODO List",
  description : "BTS.id - Frontend Test - TODO List",
  logo : "/icon.png",
};

export default function RootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for existing cookie
    const existingToken = Cookies.get('token');
    const isAuthPage = ["/login", "/register"].includes(pathname);

    if ( isAuthPage && existingToken ) {
      router.push('/');
    }
    else if ( !isAuthPage && !existingToken ) {
      router.push('/login');
    }
  }, [router, pathname]);

  return (
    <html lang="en" className="w-full h-full">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href={metadata.logo} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta name="author" content={metadata.author} />

        <title>{metadata.title}</title>
      </head>
      <body className={`${jetbrainsMono.variable} w-full h-full`}>
        {children}
      </body>
    </html>
  )
}