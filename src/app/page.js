"use client";
import { useContext } from "react";
import Head from "next/head";
// import MainNav from "../components/MainNav/MainNav";
import Header from "./_Components/ComponentUser/Header/Header";
// import AlertImageDash from "./_Components/Dashboard/AlertImageDash/AlertImageDash";
// import MessageOpenHomeUser from "./_Components/MessageOpenHomeUser/MessageOpenHomeUser";
import { ContextUser } from "../context/Context";

export default function HomeUser({ searchGlobal, setSearchGlobal }) {
  const { openAlert, openAlertStore, openOne } = useContext(ContextUser);

  return (
    <>
      <Head>
        <title>الثورة السورية</title>
        <meta name="description" content="اخبار الثورة السورية" />
      </Head>
      {/* <MainNav searchGlobal={searchGlobal} setSearchGlobal={setSearchGlobal} /> */}
      <Header />
      <div className="centerUser py-6 px-4">{/* Main Content */}</div>
      {/* Conditional Modals */}
      {/* {openAlert && <AlertImageDash src={openAlertStore} />}
      {openOne && <MessageOpenHomeUser />} */}
    </>
  );
}
