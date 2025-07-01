'use client';

import { useState } from 'react';

export default function SubmitReview() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch(`https://surgetakehome.vercel.app/api/postreview/locke`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, location, description }),
    });

    if (res.ok) {
      setSuccess(true);
      setTitle('');
      setLocation('');
      setDescription('');
    } else {
      alert('Failed to submit review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold mb-2">Submit a New Review</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
        rows={4}
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Submit Review
      </button>

      {success && <p className="text-green-600 mt-2">Review submitted successfully!</p>}
    </form>
  );
}
