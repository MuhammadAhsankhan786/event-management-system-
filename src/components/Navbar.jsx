import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import gsap from "gsap"; // ✅ GSAP import

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navRef = useRef(null); // ✅ Ref for animation

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ✅ GSAP animation on mount
  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-gray-800 text-white p-4 shadow-md flex justify-between items-center"
    >
      <Link to="/" className="text-xl font-bold">
        Event List
      </Link>
      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/add-event">Add Event</Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
