import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../../store/authStore";
import { IUser } from "../../types";
import { UserDetails } from "../UserDetails/UserDetails";

export const SuggestedAccounts = () => {
  const {
    fetchAllUsers,
    allUsers,
  }: { fetchAllUsers: () => Promise<void>; allUsers: IUser[] | [] } =
    useAuthStore();

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  return (
    <div className="pb-4 border-gray-200 xl:border-b-2">
      <p className="hidden m-3 mt-4 font-semibold text-gray-500 xl:block">
        Suggested Accounts
      </p>
      <div>
        {allUsers.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 p-2 font-semibold rounded cursor-pointer hover:bg-primary">
              <UserDetails user={user} styles={{}} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
