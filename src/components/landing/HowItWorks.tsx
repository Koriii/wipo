import { Badge } from "@/components/ui/badge";
import { LogIn, Search, Download } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: LogIn,
    title: "Sign In Securely",
    description:
      "Authenticate with your enterprise credentials through our secure WorkOS integration. Single sign-on supported.",
  },
  {
    step: "02",
    icon: Search,
    title: "Find Your Documents",
    description:
      "Browse documents organized by IRN or use the search to quickly locate specific provisional refusal PDFs.",
  },
  {
    step: "03",
    icon: Download,
    title: "Download & Review",
    description:
      "Download PDFs with one click. Access WIPO Madrid Monitor directly for additional trademark details.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in minutes with our streamlined workflow.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((item, index) => (
            <div key={item.step} className="relative">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-16 hidden h-px w-full bg-border lg:block" />
              )}

              <div className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                  {item.step}
                </div>

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  <item.icon className="h-6 w-6 text-foreground" />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
