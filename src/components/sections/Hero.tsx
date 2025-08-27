import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Award, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-light rounded-full blur-3xl opacity-20" />
      
      <div className="container relative mx-auto px-4 lg:px-6">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent border border-primary/20 rounded-full text-sm font-medium text-accent-foreground mb-8">
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Builder
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Create Your Perfect{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Resume
            </span>{" "}
            in Minutes
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Build professional, ATS-optimized resumes with our AI-powered platform. 
            Choose from modern templates, get smart suggestions, and land your dream job.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="bg-gradient-hero hover:opacity-90 transition-opacity px-8 py-6 text-lg font-semibold"
              >
                Start Building Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-6 text-lg font-semibold border-2"
            >
              View Templates
            </Button>
          </div>

          {/* Social Proof */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
                <Award className="h-6 w-6 text-success" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">500K+</div>
                <div className="text-sm text-muted-foreground">Resumes Created</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
                <Sparkles className="h-6 w-6 text-warning" />
              </div>
              <div className="text-left">
                <div className="text-2xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">User Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;