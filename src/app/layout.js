"use client";

import "./globals.css";
import Navbar from "./_Components/ComponentUser/Navbar/Navbar";
import Footer from "./_Components/ComponentUser/Footer/Footer";
import { QueryClient, QueryClientProvider } from "react-query";

import { library } from "@fortawesome/fontawesome-svg-core";
import * as solidIcons from "@fortawesome/free-solid-svg-icons";
import * as regularIcons from "@fortawesome/free-regular-svg-icons";
import * as brandIcons from "@fortawesome/free-brands-svg-icons";

import MainNav from "./_Components/ComponentUser/MainNav/MainNav";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "flowbite";
import { ContextDashboardProvider } from "@/app/context/DashboardContext";
import { ContextProvider } from "@/app/context/Context";
import { usePathname } from "next/navigation"; // Import usePathname

const addAllIcons = (iconSet) => {
  return Object.keys(iconSet)
    .filter((key) => key !== "prefix" && key !== "fa" && key.startsWith("fa"))
    .map((icon) => iconSet[icon]);
};

library.add(
  ...addAllIcons(solidIcons),
  ...addAllIcons(regularIcons),
  ...addAllIcons(brandIcons)
);

const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get the current pathname
  const isDashboardRoute = pathname.startsWith("/dashboard"); // Check if pathname starts with "/dashboard"

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <title>الثورة السورية</title>
      </head>
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <ContextProvider>
<ContextDashboardProvider>
              {/* Conditionally render Navbar, MainNav, and Footer */}
              {!isDashboardRoute && <MainNav />}
              {!isDashboardRoute && <Navbar />}
              <main>{children}</main>
              {!isDashboardRoute && <Footer />}

            </ContextDashboardProvider>
          </ContextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
