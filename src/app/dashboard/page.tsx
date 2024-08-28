"use client";
import CardItems from "@/components/CardItems";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../api/MyProductApi";
import withAuth from "@/components/hoc/withauth";

const Page = () => {
  const [ProductData, setProductData] = useState<any>([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const res = await getAllProduct();
        setProductData(res);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchProductData();
  }, []);

  return (
    <div className=" container grid md:grid-cols-4   flex gap-4">
      {ProductData.map((item: any, index: number) => (
        <CardItems key={index} detail={item} />
      ))}
    </div>
  );
};

export default withAuth(Page);
