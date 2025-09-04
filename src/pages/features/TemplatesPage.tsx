import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Palette, 
  ArrowLeft, 
  Eye, 
  Download, 
  Star, 
  Shield, 
  Smartphone
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useResumes } from "@/hooks/useResumes";
import modernProfessional from "@/assets/template-modern-professional.jpg";
import creativeDesigner from "@/assets/template-creative-designer.jpg";
import executiveProfessional from "@/assets/template-executive-professional.jpg";
import minimalClean from "@/assets/template-minimal-clean.jpg";
import simpleClean from "@/assets/template-simple-clean.jpg";
import atsFriendly from "@/assets/template-ats-friendly.jpg";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  bgColor: string;
  popular: boolean;
  atsOptimized: boolean;
  preview: string;
}

const TemplatesPage = () => {
  const { toast } = useToast();
  const { createResume } = useResumes();
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates: Template[] = [
    {
      id: "simple-clean",
      name: "Simple Clean",
      description: "Clean and straightforward design that focuses on content",
      category: "Simple",
      color: "border-gray-300",
      bgColor: "bg-gray-50",
      popular: true,
      atsOptimized: true,
      preview: simpleClean
    },
    {
      id: "modern-professional",
      name: "Modern Professional",
      description: "Contemporary design perfect for tech and business professionals",
      category: "Modern",
      color: "border-blue-400",
      bgColor: "bg-blue-50",
      popular: true,
      atsOptimized: true,
      preview: modernProfessional
    },
    {
      id: "creative-designer",
      name: "Creative Designer",
      description: "Eye-catching design for creative professionals and designers",
      category: "Creative", 
      color: "border-pink-400",
      bgColor: "bg-pink-50",
      popular: true,
      atsOptimized: true,
      preview: creativeDesigner
    },
    {
      id: "ats-friendly",
      name: "ATS Optimized",
      description: "Specifically designed to pass Applicant Tracking Systems",
      category: "ATS",
      color: "border-green-400",
      bgColor: "bg-green-50",
      popular: true,
      atsOptimized: true,
      preview: atsFriendly
    },
    {
      id: "minimal-clean",
      name: "Minimal Professional",
      description: "Minimalist layout with maximum impact",
      category: "Simple",
      color: "border-slate-400",
      bgColor: "bg-slate-50",
      popular: false,
      atsOptimized: true,
      preview: minimalClean
    },
    {
      id: "executive-professional",
      name: "Executive Professional",
      description: "Traditional and sophisticated design for executive positions",
      category: "Modern",
      color: "border-gray-500",
      bgColor: "bg-gray-100",
      popular: false,
      atsOptimized: true,
      preview: executiveProfessional
    }
  ];

  const categories = ["All Templates", "Simple", "Modern", "Creative", "ATS"];
  const [selectedCategory, setSelectedCategory] = useState("All Templates");

  const filteredTemplates = selectedCategory === "All Templates" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleUseTemplate = async (templateId: string, templateName: string) => {
    try {
      setSelectedTemplate(templateId);
      const newResume = await createResume(`Resume - ${templateName}`, templateName);
      toast({
        title: "Template Selected!",
        description: `"${templateName}" template is ready to use.`,
      });
      // Navigate to resume builder with the new resume
      navigate(`/resume-builder?template=${templateId}`);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create resume with template.",
        variant: "destructive"
      });
    }
  };

  const handlePreview = (templateName: string) => {
    toast({
      title: "Preview",
      description: `Opening preview for "${templateName}" template.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-primary via-primary to-primary-hover text-white py-16">
        <div className="container mx-auto px-4 lg:px-6">
          {/* Back button */}
          <div className="mb-8">
            <Link to="/home">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Resume Templates
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Choose from our collection of ATS-friendly, modern resume templates designed to help you stand out
            </p>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="lg"
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 ${
                selectedCategory === category 
                  ? "bg-primary text-white" 
                  : "bg-white text-foreground hover:bg-muted"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`group hover:shadow-xl transition-all duration-300 border-2 ${template.color} ${template.bgColor} overflow-hidden`}
            >
              <CardContent className="p-0">
                {/* Template Preview */}
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={template.preview}
                    alt={`${template.name} template preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Template Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {template.name}
                    </h3>
                     <div className="flex items-center gap-2">
                       {template.popular && (
                         <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                           Popular
                         </Badge>
                       )}
                       {template.atsOptimized && (
                         <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                           ATS
                         </Badge>
                       )}
                     </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Use Template Button */}
                  <Button 
                    size="sm" 
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold"
                    onClick={() => handleUseTemplate(template.id, template.name)}
                  >
                    Use This Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <Card className="border-0 bg-muted/30">
          <CardContent className="p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-foreground">
                All Templates Include
              </h2>
              <p className="text-xl text-muted-foreground">
                Every template is designed with your success in mind
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h4 className="font-bold mb-2 text-foreground">ATS-Optimized</h4>
                <p className="text-muted-foreground text-sm">
                  All templates pass through Applicant Tracking Systems
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Palette className="h-8 w-8 text-success" />
                </div>
                <h4 className="font-bold mb-2 text-foreground">Fully Customizable</h4>
                <p className="text-muted-foreground text-sm">
                  Change colors, fonts, and layouts to match your style
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Download className="h-8 w-8 text-warning" />
                </div>
                <h4 className="font-bold mb-2 text-foreground">Multiple Formats</h4>
                <p className="text-muted-foreground text-sm">
                  Export as PDF, DOCX, or plain text for any application
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="font-bold mb-2 text-foreground">Mobile-Friendly</h4>
                <p className="text-muted-foreground text-sm">
                  Looks great on all devices and screen sizes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center mt-12 py-12">
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Create Your Perfect Resume?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Choose a template and start building your professional resume today
          </p>
          <Link to="/resume-builder">
            <Button size="lg" className="px-8 py-6 text-lg font-semibold bg-primary hover:bg-primary-hover">
              Start Building Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;