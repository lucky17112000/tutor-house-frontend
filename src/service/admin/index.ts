"use server";
import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

// export const getAllTutors = async () => {
//   try {
//     // ✅ Don't add /api again, it's already in API_URL
//     const response = await fetch(`${API_URL}/api/tutors`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       next: { revalidate: 10 }, // Revalidate every 10 seconds
//     });

//     const contentType = response.headers.get("content-type");
//     if (!contentType?.includes("application/json")) {
//       const text = await response.text();
//       console.error("Non-JSON response:", text.slice(0, 300));
//       return {
//         error: `Server returned ${response.status}. Is backend running on ${API_URL}?`,
//       };
//     }

//     const data = await response.json();
//     console.log("getAllTutors response:", data); //
//     return data;
//   } catch (error) {
//     console.error("Error fetching tutors:", error);
//     return { error: "Could not connect to backend." };
//   }
// };

export const getAllUsers = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("better-auth.session_token")?.value;
    console.log("Session token in getAllUsers:", token);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }

    const response = await fetch(`${AUTH_URL}/admin/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    if (response.status === 401) {
      return { error: "Unauthorized. You do not have admin access." };
    }

    const data = await response.json();
    console.log("getAllUsers response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { error: "Could not connect to backend." };
  }
};
//category ackend route: http://localhost:4000/api/categories
export const createCategory = async (value: any) => {
  try {
    const cokkieStore = await cookies();
    const token = cokkieStore.get("better-auth.session_token")?.value;
    console.log("Session token in categoryCreate:", token);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(`${AUTH_URL}/api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cokkieStore.toString(),
      },
      body: JSON.stringify({
        name: value.name,
        description: value.description,
      }),
      cache: "no-store",
    });
    if (response.status === 401) {
      return { error: "Unauthorized. You do not have admin access." };
    }
    const data = await response.json();
    console.log("categoryCreate response:", data);
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    return { error: "Could not connect to backend." };
  }
};

//get category list-> http://localhost:4000/api/categories
export const getCategories = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("better-auth.session_token")?.value;
    console.log("Session token in getCategories:", token);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(`${AUTH_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    if (response.status === 401) {
      return { error: "Unauthorized. You do not have admin access." };
    }
    const data = await response.json();
    console.log("getCategories response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Could not connect to backend." };
  }
};
