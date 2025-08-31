import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Trash2, 
  Download, 
  Save, 
  Eye, 
  ArrowLeft,
  Sparkles,
  GripVertical
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useResumes, Resume } from "@/hooks/useResumes";
import { useAuth } from "@/hooks/useAuth";

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
  
  const sections = [
    { id: "personal", name: "Personal Info", icon: "👤" },
    { id: "summary", name: "Professional Summary", icon: "📝" },
    { id: "experience", name: "Work Experience", icon: "💼" },
    { id: "education", name: "Education", icon: "🎓" },
    { id: "skills", name: "Skills", icon: "⚡" },
    { id: "certifications", name: "Certifications", icon: "🏆" },
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

      <div className="container mx-auto px-4 lg:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar - Section Navigation */}
          <div className="lg:col-span-3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Resume Sections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                  >
                    <span className="text-lg">{section.icon}</span>
                    <span className="font-medium text-sm">{section.name}</span>
                  </button>
                ))}
                
                <Separator className="my-4" />
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={handleAISuggestion}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  AI Suggestions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Form Builder */}
          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    {sections.find(s => s.id === activeSection)?.name}
                  </CardTitle>
                  <Badge variant="outline">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Powered
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Info Form */}
                {activeSection === "personal" && (
                  <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4">
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

                {/* Professional Summary */}
                {activeSection === "summary" && (
                  <div className="space-y-4">
                     <div className="space-y-2">
                       <Label htmlFor="summary">Professional Summary</Label>
                       <Textarea 
                         id="summary" 
                         placeholder="Write a compelling summary of your professional background..."
                         className="min-h-32"
                         value={resumeData.summary}
                         onChange={(e) => updateField('summary', '', e.target.value)}
                       />
                     </div>
                    <Button variant="outline" size="sm" onClick={handleAISuggestion}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Summary
                    </Button>
                  </div>
                )}

                {/* Work Experience */}
                {activeSection === "experience" && (
                  <div className="space-y-6">
                    <div className="space-y-4 p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                          <h4 className="font-medium">Senior Software Engineer</h4>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Job Title</Label>
                          <Input defaultValue="Senior Software Engineer" />
                        </div>
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input defaultValue="Tech Corp" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
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
                          className="min-h-24"
                        />
                      </div>
                      
                      <Button variant="outline" size="sm" onClick={handleAISuggestion}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        AI Suggestions
                      </Button>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Experience
                    </Button>
                  </div>
                )}

                {/* Skills */}
                {activeSection === "skills" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Skills</Label>
                      <div className="flex flex-wrap gap-2 p-3 border border-border rounded-lg min-h-20">
                        {["React", "TypeScript", "Node.js", "Python", "AWS", "Docker"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="cursor-pointer">
                            {skill}
                            <button className="ml-2 text-xs">×</button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Add a skill..." className="flex-1" />
                      <Button size="sm">Add</Button>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleAISuggestion}>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Suggest Skills
                    </Button>
                  </div>
                )}

                {/* Other sections would follow similar patterns */}
                {(activeSection === "education" || activeSection === "certifications") && (
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">
                      {sections.find(s => s.id === activeSection)?.name} Section
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      This section is ready for your content. Click "Add {sections.find(s => s.id === activeSection)?.name}" to get started.
                    </p>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Add {sections.find(s => s.id === activeSection)?.name}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-5">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border border-border rounded-lg p-4 shadow-sm">
                  <div className="space-y-3 text-sm">
                     <div className="text-center">
                       <h3 className="font-bold text-base">
                         {resumeData.personal.firstName} {resumeData.personal.lastName} {!resumeData.personal.firstName && !resumeData.personal.lastName && "Your Name"}
                       </h3>
                       <p className="text-muted-foreground">Software Engineer</p>
                       <p className="text-xs">
                         {resumeData.personal.email || "your.email@example.com"} • {resumeData.personal.phone || "+1 (555) 123-4567"}
                       </p>
                       <p className="text-xs">{resumeData.personal.location || "Your Location"}</p>
                     </div>
                    
                    <Separator />
                    
                     <div>
                       <h4 className="font-semibold text-xs uppercase tracking-wide mb-1">Professional Summary</h4>
                       <p className="text-xs leading-relaxed text-muted-foreground">
                         {resumeData.summary || "Write a compelling summary of your professional background..."}
                       </p>
                     </div>
                    
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wide mb-2">Experience</h4>
                      <div className="space-y-2">
                        <div>
                          <h5 className="font-medium text-xs">Senior Software Engineer</h5>
                          <p className="text-xs text-muted-foreground">Tech Corp • 2022 - Present</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-xs uppercase tracking-wide mb-1">Skills</h4>
                      <div className="flex flex-wrap gap-1">
                        {["React", "TypeScript", "Node.js"].map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs px-1 py-0">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Full Preview
                  </Button>
                   <Button size="sm" className="w-full bg-gradient-hero hover:opacity-90" onClick={handleDownload}>
                     <Download className="mr-2 h-4 w-4" />
                     Download
                   </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
