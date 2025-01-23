"use client";

import "./globals.css";

import Navbar from "./_Components/ComponentUser/Navbar/Navbar";
import Footer from "./_Components/ComponentUser/Footer/Footer";
import { ContextProvider } from "../context/Context";
import { QueryClient, QueryClientProvider } from "react-query";
// src/icons.js
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

// src/icons.js
import { library } from "@fortawesome/fontawesome-svg-core";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";
import MainNav from "./_Components/ComponentUser/MainNav/MainNav";
import "flowbite";
// Function to add all icons from a set
const addAllIcons = (iconSet) => {
  return Object.keys(iconSet)
    .filter((key) => key !== "prefix" && key !== "fa" && key.startsWith("fa"))
    .map((icon) => iconSet[icon]);
};

// Add all icons to the library
library.add(
  ...addAllIcons(solidIcons),
  ...addAllIcons(regularIcons),
  ...addAllIcons(brandIcons)
);

// Add icons to the library

const queryClient = new QueryClient();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/public/faveicon.ico" />

        <title>الثورة السورية</title>
      </head>
      <body className="antialiased">
        {/* Ensure QueryClientProvider wraps the entire tree */}
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
            <MainNav />

            <Navbar />

            <main>{children}</main>
            <Footer />
          </ContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
