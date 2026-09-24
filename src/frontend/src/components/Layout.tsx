import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Shared shell: sticky header, limestone content plane, navy footer.
 * The content plane carries a faint Bermuda-interior wash so every page reads
 * as a room rather than a flat page. Pages render inside `main` and never
 * duplicate the header or footer.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="wash-interior flex-1">{children}</main>
      <Footer />
    </div>
  );
}
