"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { getProductDetail, updateProduct } from "@/app/api/MyProductApi";
import withAuth from "@/components/hoc/withauth";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    productname: z.string({
      message: "Product name is required",
    }),
    price: z.coerce.number().min(1, "Price is required"),
    description: z.string({ required_error: "Description is required" }),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image file must be provided",
    path: ["imageFile"],
  });

export type RestaurantFormData = z.infer<typeof formSchema>;
type Props = {
  params: {
    id: String;
  };
};

const Page = ({ params }: Props) => {
  const [isadmin, setadmin] = useState(false);
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
  });

  const [src, setSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<any>({
    unit: "%",
    width: 30,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const route = useRouter();
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const restaurant = await getProductDetail(params.id.toString());
        form.reset(restaurant);
        setSrc(restaurant.imageUrl);
        console.log(restaurant);
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
    };

    const getadmin = localStorage.getItem("isadmin");
    setadmin(getadmin === "true");
    fetchRestaurant();
  }, [form, params.id]);

  const onSubmit = async (data: RestaurantFormData) => {
    try {
      const formData = new FormData();
      formData.append("productname", data.productname);
      formData.append("price", data.price.toString());
      formData.append("description", data.description);
      formData.append("status", "pending");

      if (data.imageFile) {
        formData.append("imageFile", data.imageFile);
      }
      const result = await updateProduct(formData, params.id.toString());
      if (result) {
        route.push("/dashboard");
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result as string));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = (image: HTMLImageElement) => {
    imgRef.current = image;
  };

  const onCropComplete = (crop: PixelCrop) => {
    if (
      imgRef.current &&
      previewCanvasRef.current &&
      crop.width &&
      crop.height
    ) {
      const ctx = previewCanvasRef.current.getContext("2d");
      if (!ctx) return;
      const image = imgRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      previewCanvasRef.current.width = crop.width * scaleX;
      previewCanvasRef.current.height = crop.height * scaleY;

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      );

      const base64Image = previewCanvasRef.current.toDataURL("image/png");
      setCroppedImageUrl(base64Image);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 bg-white p-10 rounded-lg shadow"
        >
          <div className="space-y-2">
            <div>
              <h2 className="text-2xl font-bold">Details</h2>
              <FormDescription>
                Enter the details about your Product
              </FormDescription>
            </div>

            <div className="flex gap-4">
              <FormField
                name="productname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-2">
            <div>
              <h2 className="text-2xl font-bold">Image</h2>
              <FormDescription>
                Add an image that will be displayed on your Products listing in
                the Product List. Adding a new image will overwrite the existing
                one.
              </FormDescription>
            </div>

            <div className="flex flex-col gap-8 md:w-[50%]">
              {src && (
                <ReactCrop
                  crop={crop}
                  onComplete={(newCrop) => onCropComplete(newCrop as PixelCrop)}
                  onChange={(newCrop) => setCrop(newCrop)}
                >
                  <img
                    src={src}
                    ref={imgRef}
                    className="w-full max-h-[100px] object-contain"
                    alt="Source"
                    onLoad={(e) => onImageLoaded(e.currentTarget)}
                  />
                </ReactCrop>
              )}

              <FormField
                name="imageFile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-white"
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={(event) => {
                          onSelectFile(event);
                          field.onChange(
                            event.target.files ? event.target.files[0] : null
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {croppedImageUrl && (
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={croppedImageUrl}
                    className="rounded-md object-cover h-full w-full"
                    alt="Cropped"
                  />
                </AspectRatio>
              )}
              <canvas ref={previewCanvasRef} style={{ display: "none" }} />
            </div>
          </div>
          {isadmin ? (
            <Button className="text-white" type="submit">
              Update the Product
            </Button>
          ) : (
            <Button className="text-white" type="submit">
              Submit for review
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default withAuth(Page);
