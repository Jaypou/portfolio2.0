"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "@/context/ThemeProvider";
// import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
  // const messages = useMessages();
  return (
    // <GoogleOAuthProvider clientId="662022747366-9o6j8n83hrf8k4iidmfcrfeld63o4ucg.apps.googleusercontent.com">
    <NextUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </NextUIProvider>
    // </GoogleOAuthProvider>
  );
}
