"use server";
import { env } from "@/env";
import { cookies } from "next/headers";

// Using process.env directly to avoid z.url() crash with localhost URLs
const API_URL = process.env.API_URL ?? "http://localhost:4000/";

const MY_URL = env.AUTH_URL ?? "http://localhost:4000";

export const getAllTutors = async () => {
  try {
    // ✅ Don't add /api again, it's already in API_URL
    const response = await fetch(`${API_URL}/api/tutors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 }, // Revalidate every 10 seconds
    });

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("Non-JSON response:", text.slice(0, 300));
      return {
        error: `Server returned ${response.status}. Is backend running on ${API_URL}?`,
      };
    }

    const data = await response.json();
    console.log("getAllTutors response:", data); // ✅ Debug log
    return data;
  } catch (error) {
    console.error("Error fetching tutors:", error);
    return { error: "Could not connect to backend." };
  }
};

export const getSingleTutor = async (id: string) => {
  try {
    const url = `${API_URL}/api/tutors/${id}`;
    console.log("🔍 Fetching single tutor from URL:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 10 }, // Revalidate every 10 seconds
    });

    console.log("📡 Response status:", response.status);
    console.log("📡 Response URL:", response.url);

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      const text = await response.text();
      console.error("❌ Non-JSON response:", text.slice(0, 300));
      return {
        error: `Server returned ${response.status}. Backend running?`,
      };
    }
    const data = await response.json();
    console.log("✅ Single tutor data received:", data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching single tutor:", error);
    return { error: "Could not connect to backend." };
  }
};

// export const createCategory = async (value: any) => {
//   try {
//     const cokkieStore = await cookies();
//     const token = cokkieStore.get("better-auth.session_token")?.value;
//     console.log("Session token in categoryCreate:", token);
//     if (!token) {
//       return { error: "No session token found. Please login first." };
//     }
//     const response = await fetch(`${AUTH_URL}/api/categories`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: cokkieStore.toString(),
//       },
//       body: JSON.stringify({
//         name: value.name,
//         description: value.description,
//       }),
//       cache: "no-store",
//     });
//     if (response.status === 401) {
//       return { error: "Unauthorized. You do not have admin access." };
//     }
//     const data = await response.json();
//     console.log("categoryCreate response:", data);
//     return data;
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return { error: "Could not connect to backend." };
//   }
// };
// create tutor-> http://localhost:4000/api/tutors
export const createTutor = async (tutorData: any) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("better-auth.session_token")?.value;
    console.log("Session token in createTutor:", token);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }

    const body = JSON.stringify(tutorData);
    console.log("createTutor sending body:", body);

    const response = await fetch(`${MY_URL}/api/tutors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body,
    });

    let data: any;
    const text = await response.text();
    console.log("createTutor status:", response.status);
    console.log("createTutor raw response:", text);
    try {
      data = JSON.parse(text);
    } catch {
      data = { message: text };
    }
    return data;
  } catch (error) {
    console.error("❌ Error creating tutor:", error);
    return { error: "Could not connect to backend." };
  }
};
