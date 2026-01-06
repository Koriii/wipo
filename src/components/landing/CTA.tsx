import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 text-center sm:px-12 sm:py-20">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            Ready to access your documents?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80">
            Sign in now to view and download your WIPO provisional refusal PDFs
            with enterprise-grade security.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2"
            >
              <Link href="/dashboard">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
