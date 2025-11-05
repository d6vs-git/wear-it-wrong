"use client";

import { useState, useRef, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const avatar = session?.user?.image;
  const name = session?.user?.name ?? "Guest";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-2 py-1 shadow-sm hover:shadow"
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt={name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">👤</div>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-lg border border-black/10 bg-white shadow-md p-2">
          <div className="px-2 py-2 text-sm">
            {status === "authenticated" ? (
              <div className="space-y-2">
                <div className="font-medium truncate">{name}</div>
                <a href="/bookings" className="block rounded px-2 py-1 hover:bg-gray-100">My Meetings</a>
                <button onClick={() => signOut()} className="w-full text-left rounded px-2 py-1 hover:bg-gray-100">Sign out</button>
              </div>
            ) : (
              <div className="space-y-2">
                <button onClick={() => signIn("google")} className="w-full text-left rounded px-2 py-1 hover:bg-gray-100">Sign in with Google</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
