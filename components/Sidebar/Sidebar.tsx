import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { Discover } from "../Discover/Discover";
import { SuggestedAccounts } from "../SuggestedAccounts/SuggestedAccounts";
import { Footer } from "../Footer/Footer";
import * as Styled from "./Sidebar.styled";

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;

  return (
    <>
      <Styled.ToggleButton
        onClick={() => setShowSidebar((prev) => !prev)}
        $showSidebar={!showSidebar}>
        <AiOutlineMenu />
      </Styled.ToggleButton>
      {showSidebar && (
        <Styled.SidebarContainer>
          <Styled.LinkContainer>
            <Link href="/">
              <Styled.LinkContentContainer>
                <Styled.LinkIconContainer>
                  <AiFillHome />
                </Styled.LinkIconContainer>
                <Styled.LinkText>For You</Styled.LinkText>
              </Styled.LinkContentContainer>
            </Link>
          </Styled.LinkContainer>

          <Discover />
          <SuggestedAccounts />
          <Footer />
        </Styled.SidebarContainer>
      )}
    </>
  );
};
