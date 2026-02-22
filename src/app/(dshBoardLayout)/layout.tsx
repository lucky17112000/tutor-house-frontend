"use client";
import { getc } from "@/actions/signin.actions";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { authClient } from "@/lib/auth-client";
import { getCategories } from "@/service/admin";
import { useEffect, useState } from "react";

// import { getSession, getUser } from "@/service/auth";

const layout = ({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) => {
  // const user = await getUser();
  // console.log("User in layout:", user);
  // const res = await fetch("/api/auth/session");
  // const session = await res.json();
  // console.log("Session in layout:", session);
  const session = authClient.useSession();
  // console.log("Session in LoginForm:", session.data?.user);
  // console.log("User Role from session:", (session.data?.user as any)?.role);
  // const result = await getCategories();
  const [data, setData] = useState();
  // const [error, setError] = useState(null);
  const res = data?.[0];
  console.log(res);
  useEffect(() => {
    (async () => {
      const result = await getc();
      setData(result);
      // setError(result?.error);
    })();
  }, []);

  // Extract id and name from fetched categories
  const categories: { id: string; name: string }[] = Array.isArray(data)
    ? data.map((c: any) => ({ id: c.id, name: c.name }))
    : ((data as any)?.data?.map((c: any) => ({ id: c.id, name: c.name })) ??
      []);

  return (
    <DashboardLayout user={session.data?.user} categories={categories}>
      {admin}
      {student}
      {tutor}
    </DashboardLayout>
  );
};

export default layout;
