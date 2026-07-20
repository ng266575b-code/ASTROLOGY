"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ADMIN_EMAIL = "satyamkruk07@gmail.com";

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Not logged in
        router.replace("/login");
      } else {
        // Logged in
        if (requireAdmin && user.email !== ADMIN_EMAIL) {
          // Requires admin, but user is not admin
          router.replace("/dashboard");
        } else {
          // Authorized
          setAuthorized(true);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, requireAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050810]">
        <div className="w-16 h-16 border-4 border-aurora-purple border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-celestial-gold font-bold tracking-widest uppercase">Connecting to Cosmos...</p>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
}
