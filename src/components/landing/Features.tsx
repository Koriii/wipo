import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Download,
  FolderOpen,
  Globe,
  Lock,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Quickly find documents by IRN number or filename with instant filtering and real-time results.",
  },
  {
    icon: FolderOpen,
    title: "Organized by IRN",
    description:
      "Documents automatically grouped by International Registration Number for easy navigation.",
  },
  {
    icon: Download,
    title: "One-Click Download",
    description:
      "Download any PDF instantly with secure, time-limited URLs that protect your documents.",
  },
  {
    icon: Globe,
    title: "WIPO Integration",
    description:
      "Direct links to WIPO Madrid Monitor for comprehensive trademark information.",
  },
  {
    icon: Lock,
    title: "Secure Access",
    description:
      "Enterprise authentication powered by WorkOS ensures only authorized users access documents.",
  },
  {
    icon: Clock,
    title: "Always Current",
    description:
      "Documents synced from cloud storage ensure you always have access to the latest files.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-muted/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to manage WIPO documents
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A purpose-built platform for intellectual property professionals
            handling Madrid Protocol provisional refusals.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="border-border/50 bg-card/50 backdrop-blur transition-colors hover:bg-card"
            >
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
