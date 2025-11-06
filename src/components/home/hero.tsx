// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";

// export default function Hero() {
//   const router = useRouter();

//   return (
//     <section className="min-h-screen flex items-center justify-center px-4">
//       <div className="text-center">
//         <button
//           type="button"
//           aria-label="Go to folders"
//           onClick={() => router.push("/styles")}
//           className="inline-block transition-transform duration-200 hover:scale-105 focus:scale-105 focus:outline-none"
//         >
//           <Image
//             src="/assets/logo.png"
//             alt="Wear It Wrong Logo"
//             width={500}
//             height={400}
//             priority
//             className="w-auto h-auto max-w-2xl"
//           />
//         </button>
//       </div>
//     </section>
//   );
// }
//-------1st design end-------

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Hero() {
//   const router = useRouter();
//   const [isClicked, setIsClicked] = useState(false);

//   const handleClick = () => {
//     setIsClicked(true);

//     // wait for the animation before navigation
//     setTimeout(() => {
//       router.push("/styles");
//     }, 1000);
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center px-4 bg-[#fafaf5]">
//       <div className="text-center relative">
//         <motion.button
//           type="button"
//           aria-label="Go to folders"
//           onClick={handleClick}
//           className="inline-block cursor-pointer focus:outline-none relative"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           transition={{ type: "spring", stiffness: 200, damping: 15 }}
//         >
//           {/* Black logo (base) */}
//           <motion.div
//             initial={{ opacity: 1 }}
//             animate={{ opacity: isClicked ? 0 : 1 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="absolute inset-0"
//           >
//             <Image
//               src="/assets/logo/logo-black.png"
//               alt="Wear It Wrong Logo Black"
//               width={500}
//               height={400}
//               priority
//               className="w-auto h-auto max-w-2xl select-none pointer-events-none"
//             />
//           </motion.div>

//           {/* Silver logo (on top, fades in) */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isClicked ? 1 : 0 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="relative"
//           >
//             <Image
//               src="/assets/logo/logo-silver.png"
//               alt="Wear It Wrong Logo Silver"
//               width={500}
//               height={400}
//               priority
//               className="w-auto h-auto max-w-2xl select-none pointer-events-none"
//             />
//           </motion.div>
//         </motion.button>
//       </div>
//     </section>
//   );
// }
//-------2nd design end-------
//----------3rd shimmer animation design---------
// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Banner from "./banner";

// export default function Hero() {
//   const router = useRouter();
//   const [isClicked, setIsClicked] = useState(false);
//   const handleClick = () => {
//     setIsClicked(true);

//     // Delay navigation so the animation is visible
//     setTimeout(() => {
//       router.push("/styles");
//     }, 1500);
//   };

//   return (
//     <section className="min-h-screen flex items-center justify-center px-4 ">
//       <div className="text-center relative">
//         <motion.button
//           type="button"
//           aria-label="Go to folders"
//           onClick={handleClick}
//           className="inline-block cursor-pointer focus:outline-none relative"
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           transition={{ type: "spring", stiffness: 200, damping: 15 }}
//         >
//           {/* Black logo */}
//           <motion.div
//             initial={{ opacity: 1 }}
//             animate={{ opacity: isClicked ? 0 : 1 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="absolute inset-0"
//           >
//             <Image
//               src="/assets/logo/logo-black.png"
//               alt="Wear It Wrong Logo Black"
//               width={500}
//               height={400}
//               priority
//               className="w-auto h-auto max-w-2xl select-none pointer-events-none"
//             />
//           </motion.div>

//           {/* Silver logo with shimmer */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: isClicked ? 1 : 0 }}
//             transition={{ duration: 0.8, ease: "easeInOut" }}
//             className="relative w-max"
//           >
//             <div className="relative">
//               <Image
//                 src="/assets/logo/logo-silver.png"
//                 alt="Wear It Wrong Logo Silver"
//                 width={500}
//                 height={400}
//                 priority
//                 className="w-auto h-auto max-w-2xl select-none pointer-events-none"
//               />
//               {/* Shimmer overlay */}
//               <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
//                 <div className="shimmer"></div>
//               </div>
//             </div>
//           </motion.div>
//         </motion.button>
//       </div>

//       {/* Shimmer CSS */}
//       <style jsx>{`
//         .shimmer {
//           position: absolute;
//           top: 0;
//           left: -150%;
//           width: 50%;
//           height: 100%;
//           background: linear-gradient(
//             120deg,
//             rgba(255, 255, 255, 0) 0%,
//             rgba(255, 255, 255, 0.4) 50%,
//             rgba(255, 255, 255, 0) 100%
//           );
//           transform: skewX(-25deg);
//           animation: shimmer 1.5s infinite;
//         }

//         @keyframes shimmer {
//           0% {
//             left: -150%;
//           }
//           100% {
//             left: 150%;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Banner from "./banner";

export default function Hero() {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    // Delay navigation so animation plays
    setTimeout(() => {
      router.push("/styles");
    }, 1500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 bg-background text-foreground">
      <div className="text-center relative w-full max-w-4xl mx-auto">
        <motion.button
          type="button"
          aria-label="Go to folders"
          onClick={handleClick}
          className="inline-block cursor-pointer focus:outline-none relative"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* --- Black logo (default) --- */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: isClicked ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/assets/logo/logo-black.png"
              alt="Wear It Wrong Logo Black"
              width={500}
              height={400}
              priority
              className="w-[70vw] sm:w-[400px] md:w-[500px] h-auto mx-auto select-none pointer-events-none"
            />
          </motion.div>

          {/* --- Silver logo with shimmer --- */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="relative w-max mx-auto"
          >
            <div className="relative">
              <Image
                src="/assets/logo/logo-silver.png"
                alt="Wear It Wrong Logo Silver"
                width={500}
                height={400}
                priority
                className="w-[70vw] sm:w-[400px] md:w-[500px] h-auto mx-auto select-none pointer-events-none"
              />

              {/* Shimmer overlay */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="shimmer" />
              </div>
            </div>
          </motion.div>
        </motion.button>
      </div>

      {/* Shimmer CSS */}
      <style jsx>{`
        .shimmer {
          position: absolute;
          top: 0;
          left: -150%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: shimmer 1.5s infinite;
        }

        @keyframes shimmer {
          0% {
            left: -150%;
          }
          100% {
            left: 150%;
          }
        }
      `}</style>
    </section>
  );
}
