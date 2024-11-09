import Image from "next/image";

export default function Overview() {
  return (
    <section className="bg-slate-300">
      <div className="container w-full flex items-center justify-between py-10">
        <div className="w-1/2">
          <Image
            src="/images/map-portrait.png"
            alt="map"
            width={250}
            height={250}
          />
        </div>

        <div className="w-1/2 space-y-2">
          <h2 className="text-lg font-bold md:text-5xl ">What is Trackpaws?</h2>
          <p className="text-xs text-gray-600 md:text-base">
            Trackpaws is a mobile application that uses GPS tracking technology
            to help find lost pets. With Trackpaws, pet owners can post a lost
            or found pet on the app, and other pet owners can help find them.
          </p>
        </div>
      </div>
    </section>
  );
}
