export const getUserRole = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch("https://civicnivaran.onrender.com/api/auth/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.warn("Failed to fetch user profile");
      return null;
    }
    const data = await res.json();
    
    return data.role; // assuming `data` contains { name, email, role, ... }
  } catch (err) {
    console.error("Error fetching user role:", err);
    return null;
  }
};
