"use client";
import React, { useEffect, useState } from "react";
import MainNav from "./MainNav";

import AuthNav from "./AuthNav";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [islogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    setIsLogin(!!accessToken);
  }, []);

  return (
    <div className="border-b-2 border-b-primary py-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="z-10 w-full max-w-5xl items-center  font-semibold text-sm lg:flex">
          <Image
            src="/plypicker.png"
            alt="Logo"
            className="dark:invert"
            width={50}
            height={16}
            priority
          />
          <h2 className="text-xl font-semibold">PlyPicker Task</h2>
        </div>
        <div className="flex">
          {islogin ? (
            <MainNav setlogout={() => setIsLogin(false)} />
          ) : (
            <AuthNav />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
