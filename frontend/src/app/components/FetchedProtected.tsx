"use client";
import { useAuth } from "@clerk/nextjs";

export default function FetchProtected() {
  const { getToken, isSignedIn } = useAuth();

  const callProtected = async () => {
    if (!isSignedIn) return alert("Sign in first");
    const token = await getToken(); // returns JWT token for current session
    const res = await fetch("http://localhost:4000/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Error:", errorData);
      return alert(`Error: ${errorData.message || "Failed to fetch"}`);
    }

    const data = await res.json();
    console.log("Success:", data);
    alert("Protected route accessed successfully!");
  };

  return <button onClick={callProtected}>Call /protected</button>;
}
