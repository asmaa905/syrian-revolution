
import React from "react";
import ProtectedRoutedOnUser from "@/app/_Components/componantDashboard/ProtectedRoutedOnUser";

const usersLayout = ({ children }) => {

  return (
    <ProtectedRoutedOnUser>
      <>{children}</>
    </ProtectedRoutedOnUser>
  );
};

export default usersLayout;
