import Link from "next/link";
import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA } from "@/data/resume";
import { Mail, HelpCircle, AlertCircle, Headphones, Server, User, ExternalLink } from "lucide-react";

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

        {/* Support Options Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full max-w-4xl mt-4">
          {/* Support */}
          <Link
            href="/support"
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
          >
            <Headphones className="size-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Support</span>
          </Link>

          {/* Issue */}
          <Link
            href="/issue"
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
          >
            <AlertCircle className="size-6 text-orange-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Report Issue</span>
          </Link>

          {/* Help */}
          <Link
            href="/help"
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
          >
            <HelpCircle className="size-6 text-blue-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Help Center</span>
          </Link>

          {/* Email Support */}
          <Link
            href="mailto:support@njabulojb.dev"
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
          >
            <Mail className="size-6 text-green-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Email Support</span>
          </Link>

          {/* Services */}
          <Link
            href="/services"
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
          >
            <Server className="size-6 text-purple-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Services</span>
          </Link>

          {/* Owner */}
          <Link
            href="/owner"
            className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all group"
          >
            <User className="size-6 text-cyan-500 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-medium">Owner</span>
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
                All rights reserved | Version 2.0.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
          }
