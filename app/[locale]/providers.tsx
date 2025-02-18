"use client";

import { ThemeProvider } from "@/context/ThemeProvider";
import { HeroUIProvider } from "@heroui/system";

// import { GoogleOAuthProvider } from "@react-oauth/google";

export function Providers({ children }: { children: React.ReactNode }) {
  // const messages = useMessages();
  return (
    // <GoogleOAuthProvider clientId="662022747366-9o6j8n83hrf8k4iidmfcrfeld63o4ucg.apps.googleusercontent.com">
    <HeroUIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </HeroUIProvider>
    // </GoogleOAuthProvider>
  );
}
