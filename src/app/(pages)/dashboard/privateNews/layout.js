
import React from "react";
import ProtectedRoutedOnUser from "@/app/_Components/componantDashboard/ProtectedRoutedOnUser";

const privateLayout = ({ children }) => {

  return (
    <ProtectedRoutedOnUser>
      <>{children}</>
    </ProtectedRoutedOnUser>
  );
};

export default privateLayout;
