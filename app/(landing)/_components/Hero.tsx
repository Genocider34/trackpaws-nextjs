import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Hero() {
  const [apkDownloadUrl, setApkDownloadUrl] = useState(
    "/downloads/trackpaws-v1.1.apk"
  );

  const handleDownloadClick = () => {
    setApkDownloadUrl(
      `/downloads/trackpaws-v1.1.apk?timestamp=${new Date().getTime()}`
    );
  };

  return (
    <section className="bg-slate-200">
      <div className="container flex items-center p-6">
        {/* flex 1 */}
        <div className="w-1/2">
          <div className="space-y-2 mb-4 lg:space-y-6 lg:mb-6">
            <h1 className="text-xl font-bold md:text-3xl lg:text-6xl text-orange-500">
              Reuniting Pets with Their Families
            </h1>
            <p className="text-sm text-gray-600 md:text-md lg:text-xl">
              With GPS tracking and a community of helpers, our app ensures lost
              pets find their way home faster. Let’s make every lost pet a found
              one.
            </p>
          </div>
          <Link href={apkDownloadUrl} download onClick={handleDownloadClick}>
            <button className="text-sm rounded-xl uppercase bg-[#3B82F6] text-white px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-4 md:text-lg lg:text-xl hover:bg-[#3B82F6]/90 text-center cursor-pointer">
              Download App
            </button>
          </Link>
        </div>

        {/* flex 2 */}
        <div className="w-1/2">
          <Image
            src="/images/hero.png"
            alt="image"
            width={1200}
            height={1200}
          />
        </div>
      </div>
    </section>
  );
}
