import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../../utils";
import useAuthStore from "../../store/authStore";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../utils/toktik.png";
import * as Styled from "./Navbar.styled";

export const Navbar = () => {
  const { userProfile, addUser, removeUser } = useAuthStore();

  return (
    <Styled.NavbarContainer>
      <Link href="/">
        <Styled.ImageContainer>
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="TokTik"
            layout="responsive"
          />
        </Styled.ImageContainer>
      </Link>

      <div>SEARCH</div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex items-center gap-2 px-2 font-semibold border-2 md:px-4 text-md">
                <IoMdAdd className="text-xl" />
                {` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>
            {userProfile.image && (
              <Link href="/">
                <>
                  <Image
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    src={userProfile.image}
                    alt="profile photo"
                  />
                </>
              </Link>
            )}
            <button
              type="button"
              className="px-2"
              onClick={() => {
                googleLogout();
                removeUser();
              }}>
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log(`Error`)}
          />
        )}
      </div>
    </Styled.NavbarContainer>
  );
};
