import { BrandLockup } from "@/components/BrandLockup";
import { NAV_ITEMS } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

/**
 * Sticky site header: hairline bottom rule, lockup left, tracked nav right.
 * Collapses to a full-width panel on small screens.
 */
export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="ironwork-rule" aria-hidden="true" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
        <Link
          to="/"
          data-ocid="nav.home_link"
          aria-label="Stone & Leaf Bermuda — home"
          className="transition-smooth hover:opacity-70"
          onClick={() => setOpen(false)}
        >
          <BrandLockup variant="inline" />
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 md:flex"
          data-ocid="nav.primary"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`nav.${item.label.toLowerCase()}_link`}
              className="tracked text-[0.7rem] text-muted-foreground transition-smooth hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            data-ocid="nav.plan_visit_button"
            className="tracked border border-primary px-5 py-2.5 text-[0.7rem] text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
          >
            Plan a Visit
          </Link>
        </nav>

        <button
          type="button"
          data-ocid="nav.menu_toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="flex size-10 items-center justify-center text-foreground transition-smooth hover:text-accent md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div className="hairline-b" aria-hidden="true" />

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background md:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav
          aria-label="Primary mobile"
          className="mx-auto flex max-w-6xl flex-col px-6 py-4"
        >
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-ocid={`nav.mobile_${item.label.toLowerCase()}_link`}
              onClick={() => setOpen(false)}
              className="tracked border-b border-border py-4 text-xs text-muted-foreground transition-smooth hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            data-ocid="nav.mobile_plan_visit_button"
            onClick={() => setOpen(false)}
            className="tracked mt-5 border border-primary px-5 py-3 text-center text-xs text-primary transition-smooth hover:bg-primary hover:text-primary-foreground"
          >
            Plan a Visit
          </Link>
        </nav>
      </div>
    </header>
  );
}
