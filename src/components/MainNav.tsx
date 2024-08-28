import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SideDrawer from "./SideDrawer";

type Props = {
  setlogout: (isLoggedIn: boolean) => void;
};

const MainNav = ({ setlogout }: Props) => {
  const router = useRouter();

  const handleclick = () => {
    localStorage.removeItem("accessToken");
    setlogout(false);
    router.replace("/");
  };

  return (
    <div className="flex gap-4">
      <SideDrawer />

      <Button
        className="font-bold hover:text-white hover:bg-primary"
        variant="ghost"
        onClick={handleclick}
      >
        Log-Out
      </Button>
    </div>
  );
};

export default MainNav;
