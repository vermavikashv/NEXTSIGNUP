"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function SignUp() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [disablebutton, setDisableButton] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log(user);

      const response = await axios.post("/api/users/signup", user);
      console.log("signup successfully", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signup error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "SignUp"}</h1> <hr />
      <label htmlFor="username">Username</label>
      <input
        className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
        id="username"
        type="text"
        placeholder="Enter username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
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
        onClick={onSignup}
        className="py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
      >
        {disablebutton ? "No Sign Up" : "Sign Up"}
      </button>
      <Link href="/login">Visit login page</Link>
    </div>
  );
}

export default SignUp;
