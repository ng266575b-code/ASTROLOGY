"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const q = query(collection(db, "users")); // Note: In production you might order by creation date
        const querySnapshot = await getDocs(q);
        const fetchedUsers: any[] = [];
        querySnapshot.forEach((doc) => {
          fetchedUsers.push(doc.data());
        });
        setUsers(fetchedUsers);
      } catch (err) {
        console.error("Error fetching users", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard glowColor="aurora" className="p-6 bg-black/80 border border-red-500/20">
          <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-2">Total Registered Users</h3>
          <div className="text-4xl font-bold text-white">
            {loading ? "..." : users.length}
          </div>
        </GlassCard>
        
        <GlassCard glowColor="aurora" className="p-6 bg-black/80 border border-white/10">
          <h3 className="text-sm text-gray-400 uppercase tracking-widest mb-2">System Status</h3>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xl font-bold text-green-400">Online & Secure</span>
          </div>
        </GlassCard>
      </div>

      {/* User Database Table */}
      <GlassCard glowColor="aurora" className="p-0 bg-black/80 border border-white/10 overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">User Database</h2>
          <button className="text-xs bg-red-900/50 hover:bg-red-800 text-red-200 py-1 px-3 rounded transition-colors border border-red-500/30">
            Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">UID</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Name</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Email</th>
                <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">Decrypting database...</td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">No users found in the system.</td>
                </tr>
              ) : (
                users.map((user, i) => (
                  <tr key={user.uid || i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="p-4 text-xs font-mono text-gray-500">{user.uid?.substring(0, 10)}...</td>
                    <td className="p-4 text-sm text-white font-medium">{user.name}</td>
                    <td className="p-4 text-sm text-gray-300">{user.email}</td>
                    <td className="p-4 text-xs">
                      {user.email === "satyamkruk07@gmail.com" ? (
                        <span className="bg-red-900/50 text-red-400 py-1 px-2 rounded-full border border-red-500/30">Admin</span>
                      ) : (
                        <span className="bg-blue-900/50 text-blue-400 py-1 px-2 rounded-full border border-blue-500/30">User</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
