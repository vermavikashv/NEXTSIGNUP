"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [disablebutton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post("/api/users/login", user);
      console.log("login successfully", response.data);
      toast.success("Login");
      router.push("/profile");
    } catch (error: any) {
      console.log("signup error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1> {loading ? "Processing" : "Login"}</h1>

      <label htmlFor="email">email</label>
      <input
        className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="email"
        type="text"
        placeholder="Enter email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="password"
        type="password"
        placeholder="Enter password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        onClick={onLogin}
        className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {disablebutton ? "No login" : "Login"}
      </button>
      <Link href="/signup">Visit SignUp page</Link>
    </div>
  );
}
