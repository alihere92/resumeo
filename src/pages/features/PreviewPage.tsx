import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Zap, ArrowLeft, Eye, Monitor, Smartphone, Tablet, Download, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PreviewPage = () => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const sampleResumeData = {
    name: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with 8+ years developing scalable web applications. Expert in React, Node.js, and cloud technologies. Proven track record of leading teams and delivering high-impact products.",
    experience: [
      {
        company: "Tech Corp",
        position: "Senior Software Engineer",
        duration: "2020 - Present",
        achievements: [
          "Led development of microservices architecture reducing system latency by 40%",
          "Mentored team of 5 junior developers, improving code quality scores by 30%",
          "Implemented CI/CD pipeline reducing deployment time from 2 hours to 15 minutes"
        ]
      },
      {
        company: "StartupXYZ",
        position: "Full Stack Developer",
        duration: "2018 - 2020",
        achievements: [
          "Built customer-facing dashboard serving 10,000+ daily active users",
          "Optimized database queries improving application performance by 60%",
          "Collaborated with design team to implement responsive UI components"
        ]
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL", "MongoDB"],
    education: {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      year: "2018"
    }
  };

  const handleShare = () => {
    toast({
      title: "Link Copied!",
      description: "Preview link has been copied to clipboard.",
    });
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const ResumePreview = () => (
    <div className="bg-white text-black p-8 max-w-[8.5in] mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">{sampleResumeData.name}</h1>
        <h2 className="text-xl text-gray-600 mb-2">{sampleResumeData.title}</h2>
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <span>{sampleResumeData.email}</span>
          <span>{sampleResumeData.phone}</span>
          <span>{sampleResumeData.location}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{sampleResumeData.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Professional Experience</h3>
        {sampleResumeData.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-gray-800">{exp.position}</h4>
              <span className="text-sm text-gray-600">{exp.duration}</span>
            </div>
            <p className="text-gray-600 text-sm mb-2">{exp.company}</p>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {exp.achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Technical Skills</h3>
        <div className="flex flex-wrap gap-2">
          {sampleResumeData.skills.map((skill, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Education</h3>
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-gray-800">{sampleResumeData.education.degree}</p>
            <p className="text-gray-600 text-sm">{sampleResumeData.education.school}</p>
          </div>
          <span className="text-gray-600 text-sm">{sampleResumeData.education.year}</span>
        </div>
      </div>
    </div>
  );

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-auto">
        <div className="sticky top-0 bg-background border-b border-border p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Resume Preview - Fullscreen</h2>
          <Button onClick={toggleFullscreen} variant="outline">
            Exit Fullscreen
          </Button>
        </div>
        <div className="p-8">
          <ResumePreview />
        </div>
      </div>
    );
  }

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
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Real-time Preview</h1>
                <p className="text-muted-foreground">See your changes instantly as you build your resume</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Preview Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Preview Controls
                </CardTitle>
                <CardDescription>
                  Customize how you view your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">View Mode</label>
                  <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="desktop" className="p-2">
                        <Monitor className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="tablet" className="p-2">
                        <Tablet className="h-4 w-4" />
                      </TabsTrigger>
                      <TabsTrigger value="mobile" className="p-2">
                        <Smartphone className="h-4 w-4" />
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="space-y-2">
                  <Button onClick={toggleFullscreen} variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Fullscreen Preview
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Preview
                  </Button>
                  <Button className="w-full bg-gradient-hero hover:opacity-90">
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Preview Info */}
            <Card>
              <CardHeader>
                <CardTitle>Preview Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary">Live Updates</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Changes are reflected instantly as you edit your resume content
                </p>
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-success/10 text-success">Responsive</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Preview how your resume looks on different devices
                </p>
                
                <div className="flex items-center gap-2">
                  <Badge className="bg-warning/10 text-warning">Print Ready</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  WYSIWYG preview matches the final PDF output
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Resume Preview */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Resume Preview</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {viewMode === "desktop" && <Monitor className="w-3 h-3 mr-1" />}
                      {viewMode === "tablet" && <Tablet className="w-3 h-3 mr-1" />}
                      {viewMode === "mobile" && <Smartphone className="w-3 h-3 mr-1" />}
                      {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`
                  ${viewMode === "desktop" ? "max-w-full" : ""}
                  ${viewMode === "tablet" ? "max-w-2xl mx-auto" : ""}
                  ${viewMode === "mobile" ? "max-w-sm mx-auto" : ""}
                  transition-all duration-300
                `}>
                  <div className="border border-border rounded-lg overflow-hidden bg-white">
                    <ResumePreview />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Real-time Preview Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Live Editing</h4>
                <p className="text-muted-foreground text-sm">
                  Make changes in the editor and see them reflected instantly in the preview without any delays.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Device Testing</h4>
                <p className="text-muted-foreground text-sm">
                  Use different view modes to ensure your resume looks great on all devices and screen sizes.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Fullscreen Mode</h4>
                <p className="text-muted-foreground text-sm">
                  Use fullscreen preview to get a better sense of how your resume will look when printed or downloaded.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Share for Feedback</h4>
                <p className="text-muted-foreground text-sm">
                  Share the preview link with friends, mentors, or colleagues to get feedback before finalizing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PreviewPage;