import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { createOrGetUser } from "../../utils";
import useAuthStore from "../../store/authStore";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../utils/toktik.png";
import * as Styled from "./Navbar.styled";
import { IUser } from "../../types";

export const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  const {
    userProfile,
    addUser,
    removeUser,
  }: { userProfile: IUser | any; addUser: any; removeUser: any } =
    useAuthStore();

  const handleSearch = (e: { preventDefault: () => void }) => {
    // prevent page reload
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

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

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute bg-white md:static top-10 left-20">
          <input
            type="text"
            value={searchValue}
            className="py-3 px-6 font-medium border-2 border-gray-100 bg-primary md:text-md focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search accounts and videos"
          />
          <button
            className="absolute pl-4 text-2xl text-gray-400 border-l-2 border-gray-300 md:right-5 right-6 top-4"
            onClick={handleSearch}>
            <BiSearch />
          </button>
        </form>
      </div>

      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="flex items-center gap-2 px-2 font-semibold border-2 md:px-4 text-md hover:bg-hover">
                <IoMdAdd className="text-xl" />
                {` `}
                <span className="hidden md:block ">Upload</span>
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
              className="px-2 rounded-full hover:bg-hover"
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
