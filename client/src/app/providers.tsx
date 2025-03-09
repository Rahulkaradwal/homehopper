"use client";

import StoreProvider from "@/state/redux";
import { Authenticator } from "@aws-amplify/ui-react";
import Auth from "./(auth)/AuthProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Authenticator.Provider>
      <Auth>
        <StoreProvider>{children}</StoreProvider>
      </Auth>
    </Authenticator.Provider>
  );
};

export default Providers;
