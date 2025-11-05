"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

export default function BookingPage() {
  const { data: session } = useSession();
  const [selected, setSelectedDate] = useState<Date | undefined>();
  const [slots, setSlots] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [notice, setNotice] = useState<string>("");

  // Prefill email from signed-in user, but let user edit it
  useEffect(() => {
    if (session?.user?.email) {
      setEmail((prev) => prev || (session.user!.email as string));
    }
  }, [session]);

  const handleDayPickerSelect = async (date?: Date) => {
    setError("");
    setSelectedSlot(null);
    setSlots([]);
    setSelectedDate(date);
    if (!date) return;

    // Disallow past/sat/sun (customize as needed)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date.getDay() === 0 || date.getDay() === 6 || date < today) {
      setSlots([]);
      return;
    }

    setLoading(true);
    try {
      const key = format(date, "yyyyMMdd");
      const res = await fetch(`/api/availability?date=${key}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Failed to fetch available slots");
      setSlots(data.slots || []);
    } catch (e) {
      setError("Failed to fetch available slots. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotice("");
    if (!selected || !selectedSlot || !email) return;

    const [h, m] = selectedSlot.split(":").map(Number);
    const local = new Date(selected);
    local.setHours(h, m, 0, 0);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: email.split("@")[0],
        email,
        phone: "N/A",
        dateTime: local.toISOString(),
        timeZone,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setNotice("✅ Your meeting is booked! You’ll get an email and calendar invite shortly.");
    } else {
      setNotice(data?.error || "Booking failed. Please try another time.");
    }
  };

  return (
    <div className="flex items-center justify-center p-10">
      <form onSubmit={submit} className="flex flex-col gap-4 w-full max-w-3xl">
        <h2 className="text-xl font-bold">Let&apos;s Talk</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <DayPicker mode="single" selected={selected} onSelect={handleDayPickerSelect} />

          <div className="sm:ms-7 sm:ps-5 sm:border-s border-gray-200 w-full sm:max-w-[15rem] mt-5 sm:mt-0">
            <h3 className="text-base font-medium mb-3 text-center">
              {selected ? format(selected, "PPP") : "Select a Date First"}
            </h3>
            {loading ? (
              <div className="flex flex-col justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                <p className="ml-2">Loading...</p>
              </div>
            ) : slots && slots.length > 0 ? (
              <ul className="grid w-full grid-cols-2 gap-2 mt-2">
                {slots.map((slot) => (
                  <li key={slot}>
                    <input
                      type="radio"
                      id={slot}
                      value={slot}
                      className="hidden peer"
                      name="timetable"
                      onChange={() => setSelectedSlot(slot)}
                    />
                    <label
                      htmlFor={slot}
                      className="inline-flex items-center justify-center w-full p-2 text-sm font-medium text-center bg-white border rounded-lg cursor-pointer text-blue-600 border-blue-600 peer-checked:border-blue-600 peer-checked:bg-blue-600 peer-checked:text-white hover:bg-blue-500 hover:text-white"
                    >
                      {slot}
                    </label>
                  </li>
                ))}
              </ul>
            ) : selected ? (
              <div className="flex justify-center items-center h-32 w-full">
                <p className="text-lg font-medium">No Time Available</p>
              </div>
            ) : null}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="john.doe@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            id="message"
            name="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Please Provide Topics For the Discussion..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <div className="flex gap-2 justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full md:w-1/4 px-5 py-2.5 disabled:opacity-50"
            disabled={!selected || !selectedSlot || !email}
          >
            Submit
          </button>
          <a
            href="/book"
            className="w-full md:w-1/4 px-5 py-2.5 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100"
          >
            Reset
          </a>
        </div>
        {notice && <p className="text-sm">{notice}</p>}
      </form>
    </div>
  );
}
