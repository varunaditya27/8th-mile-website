"use client";

import Link from "next/link";
import Image from "next/image";

const Footer2 = () => {
  return (
    <footer className="relative z-[9999] bottom-0 w-full bg-white text-black py-6 px-6 md:px-24 border-t border-gray-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-12">

        {/* Left: Logos */}
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <Image
            src="/RVCE Corner Logo WHITE.png"
            alt="RVCE Logo"
            width={120}
            height={80}
            className="object-contain brightness-0 invert-0"
          />
          <span className="w-[1px] h-10 bg-gray-400" />
          <Image
            src="/8thmilelogocolour.png"
            alt="8th Mile Logo"
            width={60}
            height={60}
            className="object-contain rounded-full"
          />
        </div>

        {/* Right: Contact + Info + Policies */}
        <div className="flex flex-col items-center md:items-end w-full text-center md:text-right gap-2">

          {/* Top Row: Contact + Copyright + Credits */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-sm text-gray-600">
            <Link href="/contact" className="fraunces hover:text-black transition">
              Contact Us
            </Link>

            <span className="fraunces text-gray-600">
              &copy; 8<sup>th</sup> Mile 2025 •{" "}
              <Link
                href="https://www.rvce.edu.in"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#418b24] transition"
              >
                RV College of Engineering
              </Link>
            </span>

            <span className="fraunces text-gray-600">
              Developed by{" "}
              <Link
                href="https://www.linkedin.com/company/coding-club-rvce/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#e90c00] transition"
              >
                Coding Club RVCE
              </Link>
            </span>
          </div>

          {/* Bottom Row: Policy Links */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs md:text-sm text-gray-600">
            {[
              { href: "/terms", label: "Terms & Conditions" },
              { href: "/refund-policy", label: "Refund Policy" },
              { href: "/delivery-policy", label: "Delivery Policy" },
              { href: "/privacy-policy", label: "Privacy Policy" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="fraunces hover:text-black transition"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer2;
