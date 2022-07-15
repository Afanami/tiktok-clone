import Image from "next/image";
import React from "react";
import { GoVerified } from "react-icons/go";
import { IUser } from "../../types";

export const UserDetails = ({
  user,
  styles,
}: {
  user: IUser;
  styles?: any;
}) => {
  const {
    imageContainer,
    width,
    height,
    detailsContainer,
    userText,
    userNameText,
  } = styles;

  return (
    <>
      <div className={imageContainer ? imageContainer : "w-8 h-8"}>
        <Image
          src={user.image}
          className="rounded-full"
          width={width ? width : 34}
          height={height ? height : 34}
          alt="user profile"
          layout="responsive"
        />
      </div>

      <div className={detailsContainer ? detailsContainer : "hidden xl:block"}>
        <p
          className={`flex items-center gap-1 font-bold lowercase text-md text-primary ${userText}`}>
          {user.userName.replaceAll(" ", "")}
          <GoVerified className="text-blue-400" />
        </p>
        <p className={`text-xs text-gray-400 capitalise ${userNameText}`}>
          {user.userName}
        </p>
      </div>
    </>
  );
};
