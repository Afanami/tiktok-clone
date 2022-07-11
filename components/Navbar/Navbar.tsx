import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import Logo from "../../utils/toktik.png";
import * as Styled from "./Navbar.styled";

export const Navbar = () => {
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
    </Styled.NavbarContainer>
  );
};
