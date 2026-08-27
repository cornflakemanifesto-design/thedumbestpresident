import Link from "next/link";
import { isAdmin } from "@/lib/require-admin";
import { logout } from "@/lib/admin-auth-actions";

const LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/writings", label: "Writings" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/videos", label: "Videos" },
  { href: "/admin/polls", label: "Polls" },
  { href: "/admin/copy", label: "Site text" },
];

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const authed = await isAdmin();

  if (!authed) {
    return <div className="mx-auto max-w-3xl px-6 py-16">{children}</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <nav className="flex flex-wrap gap-1 text-sm font-medium">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-1.5 text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form action={logout}>
          <button
            type="submit"
            className="rounded-full px-3 py-1.5 text-sm text-neutral-400 hover:bg-white/10 hover:text-white"
          >
            Log out
          </button>
        </form>
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
}
