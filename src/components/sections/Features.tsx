import { 
  FileText, 
  Search, 
  Mail, 
  Linkedin, 
  Target, 
  History
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "ATS Resume Builder",
      description: "AI-powered keyword optimization, multiple templates, and export to PDF, DOCX, or TXT formats.",
      color: "text-primary"
    },
    {
      icon: Search,
      title: "JD Analyzer",
      description: "Upload job descriptions to get missing keywords analysis and ATS match score improvements.",
      color: "text-success"
    },
    {
      icon: Mail,
      title: "AI Cover Letters",
      description: "Generate tailored cover letters based on your resume and target job description.",
      color: "text-warning"
    },
    {
      icon: Linkedin,
      title: "LinkedIn Optimizer",
      description: "Extract resume data to optimize your LinkedIn profile with AI-suggested improvements.",
      color: "text-primary"
    },
    {
      icon: Target,
      title: "Resume Scoring",
      description: "Get detailed ATS compatibility scores with actionable feedback and improvement suggestions.",
      color: "text-success"
    },
    {
      icon: History,
      title: "Version History",
      description: "Track changes, save multiple versions, and revert to previous resume iterations anytime.",
      color: "text-warning"
    }
  ];

  return (
    <section id="features" className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Professional tools that normally cost $100s/month — all in one powerful platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-card border border-border rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => {
                const featureRoutes: { [key: string]: string } = {
                  "ATS Resume Builder": "/features/ai-content",
                  "JD Analyzer": "/features/job-matching", 
                  "AI Cover Letters": "/features/cover-letters",
                  "LinkedIn Optimizer": "/features/templates",
                  "Resume Scoring": "/features/ats-optimization",
                  "Version History": "/features/formats"
                };
                window.location.href = featureRoutes[feature.title];
              }}
            >
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-muted mb-6 ${feature.color}`}>
                <feature.icon className="h-8 w-8" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-4 text-card-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;