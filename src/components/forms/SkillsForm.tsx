import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, X, Sparkles, Zap, Search } from "lucide-react";

interface SkillsFormProps {
  data: string[];
  onUpdate: (data: string[]) => void;
  onAISuggestion?: () => void;
}

const SKILL_SUGGESTIONS = [
  // Technical Skills
  "JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "C++", "HTML/CSS",
  "SQL", "MongoDB", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes", "Git",
  "REST APIs", "GraphQL", "Microservices", "Machine Learning", "Data Analysis",
  
  // Design Skills
  "UI/UX Design", "Figma", "Adobe Creative Suite", "Sketch", "Prototyping", "Wireframing",
  "User Research", "Design Systems", "Responsive Design", "Accessibility",
  
  // Soft Skills
  "Leadership", "Project Management", "Team Management", "Communication", "Problem Solving",
  "Critical Thinking", "Adaptability", "Time Management", "Collaboration", "Mentoring",
  
  // Industry Skills
  "Agile/Scrum", "DevOps", "CI/CD", "Testing", "Quality Assurance", "Product Strategy",
  "Market Research", "Sales", "Customer Service", "Digital Marketing", "SEO/SEM"
];

export function SkillsForm({ data, onUpdate, onAISuggestion }: SkillsFormProps) {
  const [skills, setSkills] = useState<string[]>(data);
  const [newSkill, setNewSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = SKILL_SUGGESTIONS.filter(
    skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !skills.includes(skill)
  ).slice(0, 10);

  const handleAddSkill = (skill: string) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      const updated = [...skills, trimmedSkill];
      setSkills(updated);
      onUpdate(updated);
      setNewSkill("");
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter(skill => skill !== skillToRemove);
    setSkills(updated);
    onUpdate(updated);
  };

  const handleInputChange = (value: string) => {
    setNewSkill(value);
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newSkill.trim()) {
      e.preventDefault();
      handleAddSkill(newSkill);
    }
    if (e.key === 'Escape') {
      setShowSuggestions(false);
      setNewSkill("");
      setSearchTerm("");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Your Skills</h3>
              <p className="text-sm text-muted-foreground">Add your technical and soft skills</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Skills Display */}
          <div className="space-y-2">
            <Label>Current Skills ({skills.length})</Label>
            <div className="min-h-24 p-4 border border-border/50 rounded-lg bg-muted/20">
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="group cursor-pointer hover:bg-secondary/80 transition-colors"
                    >
                      {skill}
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No skills added yet</p>
                  <p className="text-xs">Start typing below to add skills</p>
                </div>
              )}
            </div>
          </div>

          {/* Add New Skill */}
          <div className="space-y-2 relative">
            <Label htmlFor="newSkill">Add New Skill</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  id="newSkill"
                  value={newSkill}
                  onChange={(e) => handleInputChange(e.target.value)}
                  onKeyDown={handleKeyPress}
                  onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                  placeholder="Type a skill (e.g., React, Leadership, Python...)"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
                <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                
                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                    {filteredSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddSkill(suggestion)}
                        className="w-full px-3 py-2 text-left hover:bg-muted transition-colors text-sm border-b border-border last:border-0"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Button 
                onClick={() => handleAddSkill(newSkill)}
                disabled={!newSkill.trim()}
                size="sm"
                className="px-4"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Add Popular Skills */}
          <div className="space-y-2">
            <Label>Popular Skills</Label>
            <div className="flex flex-wrap gap-2">
              {SKILL_SUGGESTIONS.filter(skill => !skills.includes(skill)).slice(0, 8).map((skill, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleAddSkill(skill)}
                  className="text-xs hover:bg-primary/5"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  {skill}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestion */}
      <div className="pt-4 border-t border-border/50">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAISuggestion}
          className="w-full hover:bg-primary/5 transition-colors"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Get AI Skill Recommendations
        </Button>
      </div>
    </div>
  );
}