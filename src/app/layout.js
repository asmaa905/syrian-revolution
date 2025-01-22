"use client";

import "./globals.css";
import Navbar from "./_Components/Layouts/Navbar/Navbar";
import Footer from "./_Components/Layouts/Footer/Footer";
import { ContextProvider } from "../context/Context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>الثورة السورية</title>
      </head>
      <body className="antialiased">
        {/* Ensure QueryClientProvider wraps the entire tree */}
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </ContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
