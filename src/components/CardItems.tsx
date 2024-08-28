import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";

import Link from "next/link";
import Image from "next/image";

type Props = {
  detail: any;
};

const CardItems = ({ detail }: Props) => {
  return (
    <Link href={`/dashboard/${detail._id}`}>
      <Card className="shadow-lg transform transition-transform duration-300 hover:scale-105 ">
        <CardContent>
          <img
            className="w-full max-h-[150px] object-fit mt-2"
            src={detail.imageUrl}
            alt="Restaurant Image"
          />
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <CardTitle>Product Name :{detail.productname}</CardTitle>
          <CardDescription>Price :{detail.price}</CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CardItems;
