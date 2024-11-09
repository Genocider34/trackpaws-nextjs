import { IoPaw } from "react-icons/io5";
import { FaCompass } from "react-icons/fa";
import { IoTimeSharp } from "react-icons/io5";
import { MdSettingsInputAntenna } from "react-icons/md";
import { FaDog } from "react-icons/fa6";
import { FaHistory } from "react-icons/fa";

export default function Features() {
  return (
    <section className="bg-slate-200">
      <div className="py-6 space-y-6 lg:space-y-12">
        <h2 className="text-xl font-bold text-center mb-6">Features</h2>
        <div className="container flex flex-col items-stretch justify-center gap-6 md:flex-row">
          {/* Feature 1 */}
          <div className="w-full md:w-1/3 flex flex-col space-y-2 bg-slate-300 rounded-xl p-6 flex-1">
            <IoPaw size={40} color="#3B82F6" />
            <h3 className="text-lg font-bold md:text-2xl">
              Built for dogs and cats
            </h3>
            <div className="flex-grow">
              <p className="text-sm">Specifically designed for dogs and cats</p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="w-full md:w-1/3 flex flex-col space-y-2 bg-slate-300 rounded-xl p-6 flex-1">
            <FaCompass size={40} color="#3B82F6" />
            <h3 className="text-lg font-bold md:text-2xl">
              Real-time location tracking
            </h3>
            <div className="flex-grow">
              <p className="text-sm">
                Use the mobile application to check the real-time location of
                your pet at any time.
              </p>
            </div>
          </div>
        </div>

        <div className="container flex flex-col items-stretch justify-center gap-6 md:flex-row">
          {/* Feature 4 */}
          <div className="w-full md:w-1/3 flex flex-col space-y-2 bg-slate-300 rounded-xl p-6 flex-1">
            <MdSettingsInputAntenna size={40} color="#3B82F6" />
            <h3 className="text-lg font-bold md:text-2xl">Wi-Fi built-in</h3>
            <div className="flex-grow">
              <p className="text-sm">
                Trackpaws connectivity Wi-Fi built in ensures your pet&apos;s
                whereabouts even when you are far-off places{" "}
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="w-full md:w-1/3 flex flex-col space-y-2 bg-slate-300 rounded-xl p-6 flex-1">
            <FaDog size={40} color="#3B82F6" />
            <h3 className="text-lg font-bold md:text-2xl">
              Lost and found dashboard
            </h3>
            <div className="flex-grow">
              <p className="text-sm">
                Trackpaws provides an easy-to-use dashboard to keep track of
                your pet&apos;s lost and found status.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="w-full md:w-1/3 flex flex-col space-y-2 bg-slate-300 rounded-xl p-6 flex-1">
            <FaHistory size={35} color="#3B82F6" />
            <h3 className="text-lg font-bold md:text-2xl">
              History tracking system
            </h3>
            <div className="flex-grow">
              <p className="text-sm">
                Trackpaws tracks the history of your pet&apos;s location every 5
                minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
