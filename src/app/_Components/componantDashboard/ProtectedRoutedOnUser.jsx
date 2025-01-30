"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function ProtectedRoutedOnUser({ children }) {
  const router = useRouter();
  const role = localStorage.getItem("roleUserLogin");
  useEffect(() => {
    if (role !== "admin" && role !== "owner") {
      router.push("/");
    }
  }, [role, router]);

  return role === "admin" || role === "owner" ? children : null;
}
