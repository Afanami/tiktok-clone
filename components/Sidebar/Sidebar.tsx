import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleLogin from "react-google-login";
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
    <div>
      <Styled.ToggleButton onClick={() => setShowSidebar((prev) => !prev)}>
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
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
          {!userProfile && (
            <Styled.LoginContainer>
              <Styled.LoginText>
                Log in to like and comment on videos
              </Styled.LoginText>
              <Styled.LoginButtonContainer>
                <GoogleLogin
                  clientId=""
                  render={(renderProps) => (
                    <Styled.LoginButton
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}>
                      Log in
                    </Styled.LoginButton>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy="single_host_origin"
                />
              </Styled.LoginButtonContainer>
            </Styled.LoginContainer>
          )}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </Styled.SidebarContainer>
      )}
    </div>
  );
};
