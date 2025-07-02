'use client';

import { useEffect, useState } from 'react';

export default function CreateModal() {
  // Modal open state
  const [open, setOpen] = useState(false);
  // Form input state
  const [form, setForm] = useState({ title: '', location: '', description: '' });

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const res = await fetch('/api/proxy-postreview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      // Clear form and close modal on success
      setForm({ title: '', location: '', description: '' });
      setOpen(false);
      location.reload();
    } else {
      // Handle error
      const errorData = await res.json().catch(() => ({}));
      console.error('Submission failed:', errorData);
      alert('Failed to submit highlight');
    }
  };

  // Lock scroll and compensate scrollbar shift when modal is open
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [open]);

  // Close modal on Escape key
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, []);

  return (
    <>
      {/* Fixed Create Button */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed
          bottom-7
          right-6
          sm:right-10
          lg:right-[80px]
          h-[44px]
          px-[20px] py-[2px]
          rounded-[12px]
          border border-red-500 bg-[#EC484B]
          text-white text-[16px] font-medium
          hover:bg-red-600
          transition
          z-50
          flex items-center gap-2
        "
      >
        Create
        {/* Plus icon on the right */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>

      {/* Modal overlay and content */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black/20 flex justify-center items-center px-4">
          <div className="relative bg-white font-sans rounded-[12px] shadow-lg w-[350px] sm:w-[480px] lg:w-[550px] overflow-hidden">

            {/* Close icon (top-right corner) */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition p-1 rounded-[6px]"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header with full-width bottom border */}
            <div className="w-full border-b border-[#F3F3F3] sm:border-[#F3F3F3] lg:border-[#F3F3F3] px-6 py-4">
              <h2 className="text-xl font-semibold">Create a highlight</h2>
            </div>

            {/* Form content */}
            <div className="px-6 pt-6 pb-4 ">

              {/* Title input */}
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

              {/* Location input */}
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

              {/* Description textarea */}
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

              {/* Action buttons */}
              <div className="flex justify-end gap-[10px]">
                {/* Cancel */}
                <button
                  onClick={() => setOpen(false)}
                  className="h-[44px] px-[20px] py-[2px] rounded-[12px] border border-red-500 text-black hover:bg-red-50 transition text-sm font-medium"
                >
                  Cancel
                </button>
                {/* Confirm */}
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
