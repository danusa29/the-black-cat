import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const mono = IBM_Plex_Mono({ weight: ["300", "600"], subsets: ["latin"] });

export const metadata = {
  title: "Rainey Day Reef",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={mono.className}>{children}</body>
    </html>
  );
}
