import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId:
        process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID!,
      userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID!,
    },
  },
});

const Auth = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen">
      <Authenticator>{() => <> {children}</>}</Authenticator>
    </div>
  );
};

export default Auth;
