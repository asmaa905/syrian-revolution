
import React from "react";
import ProtectedRoutedOnUser from "@/app/_Components/componantDashboard/ProtectedRoutedOnUser";

const paypalLayout = ({ children }) => {

  return (
    <ProtectedRoutedOnUser>
      <>{children}</>
    </ProtectedRoutedOnUser>
  );
};

export default paypalLayout;