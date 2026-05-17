import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";

export default function ContactSection() {
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">Contact</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-8 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">
          Want to chat? Just shoot me a dm{" "}
          <Link
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
          >
            with a direct question on Facebook me
          </Link>{" "}
          and I&apos;ll respond whenever I can. I will ignore all
          soliciting.
        </p>

        {/* Support Links - All working links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link
            href="/support"
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
          >
            Support
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/issue"
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
          >
            Report Issue
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/help"
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
          >
            Help Center
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="mailto:support@njabulojb.dev"
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
          >
            Email Support
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/services"
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
          >
            Services
          </Link>
          <span className="text-muted-foreground">•</span>
          <Link
            href="/owner"
            className="text-blue-500 hover:text-blue-600 hover:underline transition-colors"
          >
            Owner
          </Link>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-border pt-6 mt-2">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <Link href="/support" className="hover:text-foreground transition-colors">
                Support
              </Link>
              <span>•</span>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/status" className="hover:text-foreground transition-colors">
                System Status
              </Link>
            </div>
            
            {/* Powered By */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                Powered by{" "}
                <Link
                  href="https://github.com/NjabuloJf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline transition-colors"
                >
                  Njabulo-Jb Tech
                </Link>{" "}
                © 2026
              </p>
              <p className="text-[10px] text-muted-foreground/60 mt-1">
                JavaScript | React.js | Next.js Developer | Business Portfolio Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
            }
