"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import siteInfo from "@/siteinfo";

function NavLink({
  href,
  pageName,
  currentPage,
  children,
}: {
  href: string;
  pageName: string;
  currentPage: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={pageName == currentPage ? "underline" : "no-underline"}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const pageName = pathname.split("/")[1];

  return (
    <div className="flex justify-between p-2">
      <Link href={"/"} className="no-underline">
        {siteInfo.title}
      </Link>
      <nav className="flex gap-2">
        <NavLink href="/" pageName="" currentPage={pageName}>
          Home
        </NavLink>
        <NavLink href="/blog" pageName="blog" currentPage={pageName}>
          Blog
        </NavLink>
      </nav>
    </div>
  );
}
