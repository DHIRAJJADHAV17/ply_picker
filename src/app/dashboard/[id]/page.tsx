import { getAllProduct } from "@/app/api/MyProductApi";
import ProductFormPage from "@/components/ProductFormPage";

// Function to generate static paths for dynamic routing
export async function generateStaticParams() {
  try {
    const response = await getAllProduct();

    return response.map((restaurant: any) => ({
      id: restaurant._id.toString(),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    // Return an empty array to avoid build failure
    return [];
  }
}

// Fetch data on the server side and pass it as props
export default async function Page({ params }: { params: { id: string } }) {
  // const restaurant = await getRestroDetail(params.id);
  return (
    <ProductFormPage
      params={{
        id: params.id,
      }}
    />
  );
}
