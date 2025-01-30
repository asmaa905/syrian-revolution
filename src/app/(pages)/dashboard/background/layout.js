
import React from "react";
import ProtectedRoutedOnUser from "@/app/_Components/componantDashboard/ProtectedRoutedOnUser";

const backgroundLayout = ({ children }) => {

  return (
    <ProtectedRoutedOnUser>
      <>{children}</>
    </ProtectedRoutedOnUser>
  );
};

export default backgroundLayout;