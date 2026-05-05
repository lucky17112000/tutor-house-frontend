// export const getUser = async () => {
//   const res = await getUser();
// };

"use server";

import { authClient } from "@/lib/auth-client";
import { getCategories, adminCancelBooking, deleteUser, deleteTutorProfile, deleteBooking } from "@/service/admin";
import { cancelBooking, completeBooking } from "@/service/booking";

export const getc = async () => {
  return await getCategories();
};

export const cancelSt = async (id: string) => {
  return await cancelBooking(id);
};

export const completeSt = async (id: string) => {
  return await completeBooking(id);
};
export const signO = async () => {
  await authClient.signOut();
};

export const adminCancelSt = async () => {
  return await adminCancelBooking();
};

export const deleteUserSt = async (userId: string) => {
  return await deleteUser(userId);
};

export const deleteTutorProfileSt = async (userId: string) => {
  return await deleteTutorProfile(userId);
};

export const deleteBookingSt = async (bookingId: string) => {
  return await deleteBooking(bookingId);
};
