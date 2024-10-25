export default function Footer() {
  return (
    <footer className="bg-slate-600">
      <div className="container flex items-center justify-between py-4">
        <div className="space-x-4">
          <span className="text-xs cursor-pointer text-white md:text-base">
            Terms and Conditions
          </span>
          <span className="text-xs cursor-pointer text-white md:text-base">
            Private Policy
          </span>
        </div>
        <span className="text-xs text-white md:text-base">
          copyright © 2024 Trackpaws All Rights Reserved
        </span>
      </div>
    </footer>
  );
}
