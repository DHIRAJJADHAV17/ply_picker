import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SideDrawer = () => {
  return (
    <div className="">
      <Sheet>
        <SheetTrigger>
          <Button className="gap-2">
            Settings <Settings />
          </Button>
        </SheetTrigger>
        <SheetContent className="pt-0 px-0  ">
          <SheetHeader className="bg-white h-12 text-white pt-2 px-2">
            <SheetTitle className="flex">
              {" "}
              <Image
                src="/plypicker.png"
                alt="Logo"
                className="dark:invert"
                width={35}
                height={30}
                priority
              />
              <h2 className="text-xl font-semibold">PlyPicker Task</h2>
            </SheetTitle>
          </SheetHeader>
          <SheetDescription className="pt-4 px-2">
            <SheetHeader className="text-md">
              Check your dashboard features
            </SheetHeader>

            <SheetDescription className="flex flex-col gap-4 mt-8">
              <Link className="flex" href={"/dashboard"}>
                <Button className="flex-grow ">Products</Button>
              </Link>
              <Link className="flex" href={"/review"}>
                <Button className="flex-grow">Reviews</Button>
              </Link>
              <Link className="flex" href={"/profile"}>
                <Button className="flex-grow">Profile</Button>
              </Link>
            </SheetDescription>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideDrawer;
