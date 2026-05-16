import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function StatusPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl font-bold mb-6">System Status</h1>
        
        <div className="grid gap-4">
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <span>Website</span>
            <span className="flex items-center gap-2 text-green-500">● Operational</span>
          </div>
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <span>API Services</span>
            <span className="flex items-center gap-2 text-green-500">● Operational</span>
          </div>
          <div className="p-4 border rounded-lg flex justify-between items-center">
            <span>Support System</span>
            <span className="flex items-center gap-2 text-green-500">● Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
    }
