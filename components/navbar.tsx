import Link from "next/link";
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
    <Link href={href} className={pageName == currentPage ? "underline" : ""}>
      {children}
    </Link>
  );
}

export default function Navbar({ pageName }: { pageName: string }) {
  return (
    <div className="flex justify-between p-2">
      <Link href={"/"}>{siteInfo.title}</Link>
      <nav className="flex gap-2">
        <NavLink href="/" pageName="home" currentPage={pageName}>
          Home
        </NavLink>
        <NavLink href="/blog" pageName="blog" currentPage={pageName}>
          Blog
        </NavLink>
      </nav>
    </div>
  );
}
