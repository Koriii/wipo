import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Key, Server, Eye } from "lucide-react";

const securityFeatures = [
  {
    icon: Key,
    title: "Enterprise SSO",
    description: "Single sign-on with SAML, OIDC, and social providers via WorkOS.",
  },
  {
    icon: Server,
    title: "Cloud Storage",
    description: "Documents stored on Cloudflare R2 with global edge distribution.",
  },
  {
    icon: Eye,
    title: "Audit Logging",
    description: "Complete visibility into document access and user activity.",
  },
  {
    icon: Shield,
    title: "Encrypted Transfer",
    description: "All data transmitted over TLS with time-limited signed URLs.",
  },
];

export function Security() {
  return (
    <section id="security" className="bg-muted/30 px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div>
            <Badge variant="secondary" className="mb-4">
              Enterprise Security
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Your documents are protected
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Built with security-first architecture to ensure your sensitive
              intellectual property documents remain confidential and accessible
              only to authorized personnel.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {securityFeatures.map((feature) => (
                <Card key={feature.title} className="border-border/50">
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent p-8">
              <div className="flex h-full items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-4 animate-pulse rounded-full bg-primary/20 blur-xl" />
                  <div className="relative flex h-32 w-32 items-center justify-center rounded-2xl bg-card shadow-lg">
                    <Shield className="h-16 w-16 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
