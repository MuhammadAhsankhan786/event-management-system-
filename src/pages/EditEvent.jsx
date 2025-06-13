// src/pages/EditEvent.jsx

import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc, getFirestore } from "firebase/firestore";
import { app } from "../firebase";
import gsap from "gsap"; // ✅ GSAP import

const db = getFirestore(app);

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef(null); // ✅ GSAP ref
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvent = async () => {
      const ref = doc(db, "events", id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setEventData(snapshot.data());
      } else {
        alert("Event not found");
        navigate("/");
      }
      setLoading(false);
    };

    loadEvent();
  }, [id, navigate]);

  // ✅ GSAP animation after loading

  useEffect(() => {
    if (!loading) {
      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 100,
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
    }
  }, [loading]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, "events", id);
      await updateDoc(ref, {
        ...eventData,
        updatedAt: new Date(),
      });
      alert("Event updated!");
      navigate("/");
    } catch (error) {
      alert("Error updating event");
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div
      ref={containerRef}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow"
    >
      <h2 className="text-2xl font-bold mb-4">Edit Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
          value={eventData.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full px-3 py-2 border rounded"
          value={eventData.description}
          onChange={handleChange}
        />
        <input
          type="date"
          name="date"
          className="w-full px-3 py-2 border rounded"
          value={eventData.date}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Update Event
        </button>
      </form>
    </div>
  );
}
