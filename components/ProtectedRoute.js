"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/utils/getUserRole";

export default function ProtectedRoute({ allowedRoles, children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // optional: for loader

  useEffect(() => {
    const checkRole = async () => {
      try {
        const role = await getUserRole(); // ✅ await the role here
        console.log("User role:", role);

        if (!role || !allowedRoles.includes(role)) {
          router.replace("/unauthorized");
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error("Error checking role:", err);
        router.replace("/unauthorized");
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, []);

  if (!isAuthorized) return null;

  return children;
}
