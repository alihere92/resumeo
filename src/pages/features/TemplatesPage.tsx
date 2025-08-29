import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, ArrowLeft, Eye, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const TemplatesPage = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const templates = [
    {
      id: "modern-professional",
      name: "Modern Professional",
      description: "Clean, contemporary design perfect for tech and business roles",
      category: "Professional",
      color: "blue",
      popular: true,
      atsOptimized: true,
      preview: "/placeholder.svg"
    },
    {
      id: "creative-blue",
      name: "Creative Blue",
      description: "Eye-catching design with blue accents for creative professionals",
      category: "Creative",
      color: "blue",
      popular: false,
      atsOptimized: true,
      preview: "/placeholder.svg"
    },
    {
      id: "minimal-clean",
      name: "Minimal Clean",
      description: "Simple, elegant design focusing on content clarity",
      category: "Minimal",
      color: "gray",
      popular: true,
      atsOptimized: true,
      preview: "/placeholder.svg"
    },
    {
      id: "executive-premium",
      name: "Executive Premium",
      description: "Sophisticated layout for senior-level positions",
      category: "Executive",
      color: "black",
      popular: false,
      atsOptimized: true,
      preview: "/placeholder.svg"
    },
    {
      id: "tech-innovator",
      name: "Tech Innovator",
      description: "Modern template tailored for software engineers and tech professionals",
      category: "Technology",
      color: "green",
      popular: true,
      atsOptimized: true,
      preview: "/placeholder.svg"
    },
    {
      id: "healthcare-pro",
      name: "Healthcare Professional",
      description: "Professional template designed for healthcare workers",
      category: "Healthcare",
      color: "red",
      popular: false,
      atsOptimized: true,
      preview: "/placeholder.svg"
    }
  ];

  const categories = ["All", "Professional", "Creative", "Minimal", "Executive", "Technology", "Healthcare"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTemplates = selectedCategory === "All" 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const handleUseTemplate = (templateId: string, templateName: string) => {
    setSelectedTemplate(templateId);
    toast({
      title: "Template Selected!",
      description: `"${templateName}" template is now ready to use.`,
    });
  };

  const handlePreview = (templateName: string) => {
    toast({
      title: "Preview",
      description: `Opening preview for "${templateName}" template.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/home">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-success/10">
                <Palette className="h-5 w-5 text-success" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Resume Templates</h1>
                <p className="text-muted-foreground">Choose from our professionally designed, ATS-optimized templates</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-gradient-hero" : ""}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {template.name}
                      {template.popular && (
                        <Badge className="bg-warning/10 text-warning hover:bg-warning/20">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-1">{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Template Preview */}
                <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                  <div className="text-center text-muted-foreground">
                    <Palette className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Template Preview</p>
                  </div>
                </div>

                {/* Template Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{template.category}</Badge>
                    {template.atsOptimized && (
                      <Badge className="bg-success/10 text-success hover:bg-success/20">
                        ATS Optimized
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handlePreview(template.name)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    size="sm" 
                    className={`flex-1 ${selectedTemplate === template.id ? 'bg-success hover:bg-success/90' : 'bg-gradient-hero hover:opacity-90'}`}
                    onClick={() => handleUseTemplate(template.id, template.name)}
                  >
                    {selectedTemplate === template.id ? (
                      <>
                        <Download className="mr-2 h-4 w-4" />
                        Selected
                      </>
                    ) : (
                      'Use Template'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Template Features */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Why Our Templates Work</CardTitle>
            <CardDescription>
              Every template is designed with industry best practices and ATS optimization in mind
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">ATS-Optimized</h4>
                <p className="text-muted-foreground text-sm">
                  All templates pass through Applicant Tracking Systems used by major companies
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Palette className="h-6 w-6 text-success" />
                </div>
                <h4 className="font-semibold mb-2">Professional Design</h4>
                <p className="text-muted-foreground text-sm">
                  Crafted by professional designers and approved by HR experts
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Download className="h-6 w-6 text-warning" />
                </div>
                <h4 className="font-semibold mb-2">Easy Customization</h4>
                <p className="text-muted-foreground text-sm">
                  Fully customizable layouts, colors, and sections to match your style
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TemplatesPage;