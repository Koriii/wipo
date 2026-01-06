import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/20 px-4 py-20 sm:px-6 sm:py-32 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-muted-foreground">Secure document access</span>
        </div>

        {/* Main heading */}
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Access WIPO Provisional
          <span className="block text-primary">Refusal Documents</span>
        </h1>

        {/* Subheading */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Securely view and download your Madrid Protocol provisional refusal
          PDFs. Enterprise-grade authentication with a streamlined interface
          designed for intellectual property professionals.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/dashboard">
              Access Documents
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#features">Learn More</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">Instant</div>
            <div className="text-sm text-muted-foreground">Document Access</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">Enterprise</div>
            <div className="text-sm text-muted-foreground">Grade Security</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">Real-time</div>
            <div className="text-sm text-muted-foreground">Synchronization</div>
          </div>
        </div>
      </div>
    </section>
  );
}
