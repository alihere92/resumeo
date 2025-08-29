import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, Plus, Edit, Download, Copy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const CoverLettersPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("create");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    hiringManager: "",
    tone: "professional",
    highlights: ""
  });

  const coverLetterTemplates = [
    {
      id: "professional",
      name: "Professional Standard",
      description: "Classic business format perfect for corporate roles",
      preview: "Dear [Hiring Manager],\n\nI am writing to express my strong interest in the [Position] role at [Company]...",
      recommended: true
    },
    {
      id: "creative",
      name: "Creative Approach", 
      description: "Engaging style for creative and marketing positions",
      preview: "Hello [Hiring Manager],\n\nWhen I discovered the [Position] opening at [Company], I knew I had to reach out...",
      recommended: false
    },
    {
      id: "tech",
      name: "Tech-Focused",
      description: "Technical emphasis for engineering and IT roles",
      preview: "Dear [Hiring Manager],\n\nAs a passionate developer with expertise in [Technologies], I'm excited about the [Position] opportunity...",
      recommended: false
    }
  ];

  const existingCoverLetters = [
    {
      id: 1,
      title: "Software Engineer - Tech Corp",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      lastModified: "2024-01-15",
      status: "completed"
    },
    {
      id: 2,
      title: "Marketing Manager - StartupXYZ", 
      company: "StartupXYZ",
      position: "Marketing Manager",
      lastModified: "2024-01-10",
      status: "draft"
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    if (!formData.company || !formData.position) {
      toast({
        title: "Missing Information",
        description: "Please fill in company name and position to generate a cover letter.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Cover Letter Generated!",
        description: "Your personalized cover letter has been created.",
      });
    }, 2500);
  };

  const handleAction = (action: string, letterTitle: string) => {
    toast({
      title: `${action} Cover Letter`,
      description: `${action} "${letterTitle}" successfully.`,
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
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Cover Letters</h1>
                <p className="text-muted-foreground">Create compelling cover letters that match your resume</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === "create" ? "default" : "outline"}
            onClick={() => setActiveTab("create")}
            className={activeTab === "create" ? "bg-gradient-hero" : ""}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create New
          </Button>
          <Button
            variant={activeTab === "existing" ? "default" : "outline"}
            onClick={() => setActiveTab("existing")}
            className={activeTab === "existing" ? "bg-gradient-hero" : ""}
          >
            <FileText className="mr-2 h-4 w-4" />
            My Cover Letters
          </Button>
          <Button
            variant={activeTab === "templates" ? "default" : "outline"}
            onClick={() => setActiveTab("templates")}
            className={activeTab === "templates" ? "bg-gradient-hero" : ""}
          >
            Templates
          </Button>
        </div>

        {activeTab === "create" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Creation Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Generate Cover Letter
                </CardTitle>
                <CardDescription>
                  Provide job details and let AI create a personalized cover letter
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name *</Label>
                  <Input
                    id="company"
                    placeholder="e.g., Google, Microsoft"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="position">Position Title *</Label>
                  <Input
                    id="position"
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    value={formData.position}
                    onChange={(e) => handleInputChange("position", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hiringManager">Hiring Manager Name</Label>
                  <Input
                    id="hiringManager"
                    placeholder="e.g., John Smith (optional)"
                    value={formData.hiringManager}
                    onChange={(e) => handleInputChange("hiringManager", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tone">Writing Tone</Label>
                  <Select value={formData.tone} onValueChange={(value) => handleInputChange("tone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                      <SelectItem value="conversational">Conversational</SelectItem>
                      <SelectItem value="formal">Formal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="highlights">Key Points to Highlight</Label>
                  <Textarea
                    id="highlights"
                    placeholder="Mention specific skills, experiences, or achievements you want to emphasize..."
                    value={formData.highlights}
                    onChange={(e) => handleInputChange("highlights", e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full bg-gradient-hero hover:opacity-90"
                >
                  {isGenerating ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Cover Letter
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Preview/Generated Content */}
            <Card>
              <CardHeader>
                <CardTitle>Generated Cover Letter</CardTitle>
                <CardDescription>
                  AI-generated cover letter based on your input
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formData.company && formData.position ? (
                  <div className="space-y-4">
                    <div className="bg-white text-black p-6 rounded-lg border">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">[Your Name]</p>
                        <p className="text-sm text-gray-600">[Your Address]</p>
                        <p className="text-sm text-gray-600">[Your Email]</p>
                        <p className="text-sm text-gray-600">[Date]</p>
                      </div>
                      
                      <div className="mb-4">
                        <p className="text-sm text-gray-800">
                          {formData.hiringManager ? formData.hiringManager : "[Hiring Manager]"}
                        </p>
                        <p className="text-sm text-gray-800">{formData.company}</p>
                      </div>

                      <div className="space-y-4 text-sm">
                        <p>Dear {formData.hiringManager || "Hiring Manager"},</p>
                        
                        <p>
                          I am writing to express my strong interest in the {formData.position} position at {formData.company}. 
                          With my background in software development and passion for innovative technology solutions, 
                          I am excited about the opportunity to contribute to your team's success.
                        </p>
                        
                        <p>
                          In my previous roles, I have developed expertise in modern web technologies and demonstrated 
                          the ability to deliver high-quality solutions under tight deadlines. My experience includes 
                          {formData.highlights ? ` ${formData.highlights.toLowerCase()}` : " building scalable applications, optimizing performance, and collaborating with cross-functional teams"}.
                        </p>
                        
                        <p>
                          I am particularly drawn to {formData.company} because of your commitment to innovation and 
                          excellence in the industry. I would welcome the opportunity to discuss how my skills and 
                          enthusiasm can contribute to your team's continued success.
                        </p>
                        
                        <p>Thank you for considering my application. I look forward to hearing from you.</p>
                        
                        <p>Sincerely,<br />[Your Name]</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => toast({ title: "Copied!", description: "Cover letter copied to clipboard." })}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy
                      </Button>
                      <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                    <FileText className="h-16 w-16 mb-4 opacity-50" />
                    <p className="text-center">
                      Fill in the company name and position to generate your personalized cover letter
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "existing" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Create New Card */}
            <Card className="border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <CardContent className="flex flex-col items-center justify-center p-8 h-64">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Create New Cover Letter</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Start creating a new cover letter for your next application
                </p>
              </CardContent>
            </Card>

            {/* Existing Cover Letters */}
            {existingCoverLetters.map((letter) => (
              <Card key={letter.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{letter.title}</CardTitle>
                  <CardDescription>
                    {letter.position} at {letter.company}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={letter.status === 'completed' ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}>
                      {letter.status === 'completed' ? 'Completed' : 'Draft'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(letter.lastModified).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => handleAction("Edit", letter.title)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-hero hover:opacity-90"
                      onClick={() => handleAction("Download", letter.title)}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {activeTab === "templates" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverLetterTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {template.name}
                        {template.recommended && (
                          <Badge className="bg-primary/10 text-primary">
                            Recommended
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{template.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground font-mono whitespace-pre-line">
                      {template.preview}
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full"
                    onClick={() => {
                      setSelectedTemplate(template.id);
                      setActiveTab("create");
                      toast({
                        title: "Template Selected!",
                        description: `"${template.name}" template is ready to use.`,
                      });
                    }}
                  >
                    Use This Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoverLettersPage;
