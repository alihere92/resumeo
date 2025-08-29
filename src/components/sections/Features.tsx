import { 
  Brain, 
  Palette, 
  Download, 
  Zap, 
  Shield, 
  Users,
  FileText,
  Target,
  Sparkles
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content",
      description: "Get intelligent suggestions for every section of your resume based on your industry and role.",
      color: "text-primary"
    },
    {
      icon: Palette,
      title: "Modern Templates",
      description: "Choose from professionally designed templates that are ATS-friendly and recruiter-approved.",
      color: "text-success"
    },
    {
      icon: Download,
      title: "Instant PDF Export",
      description: "Download your resume as a high-quality PDF that's ready to send to employers.",
      color: "text-warning"
    },
    {
      icon: Zap,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview feature as you build your resume.",
      color: "text-primary"
    },
    {
      icon: Shield,
      title: "ATS Optimized",
      description: "All templates are built to pass Applicant Tracking Systems used by major companies.",
      color: "text-success"
    },
    {
      icon: Users,
      title: "Multiple Formats",
      description: "Create different versions of your resume for different job applications and industries.",
      color: "text-warning"
    },
    {
      icon: FileText,
      title: "Cover Letters",
      description: "Build matching cover letters with the same professional design as your resume.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Job Matching",
      description: "Get suggestions on how to tailor your resume for specific job postings.",
      color: "text-success"
    },
    {
      icon: Sparkles,
      title: "Smart Formatting",
      description: "Our AI automatically formats and organizes your content for maximum impact.",
      color: "text-warning"
    }
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Everything You Need to{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Stand Out
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our comprehensive platform gives you all the tools to create professional, 
            job-winning resumes that get you noticed by recruiters.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              onClick={() => {
                const featureRoutes: { [key: string]: string } = {
                  "AI-Powered Content": "/features/ai-content",
                  "Modern Templates": "/features/templates", 
                  "Instant PDF Export": "/features/pdf-export",
                  "Real-time Preview": "/features/preview",
                  "ATS Optimized": "/features/ats-optimization",
                  "Multiple Formats": "/features/formats",
                  "Cover Letters": "/features/cover-letters",
                  "Job Matching": "/features/job-matching",
                  "Smart Formatting": "/features/smart-formatting"
                };
                window.location.href = featureRoutes[feature.title];
              }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-background mb-6 ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-card opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;