import { getAllUsers } from "@/service/admin";
import React from "react";

export const dynamic = "force-dynamic";

const UserFind = async () => {
  const result = await getAllUsers();
  console.log(result?.data?.[0]?.name);

  if (result?.error) {
    return (
      <div>
        <h1>User Find Page</h1>
        <p className="text-red-500">Error: {result.error}</p>
      </div>
    );
  }

  // API returns { data: [...] }
  const users = result?.data ?? [];

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Users ({users.length})</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Name</th>
            <th className="border border-gray-300 p-2 text-left">Email</th>
            <th className="border border-gray-300 p-2 text-left">Status</th>
            <th className="border border-gray-300 p-2 text-left">Role</th>
            <th className="border border-gray-300 p-2 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2">{user.name}</td>
              <td className="border border-gray-300 p-2">{user.email}</td>

              <td className="border border-gray-300 p-2">
                {user.status ?? "active"}
              </td>
              <td className="border border-gray-300 p-2">
                {user.role ?? "user"}
              </td>

              <td className="border border-gray-300 p-2">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserFind;
