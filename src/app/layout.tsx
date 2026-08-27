import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getSiteCopy } from "@/lib/site-copy";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const copy = await getSiteCopy();
  return {
    title: {
      default: copy["site.title"],
      template: `%s — ${copy["site.title"]}`,
    },
    description: copy["site.metaDescription"],
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const copy = await getSiteCopy();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-neutral-950 text-neutral-100">
        <Nav copy={copy} />
        <main className="flex-1">{children}</main>
        <Footer copy={copy} />
      </body>
    </html>
  );
}
