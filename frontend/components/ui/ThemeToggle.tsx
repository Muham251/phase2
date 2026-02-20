"use client";

import { useTheme } from "@/src/components/theme/theme-provider";
import { GradientButton } from "@/src/components/ui/gradient-button";

export default function ThemeToggle() {
  const { theme, toggleTheme, isMounted } = useTheme();

  if (!isMounted) {
    return null;
  }

  return (
    <GradientButton onClick={toggleTheme} variant="secondary" animate={true}>
      {theme === "light" ? "🌙" : "☀️"}
    </GradientButton>
  );
}
