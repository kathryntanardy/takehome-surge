'use client';

import { useEffect, useState } from 'react';

export default function CreateModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: '', location: '', description: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const res = await fetch('https://surgetakehome.vercel.app/api/postreview/locke', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: '', location: '', description: '' });
      setOpen(false);
      location.reload();
    } else {
      const errorData = await res.json().catch(() => ({}));
      console.error('Submission failed:', errorData);
      alert('Failed to submit highlight');
    }
  };

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-600 transition z-50"
      >
        Create +
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center px-4">
          <div className="bg-white font-sans rounded-[12px] shadow-lg w-[350px] sm:w-[480px] lg:w-[550px] overflow-hidden">

            {/* Header with full-width bottom border */}
            <div className="w-full border-b border-[#F3F3F3] sm:border-[#F3F3F3] lg:border-[#F3F3F3] px-6 py-4">
              <h2 className="text-xl font-semibold">Create a highlight</h2>
            </div>

            {/* Content with padding */}
            <div className="px-6 pt-6 pb-4 ">

              <label className="block mb-2 text-sm font-medium text-black">
                Highlight name <span className="text-red-500">*</span>
              </label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border border-[#E2E2E2] rounded-[8px] px-3 py-2 mb-4 "
                required
              />

              <label className="block mb-2 text-sm font-medium text-black">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full border border-[#E2E2E2] rounded-[8px] px-3 py-2 mb-4"
                required
              />

              <label className="block mb-2 text-sm font-medium text-black">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border border-[#E2E2E2] rounded-[8px] px-3 py-2 mb-6 "
                rows={4}
                required
              />

              <div className="flex justify-end gap-[10px]">
                <button
                  onClick={() => setOpen(false)}
                  className="h-[44px] px-[20px] py-[2px] rounded-[12px] border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="h-[44px] px-[20px] py-[2px] rounded-[12px] border border-red-500 bg-red-500 text-white hover:bg-red-600 transition text-sm font-medium"
                >
                  Confirm
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}
