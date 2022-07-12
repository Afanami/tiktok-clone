import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navbar } from "../components/Navbar/Navbar";
import { Sidebar } from "../components/Sidebar/Sidebar";
import * as Styled from "./_app.styled";

// Main
const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Navbar />
      <Styled.Container>
        <Styled.SidebarContainer>
          <Sidebar />
        </Styled.SidebarContainer>
        <Styled.ComponentContainer>
          <Component {...pageProps} />
        </Styled.ComponentContainer>
      </Styled.Container>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
