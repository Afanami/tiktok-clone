import React from "react";
import { BiCommentX } from "react-icons/bi";
import { MdOutlineVideocamOff } from "react-icons/md";

interface IProps {
  text: string;
  type: string;
}

export const NoResults = ({ text, type }: IProps) => {
  const renderIcon = () => {
    if (type === "comments") {
      return <BiCommentX />;
    } else if (type === "videos") {
      return <MdOutlineVideocamOff />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span className="text-8xl">{renderIcon()}</span>
      <p className="text-2xl text-center">{text}</p>
    </div>
  );
};
