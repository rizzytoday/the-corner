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
  title: "The Corner",
  description:
    "An open publishing platform where every post is AI-verified human. Subscribe to writers you love.",
  metadataBase: new URL("https://the-corner-pi.vercel.app"),
  openGraph: {
    title: "The Corner",
    description:
      "Write freely. Get verified. Get paid. All human.",
    siteName: "The Corner",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Corner",
    description:
      "Write freely. Get verified. Get paid. All human.",
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
