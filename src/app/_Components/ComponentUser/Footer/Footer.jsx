
import React from "react";
import Link from "next/link";
import { useUser } from "@/context/Context"; 

export default function Footer() {
  const { messageAndPaypal } = useUser();

  return (
    <footer className="footer bg-[#131434] text-white pt-5 pb-3">
      <div className="container mx-auto px-8">
        <h3 className="mb-4 font-medium text-[28px]">الثورة السورية</h3>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Navigation Links */}
          <div className="col-span-12 md:col-span-4">
            <div className="grid grid-cols-3 gap-2 text-sm">
              {[
                { href: "/", text: "الرئيسية" },
                { href: "/symbolthourauser", text: "رموز الثورة" },
                { href: "/graamsystem", text: "ملفات النظام" },
                { href: "/lastNews", text: "أخر الاخبار" },
                { href: "/blacklistuser", text: "القائمة السوداء" },
                { href: "/graemqasad", text: "ملفات قسد" },
                { href: "/archiefthoura", text: "أرشيف الثورة" },
                { href: "/blacklistuser", text: "مجرمي الحرب" },
                { href: "/graemdashuser", text: "ملفات داعش" },
              ].map((link, index) => (
                <Link key={index} href={link.href} className="hover:underline">
                  {link.text}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div className="col-span-12 md:col-span-2 flex justify-center items-center">
            <div className="text-center">
              <p className="mb-3 text-sm">تواصل معنا</p>
              <div className="flex justify-center items-center space-x-2">
                {[
                  {
                    href: "https://api.whatsapp.com/send/?phone=4917676000731",
                    icon: "fa-regular fa-comment-dots",
                  },
                  {
                    href: "https://whatsapp.com/channel/0029VadYk723LdQRWZRO4t3S",
                    icon: "fa-brands fa-whatsapp",
                  },
                  {
                    href: "https://www.instagram.com/syrian_revolut/",
                    icon: "fa-brands fa-instagram",
                  },
                  {
                    href: "https://t.me/Syrian_Revolution7",
                    icon: "fa-brands fa-telegram",
                  },
                  {
                    href: "https://www.tiktok.com/@syrian.revolution7",
                    icon: "fa-brands fa-tiktok",
                  },
                  {
                    href: "https://www.facebook.com/syrian.revolut1",
                    icon: "fa-brands fa-square-facebook",
                  },
                  {
                    href: "https://x.com/syrian_revolut",
                    icon: "fa-brands fa-square-twitter",
                  },
                  {
                    href: "https://youtube.com/@syrian.revolution7",
                    icon: "fa-brands fa-square-youtube",
                  },
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gray-400"
                  >
                    <i className={link.icon}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* App Install */}
          <div className="col-span-12 md:col-span-2 flex justify-center items-center">
            <div className="text-center">
              <p className="mb-3 text-sm">تثبيت التطبيق</p>
              <div className="flex justify-center items-center gap-3">
                {[
                  {
                    category: "android",
                    label: "اندرويد",
                  },
                  {
                    category: "desktop",
                    label: "ايفون",
                  },
                ].map((app, index) => (
                  <a
                    key={index}
                    href={
                      messageAndPaypal.find((e) => e.category === app.category)
                        ?.content
                    }
                    className="text-sm"
                  >
                    <button className="px-4 py-1 border-2 border-white text-white  hover:text-main-color transition">
                      {app.label}
                    </button>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Support Us */}
          <div className="col-span-12 md:col-span-4 flex justify-center items-center">
            <div className="text-center">
              <p className="mb-3 text-sm">
                ادعم موقعنا لنستمر بالتطوير وتقديم رسالتنا (تبرع الان)
              </p>
              <div className="space-y-2">
                {messageAndPaypal
                  .filter((e) => e.category === "paypal")
                  .map((e, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center gap-2"
                    >
                      <a
                        href={e.content}
                        className="text-sm text-white hover:underline"
                      >
                        {e.content}
                      </a>
                      <img
                        src={`https://syrianrevolution1.com/messagePaypal/${e.icon}`}
                        alt="paypal"
                        className="w-7 h-7"
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-gray-600" />
        <p className="text-center text-sm">
          جميع حقوق النشر محفوظة -{" "}
          <Link href="/privacypolicy" className="hover:underline font-normal text-[16px] leading-6" >
            سياسة الخصوصية
          </Link>
        </p>
      </div>
    </footer>
  );
}
