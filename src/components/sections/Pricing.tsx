import { Button } from "@/components/ui/button";
import { Check, Sparkles, Crown } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with your first resume",
      features: [
        "1 resume template",
        "Basic AI suggestions",
        "PDF download",
        "Email support"
      ],
      cta: "Get Started Free",
      popular: false,
      icon: null
    },
    {
      name: "Pro",
      price: "$12",
      period: "per month",
      description: "Everything you need for a successful job search",
      features: [
        "All premium templates",
        "Advanced AI content suggestions",
        "Unlimited PDF downloads",
        "Cover letter builder",
        "ATS optimization check",
        "Priority support",
        "Multiple resume versions"
      ],
      cta: "Start Pro Trial",
      popular: true,
      icon: Sparkles
    },
    {
      name: "Lifetime", 
      price: "$99",
      period: "one-time payment",
      description: "All Pro features forever, no recurring payments",
      features: [
        "Everything in Pro",
        "Lifetime access",
        "Future template updates",
        "Premium support",
        "Job matching alerts",
        "Interview preparation tips",
        "LinkedIn profile optimization"
      ],
      cta: "Get Lifetime Access",
      popular: false,
      icon: Crown
    }
  ];

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Simple,{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Choose the plan that fits your needs. Start free and upgrade when you're ready.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 border rounded-xl transition-all duration-300 ${
                plan.popular
                  ? "border-primary shadow-lg scale-105 bg-card"
                  : "border-border bg-card hover:shadow-md hover:-translate-y-1"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-gradient-hero text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                {plan.icon && (
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <plan.icon className="h-6 w-6 text-primary" />
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link to="/signup" className="block">
                <Button
                  className={`w-full py-6 font-semibold ${
                    plan.popular
                      ? "bg-gradient-hero hover:opacity-90"
                      : ""
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-success/10 border border-success/20 rounded-full">
            <Check className="h-5 w-5 text-success" />
            <span className="text-success font-medium">30-day money-back guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;