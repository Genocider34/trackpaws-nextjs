import Image from "next/image";

export default function Overview() {
  return (
    <section className="bg-slate-300">
      <div className="container w-full flex items-center justify-between py-14">
        <div className="w-1/2">
          <Image
            src="/images/map-portrait.png"
            alt="map"
            width={250}
            height={250}
          />
        </div>

        <div className="w-1/2 space-y-6">
          <h2 className="text-3xl font-bold md:text-5xl ">
            What is Trackpaws?
          </h2>
          <p className="text-xs text-gray-600 md:text-base">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quos quae, quidem, voluptates, quas quod quidem, voluptates, quas
            quod quidem, voluptates, quas quod quidem, voluptates, quas quod
          </p>
        </div>
      </div>
    </section>
  );
}
