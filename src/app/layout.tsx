import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import { Agentation } from "agentation";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const chomsky = localFont({
  src: "../../public/Chomsky.woff",
  variable: "--font-chomsky",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Corner — Human-Curated Newsletter",
  description:
    "A curated digest assembled from verified human contributors. No AI-written content, ever.",
  metadataBase: new URL("https://thecorner.news"),
  openGraph: {
    title: "The Corner — Human-Curated Newsletter",
    description:
      "The internet's best writing, all human. Delivered by AI.",
    siteName: "The Corner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Corner — Human-Curated Newsletter",
    description:
      "The internet's best writing, all human. Delivered by AI.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${chomsky.variable} antialiased`}
      >
        {children}
        {process.env.NODE_ENV === "development" && <Agentation />}
      </body>
    </html>
  );
}
