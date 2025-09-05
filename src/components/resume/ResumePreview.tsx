import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Eye, Download, Printer, Share2 } from "lucide-react";

interface ResumeData {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    website?: string;
  };
  summary: string;
  experience: any[];
  education: any[];
  skills: string[];
  certifications: any[];
}

interface ResumePreviewProps {
  data: ResumeData;
  onDownload?: () => void;
  onFullPreview?: () => void;
}

export function ResumePreview({ data, onDownload, onFullPreview }: ResumePreviewProps) {
  const fullName = `${data.personal.firstName} ${data.personal.lastName}`.trim();

  return (
    <Card className="sticky top-24 shadow-md border-border/50 overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-subtle">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Live Preview</CardTitle>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onFullPreview}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Printer className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        {/* Resume Paper */}
        <div className="bg-white border-l-4 border-primary shadow-inner">
          <div className="p-6 space-y-5 text-sm font-['Inter'] max-h-[600px] overflow-y-auto">
            {/* Header Section */}
            <div className="text-center border-b border-gray-200 pb-5">
              <h1 className="font-['Playfair_Display'] font-bold text-2xl text-gray-900 mb-2 tracking-tight">
                {fullName || "Your Name"}
              </h1>
              <div className="space-y-1">
                <div className="flex justify-center items-center gap-3 text-sm text-gray-600">
                  <span>{data.personal.email || "your.email@example.com"}</span>
                  {data.personal.phone && (
                    <>
                      <span>•</span>
                      <span>{data.personal.phone}</span>
                    </>
                  )}
                </div>
                <div className="flex justify-center items-center gap-3 text-sm text-gray-600">
                  {data.personal.location && <span>{data.personal.location}</span>}
                  {data.personal.website && data.personal.location && <span>•</span>}
                  {data.personal.website && (
                    <a href={data.personal.website} className="text-primary hover:underline">
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            {data.summary && (
              <div>
                <h2 className="font-['Source_Sans_Pro'] font-bold text-lg text-gray-900 mb-3 tracking-wide uppercase border-b border-primary/20 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed text-justify">
                  {data.summary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            <div>
              <h2 className="font-['Source_Sans_Pro'] font-bold text-lg text-gray-900 mb-3 tracking-wide uppercase border-b border-primary/20 pb-1">
                Professional Experience
              </h2>
              <div className="space-y-4">
                {data.experience.length > 0 ? (
                  data.experience.map((exp, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base text-gray-900 font-['Inter']">
                            {exp.title || "Job Title"}
                          </h3>
                          <h4 className="font-medium text-primary">
                            {exp.company || "Company Name"}
                          </h4>
                        </div>
                        <div className="text-right text-sm text-gray-600">
                          <div>
                            {exp.startDate || "Start"} - {exp.current ? "Present" : (exp.endDate || "End")}
                          </div>
                          {exp.location && (
                            <div className="text-xs">{exp.location}</div>
                          )}
                        </div>
                      </div>
                      {exp.description && (
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                    <p className="text-sm">Add your work experience to see it here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div>
                <h2 className="font-['Source_Sans_Pro'] font-bold text-lg text-gray-900 mb-3 tracking-wide uppercase border-b border-primary/20 pb-1">
                  Core Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.map((skill, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="text-xs px-3 py-1 bg-primary/10 text-primary font-medium border border-primary/20"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div>
                <h2 className="font-['Source_Sans_Pro'] font-bold text-lg text-gray-900 mb-3 tracking-wide uppercase border-b border-primary/20 pb-1">
                  Education
                </h2>
                <div className="space-y-3">
                  {data.education.map((edu, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-base text-gray-900">
                            {edu.degree || "Degree"}
                          </h3>
                          <h4 className="text-primary font-medium">
                            {edu.institution || "Institution"}
                          </h4>
                        </div>
                        <div className="text-sm text-gray-600">
                          {edu.graduationDate || "Year"}
                        </div>
                      </div>
                      {edu.gpa && (
                        <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <div>
                <h2 className="font-['Source_Sans_Pro'] font-bold text-lg text-gray-900 mb-3 tracking-wide uppercase border-b border-primary/20 pb-1">
                  Certifications
                </h2>
                <div className="space-y-2">
                  {data.certifications.map((cert, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-gray-900">{cert.name}</h3>
                        <p className="text-sm text-gray-600">{cert.issuer}</p>
                      </div>
                      <div className="text-sm text-gray-600">
                        {cert.date}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Actions */}
        <div className="p-4 bg-gradient-subtle border-t border-border/50">
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="sm" onClick={onFullPreview} className="w-full">
              <Eye className="mr-2 h-4 w-4" />
              Full Preview
            </Button>
            <Button size="sm" onClick={onDownload} className="w-full bg-gradient-hero hover:opacity-90">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}