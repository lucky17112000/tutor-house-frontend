"use server";
import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

// Helper: get session token (works in both dev and production)
function getSessionToken(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return (
    cookieStore.get("better-auth.session_token")?.value ??
    cookieStore.get("__Secure-better-auth.session_token")?.value
  );
}

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
    const token = getSessionToken(cookieStore);
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
    const token = getSessionToken(cokkieStore);
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
    const response = await fetch(`${AUTH_URL}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
    if (!response.ok) {
      return { error: `Server returned ${response.status}` };
    }
    const data = await response.json();
    console.log("getCategories response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { error: "Could not connect to backend." };
  }
};

// get all bookings-> https://assingment-4-ashen.vercel.app/api/bookings/all
export const getAllBookings = async () => {
  try {
    const cokkieStore = await cookies();
    const token = getSessionToken(cokkieStore);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(`${AUTH_URL}/api/bookings/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cokkieStore.toString(),
      },
    });
    if (response.status === 401) {
      return { error: "Unauthorized. You do not have admin access." };
    }
    const data = await response.json();
    // console.log("getAllBookings response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching all bookings:", error);
    return { error: "Could not connect to backend." };
  }
};

// Cancel a single booking by ID (admin)
export const adminCancelBooking = async () => {
  try {
    const cokkieStore = await cookies();
    const token = getSessionToken(cokkieStore);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(`${AUTH_URL}/api/admin/bookings/cancelled`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: cokkieStore.toString(),
      },
      // body: JSON.stringify(),
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: data?.message || `Server returned ${response.status}` };
    }
    return data;
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return { error: "Could not connect to backend." };
  }
};
