"use client";
import Image from "next/image";

interface NavBarProps {
  heroRef: React.RefObject<HTMLDivElement>;
  overviewRef: React.RefObject<HTMLDivElement>;
  featuresRef: React.RefObject<HTMLDivElement>;
  onLoginClick: () => void;
}

export default function NavBar({
  heroRef,
  overviewRef,
  featuresRef,
  onLoginClick
}: NavBarProps) {
  const handleScroll = (target: "hero" | "overview" | "features") => {
    const ref =
      target === "hero"
        ? heroRef.current
        : target === "overview"
        ? overviewRef.current
        : featuresRef.current;
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="px-4 py-1 flex justify-between items-center bg-[#FFF]/50 shadow-md top-0 sticky">
      <div className="flex-1 flex items-center justify-center sm:justify-start">
        <Image
          onClick={() => handleScroll("hero")}
          className="cursor-pointer"
          priority={true}
          src="/images/logo.png"
          alt="logo"
          width={50}
          height={50}
        />
      </div>
      <ul className="flex gap-12 items-center">
        <li
          className="hidden font-bold cursor-pointer sm:block"
          onClick={() => handleScroll("hero")}
        >
          Download
        </li>
        <li
          className="hidden font-bold cursor-pointer sm:block"
          onClick={() => handleScroll("overview")}
        >
          Overview
        </li>
        <li
          className="hidden font-bold cursor-pointer sm:block"
          onClick={() => handleScroll("features")}
        >
          Features
        </li>
        <li
          className="hidden font-bold cursor-pointer sm:block"
        >
          <button onClick={onLoginClick} style={{ cursor: 'pointer', fontSize: '1rem', background: 'none', border: 'none', padding: 0 }}>
            Login
          </button>
        </li>
      </ul>
    </nav>
  );
}
