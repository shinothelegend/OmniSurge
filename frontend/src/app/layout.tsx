import type { Metadata } from "next";
import { Unbounded, JetBrains_Mono } from "next/font/google";
import "./tailwind-built.css";
import "./globals.css";
import { ThemeProvider } from "@/hooks/useTheme";
import { Web3Provider } from "@/hooks/useWeb3";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "OmniSurge | Low-Latency JIT Liquidity Protocol",
  description:
    "Autonomous Just-In-Time concentrated liquidity rebalancer on Base Sepolia and Unichain Sepolia via the Reactive Network.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${unbounded.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] flex flex-col font-sans overflow-x-hidden">
        <ThemeProvider>
          <Web3Provider>{children}</Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
