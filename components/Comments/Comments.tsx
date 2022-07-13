import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../../store/authStore";
import { NoResults } from "../NoResults/NoResults";
import { IComment, IUser } from "../../types";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

export const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile }: { userProfile: IUser | any } = useAuthStore();

  return (
    <div className="border-t-2 border-gray-200 pt-4 px-10 bg-lightgray border-b-2 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[475px]">
        {comments?.length ? (
          <div>videos</div>
        ) : (
          <NoResults text="Be the first to comment!" type="comments" />
        )}
      </div>

      {userProfile && (
        <div className="absolute bottom-0 left-0 px-2 pb-6 md:px-10">
          <form className="flex gap-4" onSubmit={addComment}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add Comment..."
              className="px-6 py-4 font-medium bg-primary text-md border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
            />
            <button className="text-gray-400 text-md" onClick={addComment}>
              {isPostingComment ? "Commenting..." : "Comment"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
