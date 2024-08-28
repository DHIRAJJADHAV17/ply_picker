const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getAllProduct = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my/product`, {
      method: "GET",
    });

    if (!response) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getProductDetail = async (id: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/my/product/detail/${id}`,
      {
        method: "GET",
      }
    );

    if (!response) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (productFormData: FormData, id: string) => {
  const accToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/my/product/detail/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accToken}`, // Keep the Authorization header
        },
        body: productFormData, // Directly assign FormData as the body
      }
    );

    // Check if the response is not OK (status code outside 200-299)
    if (!response.ok) {
      throw new Error(
        "Failed to update product. Please check your input data and try again."
      );
    }

    return response.json();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Re-throw error to handle it in the calling function
  }
};
