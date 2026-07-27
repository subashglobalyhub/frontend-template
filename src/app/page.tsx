import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { siteConfig } from "@/config/site";
import { parseThemeSettingsCookie, THEME_SETTINGS_KEY } from "@/lib/theme-settings";

export default async function Home() {
  const cookieStore = await cookies();
  const initialSettings = parseThemeSettingsCookie(
    cookieStore.get(THEME_SETTINGS_KEY)?.value,
    siteConfig.name
  );

  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <Logo initialSettings={initialSettings} />
        <ThemeToggle />
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-32 text-center">
        <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-foreground">
          {initialSettings.companyName}
        </h1>
        <p className="max-w-md text-lg leading-8 text-muted-foreground">
          {siteConfig.description}
        </p>
        <Button>Get Started</Button>
      </main>
    </div>
  );
}
