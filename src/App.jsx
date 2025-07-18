import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddEvent from "./pages/AddEvent";
import Navbar from "./components/Navbar";
import "./App.css";
import EditEvent from "./pages/EditEvent";
import ProtectedRoute from "./context/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
// import EventList from "./pages/EventList";
import EventList from "./pages/EventList";

function App() {
  return (
    // ✅ AuthProvider se pura app wrap karein
    <AuthProvider>
      <Navbar />
      <div className="max-w-4xl mx-auto mt-8 p-4">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Routes for only logged-in users */}
          <Route
            path="/add-event"
            element={
              <ProtectedRoute>
                <AddEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditEvent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
