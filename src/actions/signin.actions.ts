// export const getUser = async () => {
//   const res = await getUser();
// };

"use server";

import { getCategories } from "@/service/admin";

export const getc = async () => {
  return await getCategories();
};
