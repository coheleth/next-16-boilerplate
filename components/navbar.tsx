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
  let className = "";
  if (pageName == currentPage) className = "underline";
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export default function Navbar({ pageName }: { pageName: string }) {
  return (
    <>
      <Link href={"/"}>{siteInfo.title}</Link>
      <nav>
        <NavLink href="/" pageName="home" currentPage={pageName}>
          Home
        </NavLink>
        <NavLink href="/blog" pageName="blog" currentPage={pageName}>
          Blog
        </NavLink>
      </nav>
    </>
  );
}
