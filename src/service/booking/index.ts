"use server";

import { BookingPayload } from "@/components/booking/BookingCard";
import { cookies } from "next/headers";

// ============================================================

const API_URL = process.env.API_URL ?? "http://localhost:4000";

// Helper: get session token (works in both dev and production)
function getSessionToken(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return (
    cookieStore.get("better-auth.session_token")?.value ??
    cookieStore.get("__Secure-better-auth.session_token")?.value
  );
}

export const createBooking = async (bookingData: BookingPayload) => {
  try {
    const cookieStore = await cookies();
    const token = getSessionToken(cookieStore);
    console.log("🔑 Session token in createBooking:", token);

    if (!token) {
      return { error: "No session token found. Please login first." };
    }

    const body = JSON.stringify(bookingData);
    console.log("📦 createBooking sending body:", body);

    const response = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        Cookie: cookieStore.toString(),
      },
      body,
    });

    // রেসপন্স পড়া ও JSON পার্স করা
    const text = await response.text();
    console.log("📡 createBooking status:", response.status);
    console.log("📡 createBooking raw response:", text);

    let data: any;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error(" Error parsing JSON response:", e);
      data = { message: text };
    }

    if (!response.ok) {
      return { error: data?.message || `Server returned ${response.status}` };
    }

    return data;
  } catch (error) {
    console.error(" Error creating booking:", error);
    return { error: "Could not connect to backend." };
  }
};

//get onlyStudent bookign url-> http://localhost:4000/api/bookings/student

export const getStudentBookings = async () => {
  try {
    const cookieStore = await cookies();
    const token = getSessionToken(cookieStore);

    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(`${API_URL}/api/bookings/student`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result?.message || `Server returned ${response.status}` };
    }
    return result;
  } catch (error) {
    console.error(" Error fetching student bookings:", error);
    return { error: "Could not connect to backend." };
  }
};

//update student booking status="CANCELLED" http://localhost:4000/api/bookings/46e3fda8-4010-48bd-a2a5-52cb1ec69cbf/status
export const cancelBooking = async (bookingId: string) => {
  try {
    const cookieStore = await cookies();
    const token = getSessionToken(cookieStore);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(
      `${API_URL}/api/bookings/${bookingId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status: "CANCELLED" }),
      },
    );
    const result = await response.json();
    if (!response.ok) {
      return { error: result?.message || `Server returned ${response.status}` };
    }
    return result;
  } catch (error) {
    console.error(" Error cancelling booking:", error);
    return { error: "Could not connect to backend." };
  }
};

export const completeBooking = async (bookingId: string) => {
  try {
    const cookieStore = await cookies();
    const token = getSessionToken(cookieStore);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(
      `${API_URL}/api/bookings/${bookingId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status: "COMPLETED" }),
      },
    );
    const result = await response.json();
    if (!response.ok) {
      return { error: result?.message || `Server returned ${response.status}` };
    }
    return result;
  } catch (error) {
    console.error(" Error completing booking:", error);
    return { error: "Could not connect to backend." };
  }
};

//http://localhost:4000/api/reviews
// show all student booking theke tutor ta ke alda korbo then i have to show all tutor another page then in this page i have a button create review ....
export const leaveRevview = async (
  tutorId: string,
  rating: number,
  comment: string,
) => {
  try {
    const cookieStore = await cookies();
    const token = getSessionToken(cookieStore);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify({ tutorId, rating, comment }),
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result?.message || `Server returned ${response.status}` };
    }
    return result;
  } catch (error) {
    console.error(" Error leaving review:", error);
    return { error: "Could not connect to backend." };
  }
};
//http://localhost:4000/api/reviews
//show all review of tutor another page
export const getAllReviews = async () => {
  try {
    const cookieStore = await cookies();
    const token = getSessionToken(cookieStore);
    if (!token) {
      return { error: "No session token found. Please login first." };
    }
    const response = await fetch(`${API_URL}/api/reviews`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result?.message || `Server returned ${response.status}` };
    }
    return result;
  } catch (error) {
    console.error(" Error fetching reviews:", error);
    return { error: "Could not connect to backend." };
  }
};
//http://localhost:4000/api/reviews/tutor/907b80e4-88d6-44cb-a031-4a0ed83b5821
// tutor id need
export const getReviewsByTutorId = async (tutorId: string) => {
  try {
    const cookieStore = await cookies();
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    const token = getSessionToken(cookieStore);
    if (token) headers["Cookie"] = cookieStore.toString();

    const response = await fetch(`${API_URL}/api/reviews/tutor/${tutorId}`, {
      method: "GET",
      headers,
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok) {
      return { error: result?.message || `Server returned ${response.status}` };
    }
    return result;
  } catch (error) {
    console.error(" Error fetching reviews by tutor ID:", error);
    return { error: "Could not connect to backend." };
  }
};
