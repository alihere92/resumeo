import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Sparkles, ArrowLeft, Copy, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AIContentPage = () => {
  const { toast } = useToast();
  const [jobTitle, setJobTitle] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");

  const handleGenerate = async () => {
    if (!jobTitle || !industry) {
      toast({
        title: "Missing Information",
        description: "Please fill in job title and industry to generate content.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI content generation
    setTimeout(() => {
      const sampleContent = `**Professional Summary:**
Dynamic ${jobTitle} with ${experience || "3+"} years of experience in ${industry}. Proven track record of delivering innovative solutions and driving business growth through strategic planning and execution. Expert in cross-functional collaboration and stakeholder management.

**Key Achievements:**
• Led 15+ successful projects resulting in 25% efficiency improvement
• Implemented innovative solutions that reduced operational costs by 20%
• Mentored team of 8 professionals, improving team productivity by 30%
• Collaborated with C-level executives on strategic initiatives
• Recognized as Employee of the Year for outstanding performance

**Core Competencies:**
• Strategic Planning & Execution
• Project Management & Leadership
• Data Analysis & Problem Solving
• Cross-functional Team Collaboration
• Client Relationship Management`;

      setGeneratedContent(sampleContent);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated!",
        description: "AI has generated professional content for your resume.",
      });
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({
      title: "Copied!",
      description: "Content has been copied to clipboard.",
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
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Content Generation</h1>
                <p className="text-muted-foreground">Let AI craft professional content for your resume</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Generate Professional Content
              </CardTitle>
              <CardDescription>
                Provide some basic information and let our AI generate compelling resume content tailored to your career.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Target Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Software Engineer, Marketing Manager"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={industry} onValueChange={setIndustry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select value={experience} onValueChange={setExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                    <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                    <SelectItem value="expert">Expert Level (10+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                className="w-full bg-gradient-hero hover:opacity-90" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating Content...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" />
                    Generate AI Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card>
            <CardHeader>
              <CardTitle>Generated Content</CardTitle>
              <CardDescription>
                AI-generated professional content based on your input
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <Textarea
                    value={generatedContent}
                    onChange={(e) => setGeneratedContent(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Generated content will appear here..."
                  />
                  <div className="flex gap-2">
                    <Button onClick={copyToClipboard} variant="outline">
                      <Copy className="mr-2 h-4 w-4" />
                      Copy to Clipboard
                    </Button>
                    <Button onClick={handleGenerate} variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                  <Brain className="h-16 w-16 mb-4 opacity-50" />
                  <p className="text-center">
                    Fill in the form and click "Generate AI Content" to see your personalized resume content
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>AI Content Generation Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Be Specific</h4>
                <p className="text-muted-foreground text-sm">
                  The more specific you are about your job title and industry, the more targeted and relevant the AI-generated content will be.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Review & Edit</h4>
                <p className="text-muted-foreground text-sm">
                  Always review and customize the generated content to match your specific experience and achievements.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Multiple Versions</h4>
                <p className="text-muted-foreground text-sm">
                  Try generating content multiple times to get different variations and choose the best elements from each.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Combine with Personal Touch</h4>
                <p className="text-muted-foreground text-sm">
                  Use AI-generated content as a foundation and add your personal experiences and achievements for authenticity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIContentPage;