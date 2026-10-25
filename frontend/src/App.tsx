// export default function App() {
//   return (
//     <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold">React + Rust</h1>
//         <p className="mt-3 text-slate-400">
//           Tailwind sudah siap digunakan.
//         </p>
//       </div>
//     </main>
//   );
// }


import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  role: string;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Request failed"
        );
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Users</h1>

      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="rounded-lg border p-4">
            <h2 className="font-semibold">{user.name}</h2>
            <p>{user.role}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
