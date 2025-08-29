import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, ArrowLeft, Search, TrendingUp, AlertCircle, CheckCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const JobMatchingPage = () => {
  const { toast } = useToast();
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || !jobTitle.trim()) {
      toast({
        title: "Missing Information",
        description: "Please provide both job title and description to analyze the match.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate job matching analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisComplete(true);
      toast({
        title: "Job Match Analysis Complete!",
        description: "Your resume has been analyzed against the job requirements.",
      });
    }, 3000);
  };

  const matchScore = 78;
  const analysisResults = {
    keywordMatch: {
      score: 85,
      matched: ["JavaScript", "React", "Node.js", "MongoDB", "Git", "Agile"],
      missing: ["Python", "Docker", "Kubernetes", "AWS"]
    },
    experienceMatch: {
      score: 75,
      required: "3-5 years",
      current: "4 years",
      gap: "Leadership experience in managing teams"
    },
    skillsMatch: {
      score: 82,
      strongMatches: ["Frontend Development", "API Integration", "Version Control"],
      partialMatches: ["Cloud Technologies", "DevOps"],
      missing: ["Machine Learning", "Data Analysis"]
    },
    educationMatch: {
      score: 90,
      matches: true,
      details: "Bachelor's degree in Computer Science meets requirements"
    }
  };

  const recommendations = [
    {
      priority: "high",
      title: "Add Missing Technical Skills",
      description: "Include Python, Docker, and AWS experience in your skills section or project descriptions",
      impact: "+15 points",
      effort: "Medium"
    },
    {
      priority: "high",
      title: "Highlight Leadership Experience", 
      description: "Emphasize any team leadership, mentoring, or project management experience",
      impact: "+12 points",
      effort: "Low"
    },
    {
      priority: "medium",
      title: "Quantify Achievements",
      description: "Add specific numbers and metrics to your accomplishments (e.g., '20% performance improvement')",
      impact: "+8 points",
      effort: "Low"
    },
    {
      priority: "low",
      title: "Add Relevant Certifications",
      description: "Consider getting AWS or Docker certifications to strengthen your profile",
      impact: "+5 points",
      effort: "High"
    }
  ];

  const previousAnalyses = [
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "Tech Startup",
      matchScore: 92,
      analyzedDate: "2024-01-15",
      status: "applied"
    },
    {
      id: 2,
      jobTitle: "Full Stack Engineer",
      company: "Enterprise Corp",
      matchScore: 68,
      analyzedDate: "2024-01-12",
      status: "needs_improvement"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "medium":
        return <TrendingUp className="h-5 w-5 text-warning" />;
      default:
        return <CheckCircle className="h-5 w-5 text-success" />;
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
                <Target className="h-5 w-5 text-success" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Job Matching</h1>
                <p className="text-muted-foreground">Analyze how well your resume matches specific job postings</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Job Analysis Input */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  Job Analysis
                </CardTitle>
                <CardDescription>
                  Paste a job posting to see how well your resume matches the requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    placeholder="e.g., Senior Software Engineer"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the complete job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="min-h-[200px]"
                  />
                </div>
                
                <Button 
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-hero hover:opacity-90"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Analyzing Match...
                    </>
                  ) : (
                    <>
                      <Target className="mr-2 h-4 w-4" />
                      Analyze Job Match
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Previous Analyses */}
            <Card>
              <CardHeader>
                <CardTitle>Previous Analyses</CardTitle>
                <CardDescription>
                  Your recent job matching analyses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {previousAnalyses.map((analysis) => (
                  <div key={analysis.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{analysis.jobTitle}</h4>
                      <p className="text-sm text-muted-foreground">{analysis.company}</p>
                      <p className="text-xs text-muted-foreground">{new Date(analysis.analyzedDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${getScoreColor(analysis.matchScore)}`}>
                        {analysis.matchScore}%
                      </div>
                      <Badge variant={analysis.status === "applied" ? "default" : "secondary"}>
                        {analysis.status === "applied" ? "Applied" : "Needs Work"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Match Results */}
          <div className="space-y-6">
            {analysisComplete ? (
              <>
                {/* Overall Match Score */}
                <Card>
                  <CardHeader>
                    <CardTitle>Job Match Score</CardTitle>
                    <CardDescription>
                      How well your resume matches this job posting
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className={`text-4xl font-bold mb-2 ${getScoreColor(matchScore)}`}>
                        {matchScore}%
                      </div>
                      <Badge className={matchScore >= 80 ? "bg-success/10 text-success" : matchScore >= 60 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}>
                        {matchScore >= 80 ? "Excellent Match" : matchScore >= 60 ? "Good Match" : "Needs Improvement"}
                      </Badge>
                    </div>
                    <Progress value={matchScore} className="mb-4" />
                    <p className="text-sm text-muted-foreground text-center">
                      {matchScore >= 80 ? "Your resume is a strong match for this position!" : 
                       matchScore >= 60 ? "Good match with room for improvement" : 
                       "Consider strengthening your resume for this role"}
                    </p>
                  </CardContent>
                </Card>

                {/* Detailed Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Match Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Keywords</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResults.keywordMatch.score)}`}>
                            {analysisResults.keywordMatch.score}%
                          </span>
                        </div>
                        <Progress value={analysisResults.keywordMatch.score} className="h-2" />
                        <div className="mt-2 flex flex-wrap gap-1">
                          {analysisResults.keywordMatch.matched.slice(0, 4).map((keyword) => (
                            <Badge key={keyword} className="bg-success/10 text-success text-xs">
                              {keyword}
                            </Badge>
                          ))}
                          {analysisResults.keywordMatch.matched.length > 4 && (
                            <Badge className="bg-muted text-muted-foreground text-xs">
                              +{analysisResults.keywordMatch.matched.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Experience</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResults.experienceMatch.score)}`}>
                            {analysisResults.experienceMatch.score}%
                          </span>
                        </div>
                        <Progress value={analysisResults.experienceMatch.score} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                          {analysisResults.experienceMatch.current} vs {analysisResults.experienceMatch.required} required
                        </p>
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Skills</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResults.skillsMatch.score)}`}>
                            {analysisResults.skillsMatch.score}%
                          </span>
                        </div>
                        <Progress value={analysisResults.skillsMatch.score} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Education</span>
                          <span className={`text-sm font-medium ${getScoreColor(analysisResults.educationMatch.score)}`}>
                            {analysisResults.educationMatch.score}%
                          </span>
                        </div>
                        <Progress value={analysisResults.educationMatch.score} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations */}
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Recommendations</CardTitle>
                    <CardDescription>
                      Specific actions to improve your job match score
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendations.map((rec, index) => (
                      <div key={index} className="flex gap-3 p-3 border border-border rounded-lg">
                        {getPriorityIcon(rec.priority)}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium">{rec.title}</h4>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">
                                {rec.impact}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {rec.effort}
                              </Badge>
                            </div>
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
                  <Target className="h-16 w-16 mb-4 opacity-50" />
                  <p className="text-center">
                    Enter a job title and description to analyze how well your resume matches the requirements
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Job Matching Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Use Job Keywords</h4>
                <p className="text-muted-foreground text-sm">
                  Mirror the language and keywords from the job description in your resume to improve ATS compatibility.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Quantify Impact</h4>
                <p className="text-muted-foreground text-sm">
                  Include specific numbers and metrics that demonstrate the impact of your work and achievements.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Address Requirements</h4>
                <p className="text-muted-foreground text-sm">
                  Make sure your resume directly addresses the key requirements mentioned in the job posting.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Customize for Each Role</h4>
                <p className="text-muted-foreground text-sm">
                  Tailor your resume for each application based on the specific job requirements and company culture.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JobMatchingPage;