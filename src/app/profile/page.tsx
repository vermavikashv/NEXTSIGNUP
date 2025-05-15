"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      setLoading(true);

      await axios.get("/api/users/logout");
      console.log("Logout successfully");
      toast.success("Logout");
      router.push("/login");
    } catch (error: any) {
      console.log("signup error", error.message);
      toast.error("Error Logout");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <button className="bg-blue hover:bg-blue-500 " onClick={logout}>
        {loading ? "processing" : "Logout"}
      </button>
    </div>
  );
}
