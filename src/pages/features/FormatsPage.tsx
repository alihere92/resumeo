import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, ArrowLeft, Download, FileText, File, Code, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const FormatsPage = () => {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState<string | null>(null);

  const formats = [
    {
      id: "pdf",
      name: "PDF",
      icon: FileText,
      description: "Professional PDF document perfect for email and printing",
      features: ["High-quality formatting", "Print-ready", "ATS-compatible", "Universal compatibility"],
      recommended: true,
      fileSize: "~250KB",
      useCase: "Job applications, email attachments, printing"
    },
    {
      id: "docx", 
      name: "Microsoft Word",
      icon: File,
      description: "Editable Word document for further customization",
      features: ["Fully editable", "Microsoft Office compatible", "Easy to modify", "Widely accepted"],
      recommended: false,
      fileSize: "~180KB",
      useCase: "When employers request Word format, easy editing"
    },
    {
      id: "txt",
      name: "Plain Text",
      icon: FileText,
      description: "Simple text format for online applications and ATS systems",
      features: ["ATS-optimized", "No formatting conflicts", "Small file size", "Universal support"],
      recommended: false,
      fileSize: "~5KB",
      useCase: "Online job portals, ATS systems, quick copy-paste"
    },
    {
      id: "json",
      name: "JSON Data",
      icon: Code,
      description: "Structured data format for developers and portfolio websites",
      features: ["Machine-readable", "Structured data", "API-friendly", "Easy integration"],
      recommended: false,
      fileSize: "~15KB",
      useCase: "Developer portfolios, API integration, data backup"
    }
  ];

  const handleExport = async (formatId: string, formatName: string) => {
    setIsExporting(formatId);
    
    // Simulate export process
    setTimeout(() => {
      setIsExporting(null);
      toast({
        title: `${formatName} Export Complete!`,
        description: `Your resume has been exported as a ${formatName} file.`,
      });
      
      // In a real implementation, this would trigger the actual download
      const link = document.createElement('a');
      link.href = `/placeholder.${formatId}`; // This would be the actual file blob URL
      link.download = `my-resume.${formatId}`;
      link.click();
    }, 2000);
  };

  const quickExportOptions = [
    { format: "pdf", label: "Quick PDF", icon: FileText },
    { format: "docx", label: "Quick Word", icon: File },
    { format: "txt", label: "Quick Text", icon: FileText }
  ];

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
                <Users className="h-5 w-5 text-warning" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Multiple Formats</h1>
                <p className="text-muted-foreground">Export your resume in various formats for different use cases</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        {/* Quick Export Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quick Export</CardTitle>
            <CardDescription>
              Export your resume instantly in the most common formats
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {quickExportOptions.map((option) => (
                <Button
                  key={option.format}
                  onClick={() => handleExport(option.format, option.label.replace("Quick ", ""))}
                  disabled={isExporting === option.format}
                  className="bg-gradient-hero hover:opacity-90"
                >
                  {isExporting === option.format ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <option.icon className="mr-2 h-4 w-4" />
                      {option.label}
                    </>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Format Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {formats.map((format) => (
            <Card key={format.id} className="relative">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <format.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {format.name}
                        {format.recommended && (
                          <Badge className="bg-primary/10 text-primary">
                            Recommended
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{format.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="font-medium mb-2">Features:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {format.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* File Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">File Size:</span>
                    <p className="font-medium">{format.fileSize}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Format:</span>
                    <p className="font-medium">.{format.id.toUpperCase()}</p>
                  </div>
                </div>

                {/* Use Case */}
                <div>
                  <span className="text-muted-foreground text-sm">Best for:</span>
                  <p className="font-medium text-sm">{format.useCase}</p>
                </div>

                {/* Export Button */}
                <Button 
                  onClick={() => handleExport(format.id, format.name)}
                  disabled={isExporting === format.id}
                  className="w-full"
                  variant={format.recommended ? "default" : "outline"}
                >
                  {isExporting === format.id ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Export as {format.name}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Format Comparison */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Format Comparison</CardTitle>
            <CardDescription>
              Choose the right format for your specific needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="usage" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="usage">Usage Scenarios</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
              </TabsList>
              
              <TabsContent value="usage" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Email Applications</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Best choice:</strong> PDF
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PDFs maintain formatting across all devices and email clients, ensuring your resume looks professional.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Online Job Portals</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Best choice:</strong> PDF or Plain Text
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Many portals prefer PDF, but some ATS systems work better with plain text format.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Further Editing</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Best choice:</strong> Microsoft Word
                    </p>
                    <p className="text-sm text-muted-foreground">
                      DOCX format allows easy editing and customization for different job applications.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Developer Portfolios</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Best choice:</strong> JSON
                    </p>
                    <p className="text-sm text-muted-foreground">
                      JSON format can be easily integrated into portfolio websites and applications.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="compatibility" className="mt-6">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Format</th>
                        <th className="text-left p-2">Email Clients</th>
                        <th className="text-left p-2">ATS Systems</th>
                        <th className="text-left p-2">Mobile Devices</th>
                        <th className="text-left p-2">Printing</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-2 font-medium">PDF</td>
                        <td className="p-2">✅ Excellent</td>
                        <td className="p-2">✅ Good</td>
                        <td className="p-2">✅ Excellent</td>
                        <td className="p-2">✅ Excellent</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Word</td>
                        <td className="p-2">⚠️ Variable</td>
                        <td className="p-2">✅ Excellent</td>
                        <td className="p-2">⚠️ Variable</td>
                        <td className="p-2">✅ Good</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-2 font-medium">Plain Text</td>
                        <td className="p-2">✅ Good</td>
                        <td className="p-2">✅ Excellent</td>
                        <td className="p-2">✅ Excellent</td>
                        <td className="p-2">⚠️ Basic</td>
                      </tr>
                      <tr>
                        <td className="p-2 font-medium">JSON</td>
                        <td className="p-2">❌ Poor</td>
                        <td className="p-2">❌ Poor</td>
                        <td className="p-2">❌ Poor</td>
                        <td className="p-2">❌ Not suitable</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {formats.map((format) => (
                    <div key={format.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <format.icon className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold">{format.name}</h4>
                      </div>
                      <ul className="text-sm space-y-1">
                        {format.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FormatsPage;