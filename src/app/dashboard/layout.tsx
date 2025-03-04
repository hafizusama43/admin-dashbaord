import Providers from "./providers";
import { DesktopNav } from "@/components/sidebar/navigation";
import Header from "@/components/navbar/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    // TODO : Remove this provider
    <Providers>
      <main className="bg-muted/40 flex min-h-screen w-full flex-col">
        <DesktopNav />
        <div className="flex flex-col sm:gap-4 sm:py-0 sm:pl-14">
          <Header />
          <main className="bg-muted/40 grid flex-1 items-start gap-2 p-4 sm:px-4 sm:py-0 md:gap-4">
            {children}
          </main>
        </div>
      </main>
    </Providers>
  );
}
