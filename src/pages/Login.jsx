// src/pages/Login.jsx

import { useState, useRef, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
// import React from "react";
import gsap from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/add-event");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    gsap.fromTo(
      formRef.current,
      {
        opacity: 0,
        y: -50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power4.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        ref={formRef}
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
