"use client";
import React from "react";
import { FolderClosed } from "lucide-react"; // simple minimal folder icon

function FolderCard({ title }: { title: string }) {
  return (
    <button
      type="button"
      className="group flex flex-col items-center focus:outline-none transition-transform duration-300 hover:-translate-y-2"
      aria-label={title}
    >
      {/* Folder */}
      <div className="relative w-36 h-32 sm:w-40 sm:h-36 md:w-44 md:h-40 lg:w-48 lg:h-44">
        {/* Folder body */}
        <div className="absolute top-4 w-full h-[85%] rounded-md bg-gradient-to-b from-[#5EB4E8] to-[#4CA6DE] shadow-[0_4px_0_#2B7DB8,0_8px_24px_rgba(0,0,0,0.12)]" />
        {/* Folder tab */}
        <div className="absolute top-0 left-8 w-16 sm:w-18 md:w-20 h-5 rounded-t-md bg-gradient-to-b from-[#6DC3F2] to-[#5BB5E8] shadow-[0_2px_0_#2B7DB8]" />
        {/* Simple folder icon */}
        <FolderClosed
          size={42}
          strokeWidth={1.8}
          className="absolute top-10 left-1/2 -translate-x-1/2 text-[#3F3A36]/50"
        />
        {/* Decorative peeking content */}
        <div className="absolute -top-3 left-10 flex gap-2 z-20">
          <div className="w-4 h-4 bg-[#E38B8B] rounded-sm rotate-3 shadow-[0_2px_0_#C75A5A]" />
          <div className="w-4 h-4 bg-[#F5D06E] -rotate-6 rounded-sm shadow-[0_2px_0_#D4A73E]" />
          <div className="w-4 h-4 bg-[#93E0B2] rotate-2 rounded-sm shadow-[0_2px_0_#5BC876]" />
        </div>
      </div>

      {/* Title */}
      <span className="mt-4 text-sm sm:text-[15px] font-semibold tracking-wide text-[#B13535] font-serif">
        {title}
      </span>
    </button>
  );
}

export default function StyleSection() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-[#FFFDF4] py-8">
      <div className="relative w-[92vw] sm:w-[85vw] md:w-[75vw] lg:w-[70vw] max-w-6xl min-h-[80vh] rounded-2xl border-[5px] border-[#3F3A36] bg-[#FFFEF6] shadow-[0_6px_0_#3F3A36,0_14px_36px_rgba(0,0,0,0.12)] flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-16 pt-8 sm:pt-10 md:pt-12 pb-10">
        {/* Static Search Bar */}
        <div className="mx-auto w-full max-w-xs sm:max-w-md md:max-w-lg mb-8">
          <div className="relative flex items-center justify-center">
            <div className="absolute left-3 text-[#3F3A36]/70">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M16.5 16.5L21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="h-10 sm:h-11 w-full rounded-md border-2 border-[#B5A89F] bg-[#FDFBF6] pl-10 pr-4 flex items-center text-[14px] sm:text-[15px] md:text-base text-[#3F3A36] font-serif shadow-[inset_0_-2px_0_#D8D0C9,0_3px_0_#8E8278,0_8px_20px_rgba(0,0,0,0.08)]">
              What do I style?
            </div>
          </div>
        </div>

        {/* Folder Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-14 md:gap-20 place-items-center w-full mb-6">
          <FolderCard title="Brands" />
          <FolderCard title="People" />
          <FolderCard title="Space" />
        </div>
      </div>
    </section>
  );
}
