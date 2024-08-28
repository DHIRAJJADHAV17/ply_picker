"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  getAllReview,
  getMyReview,
  updateAccept,
  updateReview,
} from "../api/MyReviewApi";
import { Button } from "@/components/ui/button";
import withAuth from "@/components/hoc/withauth";

const page = () => {
  const [review, setreview] = useState<any>([]);
  const [isadmin, setadmin] = useState<boolean>(false);
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const getadmin = localStorage.getItem("isadmin");
        setadmin(getadmin === "true");

        if (getadmin == "true") {
          const data = await getAllReview();
          setreview(data.filter((item: any) => item.status === "pending"));
        } else {
          const data = await getMyReview();
          setreview(data);
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchReview();
  }, []);
  const handleAccept = (id: string) => {
    try {
      const res = updateAccept(id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = (id: string) => {
    try {
      const res = updateReview(id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" container m-4 border-4 flex bg-white">
      <Table>
        <TableCaption>A list of your recent Reviws Status.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Sr No.</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Product Price</TableHead>
            <TableHead>Product Description </TableHead>
            <TableHead>Product Image </TableHead>
            {isadmin ? (
              <TableHead>Edit</TableHead>
            ) : (
              <TableHead>Status</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {review.map((item: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.productname}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                <img src={item.imageUrl} />
              </TableCell>
              {isadmin ? (
                <TableCell>
                  <div className=" grid gap-2">
                    <Button
                      onClick={() => handleAccept(item._id)}
                      style={{ background: "green" }}
                    >
                      Accept
                    </Button>

                    <Button
                      onClick={() => handleReject(item._id)}
                      style={{ background: "red" }}
                    >
                      Reject
                    </Button>
                  </div>
                </TableCell>
              ) : (
                <TableHead>{item.status}</TableHead>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default withAuth(page);
