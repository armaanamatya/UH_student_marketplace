import React from "react";
import Image from "next/image";
import uhLogo from "./images/uh_white_logo.png";
import { Session } from "next-auth";
import Link from "next/link";
import { Avatar } from "@nextui-org/react";
import { prisma } from "../../prisma/prisma";

type props = {
  session: Session | null;
};

const Header = async (props: props) => {
  let profileImage;
  if(props.session) {
    profileImage = await prisma.user.findUnique({
        where: {
            email: props.session?.user?.email as string
        },
        // Only pulls the profilePicUrl from the user
        select: {
            profilePicUrl: true
        }
      })
  }


  return (
    <header
      style={{ backgroundColor: "#C8102E" }}
      className="text-white sticky top-0 w-full z-50"
    >
      <div className="container mx-auto py-4 flex justify-between items-center px-8">
        <Link href={'/'}>
            <Image
            src={uhLogo}
            alt="Logo"
            width={70}
            height={70}
            className="h-10 w-auto md:h-12 hidden md:block"
            />
        </Link>


        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center text-xl md:text-3xl lg:text-5xl font-bold drop-shadow-xl">
            COOGBAY
          </h1>
          <h2 className="text-center text-sm md:text-lg lg:text-xl font-bold drop-shadow-xl">
            FOR COUGARS, BY COUGARS
          </h2>
        </div>

        <nav className="flex gap-2">
          {props.session ? (
            <a
              href="/api/auth/signout"
              className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-lg"
            >
              Sign Out
            </a>
          ) : (
            <a
              href="/signup"
              className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-md md:text-lg"
            >
              Sign Up
            </a>
          )}
          <a
            href="/marketplace"
            className="border border-transparent px-6 py-3 text-white hover:border-white transition-all duration-200 rounded-full lg:text-2xl text-md md:text-lg"
          >
            Marketplace
          </a>
          {props.session ? (
            <Link 
            href={'/dashboard'}
            className="self-center"
            >
                <Avatar
                src={profileImage?.profilePicUrl}
                ></Avatar>
            </Link>
          ): (
            null
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
