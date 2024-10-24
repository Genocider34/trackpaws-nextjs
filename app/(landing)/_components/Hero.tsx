import Image from "next/image";
import Button from "@/components/Button";
export default function Hero() {
  return (
    <section className="bg-slate-200">
      <div className="container flex items-center ">
        {/* flex 1 */}
        <div className="w-1/2 space-y-6">
          <h1 className="text-3xl font-bold lg:text-5xl">
            <span className="text-orange-500">Together</span> we can help find
            our lost pets home
          </h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quos quae, quidem, voluptates, quas quod quidem, voluptates, quas
            quod quidem, voluptates, quas quod quidem, voluptates, quas quod
          </p>
          <Button size="regular" text="Download App" />
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
