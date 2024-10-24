import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="px-4 py-1 flex justify-between items-center  bg-[#FFF]/50 shadow-md top-0 sticky">
      <ul className="flex gap-12 items-center">
        <Image
          className="cursor-pointer"
          priority={true}
          src="/images/logo.png"
          alt="logo"
          width={50}
          height={50}
        />
        <li className="font-bold cursor-pointer">Download</li>
        <li className="font-bold cursor-pointer">Features</li>
        <li className="font-bold cursor-pointer">FAQ</li>
        <li className="font-bold cursor-pointer">About</li>
      </ul>
      <Link href="/login">
        <Button size="small" text="Login" />
      </Link>
    </nav>
  );
}
