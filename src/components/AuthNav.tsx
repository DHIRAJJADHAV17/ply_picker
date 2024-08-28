import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
const AuthNav = () => {
  return (
    <div className="flex gap-4">
      <Link href="/login">
        <Button
          className="font-bold hover:text-white hover:bg-primary"
          variant="ghost"
        >
          login
        </Button>
      </Link>
      <Link href="/signup">
        <Button
          className="font-bold hover:text-white hover:bg-primary"
          variant="ghost"
        >
          Signup
        </Button>
      </Link>
    </div>
  );
};

export default AuthNav;
