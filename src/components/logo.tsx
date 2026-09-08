"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { defaultThemeSettings, type ThemeSettings } from "@/lib/theme-settings";
import { useThemeSettings } from "@/lib/use-theme-settings";

export function Logo({
  className,
  showText = true,
  initialSettings,
}: Readonly<{
  className?: string;
  showText?: boolean;
  initialSettings?: ThemeSettings;
}>) {
  const [fallback] = useState(() => initialSettings ?? defaultThemeSettings(siteConfig.name));
  const settings = useThemeSettings(fallback);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={settings.logoUrl || "/icon.svg"}
          alt=""
          className="size-7 shrink-0 rounded-md object-cover"
        />
      }
      {showText && (
        <span className="font-heading text-lg font-semibold tracking-tight">
          {settings.companyName}
        </span>
      )}
    </div>
  );
}
