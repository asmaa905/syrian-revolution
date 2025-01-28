"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRouted = ({ children }) => {
  const router = useRouter();
  const role = localStorage.getItem("roleUserLogin");
  useEffect(() => {
    if (role !== "admin" && role !== "supervisor" && role !== "owner") {
      router.push("/");
    }
  }, [role, router]);

  return role === "admin" || role === "supervisor" || role === "owner"
    ? children
    : null;
};

export default ProtectedRouted;
