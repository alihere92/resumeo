import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Users, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-resume-image.jpg";

const Hero = () => {
  return (
    <section className="relative py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
              Build ATS-Ready{" "}
              <span className="text-primary">
                Resumes
              </span>{" "}
              That Get You Hired
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Create professional, keyword-optimized resumes with AI-powered insights. Beat ATS systems and land more interviews with our advanced resume builder.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/sign-in">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary-hover px-8 py-6 text-lg font-semibold"
                >
                  Start Building Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-6 text-lg font-semibold"
              >
                View Templates
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <Star className="h-4 w-4 text-warning fill-current" />
                  <Star className="h-4 w-4 text-warning fill-current" />
                </div>
                <span className="text-foreground font-medium">4.9/5 Rating</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-foreground font-medium">50K+ Users</span>
              </div>
              
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-foreground font-medium">ATS Optimized</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="Professional resume builder interface showing modern resume templates"
                className="w-full h-auto rounded-2xl shadow-xl"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl transform rotate-3 scale-105 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;