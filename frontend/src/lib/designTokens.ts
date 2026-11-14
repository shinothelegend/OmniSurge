/**
 * OmniSurge Design Language — Core Design Tokens
 * Strictly matches the 5 visual references (Cosmic Landing, Pastel Analytics, Sky Pricing, Minimal Settings, Editorial Headlines)
 */

export const tokens = {
  name: "OmniSurge Design Language",
  colors: {
    // Surface & Text
    ink: "#0A0B0D", // Near-black for cosmic landing & deep text
    paper: "#F4F4F2", // Warm off-white for data dashboards & shells
    white: "#FFFFFF",
    muted: "#A1A1AA",
    borderSubtleDark: "rgba(255, 255, 255, 0.08)",
    borderSubtleLight: "rgba(10, 11, 13, 0.08)",

    // Glow & Highlight Accents (Cosmic Landing - Ref 1)
    emerald: "#3DDC97",
    mint: "#BFFFE0",
    amber: "#FFB25B",

    // Pastel & Tactile Data Tokens (Dashboard / Analytics - Ref 2)
    violet: "#8B5CF6",
    lavender: "#E9E0FF",
    coral: "#FF6B57",
    peach: "#FFE3C2",
    softBlue: "#3B82F6",
    softGreen: "#10B981",

    // Sky & Glass Tokens (Pricing - Ref 3)
    skyTop: "#0B4FC4",
    skyMid: "#2E9BE0",
    skyBottom: "#A8F0FF",
    navyCtaStart: "#0B2545",
    navyCtaEnd: "#134074",

    // Settings (Ref 4)
    settingsShell: "#F4F4F6",
    settingsCard: "#FFFFFF",
    settingsActivePill: "#E4E4E7",
    dangerRed: "#EF4444",
  },
  radii: {
    sm: "10px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    pill: "9999px",
  },
  shadows: {
    softCard: "0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.02)",
    glassCard: "0 20px 50px rgba(11, 79, 196, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)",
    darkCard: "0 20px 40px -15px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.06)",
    emeraldGlow: "0 0 40px rgba(61, 220, 151, 0.35)",
    amberGlow: "0 0 30px rgba(255, 178, 91, 0.35)",
  },
  typography: {
    primarySans: "'NT Ubuntu Sans Mini', ui-sans-serif, system-ui, sans-serif",
    accentScript: "'NT Ubuntu Serif', 'Caveat', cursive, serif",
  },
} as const;
