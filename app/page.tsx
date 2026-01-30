"use client";

import React, { useCallback } from "react";
import { BsTwitter, BsBell, BsEnvelope, BsBookmark } from "react-icons/bs";
import { BiHomeCircle, BiHash, BiUser, BiMoney } from "react-icons/bi";
import { Inter } from "next/font/google";
import FeedCard from "@/components/FeedCard";
import { SlOptions } from "react-icons/sl";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

const inter = Inter({ subsets: ["latin"] });

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Twitter Blue",
    icon: <BiMoney />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
  {
    title: "More",
    icon: <SlOptions />,
  },
];

export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error(`Google token not found`);
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        {
          token: googleToken,
        },
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken)
        window.localStorage.setItem("__twitter_token", verifyGoogleToken);
    },
    [],
  );
  return (
    <div className={inter.className}>
      <Toaster />
      <GoogleOAuthProvider clientId="323323884448-ti3657sjqgrfsk526089pvt7a6a44mmh.apps.googleusercontent.com">
        <div className="grid grid-cols-12 h-screen w-screen px-28">
          <div className="col-span-3 pt-1 ml-9">
            <div className="text-3xl h-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all w-fit">
              <BsTwitter className="" />
            </div>
            <div className="mt-2 text-xl font-light pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li
                    className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 mt-2 w-fit cursor-pointer"
                    key={item.title}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 px-3">
                <button className="bg-[#1d9bf0] text-lg font-semibold py-3 px-2 rounded-full w-full cursor-pointer">
                  Tweet
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-5 border-r border-l h-screen overflow-x-hidden overflow-y-scroll border-gray-600">
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
          <div className="col-span-3 p-5 max-w-fit text-center">
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
    </div>
  );
}
