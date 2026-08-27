import Link from "next/link";
import { requireAdmin } from "@/lib/require-admin";
import { getAllWritings } from "@/lib/writings";
import { getGalleryItems } from "@/lib/gallery";
import { getRoastVideos } from "@/lib/videos";
import { getPollDefinitions } from "@/lib/polls";

export default async function AdminDashboard() {
  await requireAdmin();

  const [writings, gallery, videos, polls] = await Promise.all([
    getAllWritings(),
    getGalleryItems(),
    getRoastVideos(),
    getPollDefinitions(),
  ]);

  const cards = [
    { href: "/admin/writings", label: "Writings", count: writings.length },
    { href: "/admin/gallery", label: "Gallery photos", count: gallery.length },
    { href: "/admin/videos", label: "Videos", count: videos.length },
    { href: "/admin/polls", label: "Polls", count: polls.length },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Admin</h1>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-white/10 bg-neutral-900 p-6 hover:border-orange-500/50"
          >
            <p className="text-2xl font-bold text-white">{card.count}</p>
            <p className="mt-1 text-sm text-neutral-400">{card.label}</p>
          </Link>
        ))}
        <Link
          href="/admin/copy"
          className="rounded-2xl border border-white/10 bg-neutral-900 p-6 hover:border-orange-500/50"
        >
          <p className="text-2xl font-bold text-white">&#9998;</p>
          <p className="mt-1 text-sm text-neutral-400">Edit site text</p>
        </Link>
      </div>
    </div>
  );
}
