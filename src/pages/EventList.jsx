import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";

const db = getFirestore(app);

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "events", id));
      alert("Event deleted successfully!");
      // onSnapshot will automatically update state
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "events"), (snapshot) => {
      const eventsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading events...</p>;

  return (
    <div
      className="max-w-3xl mx-auto mt-10 p-6 rounded shadow text-black bg-gray-100"
      // style={{
      //   backgroundImage: `url('/event-bg.jpg')`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundRepeat: "no-repeat",
      // }}
    >
      <div className=" bg to-black bg-opacity-60 p-6 rounded">
        <div>
          <h1 className="text-6xl font-bold mb-6 text-center">Events</h1>
        </div>
        <h2 className="text-2xl font-bold mb-4">Events List</h2>
        {events.length === 0 && <p>No events found.</p>}
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border p-4 rounded bg-white text-black"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date}
              </p>
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-184 mt-2 border bg-white rounded shadow"
                />
              )}
              <button
                onClick={() => navigate(`/edit/${event.id}`)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 mt-2.5"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
