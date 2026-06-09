import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DOX Interactive — Interactive Entertainment Studio",
  description:
    "DOX Interactive is an independent game studio building premium interactive entertainment experiences. Discover our worlds.",
  keywords: [
    "DOX Interactive",
    "game studio",
    "interactive entertainment",
    "indie games",
    "premium games",
  ],
  openGraph: {
    title: "DOX Interactive — Interactive Entertainment Studio",
    description:
      "Premium interactive entertainment experiences. Every world begins with a door.",
    type: "website",
    siteName: "DOX Interactive",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOX Interactive",
    description: "Interactive Entertainment Studio",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
