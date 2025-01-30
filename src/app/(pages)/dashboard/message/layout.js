
import React from "react";
import ProtectedRoutedOnUser from "@/app/_Components/componantDashboard/ProtectedRoutedOnUser";

const messageLayout = ({ children }) => {

  return (
    <ProtectedRoutedOnUser>
      <>{children}</>
    </ProtectedRoutedOnUser>
  );
};

export default messageLayout;