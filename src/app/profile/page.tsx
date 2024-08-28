"use client";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import {
  Clock9Icon,
  MoreHorizontalIcon,
  TicketCheck,
  TicketXIcon,
} from "lucide-react";
import { getAllReview, getMyReview } from "../api/MyReviewApi";
import withAuth from "@/components/hoc/withauth";

const Page = () => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const [totalreview, settotalreview] = useState<number>(0);
  const [totalapproved, settotalapproved] = useState<number>(0);
  const [totalrejected, settotalrejected] = useState<number>(0);
  const [totalpending, settotalpending] = useState<number>(0);

  useEffect(() => {
    // Fetch user data from localStorage safely within useEffect
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
    setRole(localStorage.getItem("isadmin"));

    const fetchReview = async () => {
      try {
        let data;
        if (role === "true") {
          data = await getAllReview();
        } else {
          data = await getMyReview();
        }

        settotalreview(data.length);
        settotalapproved(
          data.filter((item: any) => item.status === "accepted").length
        );
        settotalrejected(
          data.filter((item: any) => item.status === "rejected").length
        );
        settotalpending(
          data.filter((item: any) => item.status === "pending").length
        );
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    fetchReview();
  }, [role]); // Add role as a dependency to ensure it is up-to-date

  return (
    <div className="grid gap-4">
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <Card className="flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-105 py-4 px-4">
            <CardContent>
              <MoreHorizontalIcon color="blue" />
            </CardContent>
            <CardFooter>
              <CardTitle>Total Request: {totalreview}</CardTitle>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-105 py-4 px-4">
            <CardContent>
              <TicketCheck color="green" />
            </CardContent>
            <CardFooter>
              <CardTitle>Approved Request: {totalapproved}</CardTitle>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-105 py-4 px-4">
            <CardContent>
              <TicketXIcon color="red" />
            </CardContent>
            <CardFooter>
              <CardTitle>Rejected Request: {totalrejected}</CardTitle>
            </CardFooter>
          </Card>
        </div>
        <div>
          <Card className="flex justify-center items-center shadow-lg transform transition-transform duration-300 hover:scale-105 py-4 px-4">
            <CardContent>
              <Clock9Icon color="gray" />
            </CardContent>
            <CardFooter>
              <CardTitle>Pending Request: {totalpending}</CardTitle>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <div className="w-96 border rounded bg-white px-7 py-10 shadow-2xl">
          <h4 className="text-2xl mb-7 font-semibold">My Profile</h4>
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={name ?? ""} className="bg-white" readOnly />

          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email ?? ""} className="bg-white" readOnly />

          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            value={role === "true" ? "admin" : "team-member"}
            className="bg-white"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);
