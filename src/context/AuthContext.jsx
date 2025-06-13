// import React, { createContext, useContext, useEffect, useState } from "react";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { app } from "../firebase";

// // 1️⃣ Context بنانا
// const AuthContext = createContext();

// // 2️⃣ Firebase Auth instance
// const auth = getAuth(app);

// // 3️⃣ AuthProvider component
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 4️⃣ Firebase auth state check
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Cleanup
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };

// // 5️⃣ Custom Hook to use AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { app } from "../firebase";
import React from "react";

const auth = getAuth(app);
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // ✅ logout function
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
