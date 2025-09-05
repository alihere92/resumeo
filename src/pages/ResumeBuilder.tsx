import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Trash2, 
  Download, 
  Save, 
  Eye, 
  ArrowLeft,
  Sparkles,
  GripVertical,
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Zap,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useResumes, Resume } from "@/hooks/useResumes";
import { useAuth } from "@/hooks/useAuth";
import { useIsMobile } from "@/hooks/use-mobile";

const ResumeBuilder = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { resumes, updateResume, createResume, incrementDownloads } = useResumes();
  
  const [activeSection, setActiveSection] = useState("personal");
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [resumeData, setResumeData] = useState({
    personal: { firstName: "", lastName: "", email: "", phone: "", location: "", website: "" },
    summary: "",
    experience: [],
    education: [],
    skills: [] as string[],
    certifications: []
  });
  
  const isMobile = useIsMobile();
  
  const sections = [
    { id: "personal", name: "Personal Info", icon: User, label: "Personal" },
    { id: "summary", name: "Professional Summary", icon: FileText, label: "Summary" },
    { id: "experience", name: "Work Experience", icon: Briefcase, label: "Experience" },
    { id: "education", name: "Education", icon: GraduationCap, label: "Education" },
    { id: "skills", name: "Skills", icon: Zap, label: "Skills" },
    { id: "certifications", name: "Certifications", icon: Award, label: "Certifications" },
  ];

  // Auto-save functionality
  const autoSave = useCallback(async () => {
    if (!currentResume) return;
    
    await updateResume(currentResume.id, {
      content: { sections: resumeData },
      updated_at: new Date().toISOString()
    });
  }, [currentResume, resumeData, updateResume]);

  // Auto-save on data change with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentResume) {
        autoSave();
      }
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timer);
  }, [resumeData, autoSave, currentResume]);

  // Load resume data on mount
  useEffect(() => {
    if (id) {
      const resume = resumes.find(r => r.id === id);
      if (resume) {
        setCurrentResume(resume);
        if (resume.content?.sections) {
          setResumeData(resume.content.sections);
        }
      }
    } else if (user) {
      // Create new resume if no ID
      const createNewResume = async () => {
        const newResume = await createResume("Untitled Resume");
        if (newResume) {
          setCurrentResume(newResume);
          navigate(`/editor/${newResume.id}`, { replace: true });
        }
      };
      createNewResume();
    }
  }, [id, resumes, user, createResume, navigate]);

  const handleSave = async () => {
    if (currentResume) {
      await autoSave();
      toast({
        title: "Resume Saved",
        description: "Your resume has been saved successfully.",
      });
    }
  };

  const handleDownload = async () => {
    if (currentResume) {
      await incrementDownloads(currentResume.id);
      // Simulate PDF generation
      toast({
        title: "Download Started",
        description: "Your resume PDF is being generated and will download shortly.",
      });
      
      // Create a simple PDF simulation
      const element = document.createElement('a');
      const file = new Blob(['Resume PDF content would be here'], {type: 'application/pdf'});
      element.href = URL.createObjectURL(file);
      element.download = `${currentResume.title || 'resume'}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  const handleAISuggestion = () => {
    toast({
      title: "AI Suggestion Generated",
      description: "We've added some suggestions to improve your resume.",
    });
  };

  const updateField = (section: string, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' && !Array.isArray(prev[section])
        ? { ...prev[section], [field]: value }
        : value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/home" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-xl font-semibold">{currentResume?.title || "Loading..."}</h1>
                <p className="text-sm text-muted-foreground">Modern Professional Template</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              <Button size="sm" className="bg-gradient-hero hover:opacity-90" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 lg:px-6 py-6">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="w-full">
          {/* Horizontal Tab Navigation */}
          <div className="mb-6">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-3' : 'grid-cols-6'} bg-muted/50 p-1 rounded-xl shadow-sm`}>
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <TabsTrigger 
                    key={section.id} 
                    value={section.id}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium rounded-lg transition-all data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-primary"
                  >
                    <IconComponent className="h-4 w-4" />
                    {isMobile ? (
                      <span className="hidden sm:inline">{section.label}</span>
                    ) : (
                      <span>{section.label}</span>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Content Area - Form and Preview Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Form Section */}
            <div className="space-y-6">
              {sections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <TabsContent key={section.id} value={section.id} className="mt-0">
                    <Card className="shadow-sm border-border/50">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{section.name}</CardTitle>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Sparkles className="mr-1 h-3 w-3" />
                            AI Powered
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {section.id === "personal" && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="firstName">First Name</Label>
                                <Input 
                                  id="firstName" 
                                  placeholder="John"
                                  value={resumeData.personal.firstName}
                                  onChange={(e) => updateField('personal', 'firstName', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="lastName">Last Name</Label>
                                <Input 
                                  id="lastName" 
                                  placeholder="Doe"
                                  value={resumeData.personal.lastName}
                                  onChange={(e) => updateField('personal', 'lastName', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input 
                                id="email" 
                                type="email" 
                                placeholder="john.doe@example.com"
                                value={resumeData.personal.email}
                                onChange={(e) => updateField('personal', 'email', e.target.value)}
                              />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="phone">Phone</Label>
                                <Input 
                                  id="phone" 
                                  placeholder="+1 (555) 123-4567"
                                  value={resumeData.personal.phone}
                                  onChange={(e) => updateField('personal', 'phone', e.target.value)}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="location">Location</Label>
                                <Input 
                                  id="location" 
                                  placeholder="San Francisco, CA"
                                  value={resumeData.personal.location}
                                  onChange={(e) => updateField('personal', 'location', e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="website">Website/Portfolio</Label>
                              <Input 
                                id="website" 
                                placeholder="https://johndoe.dev"
                                value={resumeData.personal.website}
                                onChange={(e) => updateField('personal', 'website', e.target.value)}
                              />
                            </div>
                          </div>
                        )}

                        {section.id === "summary" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="summary">Professional Summary</Label>
                              <Textarea 
                                id="summary" 
                                placeholder="Write a compelling summary of your professional background and key achievements..."
                                className="min-h-32 resize-none"
                                value={resumeData.summary}
                                onChange={(e) => updateField('summary', '', e.target.value)}
                              />
                            </div>
                            <Button variant="outline" size="sm" onClick={handleAISuggestion} className="w-full">
                              <Sparkles className="mr-2 h-4 w-4" />
                              Generate AI Summary
                            </Button>
                          </div>
                        )}

                        {section.id === "experience" && (
                          <div className="space-y-6">
                            <div className="space-y-4 p-4 border border-border/50 rounded-xl bg-muted/20">
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                  <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                                  <h4 className="font-medium">Senior Software Engineer</h4>
                                </div>
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Job Title</Label>
                                  <Input defaultValue="Senior Software Engineer" />
                                </div>
                                <div className="space-y-2">
                                  <Label>Company</Label>
                                  <Input defaultValue="Tech Corp" />
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Start Date</Label>
                                  <Input type="month" defaultValue="2022-01" />
                                </div>
                                <div className="space-y-2">
                                  <Label>End Date</Label>
                                  <Input type="month" placeholder="Present" />
                                </div>
                              </div>
                              
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea 
                                  placeholder="Describe your key achievements and responsibilities..."
                                  className="min-h-24 resize-none"
                                />
                              </div>
                              
                              <Button variant="outline" size="sm" onClick={handleAISuggestion}>
                                <Sparkles className="mr-2 h-4 w-4" />
                                AI Suggestions
                              </Button>
                            </div>
                            
                            <Button variant="outline" className="w-full border-dashed">
                              <Plus className="mr-2 h-4 w-4" />
                              Add Experience
                            </Button>
                          </div>
                        )}

                        {section.id === "skills" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>Skills</Label>
                              <div className="flex flex-wrap gap-2 p-3 border border-border/50 rounded-lg min-h-20 bg-muted/20">
                                {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"].map((skill) => (
                                  <Badge key={skill} variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                                    {skill}
                                    <button className="ml-2 text-xs hover:text-destructive">×</button>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Input placeholder="Add a skill..." className="flex-1" />
                              <Button size="sm">Add</Button>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleAISuggestion} className="w-full">
                              <Sparkles className="mr-2 h-4 w-4" />
                              Suggest Skills
                            </Button>
                          </div>
                        )}

                        {(section.id === "education" || section.id === "certifications") && (
                          <div className="text-center py-8">
                            <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
                              <IconComponent className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                              <h3 className="text-lg font-medium mb-2">
                                {section.name} Section
                              </h3>
                              <p className="text-muted-foreground mb-4 text-sm">
                                This section is ready for your content. Click the button below to get started.
                              </p>
                              <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Add {section.label}
                              </Button>
                            </div>
                          </div>
                        )}

                        {/* AI Suggestion Button for all sections */}
                        {section.id !== "education" && section.id !== "certifications" && (
                          <div className="pt-4 border-t border-border/50">
                            <Button variant="outline" size="sm" onClick={handleAISuggestion} className="w-full">
                              <Sparkles className="mr-2 h-4 w-4" />
                              Get AI Suggestions
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </div>

            {/* Live Preview Section */}
            <div className="space-y-6">
              <Card className="sticky top-24 shadow-sm border-border/50">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Live Preview</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-border/50 rounded-xl p-6 shadow-sm space-y-4 text-sm">
                    {/* Header */}
                    <div className="text-center border-b border-gray-200 pb-4">
                      <h3 className="font-bold text-xl text-gray-900 mb-1">
                        {resumeData.personal.firstName} {resumeData.personal.lastName} {!resumeData.personal.firstName && !resumeData.personal.lastName && "Your Name"}
                      </h3>
                      <p className="text-muted-foreground text-gray-600">Software Engineer</p>
                      <div className="flex justify-center gap-4 text-xs text-gray-600">
                        <span>{resumeData.personal.email || "your.email@example.com"}</span>
                        <span>•</span>
                        <span>{resumeData.personal.phone || "+1 (555) 123-4567"}</span>
                      </div>
                      <p className="text-xs text-gray-600">{resumeData.personal.location || "Your Location"}</p>
                    </div>
                   
                    {/* Professional Summary */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 border-b border-gray-200 pb-1">PROFESSIONAL SUMMARY</h4>
                      <p className="text-xs leading-relaxed text-gray-700">
                        {resumeData.summary || "Write a compelling summary of your professional background and key achievements..."}
                      </p>
                    </div>
                   
                    {/* Experience */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 border-b border-gray-200 pb-1">WORK EXPERIENCE</h4>
                      <div className="space-y-3">
                        <div>
                          <h5 className="font-medium text-sm text-gray-900">Senior Software Engineer</h5>
                          <p className="text-xs text-gray-600 mb-1">Tech Corp • 2022 - Present</p>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            Led development of scalable web applications using React and Node.js. Implemented CI/CD pipelines and mentored junior developers.
                          </p>
                        </div>
                      </div>
                    </div>
                   
                    {/* Skills */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 border-b border-gray-200 pb-1">SKILLS</h4>
                      <div className="flex flex-wrap gap-1">
                        {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Education */}
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 mb-2 border-b border-gray-200 pb-1">EDUCATION</h4>
                      <div>
                        <h5 className="font-medium text-sm text-gray-900">Bachelor of Computer Science</h5>
                        <p className="text-xs text-gray-600">University Name • 2018 - 2022</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilder;
