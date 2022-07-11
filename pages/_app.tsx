import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
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
    <div>
      <Navbar />
      <Styled.Container>
        <Styled.SidebarContainer>
          <Sidebar />
        </Styled.SidebarContainer>
        <Styled.ComponentContainer>
          <Component {...pageProps} />
        </Styled.ComponentContainer>
      </Styled.Container>
    </div>
  );
};

export default MyApp;
