import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Shield, ArrowLeft, CheckCircle, AlertTriangle, XCircle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ATSOptimizationPage = () => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please paste a job description to analyze ATS compatibility.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate ATS analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "ATS Analysis Complete!",
        description: "Your resume has been analyzed for ATS compatibility.",
      });
    }, 3000);
  };

  const atsScore = 85;
  const analysisResults = {
    keywords: {
      matched: 12,
      total: 15,
      missing: ["Python", "Machine Learning", "API Development"]
    },
    formatting: {
      score: 95,
      issues: ["Some bullet points could be more concise"]
    },
    structure: {
      score: 90,
      issues: ["Consider adding a skills section", "Work experience could be more detailed"]
    },
    readability: {
      score: 88,
      issues: ["Some technical terms could be simplified"]
    }
  };

  const recommendations = [
    {
      type: "critical",
      title: "Add Missing Keywords",
      description: "Include 'Python', 'Machine Learning', and 'API Development' in your experience or skills section",
      impact: "High"
    },
    {
      type: "warning", 
      title: "Optimize Bullet Points",
      description: "Make bullet points more concise and quantify achievements with numbers",
      impact: "Medium"
    },
    {
      type: "info",
      title: "Add Skills Section",
      description: "Create a dedicated technical skills section to highlight relevant technologies",
      impact: "Medium"
    },
    {
      type: "success",
      title: "Great Formatting",
      description: "Your resume uses ATS-friendly formatting with proper headings and structure",
      impact: "Low"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-warning" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />;
      default:
        return <Shield className="h-5 w-5 text-primary" />;
    }
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
                <Shield className="h-5 w-5 text-success" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ATS Optimization</h1>
                <p className="text-muted-foreground">Optimize your resume for Applicant Tracking Systems</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Description Input */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Description Analysis</CardTitle>
                <CardDescription>
                  Paste the job description you're applying for to get personalized ATS optimization recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[200px]"
                />
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-hero hover:opacity-90"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Analyze ATS Compatibility
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* ATS Tips */}
            <Card>
              <CardHeader>
                <CardTitle>ATS Optimization Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Use Standard Section Headings</p>
                      <p className="text-sm text-muted-foreground">Use common headings like "Work Experience", "Education", "Skills"</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Include Relevant Keywords</p>
                      <p className="text-sm text-muted-foreground">Mirror language from the job description in your resume</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Avoid Complex Formatting</p>
                      <p className="text-sm text-muted-foreground">Keep formatting simple with clear, readable fonts</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-success mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Use Standard File Formats</p>
                      <p className="text-sm text-muted-foreground">Submit as PDF or DOC files for best compatibility</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Results */}
          <div className="space-y-6">
            {analysisComplete ? (
              <>
                {/* ATS Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>ATS Compatibility Score</CardTitle>
                    <CardDescription>
                      Your resume's likelihood of passing through ATS systems
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className={`text-4xl font-bold mb-2 ${getScoreColor(atsScore)}`}>
                        {atsScore}%
                      </div>
                      <Badge className={atsScore >= 90 ? "bg-success/10 text-success" : atsScore >= 70 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}>
                        {atsScore >= 90 ? "Excellent" : atsScore >= 70 ? "Good" : "Needs Improvement"}
                      </Badge>
                    </div>
                    <Progress value={atsScore} className="mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      Your resume has a {atsScore}% chance of passing ATS screening
                    </p>
                  </CardContent>
                </Card>

                {/* Detailed Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Keywords Match</span>
                          <span className="text-sm font-medium">{analysisResults.keywords.matched}/{analysisResults.keywords.total}</span>
                        </div>
                        <Progress value={(analysisResults.keywords.matched / analysisResults.keywords.total) * 100} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Formatting</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResults.formatting.score)}`}>
                            {analysisResults.formatting.score}%
                          </span>
                        </div>
                        <Progress value={analysisResults.formatting.score} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Structure</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResults.structure.score)}`}>
                            {analysisResults.structure.score}%
                          </span>
                        </div>
                        <Progress value={analysisResults.structure.score} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Readability</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResults.readability.score)}`}>
                            {analysisResults.readability.score}%
                          </span>
                        </div>
                        <Progress value={analysisResults.readability.score} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recommendations</CardTitle>
                    <CardDescription>
                      Actions to improve your ATS compatibility score
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="flex gap-3 p-3 border border-border rounded-lg">
                        {getRecommendationIcon(rec.type)}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{rec.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {rec.impact}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                  <Shield className="h-16 w-16 mb-4 opacity-50" />
                  <p className="text-center">
                    Paste a job description and click "Analyze ATS Compatibility" to see your optimization score and recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATSOptimizationPage;