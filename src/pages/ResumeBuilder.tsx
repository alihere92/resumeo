import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Download, 
  Save, 
  Eye, 
  ArrowLeft,
  Sparkles,
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
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { SummaryForm } from "@/components/forms/SummaryForm";
import { ExperienceForm } from "@/components/forms/ExperienceForm";
import { EducationForm } from "@/components/forms/EducationForm";
import { SkillsForm } from "@/components/forms/SkillsForm";
import { CertificationsForm } from "@/components/forms/CertificationsForm";
import { ResumePreview } from "@/components/resume/ResumePreview";

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
                          <PersonalInfoForm
                            data={resumeData.personal}
                            onUpdate={(data) => updateField('personal', '', data)}
                            onAISuggestion={handleAISuggestion}
                          />
                        )}

                        {section.id === "summary" && (
                          <SummaryForm
                            data={resumeData.summary}
                            onUpdate={(data) => updateField('summary', '', data)}
                            onAISuggestion={handleAISuggestion}
                          />
                        )}

                        {section.id === "experience" && (
                          <ExperienceForm
                            data={resumeData.experience}
                            onUpdate={(data) => updateField('experience', '', data)}
                            onAISuggestion={handleAISuggestion}
                          />
                        )}

                        {section.id === "education" && (
                          <EducationForm
                            data={resumeData.education}
                            onUpdate={(data) => updateField('education', '', data)}
                            onAISuggestion={handleAISuggestion}
                          />
                        )}

                        {section.id === "skills" && (
                          <SkillsForm
                            data={resumeData.skills}
                            onUpdate={(data) => updateField('skills', '', data)}
                            onAISuggestion={handleAISuggestion}
                          />
                        )}

                        {section.id === "certifications" && (
                          <CertificationsForm
                            data={resumeData.certifications}
                            onUpdate={(data) => updateField('certifications', '', data)}
                            onAISuggestion={handleAISuggestion}
                          />
                        )}

                        <div className="pt-6 border-t border-border/50">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={handleAISuggestion}
                            className="w-full hover:bg-primary/5 transition-colors"
                          >
                            <Sparkles className="mr-2 h-4 w-4" />
                            AI Enhance Section
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                );
              })}
            </div>

            {/* Live Preview Section */}
            <div className="space-y-6">
              <ResumePreview
                data={resumeData}
                onDownload={handleDownload}
                onFullPreview={() => navigate(`/preview/${currentResume?.id}`)}
              />
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ResumeBuilder;