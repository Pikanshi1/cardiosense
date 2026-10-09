import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardioSense | Heart Health Risk Estimator",
  description:
    "An educational machine-learning demonstration for exploring heart-health risk factors.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
