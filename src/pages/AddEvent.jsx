import React, { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";

import { CLOUDINARY_URL, UPLOAD_PRESET } from "../cloudinary";

import { app } from "../firebase";

const db = getFirestore(app);

export default function AddEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Image upload handler
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Event submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !date) {
      alert("Please fill all fields");
      return;
    }
    setSaving(true);
    try {
      await addDoc(collection(db, "events"), {
        title,
        description,
        date,
        imageUrl: imageUrl || "",
        createdAt: new Date(),
      });
      alert("Event added successfully!");
      // Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Event</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Title"
          className="w-full px-3 py-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Event Description"
          className="w-full px-3 py-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full px-3 py-2 border rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <div>
          <label className="block mb-1 font-semibold">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {uploading && (
            <p className="text-blue-500 mt-1">Uploading image...</p>
          )}
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded"
              className="w-48 mt-2 rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={uploading || saving || !title || !description || !date}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Add Event"}
        </button>
      </form>
    </div>
  );
}
