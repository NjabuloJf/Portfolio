import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
        <div className="prose dark:prose-invert max-w-none">
          <p>Last updated: 2026</p>
          <h2>Use of Services</h2>
          <p>You agree to use our services responsibly and respectfully.</p>
          <h2>Intellectual Property</h2>
          <p>All content on this site is owned by Njabulo-Jb Tech.</p>
          <h2>Contact</h2>
          <p>For questions about these terms, contact support@njabulojb.dev</p>
        </div>
      </div>
    </div>
  );
}
