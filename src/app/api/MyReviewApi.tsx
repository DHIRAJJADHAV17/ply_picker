const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const getMyReview = async () => {
  const accToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/my/review`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get restaurant");
  }
  return response.json();
};

export const updateReview = async (id: string) => {
  const accToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/my/review`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${accToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to get restaurant");
  }
  return response.json();
};
export const updateAccept = async (id: string) => {
  const accToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/my/review/accept`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to get restaurant");
  }
  return response.json();
};

export const getAllReview = async () => {
  const accToken = localStorage.getItem("accessToken");

  const response = await fetch(`${API_BASE_URL}/api/my/review/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get restaurant");
  }
  return response.json();
};
