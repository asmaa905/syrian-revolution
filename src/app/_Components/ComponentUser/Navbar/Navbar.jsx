"use client";
import React, { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ContextUser } from "@/app/context/Context";
import { Link as ScrollLink } from "react-scroll";

export default function Navbar() {
  const { role } = useContext(ContextUser);
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const getLinkClass = (link) => {
    return activeLink === link ? " " : "";
  };
  const pathName = usePathname();
  const router = useRouter();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto md:py-4 px-4 md:px-0">
        <button
          data-collapse-toggle="navbar-dropdown"
          type="button"
          className="inline-flex  absolute top-[162px] md:static items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-dropdown"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-[100%] md:block" id="navbar-dropdown">
          <ul className="flex text-center md:text-inherit flex-col justify-between font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 ">
            <li className="py-[8px] md:py-0">
              <Link
                href="/"
                passHref
                className={`nav-link text-[#000c] ${
                  pathName === "/" ? "border-b border-red-500 text-red-500" : ""
                } ${getLinkClass("/")}`}
                onClick={() => handleLinkClick("/")}
              >
                الرئيسية
              </Link>
            </li>

            <li className="py-[8px] md:py-0">
              <Link
                href="/lastNews"
                passHref
                className={` text-[#000c] ${
                  pathName === "/lastNews"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  ${getLinkClass("/lastNews")}`}
                onClick={() => handleLinkClick("/lastNews")}
              >
                اخر الاخبار
              </Link>
            </li>

            {/* first dropdown */}
            <li className="relative group  mx-auto md:m-0 py-[8px] md:py-0">
              <Link
                href="/archiefthoura"
                className={`${
                  pathName === "/archiefthoura"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  flex items-center md:justify-between  w-full py-2 px-3
               text-[#000c]rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
               md:p-0 md:w-auto
               `}
              >
                أرشيف الثورة
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 1-4 4-4-4"
                  />
                </svg>
              </Link>
              <div
                className="absolute hidden group-hover:block z-10 font-normal w-[130px]
               divide-y divide-gray-100 rounded-lg shadow cursor-pointer"
              >
                <ul
                  className=" rounded-md text-[16px] bg-[#131434] text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li className=" p-2">
                    <ScrollLink
                      className="nav-link text-white"
                      to="oneoneone"
                      duration={500}
                      offset={-70}
                    >
                      ارشيف الثورة
                    </ScrollLink>
                  </li>
                  <li className=" p-2">
                    <ScrollLink
                      className="nav-link  text-white"
                      to="oneone"
                      duration={500}
                      offset={-70}
                    >
                      المظاهرات
                    </ScrollLink>
                  </li>
                  <li className="p-2 pb-2">
                    <ScrollLink
                      className="nav-link p-2 text-white"
                      to="onethreefour"
                      duration={500}
                      offset={-70}
                    >
                      معارك الثوار
                    </ScrollLink>
                  </li>
                </ul>
              </div>
            </li>
            {/* second drop down */}
            <li className="relative group  mx-auto md:m-0 py-[8px] md:py-0 ">
              <Link
                href="/symbolthourauser"
                className={`${
                  pathName === "/symbolthourauser"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  flex items-center md:justify-between w-full py-2 px-3
    text-[#000c]rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
    md:p-0 md:w-auto
    `}
              >
                رموز الثورة
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 1-4 4-4-4"
                  />
                </svg>
              </Link>
              <div
                className="absolute hidden group-hover:block z-10 font-normal  w-[130px]
               divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 cursor-pointer"
              >
                <ul
                  className=" rounded-md text-[16px] bg-[#131434] text-gray-700 dark:text-gray-400"
                  aria-labelledby="dropdownLargeButton"
                >
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="twoone"
                      duration={500}
                      offset={-70}
                    >
                      رموز الثورة
                    </ScrollLink>
                  </li>
                  <li className=" p-2">
                    <ScrollLink
                      to="twotwo"
                      duration={500}
                      offset={-70}
                      className="nav-link text-white block"
                    >
                      بطاقة التكريم
                    </ScrollLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* third dropdown */}
            <li className="relative group  mx-auto md:m-0 py-[8px] md:py-0">
              <Link
                href="/blacklistuser"
                className={`${
                  pathName === "/blacklistuser"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  flex items-center md:justify-between w-full py-2 px-3
    text-[#000c]rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
    md:p-0 md:w-auto
    `}
              >
                القائمة السوداء
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 1-4 4-4-4"
                  />
                </svg>
              </Link>
              <div
                className="absolute hidden group-hover:block z-10 font-normal w-[130px]
               divide-y divide-gray-100 rounded-md shadow cursor-pointer"
              >
                <ul
                  className=" rounded-md  text-[16px] bg-[#131434] text-gray-700 "
                  aria-labelledby="dropdownLargeButton"
                >
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="threeone"
                      duration={500}
                      offset={-70}
                    >
                      القائمة السوداء
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="threetwo"
                      duration={500}
                      offset={-70}
                    >
                      العملاء
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block"
                      to="threethree"
                      duration={500}
                      offset={-70}
                    >
                      مجرمين الحرب
                    </ScrollLink>
                  </li>
                </ul>
              </div>
            </li>

            {/* forth dropdowm */}
            <li className="relative group  mx-auto md:m-0 py-[8px] md:py-0">
              <Link
                href="/graamsystem"
                className={`${
                  pathName === "/graamsystem"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  flex items-center md:justify-between w-full py-2 px-3
    text-[#000c]rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
    md:p-0 md:w-auto
    `}
              >
                ملفات النظام
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 1-4 4-4-4"
                  />
                </svg>
              </Link>
              <div
                className="absolute hidden group-hover:block z-10 font-normal w-[130px]
               divide-y divide-gray-100 rounded-md shadow cursor-pointer"
              >
                <ul
                  className=" rounded-md  text-[16px] bg-[#131434] text-gray-700 "
                  aria-labelledby="dropdownLargeButton"
                >
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="fourone"
                      duration={500}
                      offset={-70}
                    >
                      ملفات النظام
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="fourtwo"
                      duration={500}
                      offset={-70}
                    >
                      الشهداء
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block"
                      to="fourthree"
                      duration={500}
                      offset={-70}
                    >
                      المفقودين
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block"
                      to="fourfour"
                      duration={500}
                      offset={-70}
                    >
                      المعتقلين
                    </ScrollLink>
                  </li>
                </ul>
              </div>
            </li>
            {/* fifth dropdown */}
            <li className="relative group  mx-auto md:m-0 py-[8px] md:py-0">
              <Link
                href="/graemqasad"
                className={`${
                  pathName === "/graemqasad"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  flex items-center md:justify-between w-full py-2 px-3
    text-[#000c]rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
    md:p-0 md:w-auto
    `}
              >
                ملفات قسد
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 1-4 4-4-4"
                  />
                </svg>
              </Link>
              <div
                className="absolute hidden group-hover:block z-10 font-normal w-[130px]
               divide-y divide-gray-100 rounded-md shadow cursor-pointer"
              >
                <ul
                  className=" rounded-md  text-[16px] bg-[#131434] text-gray-700 "
                  aria-labelledby="dropdownLargeButton"
                >
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="fiveone"
                      duration={500}
                      offset={-70}
                    >
                      ملفات قسد
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="fivetwo"
                      duration={500}
                      offset={-70}
                    >
                      الشهداء
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block"
                      to="fivethree"
                      duration={500}
                      offset={-70}
                    >
                      المفقودين
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block"
                      to="fivefour"
                      duration={500}
                      offset={-70}
                    >
                      المعتقلين
                    </ScrollLink>
                  </li>
                </ul>
              </div>
            </li>
            {/* sith  dropdown */}
            <li className="relative group  mx-auto md:m-0 py-[8px] md:py-0">
              <Link
                href="/graemdashuser"
                className={`${
                  pathName === "/graemdashuser"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  flex items-center md:justify-between w-full py-2 px-3
    text-[#000c]rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0
    md:p-0 md:w-auto
    `}
              >
                ملفات داعش
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m9 1-4 4-4-4"
                  />
                </svg>
              </Link>
              <div
                className="absolute hidden group-hover:block z-10 font-normal w-[130px]
               divide-y divide-gray-100 rounded-md shadow cursor-pointer"
              >
                <ul
                  className=" rounded-md  text-[16px] bg-[#131434] text-gray-700 "
                  aria-labelledby="dropdownLargeButton"
                >
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="sevenone"
                      duration={500}
                      offset={-70}
                    >
                      ملفات داعش
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block "
                      to="seventwo"
                      duration={500}
                      offset={-70}
                    >
                      الشهداء
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block"
                      to="seventhree"
                      duration={500}
                      offset={-70}
                    >
                      المفقودين
                    </ScrollLink>
                  </li>
                  <li className="p-2">
                    <ScrollLink
                      className="nav-link text-white block"
                      to="sevenfour"
                      duration={500}
                      offset={-70}
                    >
                      المعتقلين
                    </ScrollLink>
                  </li>
                </ul>
              </div>
            </li>
            <li className="py-[8px] md:py-0">
              <Link
                href="/WantedToSystem"
                passHref
                className={`nav-link text-[#000c] ${
                  pathName === "/WantedToSystem"
                    ? "border-b border-red-500 text-red-500"
                    : ""
                }  ${getLinkClass("/lastNews")}`}
                onClick={() => handleLinkClick("/")}
              >
                المطلوبين للنظام
              </Link>
            </li>

            {role === "admin" || role === "supervisor" || role === "owner" ? (
              <li className="nav-item">
                <button
                  className="nav-link"
                  aria-current="page"
                  onClick={() =>
                    role === "admin" || role === "owner"
                      ? router.push("/dashboard/userdash")
                      : router.push("/dashboard/history")
                  }
                  to="/dashboard/userdash"
                >
                  صفحة الادمن
                </button>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
