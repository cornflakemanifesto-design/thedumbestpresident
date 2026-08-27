import type { Metadata } from "next";
import { Alfa_Slab_One, Poppins } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { getSiteCopy } from "@/lib/site-copy";
import "./globals.css";

const displayFont = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const bodyFont = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
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
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Nav copy={copy} />
        <main className="flex-1">{children}</main>
        <Footer copy={copy} />
      </body>
    </html>
  );
}
