"use client";
import { useContext } from "react";
import Head from "next/head";

import { useRouter, useSearchParams } from "next/navigation";
import { ContextUser } from "../context/Context";
import Header from "./_Components/ComponentUser/Header/Header";
import AlertImageDash from "./_Components/Dashboard/AlertImageDash/AlertImageDash";
import LastNews from "./_Components/ComponentUser/MainPageFirst/LastNewsSection/lastNewsSection";
import Martyr from "./_Components/ComponentUser/MainPageFirst/MartyrSection/MartyrSection";
import System from "./_Components/ComponentUser/MainPageFirst/SystemSection/SystemSection";
import Revolution from "./_Components/ComponentUser/MainPageFirst/RevolutionSection/RevolutionSection";
import Maarek from "./_Components/ComponentUser/MainPageFirst/MaarekSection/MaarekSection";
import Symbols from "./_Components/ComponentUser/MainPageFirst/SymbolsSection/SymbolsSection";
import MessageOpenHomeUser from "./_Components/ComponentUser/MessageOpenHomeUser/MessageOpenHomeUser";
import UpdatedPassword from "./_Components/ComponentUser/UpdatedPassword/UpdatedPassword";

export default function HomeUser({ searchGlobal, setSearchGlobal }) {
  const { openAlert, openAlertStore, openOne } = useContext(ContextUser);

  const searchParams = useSearchParams();
  const userId = searchParams.get("id"); // Get userId from query parameter

  return (
    <>
      <Head>
        <title>الثورة السورية</title>
        <meta name="description" content="اخبار الثورة السورية" />
        <style></style>
      </Head>
      <Header />
      <div className="centerUser py-6 px-4">
        {/* Render UpdatedPassword if userId exists */}
        {userId ? <UpdatedPassword userId={userId} /> : null}
        <>
          <LastNews />
          <Martyr />
          <System />
          <Revolution />
          <Maarek />
          <Symbols />
        </>
      </div>
      {/* Conditional Modals */}
      {openAlert && <AlertImageDash src={openAlertStore} />}
      {openOne && <MessageOpenHomeUser />}
    </>
  );
}
