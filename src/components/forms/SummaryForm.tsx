import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileText, Target, Eye, RotateCcw } from "lucide-react";

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
  onAISuggestion?: () => void;
}

const SAMPLE_SUMMARIES = [
  "Experienced software engineer with 5+ years developing scalable web applications. Proven track record in React, Node.js, and cloud architecture. Passionate about clean code and user experience.",
  "Results-driven marketing professional with expertise in digital campaigns and brand strategy. Successfully increased customer engagement by 40% through data-driven marketing initiatives.",
  "Dedicated project manager with PMP certification and experience leading cross-functional teams. Skilled in Agile methodologies and stakeholder management, delivering projects on time and within budget."
];

export function SummaryForm({ data, onUpdate, onAISuggestion }: SummaryFormProps) {
  const [summary, setSummary] = useState(data);
  const [wordCount, setWordCount] = useState(0);
  const [showSamples, setShowSamples] = useState(false);

  useEffect(() => {
    const words = summary.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [summary]);

  const handleSummaryChange = (value: string) => {
    setSummary(value);
    onUpdate(value);
  };

  const getWordCountColor = () => {
    if (wordCount < 20) return "text-yellow-600";
    if (wordCount > 80) return "text-red-600";
    return "text-green-600";
  };

  const getWordCountMessage = () => {
    if (wordCount < 20) return "Too short - add more details";
    if (wordCount > 80) return "Consider making it more concise";
    return "Perfect length";
  };

  const handleUseSample = (sampleText: string) => {
    handleSummaryChange(sampleText);
    setShowSamples(false);
  };

  const handleClear = () => {
    handleSummaryChange("");
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Professional Summary</h3>
                <p className="text-sm text-muted-foreground">Create a compelling overview of your professional background</p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              <Target className="mr-1 h-3 w-3" />
              20-80 words
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="summary">Summary</Label>
              <div className="flex items-center gap-2 text-xs">
                <span className={`font-medium ${getWordCountColor()}`}>
                  {wordCount} words
                </span>
                <span className="text-muted-foreground">•</span>
                <span className={`${getWordCountColor()}`}>
                  {getWordCountMessage()}
                </span>
              </div>
            </div>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              placeholder="Write a compelling summary that highlights your key achievements, skills, and career objectives. Focus on what makes you unique and valuable to potential employers..."
              className="min-h-32 resize-none transition-all duration-200 focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onAISuggestion}
              className="hover:bg-primary/5"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Summary
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowSamples(!showSamples)}
              className="hover:bg-primary/5"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Examples
            </Button>
            
            {summary && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>

          {/* Sample Summaries */}
          {showSamples && (
            <div className="space-y-3 p-4 bg-muted/20 rounded-lg border border-border/50">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-sm">Example Summaries</h4>
              </div>
              <div className="space-y-3">
                {SAMPLE_SUMMARIES.map((sample, index) => (
                  <div key={index} className="space-y-2">
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      "{sample}"
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleUseSample(sample)}
                      className="text-xs h-7 hover:bg-primary/5"
                    >
                      Use this example
                    </Button>
                    {index < SAMPLE_SUMMARIES.length - 1 && (
                      <div className="border-t border-border/30 pt-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-sm text-blue-900 mb-2">💡 Pro Tips</h4>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Start with your years of experience and key role</li>
              <li>• Mention 2-3 of your most relevant skills or technologies</li>
              <li>• Include a notable achievement with metrics if possible</li>
              <li>• End with your career objective or what you're seeking</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}