import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
export default function Hero() {
  return (
    <section className="bg-slate-200">
      <div className="container flex items-center p-6">
        {/* flex 1 */}
        <div className="w-1/2">
          <div className="space-y-6 mb-6">
            <h1 className="text-3xl font-bold md:text-5xl text-orange-500">
              Reuniting Pets with Their Families
            </h1>
            <p className="text-xs text-gray-600 md:text-base">
              With GPS tracking and a community of helpers, our app ensures lost
              pets find their way home faster. Let’s make every lost pet a found
              one
            </p>
          </div>
          <Link href="#">
            <Button size="regular" text="Download App" />
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
