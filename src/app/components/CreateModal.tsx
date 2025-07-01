'use client';
import { useState } from 'react';

export default function CreateModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('https://surgetakehome.vercel.app/api/highlights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uuid: 'locke',
        title: form.title,
        location: form.location,
        description: form.description,
      }),
    });

    if (res.ok) {
      setForm({ title: '', location: '', description: '' });
      setOpen(false);
      location.reload(); // Refresh to show new item
    } else {
      alert('Failed to submit highlight');
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition"
      >
        Create +
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Create a highlight</h2>

            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              placeholder="Highlight name"
              required
            />
            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-3"
              placeholder="Location"
              required
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded p-2 mb-4"
              placeholder="Description"
              rows={4}
              required
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
