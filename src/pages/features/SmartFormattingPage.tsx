import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, ArrowLeft, Wand2, AlignLeft, Type, Palette, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const SmartFormattingPage = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputText, setInputText] = useState("");
  const [formattedText, setFormattedText] = useState("");
  
  const [formatOptions, setFormatOptions] = useState({
    autoCapitalization: true,
    bulletPointOptimization: true,
    consistentDates: true,
    companyNameFormatting: true,
    skillsGrouping: true,
    actionVerbsOptimization: true,
    quantifyAchievements: true,
    removeRedundancy: true
  });

  const handleFormatText = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No Text to Format",
        description: "Please paste some resume content to format.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate smart formatting
    setTimeout(() => {
      const formatted = `• Led cross-functional team of 8 developers to deliver customer-facing dashboard, resulting in 40% increase in user engagement (Q3 2023)

• Implemented microservices architecture using Node.js and Docker, reducing system latency by 60% and improving scalability for 100,000+ daily active users

• Optimized database queries and caching mechanisms, achieving 2.5x performance improvement and reducing server costs by $15,000 annually

• Mentored 3 junior developers through code reviews and pair programming sessions, leading to 90% team retention rate and improved code quality scores

• Collaborated with Product and Design teams to deliver mobile-responsive React applications, supporting 5 different device types and increasing mobile conversion by 25%`;

      setFormattedText(formatted);
      setIsProcessing(false);
      
      toast({
        title: "Formatting Complete!",
        description: "Your text has been optimized with smart formatting.",
      });
    }, 2500);
  };

  const formatFeatures = [
    {
      id: "grammar",
      title: "Grammar & Style",
      description: "Corrects grammar, improves sentence structure, and ensures professional tone",
      icon: Type,
      improvements: ["Fixed 3 grammar errors", "Improved 5 sentence structures", "Enhanced professional tone"]
    },
    {
      id: "bullets",
      title: "Bullet Point Optimization",
      description: "Converts paragraphs to impactful bullet points with action verbs",
      icon: AlignLeft,
      improvements: ["Created 6 compelling bullet points", "Added strong action verbs", "Improved readability by 40%"]
    },
    {
      id: "metrics",
      title: "Quantification",
      description: "Identifies opportunities to add numbers and metrics to achievements",
      icon: Sparkles,
      improvements: ["Added 4 quantified achievements", "Included percentage improvements", "Enhanced impact statements"]
    },
    {
      id: "consistency",
      title: "Consistency Check",
      description: "Ensures consistent formatting, dates, and styling throughout",
      icon: Palette,
      improvements: ["Standardized date formats", "Consistent company name styling", "Unified bullet point format"]
    }
  ];

  const beforeAfterExamples = [
    {
      before: "I worked on developing web applications using React and helped improve the user experience. I also worked with the team to implement new features.",
      after: "• Developed responsive web applications using React, improving user experience by 35%\n• Collaborated with cross-functional team to implement 12 new features, increasing user engagement by 25%"
    },
    {
      before: "Managed a team and worked on projects that improved performance.",
      after: "• Led team of 6 engineers to deliver high-performance solutions, reducing load times by 50%\n• Managed 4 critical projects with 100% on-time delivery, exceeding performance targets by 20%"
    }
  ];

  const toggleOption = (option: string) => {
    setFormatOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
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
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-warning/10">
                <Sparkles className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Smart Formatting</h1>
                <p className="text-muted-foreground">AI-powered formatting to maximize your resume's impact</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input & Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Smart Formatting Tool
                </CardTitle>
                <CardDescription>
                  Paste your resume content and let AI optimize the formatting for maximum impact
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="inputText">Resume Content</Label>
                  <Textarea
                    id="inputText"
                    placeholder="Paste your resume content here to be formatted..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                
                <Button 
                  onClick={handleFormatText}
                  disabled={isProcessing}
                  className="w-full bg-gradient-hero hover:opacity-90"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Applying Smart Formatting...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Apply Smart Formatting
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Formatting Options */}
            <Card>
              <CardHeader>
                <CardTitle>Formatting Options</CardTitle>
                <CardDescription>
                  Customize which formatting improvements to apply
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(formatOptions).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor={key} className="text-sm font-medium">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Label>
                      <p className="text-xs text-muted-foreground">
                        {key === 'autoCapitalization' && 'Automatically capitalize job titles and company names'}
                        {key === 'bulletPointOptimization' && 'Convert text to impactful bullet points'}
                        {key === 'consistentDates' && 'Standardize date formats throughout resume'}
                        {key === 'companyNameFormatting' && 'Ensure consistent company name styling'}
                        {key === 'skillsGrouping' && 'Organize skills into logical categories'}
                        {key === 'actionVerbsOptimization' && 'Replace weak verbs with strong action words'}
                        {key === 'quantifyAchievements' && 'Add numbers and metrics where possible'}
                        {key === 'removeRedundancy' && 'Eliminate repetitive phrases and words'}
                      </p>
                    </div>
                    <Switch
                      id={key}
                      checked={value}
                      onCheckedChange={() => toggleOption(key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Results & Examples */}
          <div className="space-y-6">
            {/* Formatted Output */}
            <Card>
              <CardHeader>
                <CardTitle>Formatted Result</CardTitle>
                <CardDescription>
                  AI-optimized content with professional formatting
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formattedText ? (
                  <div className="space-y-4">
                    <Textarea
                      value={formattedText}
                      onChange={(e) => setFormattedText(e.target.value)}
                      className="min-h-[200px] font-mono text-sm"
                      placeholder="Formatted content will appear here..."
                    />
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          navigator.clipboard.writeText(formattedText);
                          toast({ title: "Copied!", description: "Formatted text copied to clipboard." });
                        }}
                      >
                        Copy Text
                      </Button>
                      <Button variant="outline" onClick={handleFormatText}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reformat
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
                    <Sparkles className="h-16 w-16 mb-4 opacity-50" />
                    <p className="text-center">
                      Paste your resume content and click "Apply Smart Formatting" to see the optimized version
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Format Features */}
            <Card>
              <CardHeader>
                <CardTitle>Formatting Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formatFeatures.map((feature) => (
                  <div key={feature.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                        <feature.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{feature.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{feature.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {feature.improvements.map((improvement, index) => (
                            <Badge key={index} className="bg-success/10 text-success text-xs">
                              {improvement}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Before/After Examples */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Before & After Examples</CardTitle>
            <CardDescription>
              See how smart formatting transforms ordinary text into compelling resume content
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {beforeAfterExamples.map((example, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2 text-destructive">Before</h4>
                  <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                    <p className="text-sm">{example.before}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-success">After</h4>
                  <div className="bg-success/5 border border-success/20 rounded-lg p-3">
                    <p className="text-sm whitespace-pre-line">{example.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Smart Formatting Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Use Action Verbs</h4>
                <p className="text-muted-foreground text-sm">
                  Start bullet points with strong action verbs like "Led," "Implemented," "Optimized" instead of weak phrases like "Responsible for."
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Quantify Everything</h4>
                <p className="text-muted-foreground text-sm">
                  Include specific numbers, percentages, and metrics to demonstrate the impact of your work and achievements.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Be Consistent</h4>
                <p className="text-muted-foreground text-sm">
                  Maintain consistent formatting for dates, company names, job titles, and bullet point styles throughout your resume.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Keep It Concise</h4>
                <p className="text-muted-foreground text-sm">
                  Make every word count. Remove redundant phrases and focus on the most impactful information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SmartFormattingPage;