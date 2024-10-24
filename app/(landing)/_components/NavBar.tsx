import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
export default function NavBar() {
  return (
    <nav className="px-4 py-1 flex justify-between items-center  bg-[#FFF] shadow-md top-0 sticky">
      <ul className="flex gap-4 items-center">
        <Image src="/images/logo.png" alt="logo" width={50} height={50} />
        <li>Download</li>
        <li>Features</li>
        <li>About</li>
      </ul>
      <Link href="/login">
        <Button size="small" text="Login" />
      </Link>
    </nav>
  );
}
