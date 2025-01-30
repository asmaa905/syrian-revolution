"use client";

import React from "react";
import styles from "../../../css/styleDashboard/DataDisplaySite.module.css";
import { useRouter, usePathname } from "next/navigation";

export default function DataDisplaySiteLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  /**
   * Hide header and tabs ONLY if the pathname is in the format: "/dashboard/dataDisplaySite/{id}"
   * and NOT when visiting other subroutes like "/dashboard/dataDisplaySite/DataSiteArchief"
   */
  const isDataDisplaySiteIdRoute =
    (/^\/dashboard\/dataDisplaySite\/[^/]+$/.test(pathname) ||
      /^\/dashboard\/dataDisplaySite\/dataChildDisplaySite\/[^/]+$/.test(
        pathname
      ) || /^\/dashboard\/dataDisplaySite\/dataChildDisplaySitemascr\/[^/]+$/.test(
        pathname
      )) &&
    !/\/dashboard\/dataDisplaySite\/(DataSiteArchief|DataSiteSymbol|DataSiteBlackList|DataSiteSystem|DataSiteDaaeh|DataSiteQasaad|searchlist|searchchild|searchmascers)$/.test(
      pathname
    );

  function changeSearch(event) {
    const value = event.target.value;
    switch (value) {
      case "option1":
        router.push("/dashboard/dataDisplaySite/searchlist");
        break;
      case "option2":
        router.push("/dashboard/dataDisplaySite/searchchild");
        break;
      case "option3":
        router.push("/dashboard/dataDisplaySite/searchmascers");
        break;
      default:
        break;
    }
  }

  return (
    <div>
      {/* Show header and tabs only when NOT in a single ID route */}
      {!isDataDisplaySiteIdRoute && (
        <>
          <div className="headDashboard">
            <p>البيانات المعروضة بالموقع</p>
          </div>

          <div className={styles.filterAndDisplay}>
            <div className={styles.filter}>
              <span
                onClick={() => router.push("/dashboard/dataDisplaySite")}
                className={
                  pathname === "/dashboard/dataDisplaySite" ? styles.active : ""
                }
              >
                اخر الاخبار
              </span>
              <span
                onClick={() =>
                  router.push("/dashboard/dataDisplaySite/DataSiteArchief")
                }
                className={
                  pathname === "/dashboard/dataDisplaySite/DataSiteArchief"
                    ? styles.active
                    : ""
                }
              >
                ارشيف الثورة
              </span>
              <span
                onClick={() =>
                  router.push("/dashboard/dataDisplaySite/DataSiteSymbol")
                }
                className={
                  pathname === "/dashboard/dataDisplaySite/DataSiteSymbol"
                    ? styles.active
                    : ""
                }
              >
                رموز الثورة
              </span>
              <span
                onClick={() =>
                  router.push("/dashboard/dataDisplaySite/DataSiteBlackList")
                }
                className={
                  pathname === "/dashboard/dataDisplaySite/DataSiteBlackList"
                    ? styles.active
                    : ""
                }
              >
                القائمة السوداء
              </span>
              <span
                onClick={() =>
                  router.push("/dashboard/dataDisplaySite/DataSiteSystem")
                }
                className={
                  pathname === "/dashboard/dataDisplaySite/DataSiteSystem"
                    ? styles.active
                    : ""
                }
              >
                ملفات النظام
              </span>
              <span
                onClick={() =>
                  router.push("/dashboard/dataDisplaySite/DataSiteDaaeh")
                }
                className={
                  pathname === "/dashboard/dataDisplaySite/DataSiteDaaeh"
                    ? styles.active
                    : ""
                }
              >
                ملفات داعش
              </span>
              <span
                onClick={() =>
                  router.push("/dashboard/dataDisplaySite/DataSiteQasaad")
                }
                className={
                  pathname === "/dashboard/dataDisplaySite/DataSiteQasaad"
                    ? styles.active
                    : ""
                }
              >
                ملفات قسد
              </span>
            </div>

            <div>
              <select
                onChange={changeSearch}
                className={`form-control ${styles.inputSearchDashboard}`}
              >
                <option>ابحث عن</option>
                <option value="option1">
                  اخر الاخبار والارشيف والرموز والعملاء
                </option>
                <option value="option2">الشهداء والمعتقلين والمفقودين</option>
                <option value="option3">الملفات</option>
              </select>
            </div>
          </div>
        </>
      )}

      {children}
    </div>
  );
}
