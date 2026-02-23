"use server";

import { BookingPayload } from "@/components/booking/BookingCard";
import { cookies } from "next/headers";

// ============================================================

const API_URL = process.env.API_URL ?? "http://localhost:4000";

export const createBooking = async (bookingData: BookingPayload) => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("better-auth.session_token")?.value;
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
